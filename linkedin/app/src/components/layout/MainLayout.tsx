import { useApp } from "@/contexts/AppContext";
import MessagingButton from "../common/MessagingButton";
import PageFooter from "../common/PageFooter";
import TopNavigation from "../common/top-navigation/TopNavigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { state } = useApp();
  const isJobFilteredSearch = state.searchFilter.mainCategory === "Jobs";
  return (
    <div className="bg-[#F3F2EF] min-h-screen">
      <TopNavigation />

      <div className="h-[53px] invisible w-full" />

      {children}
      {!isJobFilteredSearch && state.currentView !== "feed" && <PageFooter />}

      <MessagingButton />
    </div>
  );
}
