import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// 테스트가 끝날 때마다 DOM 정리
afterEach(() => {
  cleanup();
});
