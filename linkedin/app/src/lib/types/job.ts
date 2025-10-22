export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  logo: string;
  employmentType: string;
  postedTime: string;
  applicants?: number;
  alumni?: number;
  // Filter fields
  datePosted?: string;
  applicantCount?: number;
}
