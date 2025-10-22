import { useState } from "react";
import type { Email, Label } from "./types";
import Header from "./Header";
import Sidebar from "./Sidebar";
import EmailList from "./EmailList";
import EmailView from "./EmailView";
import ComposeModal from "./ComposeModal";

const initialLabels: Label[] = [
  { id: "inbox", name: "Inbox", icon: "inbox", count: 12 },
  { id: "starred", name: "Starred", icon: "star" },
  { id: "snoozed", name: "Snoozed", icon: "clock" },
  { id: "sent", name: "Sent", icon: "send" },
  { id: "drafts", name: "Drafts", icon: "file-text", count: 3 },
  { id: "spam", name: "Spam", icon: "alert-triangle" },
  { id: "trash", name: "Trash", icon: "trash-2" },
  { id: "categories", name: "Categories", icon: "tag" },
];

const mockEmails: Email[] = [
  {
    id: "1",
    from: "GitHub",
    subject: "Your pull request has been merged",
    preview: "Great news! Your contribution to the project has been accepted.",
    body: 'Hello,\n\nYour pull request #1234 "Add new feature" has been successfully merged into the main branch.\n\nThank you for your contribution!\n\nBest regards,\nGitHub Team',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    starred: false,
    important: true,
    category: "primary",
  },
  {
    id: "2",
    from: "Netflix",
    subject: "New shows just for you",
    preview: "Check out these recommendations based on your viewing history",
    body: "Hi there,\n\nWe think you'll love these new additions to our catalog:\n\n- Show 1\n- Show 2\n- Show 3\n\nHappy watching!\nThe Netflix Team",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    read: true,
    starred: true,
    important: false,
    category: "promotions",
  },
  {
    id: "3",
    from: "LinkedIn",
    subject: "You have 5 new connection requests",
    preview: "Expand your professional network",
    body: "Hello,\n\nYou have 5 new connection requests waiting for your response.\n\nVisit LinkedIn to see who wants to connect with you.\n\nBest,\nLinkedIn Team",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    read: false,
    starred: false,
    important: false,
    category: "social",
  },
  {
    id: "4",
    from: "Amazon",
    subject: "Your order has been shipped",
    preview: "Track your package delivery",
    body: "Dear Customer,\n\nYour order #789-123456 has been shipped and is on its way.\n\nExpected delivery: Tomorrow\nTracking number: 1Z999AA10123456784\n\nThank you for shopping with Amazon.",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    starred: false,
    important: true,
    category: "primary",
  },
  {
    id: "5",
    from: "Spotify",
    subject: "Your Weekly Discover playlist is ready",
    preview: "50 new songs picked just for you",
    body: "Hey music lover,\n\nYour personalized Discover Weekly playlist is ready with 50 fresh tracks we think you'll love.\n\nStart listening now!\n\nThe Spotify Team",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    read: false,
    starred: false,
    important: false,
    category: "social",
  },
  {
    id: "6",
    from: "Google Calendar",
    subject: "Reminder: Team meeting in 30 minutes",
    preview: "Don't forget your upcoming event",
    body: "This is a reminder that you have a team meeting scheduled in 30 minutes.\n\nEvent: Team Standup\nTime: 10:00 AM - 10:30 AM\nLocation: Conference Room A\n\nJoin video call: [Link]",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read: false,
    starred: true,
    important: true,
    category: "primary",
  },
  {
    id: "7",
    from: "Medium",
    subject: "Top stories for you this week",
    preview: "Curated articles based on your interests",
    body: 'Hello,\n\nHere are the top stories we think you\'ll enjoy:\n\n1. "The Future of AI" by John Doe\n2. "Best Practices for React" by Jane Smith\n3. "Understanding TypeScript" by Bob Johnson\n\nHappy reading!\nMedium Team',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    starred: false,
    important: false,
    category: "promotions",
  },
  {
    id: "8",
    from: "Slack",
    subject: "You were mentioned in #general",
    preview: "@you Check out this interesting article...",
    body: 'You were mentioned in #general by Sarah:\n\n"@you Check out this interesting article about web performance optimization. Would love to hear your thoughts!"\n\nReply in Slack',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    read: false,
    starred: false,
    important: true,
    category: "primary",
  },
];

export default function Mail() {
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [currentLabel, setCurrentLabel] = useState("inbox");
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const selectedEmail =
    emails.find((email) => email.id === selectedEmailId) || null;

  const filteredEmails = emails.filter((email) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        email.from.toLowerCase().includes(query) ||
        email.subject.toLowerCase().includes(query) ||
        email.preview.toLowerCase().includes(query)
      );
    }

    if (currentLabel === "starred") {
      return email.starred;
    }

    return currentLabel === "inbox";
  });

  const handleEmailClick = (emailId: string) => {
    setSelectedEmailId(emailId);
    setEmails(
      emails.map((email) =>
        email.id === emailId ? { ...email, read: true } : email
      )
    );
  };

  const handleStarToggle = (emailId: string) => {
    setEmails(
      emails.map((email) =>
        email.id === emailId ? { ...email, starred: !email.starred } : email
      )
    );
  };

  const handleImportantToggle = (emailId: string) => {
    setEmails(
      emails.map((email) =>
        email.id === emailId ? { ...email, important: !email.important } : email
      )
    );
  };

  const handleSend = (to: string, subject: string, body: string) => {
    console.log("Sending email:", { to, subject, body });
  };

  const handleReply = (to: string, subject: string, body: string) => {
    console.log("Sending reply:", { to, subject, body });
    // Here you would typically send the reply to your backend
    // For now, we'll just log it
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header
        onSearch={setSearchQuery}
        onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          labels={initialLabels}
          currentLabel={currentLabel}
          onLabelClick={setCurrentLabel}
          onCompose={() => setShowCompose(true)}
          collapsed={sidebarCollapsed}
        />

        <div className="flex-1 flex overflow-hidden">
          {selectedEmailId ? (
            <EmailView
              email={selectedEmail}
              onClose={() => setSelectedEmailId(null)}
              onReply={handleReply}
            />
          ) : (
            <EmailList
              emails={filteredEmails}
              selectedEmailId={selectedEmailId}
              onEmailClick={handleEmailClick}
              onStarToggle={handleStarToggle}
              onImportantToggle={handleImportantToggle}
            />
          )}
        </div>
      </div>

      {showCompose && (
        <ComposeModal
          onClose={() => setShowCompose(false)}
          onSend={handleSend}
        />
      )}
    </div>
  );
}
