import { expect, test } from "@playwright/test";

const passingHelloWorld =
  'public class Main {\n' +
  '    public static void main(String[] args) {\n' +
  '        System.out.println("Smoke OK");\n' +
  "    }\n" +
  "}";

const scannerEcho =
  "import java.util.Scanner;\n" +
  "public class Main {\n" +
  "    public static void main(String[] args) {\n" +
  "        Scanner scanner = new Scanner(System.in);\n" +
  "        String name = scanner.nextLine();\n" +
  "        int age = scanner.nextInt();\n" +
  '        System.out.println(name + ":" + age);\n' +
  "    }\n" +
  "}";

async function hasHorizontalOverflow(page) {
  return page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test("locks lessons, unlocks the next lesson, and protects reset", async ({ page }) => {
  await expect(page).toHaveTitle("java-path");
  await expect(page.locator(".brand strong")).toHaveText("java-path");
  await expect(page.locator(".level-item")).toHaveCount(104);
  await expect(page.locator(".level-item:disabled")).toHaveCount(103);
  await expect(page.locator("#resetProgress")).toBeDisabled();

  await expect(page.locator(".level-item").nth(2)).toHaveAttribute("title", "完成前一关后解锁");
  await expect(page.locator(".level-item").nth(2)).toHaveAttribute("aria-label", /完成前一关后解锁/);

  await page.locator("#codeEditor").fill(passingHelloWorld);
  await page.locator("#submitTask").click();

  await expect(page.locator("#consoleOutput")).toContainText("Task passed: 1.");
  await expect(page.locator("#consoleOutput")).toContainText("Unlocked: 2.");
  await expect(page.locator("#progressText")).toHaveText("1/104 关");
  await expect(page.locator(".level-item:disabled")).toHaveCount(102);
  await expect(page.locator(".level-item").nth(1)).toBeEnabled();
  await expect(page.locator("#resetProgress")).toBeEnabled();
  await expect(page.locator("#nextLesson")).toBeVisible();
  await expect(page.locator("#nextLesson")).toBeEnabled();

  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe("确认重置学习进度？");
    await dialog.dismiss();
  });
  await page.locator("#resetProgress").click();
  await expect(page.locator("#progressText")).toHaveText("1/104 关");

  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe("确认重置学习进度？");
    await dialog.accept();
  });
  await page.locator("#resetProgress").click();
  await expect(page.locator("#progressText")).toHaveText("0/104 关");
  await expect(page.locator(".level-item:disabled")).toHaveCount(103);
  await expect(page.locator("#resetProgress")).toBeDisabled();
});

test("saves lesson drafts and opens the next unlocked lesson", async ({ page }) => {
  const secondLessonDraft =
    'public class Main {\n' +
    '    public static void main(String[] args) {\n' +
    '        System.out.println("Lesson two draft");\n' +
    "    }\n" +
    "}";

  await page.locator("#codeEditor").fill(passingHelloWorld);
  await page.locator("#submitTask").click();
  await expect(page.locator("#nextLesson")).toBeVisible();

  await page.locator("#nextLesson").click();
  await expect(page.locator("#consoleOutput")).toContainText("Loaded: 2.");
  await expect(page.locator("#nextLesson")).toBeHidden();
  await expect(page.locator("#codeEditor")).toHaveValue("");

  await page.locator("#codeEditor").fill(secondLessonDraft);
  await page.locator(".level-item").nth(0).click();
  await expect(page.locator("#codeEditor")).toHaveValue(passingHelloWorld);

  await page.locator(".level-item").nth(1).click();
  await expect(page.locator("#codeEditor")).toHaveValue(secondLessonDraft);

  const draftIds = await page.evaluate(() => Object.keys(JSON.parse(localStorage.getItem("java-path-drafts-v1")).drafts));
  expect(draftIds).toEqual(["level1-1-hello-java", "level1-2-how-java-runs"]);

  page.once("dialog", async (dialog) => {
    await dialog.accept();
  });
  await page.locator("#resetProgress").click();
  await expect(page.locator("#codeEditor")).toHaveValue("");
  await expect(page.locator("#progressText")).toHaveText("0/104 关");
  await expect(page.locator("#nextLesson")).toBeHidden();
  const draftsAfterReset = await page.evaluate(() => localStorage.getItem("java-path-drafts-v1"));
  expect(draftsAfterReset).toBeNull();
});

test("enables reset when only a draft exists", async ({ page }) => {
  await expect(page.locator("#progressText")).toHaveText("0/104 关");
  await expect(page.locator("#resetProgress")).toBeDisabled();

  await page.locator("#codeEditor").fill(passingHelloWorld);
  await expect(page.locator("#resetProgress")).toBeEnabled();

  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe("确认重置学习进度？");
    await dialog.accept();
  });
  await page.locator("#resetProgress").click();

  await expect(page.locator("#codeEditor")).toHaveValue("");
  await expect(page.locator("#progressText")).toHaveText("0/104 关");
  await expect(page.locator("#resetProgress")).toBeDisabled();
  const draftsAfterReset = await page.evaluate(() => localStorage.getItem("java-path-drafts-v1"));
  expect(draftsAfterReset).toBeNull();
});

test("sends standard input to the runner without storing it", async ({ page }) => {
  const runRequests = [];
  await page.route("**/api/run", async (route) => {
    const payload = route.request().postDataJSON();
    runRequests.push(payload);
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        status: "success",
        stdout: `stdin:${payload.stdin}`,
        stderr: "",
        durationMs: 7
      })
    });
  });

  await page.locator("#codeEditor").fill(scannerEcho);
  await page.locator("#stdinInput").fill("Alice\n18");
  await page.locator("#runCode").click();

  await expect(page.locator("#consoleOutput")).toContainText("stdin:Alice\n18");
  expect(runRequests.at(-1).stdin).toBe("Alice\n18");
  await expect(page.locator("#resetProgress")).toBeEnabled();
  const storedInputBeforeReload = await page.evaluate(() => localStorage.getItem("java-path-stdin-v1"));
  expect(storedInputBeforeReload).toBeNull();

  await page.locator("#focusCode").click();
  await expect(page.locator("#focusStdinInput")).toHaveValue("Alice\n18");

  await page.locator("#focusStdinInput").fill("Bob\n19");
  await page.locator("#focusRun").click();
  await expect(page.locator("#focusOutput")).toContainText("stdin:Bob\n19");
  expect(runRequests.at(-1).stdin).toBe("Bob\n19");

  await page.locator("#closeFocus").click();
  await expect(page.locator("#stdinInput")).toHaveValue("Bob\n19");

  await page.reload();
  await expect(page.locator("#stdinInput")).toHaveValue("");
  const storedInputAfterReload = await page.evaluate(() => localStorage.getItem("java-path-stdin-v1"));
  expect(storedInputAfterReload).toBeNull();
});

test("standard input alone does not enable reset", async ({ page }) => {
  await expect(page.locator("#resetProgress")).toBeDisabled();
  await page.locator("#stdinInput").fill("Only runtime input");
  await expect(page.locator("#resetProgress")).toBeDisabled();

  await page.locator("#clearStdin").click();
  await expect(page.locator("#stdinInput")).toHaveValue("");
  await expect(page.locator("#resetProgress")).toBeDisabled();
});

test("restores progress by completed lesson ids, not by stale counts", async ({ page }) => {
  await page.evaluate(() => {
    localStorage.setItem(
      "java-path-progress-v1",
      JSON.stringify({
        completedLessons: 8,
        completedLessonIds: ["level1-1-hello-java"],
        updatedAt: new Date().toISOString()
      })
    );
  });
  await page.reload();

  await expect(page.locator("#progressText")).toHaveText("1/104 关");
  await expect(page.locator(".level-item:disabled")).toHaveCount(102);
  await expect(page.locator(".level-item").nth(1)).toBeEnabled();
  await expect(page.locator(".level-item").nth(2)).toBeDisabled();
});

test("normalizes corrupt stored progress before rendering", async ({ page }) => {
  await page.evaluate(() => {
    localStorage.setItem(
      "java-path-progress-v1",
      JSON.stringify({
        completedLessons: 2.8,
        updatedAt: new Date().toISOString()
      })
    );
  });
  await page.reload();

  await expect(page.locator("#progressText")).toHaveText("2/104 关");
  await expect(page.locator(".level-item:disabled")).toHaveCount(101);
  await expect(page.locator(".level-item").nth(2)).toBeEnabled();
  await expect(page.locator(".level-item").nth(3)).toBeDisabled();
});

test("core UI panels open without layout overflow", async ({ page, browserName }) => {
  await expect.poll(() => hasHorizontalOverflow(page)).toBe(false);

  await page.locator("#showAnswer").click();
  await expect(page.locator("#answerDrawer")).toHaveClass(/is-open/);
  await expect.poll(() => hasHorizontalOverflow(page)).toBe(false);
  await page.locator("#closeAnswer").click();
  await expect(page.locator("#answerDrawer")).not.toHaveClass(/is-open/);

  await page.locator("#focusCode").click();
  await expect(page.locator("#focusModal")).toHaveClass(/is-open/);
  await expect.poll(() => hasHorizontalOverflow(page)).toBe(false);

  await page.locator("#closeFocus").click();
  await expect(page.locator("#focusModal")).not.toHaveClass(/is-open/);

  if (browserName === "chromium") {
    await page.locator("#codeEditor").fill(passingHelloWorld);
    await page.locator("#runCode").click();
    await expect(page.locator("#consoleOutput")).toContainText("Smoke OK");
  }
});
