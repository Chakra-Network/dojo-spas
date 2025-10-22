export interface User {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  avatar: string;
  coverImage?: string;
  isVerified: boolean;
  about?: string;
  connectionCount?: number;
  contactInfo?: string;
  experience?: Experience[];
  education?: Education[];
  skills?: Skill[];
  highlights?: Highlight[];
  // Filter fields
  connectionDegree?: "1st" | "2nd" | "3rd+";
  currentCompany?: string;
  regions?: string[];
  industry?: string;
  companySize?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  employmentType?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  description?: string;
}

export interface Education {
  id: string;
  school: string;
  schoolAbbreviation?: string;
  degree: string;
  field?: string;
  startYear: string;
  endYear?: string;
  logo?: string;
}

export interface Skill {
  id: string;
  name: string;
  endorsements?: number;
}

export interface Highlight {
  id: string;
  type: string;
  title: string;
  description: string;
}
