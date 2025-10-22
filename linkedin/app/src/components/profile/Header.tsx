import type { User } from "@/lib/types";
import { MdVerified } from "react-icons/md";
import { IoEllipsisHorizontal, IoPaperPlane } from "react-icons/io5";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  user: User;
  isOwnProfile: boolean;
}

export default function Header({ user, isOwnProfile }: HeaderProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Cover Image */}
      <div
        className="h-[201px] bg-cover bg-center"
        style={{
          background: user.coverImage?.startsWith("http")
            ? `url(${user.coverImage})`
            : user.coverImage ||
              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      />

      {/* Profile Content */}
      <div className="px-6 pb-4">
        {/* Avatar positioned over cover */}
        <div
          className="relative h-[172px]"
          style={{ marginTop: "-112px", marginBottom: "8px" }}
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-[160px] h-[160px] rounded-full border-4 border-white"
          />
        </div>

        {/* Name and Title */}
        <div className="mb-3 flex flex-row justify-between">
          <div className="flex flex-col w-full max-w-[500px]">
            <div className="mb-2">
              <div className="flex items-center gap-2">
                <h1 className="text-[24px] font-bold text-gray-900">
                  {user.name}
                </h1>
                {user.isVerified && (
                  <MdVerified className="text-[20px] text-gray-700" />
                )}
              </div>
              <p className="text-[16px] text-gray-900 mt-1">{user.title}</p>
            </div>

            {/* Location and Company */}
            <div className="text-[14px] text-gray-600">
              <p>
                {user.location} ·{" "}
                <span className="text-[#0A66C2] hover:underline cursor-pointer">
                  Contact info
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full max-w-[232px]">
            {user.company && (
              <OrganizationBadge company={user.company} color={1} />
            )}
            {user.education?.[0]?.schoolAbbreviation && (
              <OrganizationBadge
                company={user.education?.[0]?.schoolAbbreviation}
                color={2}
              />
            )}
          </div>
        </div>

        {/* Connection Count */}
        {user.connectionCount && (
          <div className="text-[14px] mb-4">
            <button className="text-[#0A66C2] hover:underline font-semibold cursor-pointer">
              {user.connectionCount} connections
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {isOwnProfile ? (
            <>
              <Button variant="default">Open to</Button>
              <Button variant="secondary">Add profile section</Button>
              <Button variant="outline">Enhance profile</Button>
              <Button variant="outline" size="icon">
                <IoEllipsisHorizontal size={24} />
              </Button>
            </>
          ) : (
            <>
              <Button variant="default" className="flex items-center gap-1">
                <IoPaperPlane size={14} />
                Message
              </Button>
              <Button variant="secondary">Connect</Button>
              <Button variant="outline">More</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function OrganizationBadge({
  company,
  color,
}: {
  company: string;
  color: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xs flex-shrink-0 flex items-center justify-center",
          color === 1 && "from-black to-white",
          color === 2 && "from-red-500 to-orange-600"
        )}
      />
      <p className="text-[14px] leading-[17.5px] font-semibold text-gray-900">
        {company}
      </p>
    </div>
  );
}
