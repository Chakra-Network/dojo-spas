import type { AppState } from "../types";
import { users } from "./users";
import { contacts } from "./contacts";
import { campaigns } from "./campaigns";
import { emailTemplates } from "./emails";
import { automationLog, dashboardMetrics } from "./analytics";

export const initialState: AppState = {
  activeView: "dashboard",
  users,
  contacts,
  campaigns,
  emailTemplates,
  automationLog,
  dashboard: dashboardMetrics,
};