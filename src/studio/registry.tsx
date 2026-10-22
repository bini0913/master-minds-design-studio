import type { ComponentType } from "react";
import * as E from "./pages/entry";
import * as L from "./pages/learn";
import * as S from "./pages/social";
import * as A from "./pages/account";
import * as R from "./pages/roles";
import * as K from "./pages/early";
import * as Y from "./pages/system";
import * as P from "./pages/step2";

export type PageDef = { id: string; name: string; category: string; C: ComponentType };

const definitions: [string, string, string, ComponentType][] = [
  ["landing", "Welcome / Landing", "Onboarding", E.Landing], ["login", "Login", "Onboarding", E.Login], ["signup", "Sign Up", "Onboarding", E.SignUp], ["academic-setup", "Academic Setup", "Onboarding", E.AcademicSetup],
  ["student-dashboard", "Student Dashboard", "Learning", L.StudentDashboard],
  ["tier-kg-grade4", "KG–Grade 4 Dashboard", "Student Tiers", P.KGGrade4Dashboard], ["tier-grade5-8", "Grade 5–8 Dashboard", "Student Tiers", P.Grade58Dashboard], ["tier-grade9-12", "Grade 9–12 Dashboard", "Student Tiers", P.Grade912Dashboard],
  ["quiz-setup", "Quiz Setup & Filters", "Learning", P.QuizSetup], ["study-mode", "Study Mode & Video Call", "Learning", P.StudyMode], ["book-analysis-journey", "Book Analysis Journey", "Learning", P.BookAnalysisJourney], ["academic-dashboard", "Academic Dashboard", "Learning", L.AcademicDashboard], ["quiz-selection", "Quiz Selection", "Learning", L.QuizSelection], ["quiz-taking", "Quiz Taking", "Learning", L.QuizTaking], ["library", "Digital Library", "Learning", L.Library], ["ai-tutor", "AI Tutor", "Learning", L.AITutor], ["planner", "Study Planner", "Learning", L.Planner], ["revision", "Revision Mode", "Learning", L.Revision], ["flashcards", "Flashcards", "Learning", L.Flashcards], ["exam-mode", "Exam Mode", "Learning", L.ExamMode],
  ["multiplayer-lobby", "Multiplayer Lobby", "Compete & Social", S.MultiplayerLobby], ["tournaments", "Tournaments", "Compete & Social", S.Tournaments], ["leaderboard", "Leaderboard", "Compete & Social", S.Leaderboard], ["community", "Community Feed", "Compete & Social", S.Community], ["friends", "Friends", "Compete & Social", S.Friends], ["chat", "Chat", "Compete & Social", S.Chat], ["notifications", "Notifications", "Compete & Social", S.Notifications],
  ["profile", "Student Profile", "Account", A.Profile], ["avatar-creator", "Avatar Creator", "Account", A.AvatarCreator], ["rewards-store", "Rewards Store", "Account", A.RewardsStore], ["settings", "Settings", "Account", A.SettingsPage],
  ["parent-dashboard", "Parent Dashboard", "Portals", R.ParentDashboard], ["manager-control-center", "Manager Control Center", "Portals", P.ManagerControlCenter], ["teacher-portal", "Teacher Portal", "Portals", R.TeacherPortal], ["admin-portal", "Admin Portal", "Portals", R.AdminPortal], ["manager-dashboard", "Manager Dashboard", "Portals", R.ManagerDashboard], ["finance-portal", "Finance Portal", "Portals", R.FinancePortal], ["owner-control", "Owner Control Center", "Portals", R.OwnerControl],
  ["academic-insights", "Academic Insights", "Insights", R.AcademicInsights], ["learning-dna", "Learning DNA", "Insights", R.LearningDNA], ["topic-coverage", "Topic Coverage", "Insights", R.TopicCoverage],
  ["early-home", "Early Learner Home", "Early Learner", K.EarlyHome], ["early-explore", "Early Explore", "Early Learner", P.EarlyExplore], ["early-games", "Early Games", "Early Learner", K.EarlyGames], ["early-quiz", "Early Quiz", "Early Learner", K.EarlyQuiz], ["early-videos", "Early Videos", "Early Learner", K.EarlyVideos], ["early-discover", "Early Discover", "Early Learner", K.EarlyDiscover], ["early-progress", "Early Progress", "Early Learner", K.EarlyProgress], ["early-collection", "Early Collection", "Early Learner", K.EarlyCollection], ["early-profile", "Early Profile", "Early Learner", K.EarlyProfile], ["early-leaderboard", "Early Leaderboard", "Early Learner", K.EarlyLeaderboard],
  ["content-admin", "Content Admin", "Operations", R.ContentAdmin], ["migration-tools", "Migration / System Tools", "Operations", R.MigrationTools],
  ["loading", "Loading", "System States", Y.Loading], ["empty", "Empty State", "System States", Y.EmptyState], ["error", "Error", "System States", Y.ErrorPage], ["access-denied", "Access Denied", "System States", Y.AccessDenied],
];

export const pages: PageDef[] = definitions.map(([id, name, category, C]) => ({ id, name, category, C }));

export const categories = [...new Set(pages.map((p) => p.category))];
