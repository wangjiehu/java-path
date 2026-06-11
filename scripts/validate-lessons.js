import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const outlineSource = fs.readFileSync(path.join(publicDir, "course-outline.js"), "utf8");
const groupsStart = outlineSource.indexOf("window.COURSE_GROUPS = ");
const groupsEnd = outlineSource.lastIndexOf(";");

if (groupsStart === -1 || groupsEnd === -1) {
  throw new Error("Could not read COURSE_GROUPS from course-outline.js.");
}

const expectedGroups = vm.runInNewContext(
  outlineSource.slice(groupsStart + "window.COURSE_GROUPS = ".length, groupsEnd).trim()
);
const expectedLessonsByLevel = expectedGroups.map((group) => group.lessons.map((lesson) => lesson.title));
const requiredFields = [
  "id",
  "title",
  "subtitle",
  "intro",
  "syntax",
  "exampleCode",
  "task",
  "starterCode",
  "answerCode",
  "checks",
  "commonMistakes",
  "sources"
];
const officialSourceHosts = [
  "code.visualstudio.com",
  "commons.apache.org",
  "curl.se",
  "dev.java",
  "dev.mysql.com",
  "docs.docker.com",
  "docs.github.com",
  "docs.gradle.org",
  "docs.junit.org",
  "docs.oracle.com",
  "docs.spring.io",
  "git-scm.com",
  "github.com",
  "google.github.io",
  "httpie.io",
  "jakarta.ee",
  "junit.org",
  "learning.postman.com",
  "man7.org",
  "maven.apache.org",
  "openjdk.org",
  "oracle.com",
  "postgresql.org",
  "spec.openapis.org",
  "spring.io",
  "springdoc.org",
  "swagger.io"
];

function normalizeTitle(title) {
  return title.replace(/\s*[（(].*?[）)]/g, "").trim();
}

const files = fs
  .readdirSync(publicDir)
  .filter((file) => /^lesson-content-level\d+\.js$/.test(file))
  .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));

if (files.length === 0) {
  throw new Error("No lesson content files found.");
}

const context = { window: {} };
vm.createContext(context);

for (const file of files) {
  const fullPath = path.join(publicDir, file);
  vm.runInContext(fs.readFileSync(fullPath, "utf8"), context, { filename: file });
}

let total = 0;
const seenIds = new Set();
for (const file of files) {
  const level = Number(file.match(/\d+/)[0]);
  const key = `LESSON_CONTENT_LEVEL${level}`;
  const lessons = context.window[key];
  const expectedTitles = expectedLessonsByLevel[level - 1] || [];

  if (!Array.isArray(lessons)) {
    throw new Error(`${key} is not an array.`);
  }

  if (lessons.length !== expectedTitles.length) {
    throw new Error(`${key} has ${lessons.length} lessons, expected ${expectedTitles.length}.`);
  }

  lessons.forEach((lesson, index) => {
    const missing = requiredFields.filter((field) => !(field in lesson));
    if (missing.length > 0) {
      throw new Error(`${key}[${index}] missing fields: ${missing.join(", ")}`);
    }

    const normalizedLessonTitle = normalizeTitle(lesson.title);
    const normalizedExpectedTitle = normalizeTitle(expectedTitles[index]);
    const titleMatches =
      normalizedLessonTitle === normalizedExpectedTitle ||
      expectedTitles[index].includes(lesson.title) ||
      lesson.title.includes(expectedTitles[index]);

    if (!titleMatches) {
      throw new Error(`${key}[${index}] title "${lesson.title}" does not match "${expectedTitles[index]}".`);
    }

    if (seenIds.has(lesson.id)) {
      throw new Error(`Duplicate lesson id: ${lesson.id}`);
    }
    seenIds.add(lesson.id);

    for (const field of ["intro", "syntax", "checks", "commonMistakes", "sources"]) {
      if (!Array.isArray(lesson[field])) {
        throw new Error(`${key}[${index}].${field} must be an array.`);
      }

      if (lesson[field].length === 0) {
        throw new Error(`${key}[${index}].${field} must not be empty.`);
      }
    }

    if (lesson.intro.join("").length < 120) {
      throw new Error(`${key}[${index}].intro is too short.`);
    }

    if (lesson.syntax.length < 5 || lesson.checks.length < 4 || lesson.commonMistakes.length < 4) {
      throw new Error(`${key}[${index}] needs richer syntax/checks/commonMistakes.`);
    }

    if (!String(lesson.exampleCode || "").trim() || !String(lesson.answerCode || "").trim()) {
      throw new Error(`${key}[${index}] needs exampleCode and answerCode.`);
    }

    lesson.sources.forEach((source, sourceIndex) => {
      if (!source.title || !source.url) {
        throw new Error(`${key}[${index}].sources[${sourceIndex}] needs title and url.`);
      }

      const url = new URL(source.url);
      const host = url.hostname.replace(/^www\./, "");
      const isOfficial = officialSourceHosts.some((domain) => host === domain || host.endsWith(`.${domain}`));

      if (url.protocol !== "https:") {
        throw new Error(`${key}[${index}].sources[${sourceIndex}] must use https.`);
      }
      if (!isOfficial) {
        throw new Error(`${key}[${index}].sources[${sourceIndex}] is not on the official source host allowlist: ${host}`);
      }
    });
  });

  total += lessons.length;
  console.log(`${key}: ${lessons.length} lessons`);
}

const expectedTotal = expectedLessonsByLevel.flat().length;
if (total !== expectedTotal) {
  throw new Error(`Total authored lessons ${total}, expected ${expectedTotal}.`);
}

console.log(`Total authored lessons: ${total}`);
