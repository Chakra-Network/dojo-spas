import type {
  SuggestedConnection,
  SuggestedPage,
  ProfileViewer,
} from "../types";

export const suggestedConnections: SuggestedConnection[] = [
  {
    id: "nicole-low",
    name: "Sophia Martinez",
    title: "Software Developer & Product Designer",
    avatar: "https://i.pravatar.cc/150?img=47",
    isVerified: true,
  },
  {
    id: "chetanya-bansal",
    name: "Ryan Anderson",
    title: "USYD CS",
    avatar: "https://i.pravatar.cc/150?img=31",
    isVerified: true,
  },
  {
    id: "lam-le",
    name: "Alex Kim",
    title: "Honours student @ The University of Sydney.",
    avatar: "https://i.pravatar.cc/150?img=59",
    isVerified: true,
  },
  {
    id: "thomas-nguyen",
    name: "James Wilson",
    title: "Student @ University of Sydney",
    avatar: "https://i.pravatar.cc/150?img=56",
    isVerified: true,
  },
  {
    id: "brian-william",
    name: "Oliver Thompson",
    title: "Software and Physics @ The University of Sydney",
    avatar: "https://i.pravatar.cc/150?img=13",
    isVerified: true,
  },
];

export const suggestedPages: SuggestedPage[] = [
  {
    id: "jane-street",
    name: "Jane Street",
    industry: "Financial Services",
    followers: "343,858 followers",
    connectionsFollowing: 26,
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQGWd8WY_6KqiQ/company-logo_100_100/company-logo_100_100/0/1630530524174?e=1762992000&v=beta&t=sT0CjJJ1p5I8j1q8J9DG8XHWXjP0kJF3QQ9XzG5Gj8M",
  },
  {
    id: "relevance-ai",
    name: "Relevance AI",
    industry: "Software Development",
    followers: "33,148 followers",
    connectionsFollowing: 28,
    logo: "https://media.licdn.com/dms/image/v2/D560BAQHqcXzKZXF9_w/company-logo_100_100/company-logo_100_100/0/1719361147782?e=1762992000&v=beta&t=_ZXnQ8H3f4X5J7LHJ9jVQP8bJ5yT8F9J1qZ1Z1Z1Z1Z",
  },
];

export const profileViewers: ProfileViewer[] = [
  {
    id: "dimas-putra",
    name: "Marcus Chen",
    title: "Forward Deployed Engineer",
    company: "Chakra",
    avatar: "https://i.pravatar.cc/150?img=12",
    timestamp: "1st",
    isVerified: true,
  },
  {
    id: "tien-duc",
    name: "Nathan Lee",
    title: "Forward Deployed Engineer",
    company: "Chakra",
    avatar: "https://i.pravatar.cc/150?img=60",
    timestamp: "1st",
    isVerified: false,
  },
];

export const moreProfiles: ProfileViewer[] = [
  {
    id: "roger-truong",
    name: "David Park",
    title: "Forward Deployed Engineer @ Chakra | B.S. in Computer...",
    company: "Chakra",
    avatar: "https://i.pravatar.cc/150?img=8",
    timestamp: "1st",
    isVerified: true,
  },
  {
    id: "daniel-song",
    name: "Michael Zhang",
    title: "Forward Deployed Engineer @ Chakra | Masters of IT UNSW",
    company: "Chakra",
    avatar: "https://i.pravatar.cc/150?img=14",
    timestamp: "1st",
    isVerified: false,
  },
  {
    id: "aarnav-sheth",
    name: "Kevin Patel",
    title: "Forward Deployed Engineer @ Chakra",
    company: "Chakra",
    avatar: "https://i.pravatar.cc/150?img=52",
    timestamp: "1st",
    isVerified: true,
  },
  {
    id: "john-phan",
    name: "Christopher Liu",
    title: "Forward Deployed Engineer @ Chakra | Casual Academic @...",
    company: "Chakra",
    avatar: "https://i.pravatar.cc/150?img=68",
    timestamp: "1st",
    isVerified: false,
  },
  {
    id: "max-widjaya",
    name: "Sebastian Torres",
    title: "Forward Deployed Engineer @ Chakra",
    company: "Chakra",
    avatar: "https://i.pravatar.cc/150?img=15",
    timestamp: "1st",
    isVerified: true,
  },
];

export const premiumProfiles: ProfileViewer[] = [
  {
    id: "choudhary-saif",
    name: "Ahmed Hassan",
    title: "Cybersecurity Graduate | IT Support | Mobile App...",
    company: "",
    avatar: "https://i.pravatar.cc/150?img=67",
    timestamp: "3rd",
    isVerified: false,
  },
  {
    id: "andrew-donnelly",
    name: "Benjamin Foster",
    title: "Race Engineer at Team 18 | Mechanical Engineering...",
    company: "Team 18",
    avatar: "https://i.pravatar.cc/150?img=51",
    timestamp: "3rd",
    isVerified: false,
  },
  {
    id: "anirudh-b",
    name: "Rajesh Kumar",
    title: "Business Analyst & Entrepreneurial Strategist",
    company: "",
    avatar: "https://i.pravatar.cc/150?img=11",
    timestamp: "3rd",
    isVerified: false,
  },
  {
    id: "sally-woods",
    name: "Emma Johnson",
    title: "Recipe Developer @ Thermomix Australia",
    company: "Thermomix Australia",
    avatar: "https://i.pravatar.cc/150?img=45",
    timestamp: "3rd+",
    isVerified: false,
  },
];

export const profileLanguage = {
  language: "English",
};

export const publicProfileURL = {
  url: "www.linkedin.com/in/dzaka-athif-a06334205",
};
