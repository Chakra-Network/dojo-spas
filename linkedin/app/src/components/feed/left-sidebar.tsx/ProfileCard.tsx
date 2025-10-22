import { useApp } from "@/contexts/AppContext";
import { MdVerified } from "react-icons/md";
import { chakraCompanyLogo } from "@/lib/const";

export default function ProfileCard() {
  const {
    navigateToProfile,
    state: { currentUser },
  } = useApp();
  return (
    <button
      className="bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer"
      onClick={() => navigateToProfile(currentUser.id)}
    >
      {/* Cover Image - clickable */}
      <div className="block w-full">
        <div
          className="h-[58px] bg-cover bg-center"
          style={{
            backgroundImage: currentUser.coverImage?.startsWith("http")
              ? `url(${currentUser.coverImage})`
              : currentUser.coverImage || "none",
            backgroundColor: currentUser.coverImage?.startsWith("linear")
              ? "transparent"
              : "#f3f2ef",
          }}
        />
      </div>

      {/* Avatar - clickable and positioned absolutely */}
      <div
        className="block relative w-full"
        style={{ marginTop: "-38px", marginBottom: "4px" }}
      >
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-[72px] h-[72px] rounded-full border-2 border-white ml-4 hover:brightness-90 transition-all"
        />
      </div>

      {/* User Info */}
      <div className="px-4 pb-4">
        <div className="block w-full">
          <div className="mt-1">
            <div className="flex items-center gap-1">
              <h3 className="text-[20px] leading-[25px] font-semibold text-gray-900">
                {currentUser.name}
              </h3>
              {currentUser.isVerified && (
                <MdVerified className="text-[16px] text-gray-700 flex-shrink-0" />
              )}
            </div>
            <p className="text-[12px] text-gray-600 mt-1 leading-[1.33] text-left line-clamp-2">
              {currentUser.title}
            </p>
            <p className="text-[12px] text-gray-500 mt-1 text-left">
              {currentUser.location}
            </p>
          </div>
        </div>

        {/* Company Info */}
        <a href="#" className="block mt-2 cursor-pointer">
          <p className="text-[12px] font-semibold text-gray-900 flex items-center gap-2">
            <img
              src={chakraCompanyLogo}
              alt="Company logo"
              className="w-4 h-4 rounded"
            />
            <span>Chakra</span>
          </p>
        </a>
      </div>
    </button>
  );
}
