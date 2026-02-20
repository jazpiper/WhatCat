#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const BASE_URL = process.env.THEME_QA_BASE_URL ?? "http://localhost:3001";
const OUTPUT_DIR = path.join(process.cwd(), "tmp", "theme-qa");
const PAGES = [
  { path: "/", name: "home" },
  { path: "/breeds", name: "breeds" },
  { path: "/daily-quiz", name: "daily-quiz" },
  { path: "/compare", name: "compare" },
  { path: "/nyongmatch", name: "nyongmatch" },
  { path: "/result", name: "result" },
];
const THEME_ORDER = ["light", "dark"];
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

async function loadPlaywright() {
  try {
    return await import("playwright");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[theme-qa] playwright가 없습니다.");
    console.error("[theme-qa] 설치 후 다시 실행하세요: npm i -D playwright");
    console.error("[theme-qa] 필요 브라우저 설치: npx playwright install chromium");
    console.error(`[theme-qa] 원인: ${message}`);
    process.exit(2);
  }
}

async function ensureOutputDir() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
}

async function setTheme(page, mode) {
  await page.addInitScript(
    (theme) => {
      if (theme === "system") {
        localStorage.removeItem("whatcat-theme");
      } else {
        localStorage.setItem("whatcat-theme", theme);
      }
    },
    mode
  );

  await page.evaluate(({ mode }) => {
    if (mode === "system") {
      localStorage.removeItem("whatcat-theme");
    } else {
      localStorage.setItem("whatcat-theme", mode);
    }
  }, mode);
}

async function capture(playwright) {
  const browser = await playwright.chromium.launch({ headless: true });
  try {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
      });

      const page = await context.newPage();
      for (const theme of THEME_ORDER) {
        for (const entry of PAGES) {
          const url = new URL(entry.path, BASE_URL).toString();

          await setTheme(page, theme);
          await page.goto(url, { waitUntil: "networkidle" });
          await page.waitForTimeout(600);

          const tokenState = await page.evaluate(() => {
            const style = getComputedStyle(document.documentElement);
            return {
              hasDarkClass: document.documentElement.classList.contains("dark"),
              bgPage: style.getPropertyValue("--bg-page").trim(),
              textPrimary: style.getPropertyValue("--text-primary").trim(),
            };
          });
          console.log(
            `[theme-qa] ${entry.name} ${viewport.name} ${theme}:`,
            `${tokenState.hasDarkClass ? "dark" : "light"} /`,
            `bg=${tokenState.bgPage || "n/a"}`,
            `text=${tokenState.textPrimary || "n/a"}`
          );

          const filename = `${entry.name}-${theme}-${viewport.name}.png`;
          const filePath = path.join(OUTPUT_DIR, filename);
          await page.screenshot({
            path: filePath,
            fullPage: true,
          });
          console.log(`[theme-qa] saved: ${filePath}`);
        }
      }

      await context.close();
    }
  } finally {
    await browser.close();
  }
}

async function main() {
  const playwright = await loadPlaywright();
  await ensureOutputDir();
  await capture(playwright);
  console.log(`[theme-qa] completed. output=${OUTPUT_DIR}`);
}

main().catch((error) => {
  console.error("[theme-qa] failed:", error);
  process.exit(1);
});
