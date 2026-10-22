import {
  LayoutDashboard, BookOpen, Brain, Bot, Trophy, Users, Settings, Calendar, BarChart3, Shield, Wallet, FileText,
  GraduationCap, Building2, Crown, Gamepad2, Play, Compass, Star, Gem, User, Database, MessageSquare, Library,
} from "lucide-react";
import type { NavItem } from "./ui";

export const studentNav: NavItem[] = [
  { id: "student-dashboard", label: "Home", icon: LayoutDashboard },
  { id: "quiz-selection", label: "Quizzes", icon: Brain },
  { id: "library", label: "Library", icon: Library },
  { id: "ai-tutor", label: "AI Tutor", icon: Bot },
  { id: "leaderboard", label: "Ranks", icon: Trophy },
  { id: "planner", label: "Planner", icon: Calendar },
  { id: "community", label: "Community", icon: Users },
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: Settings },
];

export const staffNav = (role: "parent" | "teacher" | "admin" | "manager" | "finance" | "owner" | "content"): NavItem[] => {
  const map: Record<string, NavItem[]> = {
    parent: [
      { id: "parent-dashboard", label: "Overview", icon: LayoutDashboard },
      { id: "academic-insights", label: "Insights", icon: BarChart3 },
      { id: "learning-dna", label: "Learning DNA", icon: Brain },
      { id: "notifications", label: "Alerts", icon: FileText },
    ],
    teacher: [
      { id: "teacher-portal", label: "Classes", icon: GraduationCap },
      { id: "topic-coverage", label: "Coverage", icon: BookOpen },
      { id: "academic-insights", label: "Insights", icon: BarChart3 },
      { id: "content-admin", label: "Content", icon: FileText },
    ],
    admin: [
      { id: "admin-portal", label: "Admin", icon: Shield },
      { id: "content-admin", label: "Content", icon: FileText },
      { id: "migration-tools", label: "System", icon: Database },
      { id: "settings", label: "Settings", icon: Settings },
    ],
    manager: [
      { id: "manager-dashboard", label: "Branches", icon: Building2 },
      { id: "academic-insights", label: "Insights", icon: BarChart3 },
      { id: "finance-portal", label: "Finance", icon: Wallet },
    ],
    finance: [
      { id: "finance-portal", label: "Finance", icon: Wallet },
      { id: "manager-dashboard", label: "Branches", icon: Building2 },
    ],
    owner: [
      { id: "owner-control", label: "Control", icon: Crown },
      { id: "admin-portal", label: "Admin", icon: Shield },
      { id: "finance-portal", label: "Finance", icon: Wallet },
      { id: "migration-tools", label: "System", icon: Database },
    ],
    content: [
      { id: "content-admin", label: "Content", icon: FileText },
      { id: "topic-coverage", label: "Coverage", icon: BookOpen },
      { id: "migration-tools", label: "System", icon: Database },
    ],
  };
  return map[role] ?? [];
};

export const earlyNav: NavItem[] = [
  { id: "early-home", label: "Home", icon: Star },
  { id: "early-games", label: "Games", icon: Gamepad2 },
  { id: "early-videos", label: "Videos", icon: Play },
  { id: "early-discover", label: "Discover", icon: Compass },
  { id: "early-collection", label: "Stickers", icon: Gem },
  { id: "early-profile", label: "Me", icon: User },
];
