export type Language =
  | "Spanish"
  | "English"
  | "French"
  | "Deutsche"
  | "Chinese";

export type StudyTarget = "Startup" | "Job" | "Learning" | "Others";

export type Schedule = "Mornings" | "Afternoon" | "Weekends" | "Nights" | "Any";

export type Role =
  | "FRONTEND"
  | "BACKEND"
  | "PM"
  | "DESIGNER"
  | "DEVOPS"
  | "FULLSTACK"
  | "MOBILE";

export type RoleNeeded = {
  role: Role;
  filled: number;
  total: number;
};
