import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, isAbsolute, join, relative, resolve } from "node:path";
import { tmpdir } from "node:os";

const port = Number(process.env.PORT || 4173);
const publicDir = resolve("public");
const maxCodeLength = 20_000;
const maxOutputLength = 12_000;
const runTimeoutMs = 5_000;

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml; charset=utf-8"],
  [".png", "image/png"],
  [".ico", "image/x-icon"]
]);

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

function sendText(response, statusCode, text, contentType = "text/plain; charset=utf-8") {
  response.writeHead(statusCode, {
    "Content-Type": contentType,
    "Cache-Control": "no-store"
  });
  response.end(text);
}

function decodeJavaString(value) {
  return value
    .replaceAll('\\"', '"')
    .replaceAll("\\n", "\n")
    .replaceAll("\\t", "\t")
    .replaceAll("\\r", "\r")
    .replaceAll("\\\\", "\\");
}

function splitJavaConcat(expression) {
  const parts = [];
  let current = "";
  let inString = false;
  let escaping = false;

  for (const char of expression) {
    if (escaping) {
      current += char;
      escaping = false;
      continue;
    }

    if (char === "\\") {
      current += char;
      escaping = true;
      continue;
    }

    if (char === '"') {
      current += char;
      inString = !inString;
      continue;
    }

    if (char === "+" && !inString) {
      parts.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  parts.push(current.trim());
  return parts;
}

function buildPreviewVariables(code) {
  const variables = new Map();
  const assignmentPattern = /\b(?:String|int|long|double|float|boolean|char)\s+([A-Za-z_$][\w$]*)\s*=\s*([^;]+);/g;
  let match;

  while ((match = assignmentPattern.exec(code)) !== null) {
    const [, name, rawValue] = match;
    const value = rawValue.trim();

    if (/^"(?:\\.|[^"\\])*"$/.test(value)) {
      variables.set(name, decodeJavaString(value.slice(1, -1)));
    } else if (/^'(?:\\.|[^'\\])'$/.test(value)) {
      variables.set(name, decodeJavaString(value.slice(1, -1)));
    } else if (/^(true|false)$/.test(value)) {
      variables.set(name, value);
    } else if (/^-?\d+(?:\.\d+)?[dDfFlL]?$/.test(value)) {
      variables.set(name, value.replace(/[dDfFlL]$/, ""));
    }
  }

  return variables;
}

function evaluatePreviewExpression(expression, variables) {
  const parts = splitJavaConcat(expression);
  const output = [];

  for (const part of parts) {
    if (!part) continue;

    if (/^"(?:\\.|[^"\\])*"$/.test(part)) {
      output.push(decodeJavaString(part.slice(1, -1)));
    } else if (/^'(?:\\.|[^'\\])'$/.test(part)) {
      output.push(decodeJavaString(part.slice(1, -1)));
    } else if (variables.has(part)) {
      output.push(variables.get(part));
    } else if (/^-?\d+(?:\.\d+)?[dDfFlL]?$/.test(part) || /^(true|false)$/.test(part)) {
      output.push(part.replace(/[dDfFlL]$/, ""));
    } else {
      return null;
    }
  }

  return output.join("");
}

function runTeachingPreview(code) {
  const outputLines = [];
  const variables = buildPreviewVariables(code);
  const printPattern = /\b(?:System\.out\.println|IO\.println)\s*\(([\s\S]*?)\)\s*;/g;
  let match;

  while ((match = printPattern.exec(code)) !== null) {
    const output = evaluatePreviewExpression(match[1], variables);
    if (output !== null) outputLines.push(output);
  }

  if (outputLines.length > 0) {
    return {
      status: "learning-preview",
      stdout: outputLines.join("\n"),
      stderr: "Teaching preview: cloud JDK unavailable.",
      durationMs: 0
    };
  }

  return {
    status: "preview-limited",
    stdout: "",
    stderr: 'Teaching preview: supports basic System.out.println("text").',
    durationMs: 0
  };
}

function readBody(request) {
  return new Promise((resolveBody, rejectBody) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 64_000) {
        request.destroy();
        rejectBody(new Error("Request body is too large."));
      }
    });
    request.on("end", () => resolveBody(body));
    request.on("error", rejectBody);
  });
}

function runCommand(command, args, options = {}) {
  return new Promise((resolveRun) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      shell: false,
      windowsHide: true,
      stdio: ["pipe", "pipe", "pipe"]
    });

    let stdout = "";
    let stderr = "";
    let didTimeOut = false;
    const timer = setTimeout(() => {
      didTimeOut = true;
      child.kill("SIGKILL");
    }, options.timeoutMs || runTimeoutMs);

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
      if (stdout.length > maxOutputLength) child.kill("SIGKILL");
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
      if (stderr.length > maxOutputLength) child.kill("SIGKILL");
    });
    child.on("error", (error) => {
      clearTimeout(timer);
      resolveRun({ ok: false, missingCommand: error.code === "ENOENT", error, stdout, stderr });
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      resolveRun({
        ok: code === 0 && !didTimeOut,
        code,
        didTimeOut,
        stdout: stdout.slice(0, maxOutputLength),
        stderr: stderr.slice(0, maxOutputLength)
      });
    });

    if (options.stdin) child.stdin.write(options.stdin);
    child.stdin.end();
  });
}

let cachedJavaStatus = null;

async function getJavaStatus() {
  if (cachedJavaStatus !== null) {
    return cachedJavaStatus;
  }

  const java = await runCommand("java", ["--version"], { timeoutMs: 2_000 });
  if (java.missingCommand) {
    cachedJavaStatus = {
      available: false,
      demoMode: true,
      message: "Teaching preview enabled."
    };
    return cachedJavaStatus;
  }

  cachedJavaStatus = {
    available: java.ok,
    demoMode: false,
    version: [java.stdout, java.stderr].filter(Boolean).join("\n").trim(),
    message: java.ok ? "服务端 Java 运行环境可用。" : "检测到 java 命令，但版本检查未成功。"
  };
  return cachedJavaStatus;
}

async function handleRun(request, response) {
  let payload;
  try {
    payload = JSON.parse(await readBody(request));
  } catch {
    sendJson(response, 400, { status: "error", stderr: "请求格式不是有效的 JSON。" });
    return;
  }

  const code = String(payload.code || "");
  const stdin = String(payload.stdin || "");
  const args = Array.isArray(payload.args) ? payload.args.map(String).slice(0, 12) : [];

  if (!code.trim()) {
    sendJson(response, 400, { status: "error", stderr: "No code submitted." });
    return;
  }
  if (code.length > maxCodeLength) {
    sendJson(response, 400, { status: "error", stderr: "Code exceeds the 20000 character limit." });
    return;
  }

  const javaStatus = await getJavaStatus();
  if (!javaStatus.available) {
    sendJson(response, 200, runTeachingPreview(code));
    return;
  }

  const workDir = join(tmpdir(), `java-path-${randomUUID()}`);
  const startTime = Date.now();
  try {
    await mkdir(workDir, { recursive: true });
    await writeFile(join(workDir, "Main.java"), code, "utf8");

    const result = await runCommand("java", ["Main.java", ...args], {
      cwd: workDir,
      stdin,
      timeoutMs: runTimeoutMs
    });

    sendJson(response, 200, {
      status: result.didTimeOut ? "timeout" : result.ok ? "success" : "compile-or-runtime-error",
      stdout: result.stdout,
      stderr: result.didTimeOut ? `${result.stderr}\n程序运行超过 ${runTimeoutMs / 1000} 秒，已停止。` : result.stderr,
      durationMs: Date.now() - startTime
    });
  } catch (error) {
    sendJson(response, 500, {
      status: "server-error",
      stdout: "",
      stderr: `运行服务出错：${error.message}`,
      durationMs: Date.now() - startTime
    });
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }
}

async function serveStatic(request, response) {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);
  let rawPath;
  try {
    rawPath = decodeURIComponent(requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname);
  } catch {
    sendText(response, 400, "Bad request");
    return;
  }

  const filePath = resolve(publicDir, rawPath.replace(/^\/+/, ""));
  const relativePath = relative(publicDir, filePath);
  const isInsidePublicDir =
    relativePath && !relativePath.startsWith("..") && !isAbsolute(relativePath);

  if (!isInsidePublicDir || !existsSync(filePath)) {
    sendText(response, 404, "Not found");
    return;
  }

  try {
    const content = await readFile(filePath);
    const contentType = mimeTypes.get(extname(filePath)) || "application/octet-stream";
    response.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-cache"
    });
    response.end(content);
  } catch {
    sendText(response, 500, "Unable to read file.");
  }
}

const server = createServer(async (request, response) => {
  try {
    if (request.method === "GET" && request.url?.startsWith("/api/health")) {
      sendJson(response, 200, await getJavaStatus());
      return;
    }
    if (request.method === "POST" && request.url?.startsWith("/api/run")) {
      await handleRun(request, response);
      return;
    }
    if (request.method === "GET") {
      await serveStatic(request, response);
      return;
    }
    sendText(response, 405, "Method not allowed");
  } catch {
    sendText(response, 500, "Internal server error");
  }
});

server.listen(port, () => {
  console.log(`java-path is running at http://localhost:${port}`);
});
