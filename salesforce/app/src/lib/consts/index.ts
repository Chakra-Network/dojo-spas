import { GraduationCap, Settings } from "lucide-react";
import type { BannerCardType } from "../types";
import { HiSparkles } from "react-icons/hi2";

export const CARDS: BannerCardType[] = [
  {
    id: "contact",
    icon: {
      Icon: GraduationCap,
      iconColor: "text-white",
      bgColor: "bg-[#1B96FF]",
    },
    title: "Create your first contact",
    description:
      "Growing your sales starts with contacts. Let's walk through it.",
    hasExternalLink: false,
  },
  {
    id: "marketing",
    icon: {
      Icon: Settings,
      iconColor: "text-white",
      bgColor: "bg-[#396547]",
    },
    title: "Turn on marketing features",
    description:
      "Access powerful tools to reach new audiences and engage customers.",
    hasExternalLink: true,
  },
  {
    id: "ai",
    icon: {
      Icon: HiSparkles,
      iconColor: "text-gradient-to-br from-purple-500 to-blue-500",
    },
    title: "Visualize your data with AI",
    description:
      "Enable a preview of Generative Canvas and ask AI to pull together the information you're looking for.",
    hasExternalLink: true,
  },
];

export const PATH_PREFIX = "./dojos/salesforce";
