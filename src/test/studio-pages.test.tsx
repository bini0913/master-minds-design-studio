import { describe, expect, it } from "vitest";
import { pages } from "@/studio/registry";
import { earlyNav, staffNav, studentNav } from "@/studio/navs";

const required = ["landing", "login", "signup", "academic-setup", "student-dashboard", "academic-dashboard", "quiz-selection", "quiz-taking", "library", "ai-tutor", "planner", "revision", "flashcards", "exam-mode", "multiplayer-lobby", "tournaments", "leaderboard", "community", "friends", "chat", "notifications", "profile", "avatar-creator", "rewards-store", "settings", "parent-dashboard", "teacher-portal", "admin-portal", "manager-dashboard", "finance-portal", "owner-control", "academic-insights", "learning-dna", "topic-coverage", "early-home", "early-games", "early-quiz", "early-videos", "early-discover", "early-progress", "early-collection", "early-profile", "early-leaderboard", "content-admin", "migration-tools", "loading", "empty", "error", "access-denied"];

describe("Standalone studio page coverage", () => {
  it.each(required)("registers the requested %s page exactly once", (id) => {
    const matches = pages.filter((page) => page.id === id);
    expect(matches).toHaveLength(1);
    expect(typeof matches[0].C).toBe("function");
  });

  it("uses an individual implementation for every requested screen", () => {
    expect(new Set(pages.map((page) => page.C)).size).toBe(49);
  });

  it("keeps all mockup navigation destinations selectable", () => {
    const roles = ["parent", "teacher", "admin", "manager", "finance", "owner", "content"] as const;
    const nav = [...studentNav, ...earlyNav, ...roles.flatMap(staffNav)];
    expect(nav.filter((item) => !pages.some((page) => page.id === item.id))).toEqual([]);
  });
});