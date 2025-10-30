import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
// @ts-ignore — Storybook 타입 정의 경고만 무시
import { storybookTest } from "@storybook/addon-vitest";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    storybookTest({
      configDir: path.join(dirname, ".storybook"),
    }),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [".storybook/vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
  },
});
