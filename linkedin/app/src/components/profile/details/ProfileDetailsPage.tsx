import { useApp } from "@/contexts/AppContext";
import RightSidebar from "../RightSidebar";
import UserPreviewHeader from "./UserPreviewHeader";
import Experience from "../Experience";
import Education from "../Education";
import Skills from "../Skills";

function ProfileDetailsContent({
  type,
}: {
  type: "experience" | "education" | "skills";
}) {
  const { viewedUser } = useApp();

  return (
    <div className="flex-1 max-w-[850px] flex flex-col gap-2">
      {type === "experience" && (
        <Experience experience={viewedUser.experience} showAll={true} />
      )}
      {type === "education" && (
        <Education education={viewedUser.education} showAll={true} />
      )}
      {type === "skills" && (
        <Skills skills={viewedUser.skills} showAll={true} />
      )}
    </div>
  );
}

export default function ProfileDetailsPage({
  type,
}: {
  type: "experience" | "education" | "skills";
}) {
  const {
    viewedUser,
    state: { currentUser },
  } = useApp();
  const isOwnProfile = viewedUser.id === currentUser.id;

  return (
    <>
      <UserPreviewHeader user={viewedUser} />
      <div className="px-4">
        <div className="flex gap-6 items-start max-w-[1128px] mx-auto py-6">
          {/* Main Content */}
          <div className="flex-1 max-w-[850px] flex flex-col gap-2">
            <ProfileDetailsContent type={type} />
          </div>

          {/* Right Sidebar */}
          <RightSidebar isOwnProfile={isOwnProfile} />
        </div>
      </div>
    </>
  );
}
