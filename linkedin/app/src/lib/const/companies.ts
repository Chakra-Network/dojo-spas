import type { User } from "../types";

export const chakraCompanyLogo =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23000000;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23FFFFFF;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='5' y='5' width='90' height='90' rx='12' ry='12' fill='url(%23g)' /%3E%3C/svg%3E";

export const unswEngSoc: User = {
  id: "unsw-engsoc",
  name: "UNSW Engineering Society (EngSoc)",
  title: "",
  company: "",
  location: "Sydney, Australia",
  avatar:
    "https://media.licdn.com/dms/image/v2/D560BAQH8M6Mdgnrseg/company-logo_100_100/company-logo_100_100/0/1689147174920/unsw_engineering_society_logo?e=1762992000&v=beta&t=jRJzL6vEOe3lbDlNoru0f8l_t8x-ZdL9vPxJCJGjIYY",
  isVerified: false,
  about:
    "The UNSW Engineering Society represents over 8,000 engineering students at UNSW. We're committed to enhancing the student experience through professional development, social events, and community engagement.",
  connectionCount: 2052,
  industry: "Education",
  companySize: "1001-5000 employees",
  regions: ["Asia Pacific"],
};

export const chakraCompany: User = {
  id: "chakra",
  name: "Chakra",
  title: "",
  company: "",
  location: "Sydney, Australia",
  avatar: "https://i.pravatar.cc/150?img=50",
  isVerified: false,
  about:
    "Chakra is a technology company building innovative solutions for modern enterprises. We specialize in AI-powered analytics, cloud infrastructure, and forward-deployed engineering services.",
  connectionCount: 5834,
  industry: "Technology",
  companySize: "51-200 employees",
  regions: ["Asia Pacific"],
};

export const allCompanies: User[] = [unswEngSoc, chakraCompany];
