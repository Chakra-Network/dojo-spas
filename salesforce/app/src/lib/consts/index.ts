import { GraduationCap, Settings } from "lucide-react";
import type {
  BannerCardType,
  GuidanceContent,
  OpportunityStage,
} from "../types";
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

export const GUIDANCE_CONTENT: Record<
  Exclude<OpportunityStage, "Closed Lost">,
  GuidanceContent
> = {
  Qualify: {
    title: "Determine if the opportunity is worth pursuing.",
    bullets: [
      "What problems do they want to solve and what are they hoping to improve?",
      "Why are they looking now and where are they in the buying cycle?",
      "What's their budget?",
      "What other solutions are they considering?",
      "Can we win this opportunity?",
    ],
    footer:
      "Identify and add the key decision makers and other information that you gather to the opportunity.",
  },
  "Meet & Present": {
    title:
      "Meet with the key stakeholders, present solutions, and quantify return on investment.",
    bullets: [
      "Are the right stakeholders involved?",
      "Are you personalizing the value proposition to your audience?",
      "Why is our solution the best fit for the customer?",
      "Does the customer feel confident that their needs are being met?",
    ],
    footer:
      "Demonstrate the value and benefits of our solutions, and determine the right solution to propose.",
  },
  Propose: {
    title: "Make the offer.",
    bullets: [
      "Does the quote cover the complete solution discussed with the customer?",
      "Have you presented how our solution meets the customer's needs?",
    ],
    footer:
      "Send detailed price information and prepare updated quotes if changes are needed.",
  },
  Negotiate: {
    title: "Negotiate value and resolve objections.",
    bullets: [
      "Have you answered all outstanding questions?",
      "Have you confirmed all key decision makers are on board?",
      "Do you need to offer a discount or other pricing incentive?",
    ],
    footer: "Prepare a negotiation strategy and work to close the deal.",
  },
  "Closed Won": {
    title: "Congratulations on the win!",
    bullets: [
      "What contributed to the success of this deal?",
      "Are there any lessons learned from this win?",
      "What are the next steps for this customer?",
    ],
    footer:
      "Note your successes and apply them to your sales process for future wins.",
  },
};
