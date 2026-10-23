import { describe, expect, it } from "vitest";
import { validateBookFile } from "@/studio/rules";
describe("Library prototype file limits", () => {
 it("accepts exactly 50 MB and rejects larger files", () => {
  expect(validateBookFile(50 * 1024 * 1024, "sample.pdf")).toBe("");
  expect(validateBookFile(50 * 1024 * 1024 + 1, "sample.pdf")).not.toBe("");
 });
});
