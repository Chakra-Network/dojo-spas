import type { Post } from "../types";
import { sameenJubayed, dimasPutra } from "./users";
import { chakraCompany, unswEngSoc } from "./companies";

export const feedPosts: Post[] = [
  {
    id: "3",
    author: dimasPutra,
    authorType: "user",
    content: `What started as learning turned into an opportunity to lead.

Grateful to be leading an incredible team Sebastian Torres, Dzaka Athif, and the rest of the forward deployed engineering team at Chakra. Every day brings new challenges and opportunities to grow together.

Looking forward to what we'll build next! 🚀`,
    timestamp: "1w",
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    ],
    reactions: [
      {
        type: "like",
        count: 66,
        users: [],
      },
    ],
    totalReactions: 66,
    commentCount: 8,
    repostCount: 2,
    isRepost: false,
    isFollowing: true,
    reactionText: "You and 65 others",
  },
  {
    id: "1",
    author: unswEngSoc,
    authorType: "company",
    content: `The UNSW Engineering Society (EngSoc) recently held its Annual General Meeting and is excited to present you with the new Executive Team for 2026! We are excited to see our passionate executives' initiatives and visions come to life over the next year.
  
  𝐏𝐫𝐞𝐬𝐢𝐝𝐞𝐧𝐭: Matthew Garcia
  𝐒𝐞𝐜𝐫𝐞𝐭𝐚𝐫𝐲: Sarah Wong
  𝐓𝐫𝐞𝐚𝐬𝐮𝐫𝐞𝐫: Victoria Nguyen
  𝐀𝐫𝐜 𝐃𝐞𝐥𝐞𝐠𝐚𝐭𝐞: Rachel Kim
  𝐕𝐢𝐜𝐞 𝐏𝐫𝐞𝐬𝐢𝐝𝐞𝐧𝐭 (𝐂𝐚𝐫𝐞𝐞𝐫𝐬): Daniel Brown
  𝐕𝐢𝐜𝐞 𝐏𝐫𝐞𝐬𝐢𝐝𝐞𝐧𝐭 (𝐒𝐩𝐨𝐧𝐬𝐨𝐫𝐬𝐡𝐢𝐩𝐬): Jordan Mitchell`,
    timestamp: "1d",
    images: [
      "https://media.licdn.com/dms/image/v2/D5622AQEOo8Wrx0_LHA/feedshare-shrink_800/feedshare-shrink_800/0/1759763620726?e=1762992000&v=beta&t=nDB9V28FEVLCcNXE_EMHas8EkI-YsRWGZYNTOe25WyI",
    ],
    reactions: [
      {
        type: "like",
        count: 55,
        users: [],
      },
    ],
    totalReactions: 55,
    commentCount: 4,
    repostCount: 6,
    isRepost: true,
    repostedBy: sameenJubayed,
    followers: "2,052 followers",
    isFollowing: false,
    reactionText: "Elena Rodriguez and 54 others",
  },
  {
    id: "2",
    author: chakraCompany,
    authorType: "company",
    content: `ChakraRecap #3: Big wins, bigger team.
  
  Here at Chakra, it feels like every week brings something new worth celebrating. From landing major enterprise clients to expanding our engineering team, Q4 has been nothing short of transformative.
  
  Key highlights:
  ✨ Shipped our new AI-powered analytics dashboard
  🚀 Onboarded 3 Fortune 500 companies
  👥 Grew the team by 40% across engineering and product
  📈 Hit 10M+ monthly active users
  
  Huge thanks to the entire team for making this happen. Here's to an even bigger 2026!`,
    timestamp: "2d",
    images: [
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    ],
    reactions: [
      {
        type: "like",
        count: 127,
        users: [],
      },
    ],
    totalReactions: 127,
    commentCount: 12,
    repostCount: 8,
    isRepost: false,
    followers: "5,834 followers",
    isFollowing: false,
    reactionText: "127",
  },
];
