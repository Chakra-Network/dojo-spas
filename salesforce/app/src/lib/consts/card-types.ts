import { IoIosStar } from "react-icons/io";
import { FaCrown } from "react-icons/fa";
import { BiSolidIdCard } from "react-icons/bi";
import { TbBriefcase2Filled } from "react-icons/tb";
import type { JSX } from "react";
import {
  EasyLeadsWidget,
  EasyOpportunitiesWidget,
  EasyContactsWidget,
  EasyRecentRecordsWidget,
  EasyCasesWidget,
  EasyTodosWidget,
  EasyRecentActivityWidget,
  EasyMyAverageHandlingTimeWidget,
  EasyAverageHandlingTimeWidget,
  EasyRecommendedActionsWidget,
  EasyMyOpenCasesWidget,
} from "@/components/resources/svgs";

export interface CardTypeDefinition {
  id: string;
  name: string;
  description: string;
  icon: JSX.ElementType;
  iconBgColor: string;
  category: string[];
  enabled: boolean;
  hasViewTable: boolean;
  previewComponent: JSX.ElementType;
}

export const CARD_TYPES: Record<string, CardTypeDefinition> = {
  leads: {
    id: "leads",
    name: "Leads",
    description:
      "Track the status of leads and filter records by new, open, unread, and more.",
    icon: IoIosStar,
    iconBgColor: "bg-blue-500",
    category: ["Sales", "Marketing"],
    enabled: true,
    hasViewTable: true,
    previewComponent: EasyLeadsWidget,
  },
  opportunities: {
    id: "opportunities",
    name: "Opportunities",
    description:
      "Track the status of opportunities and filter by predicted close date, recently won, and more.",
    icon: FaCrown,
    iconBgColor: "bg-orange-500",
    category: ["Sales"],
    enabled: true,
    hasViewTable: true,
    previewComponent: EasyOpportunitiesWidget,
  },
  contacts: {
    id: "contacts",
    name: "Contacts",
    description: "View contacts and filter by all, yours, or new this week.",
    icon: BiSolidIdCard,
    iconBgColor: "bg-purple-500",
    category: ["General"],
    enabled: true,
    hasViewTable: false,
    previewComponent: EasyContactsWidget,
  },
  "to-do-list": {
    id: "to-do-list",
    name: "To-Do List",
    description:
      "See an overview of tasks. Filter by your tasks, delegated tasks, and due dates.",
    icon: BiSolidIdCard,
    iconBgColor: "bg-gray-400",
    category: ["General"],
    enabled: false,
    hasViewTable: false,
    previewComponent: EasyTodosWidget,
  },
  "recent-activity": {
    id: "recent-activity",
    name: "Recent Activity",
    description: "Stay informed about updates related to you.",
    icon: BiSolidIdCard,
    iconBgColor: "bg-gray-400",
    category: ["General"],
    enabled: false,
    hasViewTable: false,
    previewComponent: EasyRecentActivityWidget,
  },
  "recommended-sales-actions": {
    id: "recommended-sales-actions",
    name: "Recommended Sales Actions",
    description: "Speed up your workflow by completing suggested actions.",
    icon: BiSolidIdCard,
    iconBgColor: "bg-gray-400",
    category: ["Sales"],
    enabled: false,
    hasViewTable: false,
    previewComponent: EasyRecommendedActionsWidget,
  },
  "recent-records": {
    id: "recent-records",
    name: "Recent Records",
    description:
      "Get quick access to records you've recently viewed or interacted with.",
    icon: BiSolidIdCard,
    iconBgColor: "bg-blue-500",
    category: ["General"],
    enabled: true,
    hasViewTable: false,
    previewComponent: EasyRecentRecordsWidget,
  },
  cases: {
    id: "cases",
    name: "Cases",
    description:
      "Track customer service case volume and filter by new cases, open cases, and handling time.",
    icon: TbBriefcase2Filled,
    iconBgColor: "bg-pink-500",
    category: ["Service"],
    enabled: true,
    hasViewTable: false,
    previewComponent: EasyCasesWidget,
  },
  "my-open-cases": {
    id: "my-open-cases",
    name: "My Open Cases",
    description:
      "Monitor the average age (in days) for all of your open cases.",
    icon: TbBriefcase2Filled,
    iconBgColor: "bg-pink-500",
    category: ["Service"],
    enabled: false,
    hasViewTable: false,
    previewComponent: EasyMyOpenCasesWidget,
  },
  "my-average-handling-time": {
    id: "my-average-handling-time",
    name: "My Average Handling Time",
    description:
      "View how long it takes you on average (in hours) to resolve a case.",
    icon: TbBriefcase2Filled,
    iconBgColor: "bg-pink-500",
    category: ["Service"],
    enabled: false,
    hasViewTable: false,
    previewComponent: EasyMyAverageHandlingTimeWidget,
  },
  "overall-average-handling-time": {
    id: "overall-average-handling-time",
    name: "Overall Average Handling Time",
    description:
      "View how long it takes on average (in hours) for your team to resolve a case.",
    icon: TbBriefcase2Filled,
    iconBgColor: "bg-pink-500",
    category: ["Service"],
    enabled: false,
    hasViewTable: false,
    previewComponent: EasyAverageHandlingTimeWidget,
  },
};

export const DEFAULT_CARD_SLOTS = [
  "leads",
  "opportunities",
  "contacts",
  "recent-records",
  "cases",
  "make-it-your-home",
];
