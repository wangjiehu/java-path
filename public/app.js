const courseGroups = window.COURSE_GROUPS || [];
const answerCode =
  'public class Main {\n' +
  '    public static void main(String[] args) {\n' +
  '        System.out.println("Hello, Java!");\n' +
  '    }\n' +
  '}\n';

const starterCode =
  'public class Main {\n' +
  '    public static void main(String[] args) {\n' +
  '        // 在这里写一行输出代码\n' +
  '    }\n' +
  '}\n';

const totalLessons = courseGroups.reduce((sum, group) => sum + group.lessons.length, 0);

const defaultLessonContent = {
  id: "hello-java",
  title: "你好 Java (Hello World)",
  subtitle: "输出第一句话",
  intro: [
    "Java 是一门适合长期学习的编程语言，常用于后端服务、企业系统、安卓生态、数据处理和大型工程。",
    "这一关只解决一个问题：把代码写进编辑器，运行后在控制台看到一行输出。"
  ],
  syntax: [
    "`public class Main` 定义一个叫 Main 的类，可以先理解成程序盒子。",
    "`public static void main(String[] args)` 是程序入口，Java 会从这里开始执行。",
    "`System.out.println()` 会在控制台打印一行文字。",
    "双引号里的内容是字符串，分号表示这句代码结束。"
  ],
  exampleCode:
    'public class Main {\n' +
    '    public static void main(String[] args) {\n' +
    '        System.out.println("Hello, Java!");\n' +
    '        System.out.println(2026);\n' +
    '    }\n' +
    '}',
  task: "在右侧编辑器中写一行输出语句，让控制台显示一句你自己的话。",
  starterCode,
  answerCode,
  checks: [
    "代码包含 System.out.println(...)。",
    "println 的括号里有一段双引号包起来的文字。",
    "语句末尾写了英文分号。"
  ],
  commonMistakes: [
    "中文引号和中文分号会导致语法错误。",
    "String、System、Main 的大小写不能随意改。",
    "少写右括号或右大括号时，错误位置可能显示在下一行。"
  ],
  sources: [
    { title: "Dev.java: Getting Started with Java", url: "https://dev.java/learn/getting-started" },
    { title: "Dev.java: Single-File Source-Code Programs", url: "https://dev.java/learn/single-file-program/" },
    { title: "Oracle JDK Documentation", url: "https://docs.oracle.com/en/java/javase/26/" }
  ]
};

const levelList = document.querySelector("#levelList");
const lessonArticle = document.querySelector("#lessonArticle");
const lessonColumn = document.querySelector(".lesson-column");
const practiceColumn = document.querySelector(".practice-column");
const codeEditor = document.querySelector("#codeEditor");
const editorLines = document.querySelector("#editorLines");
const stdinInput = document.querySelector("#stdinInput");
const consoleOutput = document.querySelector("#consoleOutput");
const runMeta = document.querySelector("#runMeta");
const themeToggle = document.querySelector("#themeToggle");
const progressBar = document.querySelector("#progressBar");
const progressPercent = document.querySelector("#progressPercent");
const progressText = document.querySelector("#progressText");
const resetProgress = document.querySelector("#resetProgress");
const answerDrawer = document.querySelector("#answerDrawer");
const answerContent = document.querySelector("#answerContent");
const showAnswer = document.querySelector("#showAnswer");
const closeAnswer = document.querySelector("#closeAnswer");
const focusModal = document.querySelector("#focusModal");
const focusEditor = document.querySelector("#focusEditor");
const focusLines = document.querySelector("#focusLines");
const focusStdinInput = document.querySelector("#focusStdinInput");
const focusOutput = document.querySelector("#focusOutput");
const focusRunMeta = document.querySelector("#focusRunMeta");
const nextLessonButton = document.querySelector("#nextLesson");
const progressStorageKey = "java-path-progress-v1";
const legacyProgressStorageKey = "java-master-completed";
const draftStorageKey = "java-path-drafts-v1";
const themeStorageKey = "java-path-theme";
const legacyThemeStorageKey = "java-master-theme";
const maxDraftLength = 20_000;
let completedLessons = readStoredProgress();
let currentLessonIndex = 0;
let lessonDrafts = readStoredDrafts();
let hasLoadedLesson = false;

function normalizeCompletedCount(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return Math.max(0, Math.min(totalLessons, Math.floor(numeric)));
}

function readStoredProgress() {
  try {
    const raw = localStorage.getItem(progressStorageKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.completedLessonIds)) {
        const completedIds = new Set(parsed.completedLessonIds.map(String));
        const lessons = getLessonContents();
        let completedCount = 0;

        while (completedCount < lessons.length && completedIds.has(lessons[completedCount].id)) {
          completedCount += 1;
        }

        return completedCount;
      }

      const value = Number(parsed.completedLessons);
      if (Number.isFinite(value)) return normalizeCompletedCount(value);
    }

    const legacyValue = Number(localStorage.getItem(legacyProgressStorageKey) || 0);
    return Number.isFinite(legacyValue) ? normalizeCompletedCount(legacyValue) : 0;
  } catch {
    return 0;
  }
}

function readStoredTheme() {
  return localStorage.getItem(themeStorageKey) || localStorage.getItem(legacyThemeStorageKey) || "light";
}

function readStoredDrafts() {
  try {
    const raw = localStorage.getItem(draftStorageKey);
    if (!raw) return {};

    const parsed = JSON.parse(raw);
    const drafts = parsed?.drafts && typeof parsed.drafts === "object" ? parsed.drafts : {};

    return Object.fromEntries(
      Object.entries(drafts)
        .filter(([lessonId, code]) => typeof lessonId === "string" && typeof code === "string")
        .map(([lessonId, code]) => [lessonId, code.slice(0, maxDraftLength)])
    );
  } catch {
    return {};
  }
}

let writeDraftsTimeout = null;

function writeStoredDrafts(immediate = false) {
  if (writeDraftsTimeout) {
    clearTimeout(writeDraftsTimeout);
    writeDraftsTimeout = null;
  }

  const performWrite = () => {
    try {
      localStorage.setItem(
        draftStorageKey,
        JSON.stringify({
          drafts: lessonDrafts,
          updatedAt: new Date().toISOString()
        })
      );
    } catch {
      // localStorage can be disabled or full. The editor must stay usable.
    }
  };

  if (immediate) {
    performWrite();
  } else {
    writeDraftsTimeout = setTimeout(performWrite, 500);
  }
}

function getLessonContents() {
  const contents = Array.from({ length: 13 }, (_, index) => window[`LESSON_CONTENT_LEVEL${index + 1}`] || []).flat();
  contents[0] = { ...defaultLessonContent, ...(contents[0] || {}) };
  return contents;
}

function getCurrentLesson() {
  return getLessonContents()[currentLessonIndex] || createPlaceholderLesson(currentLessonIndex);
}

function createPlaceholderLesson(index) {
  const flatLessons = courseGroups.flatMap((group) => group.lessons);
  const lesson = flatLessons[index] || flatLessons[0];
  return {
    id: `lesson-${index + 1}`,
    title: lesson.title,
    subtitle: lesson.subtitle,
    intro: [
      "当前课程资源没有正确加载。请刷新页面；如果仍然出现这一页，说明课程脚本没有随页面一起发布。"
    ],
    syntax: ["刷新页面后，系统会重新加载对应关卡的讲解、示例、任务和官方资料。"],
    exampleCode: "",
    task: "刷新页面后继续当前关卡。",
    starterCode,
    answerCode,
    checks: ["代码可以运行。", "输出符合本关任务。"],
    commonMistakes: ["先保证程序结构完整，再逐步补业务逻辑。"],
    sources: defaultLessonContent.sources
  };
}

function isLessonLocked(index) {
  return index > completedLessons;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function inlineCode(value) {
  return escapeHtml(value).replace(/`([^`]+)`/g, '<span class="code-pill">$1</span>');
}

function safeExternalUrl(value) {
  try {
    const url = new URL(String(value), window.location.href);
    return url.protocol === "https:" ? escapeHtml(url.href) : "#";
  } catch {
    return "#";
  }
}

function renderLevels() {
  let lessonNumber = 0;
  levelList.innerHTML = courseGroups
    .map(
      (group) => `
        <section class="level-group">
          <div class="level-group-title">${escapeHtml(group.title)}</div>
          ${group.lessons
            .map((lesson) => {
              lessonNumber += 1;
              const itemIndex = lessonNumber - 1;
              const isCurrent = itemIndex === currentLessonIndex;
              const isCompleted = itemIndex < completedLessons;
              const isLocked = isLessonLocked(itemIndex);
              const status = isCurrent ? "当前" : isCompleted ? "完成" : isLocked ? "锁定" : "解锁";
              const statusClass = isCurrent ? "is-current" : isCompleted ? "is-done" : isLocked ? "is-locked" : "is-waiting";
              const statusTitle = isLocked ? "完成前一关后解锁" : isCompleted ? "已完成" : isCurrent ? "当前关卡" : "已解锁";
              const ariaLabel = `${lessonNumber}. ${lesson.title}，${statusTitle}`;
              return `
                <button class="level-item ${isCurrent ? "is-active" : ""} ${isCompleted ? "is-completed" : ""} ${isLocked ? "is-locked" : ""}" type="button" data-lesson-index="${itemIndex}" title="${escapeHtml(statusTitle)}" aria-label="${escapeHtml(ariaLabel)}" ${isLocked ? 'disabled aria-disabled="true"' : 'aria-disabled="false"'}>
                  <span class="lesson-index">${String(lessonNumber).padStart(2, "0")}</span>
                  <span class="level-copy">
                    <strong>${escapeHtml(lesson.title)}</strong>
                    <span class="level-subtitle">${escapeHtml(lesson.subtitle)}</span>
                  </span>
                  <span class="lesson-status ${statusClass}">${status}</span>
                </button>
              `;
            })
            .join("")}
        </section>
      `
    )
    .join("");
}

function renderLessonContent(lesson, displayIndex = currentLessonIndex) {
  const paragraphs = (lesson.intro || []).map((text) => `<p>${inlineCode(text)}</p>`).join("");
  const syntax = (lesson.syntax || []).map((text) => `<li>${inlineCode(text)}</li>`).join("");
  const example = lesson.exampleCode
    ? `<h3>示例</h3><div class="example-box"><pre><code>${escapeHtml(lesson.exampleCode)}</code></pre></div>`
    : "";
  const mistakes = (lesson.commonMistakes || []).length
    ? `<h3>常见错误</h3><ul>${lesson.commonMistakes.map((text) => `<li>${inlineCode(text)}</li>`).join("")}</ul>`
    : "";
  const sources = (lesson.sources || []).length
    ? `<div class="source-box"><strong>官方资料：</strong>${lesson.sources
        .map((source) => `<a href="${safeExternalUrl(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)}</a>`)
        .join("")}</div>`
    : "";

  lessonArticle.innerHTML = `
    <h1>${displayIndex + 1}. ${escapeHtml(lesson.title)}</h1>
    <h2>${escapeHtml(lesson.subtitle)}</h2>
    ${paragraphs}
    <h3>语法拆解</h3>
    <ul>${syntax}</ul>
    ${example}
    <div class="task-box">
      <span class="task-label">任务</span>
      <p>${inlineCode(lesson.task || "")}</p>
    </div>
    ${mistakes}
    ${sources}
  `;
}

function renderAnswerContent(lesson) {
  answerContent.innerHTML = `
    <p>${inlineCode((lesson.checks || [])[0] || "参考下面的写法完成当前任务。")}</p>
    <pre><code>${escapeHtml(lesson.answerCode || answerCode)}</code></pre>
    ${(lesson.checks || [])
      .slice(1)
      .map((check) => `<p>${inlineCode(check)}</p>`)
      .join("")}
  `;
}

function updateLineNumbers(textarea, lineNode) {
  if (!lineNode) return;
  const lines = Math.max(1, textarea.value.split("\n").length);
  lineNode.textContent = Array.from({ length: lines }, (_, index) => String(index + 1)).join("\n");
}

function syncLineScroll(textarea, lineNode) {
  if (!lineNode) return;
  lineNode.scrollTop = textarea.scrollTop;
}

function syncEditorChrome(textarea, lineNode) {
  updateLineNumbers(textarea, lineNode);
  syncLineScroll(textarea, lineNode);
}

function syncAnswerDrawerBounds() {
  if (!lessonColumn || !practiceColumn) return;

  const lessonRect = lessonColumn.getBoundingClientRect();
  const practiceRect = practiceColumn.getBoundingClientRect();
  const left = Math.max(12, document.querySelector(".study-grid").getBoundingClientRect().left);
  const safeRight = Math.min(lessonRect.right, practiceRect.left - 8);
  const right = Math.max(0, window.innerWidth - safeRight);

  document.documentElement.style.setProperty("--answer-drawer-left", `${left}px`);
  document.documentElement.style.setProperty("--answer-drawer-right", `${right}px`);
}

function getDraftForLesson(lesson) {
  return typeof lessonDrafts[lesson.id] === "string" ? lessonDrafts[lesson.id] : "";
}

function setDraftForLesson(lesson, code, immediate = false) {
  if (!lesson?.id) return;
  const value = String(code || "").slice(0, maxDraftLength);

  if (value) {
    lessonDrafts[lesson.id] = value;
  } else {
    delete lessonDrafts[lesson.id];
  }

  writeStoredDrafts(immediate);
  updateResetButtonState();
}

function saveCurrentDraft(immediate = false) {
  setDraftForLesson(getCurrentLesson(), codeEditor.value, immediate);
}

function hasSavedDrafts() {
  return Object.keys(lessonDrafts).length > 0;
}

function clearDrafts() {
  lessonDrafts = {};
  localStorage.removeItem(draftStorageKey);
  updateResetButtonState();
}

function setNextLessonAction(index) {
  const lessons = getLessonContents();
  const lesson = lessons[index];
  const canOpen = Boolean(lesson) && !isLessonLocked(index);

  nextLessonButton.hidden = !canOpen;
  nextLessonButton.disabled = !canOpen;
  nextLessonButton.dataset.lessonIndex = canOpen ? String(index) : "";
  nextLessonButton.setAttribute("aria-hidden", canOpen ? "false" : "true");

  if (canOpen) {
    nextLessonButton.setAttribute("aria-label", `进入第 ${index + 1} 关：${lesson.title}`);
    nextLessonButton.title = `进入第 ${index + 1} 关`;
  } else {
    nextLessonButton.removeAttribute("aria-label");
    nextLessonButton.title = "";
  }
}

function hideNextLessonAction() {
  setNextLessonAction(-1);
}

function loadLesson(index) {
  if (isLessonLocked(index)) return;
  if (hasLoadedLesson) saveCurrentDraft(true);

  currentLessonIndex = index;
  const lesson = getCurrentLesson();
  renderLevels();
  renderLessonContent(lesson, index);
  renderAnswerContent(lesson);
  const draft = getDraftForLesson(lesson);
  codeEditor.value = draft;
  stdinInput.value = "";
  syncEditorChrome(codeEditor, editorLines);
  consoleOutput.textContent = `Loaded: ${index + 1}. ${lesson.title}`;
  runMeta.textContent = draft ? "草稿已恢复" : "等待运行";
  runMeta.className = "run-meta";
  setAnswerDrawer(false);
  hideNextLessonAction();
  syncAnswerDrawerBounds();
  hasLoadedLesson = true;
}

function setProgress(nextCompletedLessons) {
  const completedCount = normalizeCompletedCount(nextCompletedLessons);
  const percent = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);
  progressText.textContent = `${completedCount}/${totalLessons} 关`;
  progressPercent.textContent = `${percent}%`;
  progressBar.style.width = `${percent}%`;
  updateResetButtonState(completedCount);
}

function updateResetButtonState(nextCompletedLessons = completedLessons) {
  const canReset = normalizeCompletedCount(nextCompletedLessons) > 0 || hasSavedDrafts();
  resetProgress.disabled = !canReset;
  resetProgress.setAttribute("aria-disabled", canReset ? "false" : "true");
}

function saveProgress(nextCompleted) {
  completedLessons = normalizeCompletedCount(nextCompleted);
  const completedLessonIds = getLessonContents()
    .slice(0, completedLessons)
    .map((lesson) => lesson.id);

  localStorage.setItem(
    progressStorageKey,
    JSON.stringify({
      completedLessons,
      completedLessonIds,
      updatedAt: new Date().toISOString()
    })
  );
  localStorage.removeItem(legacyProgressStorageKey);
  setProgress(completedLessons);
}

function setAnswerDrawer(open) {
  if (open) syncAnswerDrawerBounds();
  answerDrawer.classList.toggle("is-open", open);
  answerDrawer.setAttribute("aria-hidden", open ? "false" : "true");
  showAnswer.classList.toggle("is-active", open);
  showAnswer.setAttribute("aria-pressed", open ? "true" : "false");
  showAnswer.innerHTML = open
    ? '<span class="button-glyph">×</span> 隐藏答案'
    : '<span class="button-glyph">?</span> 查看答案';
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(themeStorageKey, theme);
  localStorage.removeItem(legacyThemeStorageKey);
  themeToggle.innerHTML = `<span class="button-glyph">${theme === "dark" ? "☀" : "☾"}</span>`;
}

function replaceSelection(textarea, value) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  textarea.value = `${textarea.value.slice(0, start)}${value}${textarea.value.slice(end)}`;
  textarea.selectionStart = start + value.length;
  textarea.selectionEnd = start + value.length;
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
}

function outdentSelection(textarea) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;
  const lineStart = value.lastIndexOf("\n", start - 1) + 1;
  const selected = value.slice(lineStart, end);
  const outdented = selected.replace(/^( {1,4}|\t)/gm, "");
  textarea.value = `${value.slice(0, lineStart)}${outdented}${value.slice(end)}`;
  textarea.selectionStart = lineStart;
  textarea.selectionEnd = lineStart + outdented.length;
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
}

function indentSelection(textarea) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  if (start === end) {
    replaceSelection(textarea, "    ");
    return;
  }

  const value = textarea.value;
  const lineStart = value.lastIndexOf("\n", start - 1) + 1;
  const selected = value.slice(lineStart, end);
  const indented = selected.replace(/^/gm, "    ");
  textarea.value = `${value.slice(0, lineStart)}${indented}${value.slice(end)}`;
  textarea.selectionStart = lineStart;
  textarea.selectionEnd = lineStart + indented.length;
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
}

function autoIndentLine(textarea) {
  const start = textarea.selectionStart;
  const value = textarea.value;
  const lineStart = value.lastIndexOf("\n", start - 1) + 1;
  const currentLine = value.slice(lineStart, start);
  const baseIndent = currentLine.match(/^\s*/)?.[0] || "";
  const extraIndent = currentLine.trimEnd().endsWith("{") ? "    " : "";
  replaceSelection(textarea, `\n${baseIndent}${extraIndent}`);
}

function bindEditorShortcuts(textarea, runAction) {
  textarea.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      if (event.shiftKey) {
        outdentSelection(textarea);
      } else {
        indentSelection(textarea);
      }
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      runAction();
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      autoIndentLine(textarea);
    }
  });
}

function bindEditorChrome(textarea, lineNode) {
  syncEditorChrome(textarea, lineNode);
  textarea.addEventListener("input", () => syncEditorChrome(textarea, lineNode));
  textarea.addEventListener("scroll", () => syncLineScroll(textarea, lineNode));
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
  const output = [];

  for (const part of splitJavaConcat(expression)) {
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

function runBrowserPreview(code) {
  const variables = buildPreviewVariables(code);
  const printPattern = /\b(?:System\.out\.println|IO\.println)\s*\(([\s\S]*?)\)\s*;/g;
  const outputLines = [];
  let match;

  while ((match = printPattern.exec(code)) !== null) {
    const output = evaluatePreviewExpression(match[1], variables);
    if (output !== null) outputLines.push(output);
  }

  return {
    status: outputLines.length > 0 ? "static-preview" : "static-preview-limited",
    stdout: outputLines.join("\n"),
    stderr:
      outputLines.length > 0
        ? "Static preview: cloud JDK unavailable."
        : 'Static preview: supports basic System.out.println("text").',
    durationMs: 0
  };
}

function renderRunResult(result, outputNode, metaNode) {
  const output = [result.stdout, result.stderr].filter(Boolean).join("\n");

  outputNode.textContent = output || "程序运行完成，但没有输出。";
  metaNode.textContent = `${result.status} · ${result.durationMs || 0}ms`;
  metaNode.className =
    result.status === "success"
      ? `${metaNode === runMeta ? "run-meta " : ""}status-success`
      : result.status === "learning-preview" ||
          result.status === "preview-limited" ||
          result.status === "static-preview" ||
          result.status === "static-preview-limited"
        ? `${metaNode === runMeta ? "run-meta " : ""}status-warn`
        : `${metaNode === runMeta ? "run-meta " : ""}status-error`;
}

async function runCode(sourceEditor = codeEditor, outputNode = consoleOutput, metaNode = runMeta, inputNode = stdinInput) {
  outputNode.textContent = "正在运行 Java 代码...";
  metaNode.textContent = "运行中";
  metaNode.className = metaNode === runMeta ? "run-meta" : "";

  const hasBackendRunner = ["localhost", "127.0.0.1"].includes(window.location.hostname);
  if (!hasBackendRunner) {
    renderRunResult(runBrowserPreview(sourceEditor.value), outputNode, metaNode);
    return;
  }

  try {
    const response = await fetch("api/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: sourceEditor.value, stdin: inputNode.value })
    });

    if (!response.ok) {
      renderRunResult(runBrowserPreview(sourceEditor.value), outputNode, metaNode);
      return;
    }

    const result = await response.json();
    renderRunResult(result, outputNode, metaNode);
  } catch (error) {
    renderRunResult(runBrowserPreview(sourceEditor.value), outputNode, metaNode);
  }
}

function validateSubmission(lesson, code) {
  const source = code.trim();
  const reference = `${lesson.title}\n${lesson.subtitle}\n${lesson.task}\n${lesson.answerCode || ""}`;

  if (!source) {
    return {
      ok: false,
      message: "No code submitted."
    };
  }

  if (source.length < 20) {
    return {
      ok: false,
      message: "Submission is too short."
    };
  }

  if (currentLessonIndex === 0) {
    const hasPrint = /\b(?:System\.out\.println|IO\.println)\s*\(/.test(source);
    const hasPrintableExpression = /(?:System\.out\.println|IO\.println)\s*\(\s*[^)]{1,200}\s*\)\s*;/.test(source);
    return hasPrint && hasPrintableExpression
      ? { ok: true }
      : {
          ok: false,
          message: "Expected a complete print statement."
        };
  }

  if (/\b(SELECT|INSERT|UPDATE|DELETE|CREATE\s+TABLE|ALTER\s+TABLE|DROP\s+TABLE|FROM|WHERE|JOIN)\b/i.test(reference)) {
    return /\b(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|FROM|WHERE|JOIN)\b/i.test(source)
      ? { ok: true }
      : { ok: false, message: "Expected SQL statement." };
  }

  if (/\b(git|docker|curl|mvn|gradle|systemctl|java -jar|FROM\s+.+|name:\s+)/i.test(reference)) {
    const toolKeywords = ["git", "docker", "curl", "mvn", "gradle", "systemctl", "java -jar", "FROM", "jobs:", "steps:"];
    const hasToolKeyword = toolKeywords.some((keyword) => source.toLowerCase().includes(keyword.toLowerCase()));
    return hasToolKeyword
      ? { ok: true }
      : { ok: false, message: "Expected command or config snippet." };
  }

  if (/(@(RestController|Controller|Service|Repository|SpringBootApplication|GetMapping|PostMapping)|Spring Boot|Controller|Service 分层|权限控制|文件上传)/.test(reference)) {
    return /(@\w+|\b(class|interface|record)\s+\w+)/.test(source)
      ? { ok: true }
      : { ok: false, message: "Expected Spring class or annotation." };
  }

  if (/\b(public\s+)?class\s+Main\b/.test(reference) || /\bmain\s*\(/.test(reference)) {
    const hasMainClass = /\bclass\s+Main\b/.test(source);
    const needsMainMethod = /\bmain\s*\(/.test(reference);
    const hasMainMethod = /\bpublic\s+static\s+void\s+main\s*\(\s*String\s*(?:\[\]\s*\w+|\w+\s*\[\])/.test(source);

    if (!hasMainClass) {
      return { ok: false, message: "Expected class Main." };
    }
    if (needsMainMethod && !hasMainMethod) {
      return { ok: false, message: "Expected public static void main." };
    }
  }

  return { ok: true };
}

function submitTask() {
  saveCurrentDraft(true);
  const lesson = getCurrentLesson();
  const validation = validateSubmission(lesson, codeEditor.value);

  if (validation.ok) {
    const previousCompleted = completedLessons;
    const nextCompleted = Math.max(completedLessons, currentLessonIndex + 1);
    const nextLesson = getLessonContents()[nextCompleted];
    const didUnlock = nextCompleted > previousCompleted;

    saveProgress(nextCompleted);
    renderLevels();

    const lines = [`Task passed: ${currentLessonIndex + 1}. ${lesson.title}`, `Progress: ${completedLessons}/${totalLessons}`];
    if (didUnlock && nextLesson) {
      lines.push(`Unlocked: ${nextCompleted + 1}. ${nextLesson.title}`);
    } else if (completedLessons >= totalLessons) {
      lines.push("All lessons completed.");
    }

    consoleOutput.textContent = lines.join("\n");
    runMeta.textContent = "task-passed";
    runMeta.className = "run-meta status-success";
    setNextLessonAction(currentLessonIndex + 1);
    return;
  }

  consoleOutput.textContent = validation.message;
  runMeta.textContent = "task-needs-work";
  runMeta.className = "run-meta status-warn";
  hideNextLessonAction();
}

function bindEvents() {
  levelList.addEventListener("click", (event) => {
    const item = event.target.closest(".level-item");
    if (!item) return;
    const lessonIndex = Number(item.dataset.lessonIndex || 0);
    if (item.disabled || isLessonLocked(lessonIndex)) return;
    loadLesson(lessonIndex);
  });
  document.querySelector("#runCode").addEventListener("click", () => runCode());
  codeEditor.addEventListener("input", saveCurrentDraft);
  document.querySelector("#focusCode").addEventListener("click", () => {
    saveCurrentDraft(true);
    focusEditor.value = codeEditor.value;
    focusStdinInput.value = stdinInput.value;
    syncEditorChrome(focusEditor, focusLines);
    focusOutput.textContent = consoleOutput.textContent || "";
    focusRunMeta.textContent = runMeta.textContent || "等待运行";
    focusRunMeta.className = runMeta.className.replace("run-meta", "").trim();
    focusModal.classList.add("is-open");
    focusModal.setAttribute("aria-hidden", "false");
    focusEditor.focus();
  });
  document.querySelector("#closeFocus").addEventListener("click", () => {
    codeEditor.value = focusEditor.value;
    stdinInput.value = focusStdinInput.value;
    syncEditorChrome(codeEditor, editorLines);
    saveCurrentDraft(true);
    consoleOutput.textContent = focusOutput.textContent;
    runMeta.textContent = focusRunMeta.textContent;
    runMeta.className = `run-meta ${focusRunMeta.className || ""}`.trim();
    focusModal.classList.remove("is-open");
    focusModal.setAttribute("aria-hidden", "true");
  });
  document.querySelector("#focusRun").addEventListener("click", () => {
    codeEditor.value = focusEditor.value;
    stdinInput.value = focusStdinInput.value;
    syncEditorChrome(codeEditor, editorLines);
    saveCurrentDraft(true);
    runCode(focusEditor, focusOutput, focusRunMeta, focusStdinInput);
  });
  bindEditorShortcuts(codeEditor, () => runCode());
  bindEditorShortcuts(focusEditor, () => {
    codeEditor.value = focusEditor.value;
    stdinInput.value = focusStdinInput.value;
    syncEditorChrome(codeEditor, editorLines);
    saveCurrentDraft(true);
    runCode(focusEditor, focusOutput, focusRunMeta, focusStdinInput);
  });
  bindEditorChrome(codeEditor, editorLines);
  bindEditorChrome(focusEditor, focusLines);
  focusModal.addEventListener("click", (event) => {
    if (event.target === focusModal) {
      document.querySelector("#closeFocus").click();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && focusModal.classList.contains("is-open")) {
      document.querySelector("#closeFocus").click();
    }
  });
  showAnswer.addEventListener("click", () => {
    setAnswerDrawer(!answerDrawer.classList.contains("is-open"));
  });
  closeAnswer.addEventListener("click", () => {
    setAnswerDrawer(false);
  });
  document.querySelector("#clearConsole").addEventListener("click", () => {
    consoleOutput.textContent = "";
    runMeta.textContent = "已清空";
    runMeta.className = "run-meta";
  });
  document.querySelector("#clearStdin").addEventListener("click", () => {
    stdinInput.value = "";
  });
  document.querySelector("#submitTask").addEventListener("click", submitTask);
  nextLessonButton.addEventListener("click", () => {
    const lessonIndex = Number(nextLessonButton.dataset.lessonIndex || -1);
    if (Number.isInteger(lessonIndex) && lessonIndex >= 0 && !isLessonLocked(lessonIndex)) {
      loadLesson(lessonIndex);
    }
  });
  resetProgress.addEventListener("click", () => {
    if ((completedLessons > 0 || hasSavedDrafts()) && !window.confirm("确认重置学习进度？")) return;

    localStorage.removeItem(progressStorageKey);
    localStorage.removeItem(legacyProgressStorageKey);
    clearDrafts();
    saveProgress(0);
    hasLoadedLesson = false;
    loadLesson(0);
    consoleOutput.textContent = `Progress reset.\nLoaded: 1. ${getCurrentLesson().title}`;
    runMeta.textContent = "已重置";
    runMeta.className = "run-meta";
  });
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(currentTheme === "dark" ? "light" : "dark");
    syncAnswerDrawerBounds();
  });
  window.addEventListener("resize", syncAnswerDrawerBounds);
}

function boot() {
  completedLessons = normalizeCompletedCount(completedLessons);
  setProgress(completedLessons);
  setTheme(readStoredTheme());
  loadLesson(0);
  bindEvents();
  syncAnswerDrawerBounds();
}

document.addEventListener("DOMContentLoaded", boot);
