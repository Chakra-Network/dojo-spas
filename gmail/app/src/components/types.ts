export interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  body: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
  important: boolean;
  category: "primary" | "social" | "promotions";
}

export interface Label {
  id: string;
  name: string;
  icon: string;
  count?: number;
}
