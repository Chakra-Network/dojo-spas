import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IoArrowForward, IoPencil } from "react-icons/io5";

export function CardLayout({
  title,
  children,
  hasMore,
  hasMoreDetails,
}: {
  title: string;
  children: React.ReactNode;
  hasMore?: boolean;
  hasMoreDetails?: {
    buttonText: string;
    onClick: () => void;
  };
}) {
  const { navigateBackToProfile, isOwnProfile, isProfileDetailsPage } =
    useApp();

  return (
    <div className="bg-white rounded-lg border border-gray-200 flex flex-col">
      <div className="px-3 pt-3 flex items-center justify-between">
        <div className="flex items-center">
          {isProfileDetailsPage && (
            <button
              onClick={navigateBackToProfile}
              className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors flex-shrink-0 cursor-pointer"
              aria-label="Back to profile"
            >
              <HiOutlineArrowLeft className="text-gray-600 w-6 h-6" />
            </button>
          )}

          <h2
            className={cn(
              "text-[20px] leading-[25px] font-semibold text-gray-900 px-3 pt-3",
              isProfileDetailsPage && "pb-2"
            )}
          >
            {title}
          </h2>
        </div>

        {isOwnProfile && (
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
            <IoPencil size={20} className="text-gray-600" />
          </button>
        )}
      </div>

      <div
        className={cn(
          "flex flex-col",
          !isProfileDetailsPage && hasMore ? "pb-0" : "pb-3"
        )}
      >
        {children}

        {!isProfileDetailsPage && hasMore && (
          <button
            onClick={hasMoreDetails?.onClick}
            className="flex items-center gap-2 text-[16px] leading-[20px] text-gray-600 hover:bg-gray-100 font-semibold w-full justify-center border-t border-gray-200 py-[10px] px-2 cursor-pointer"
          >
            {hasMoreDetails?.buttonText}
            <IoArrowForward size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

export function CardLayoutItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("px-6 py-3", className)}>{children}</div>;
}
