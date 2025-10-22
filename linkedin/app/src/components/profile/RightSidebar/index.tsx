import ProfileSidebarPeopleYouMayKnow from "./PeopleYouMayKnow";
import ProfileSidebarYouMightLike from "./YouMightLike";
import ProfileLanguageAndURL from "./LanguageAndURL";
import ProfileSidebarViewers from "./Viewers";
import ProfileSidebarMoreProfiles from "./MoreProfiles";
import ProfileSidebarPremiumProfiles from "./PremiumProfiles";

export default function RightSidebar({
  isOwnProfile,
}: {
  isOwnProfile: boolean;
}) {
  return (
    <div className="w-[300px] flex flex-col gap-2">
      {isOwnProfile ? (
        <>
          {/* Own profile only */}
          <ProfileLanguageAndURL />
          <ProfileSidebarViewers />
        </>
      ) : (
        <>
          {/* Other profiles only */}
          <ProfileSidebarMoreProfiles />
          <ProfileSidebarPremiumProfiles />
        </>
      )}
      {/* Shared components */}
      <ProfileSidebarPeopleYouMayKnow />
      <ProfileSidebarYouMightLike />
    </div>
  );
}
