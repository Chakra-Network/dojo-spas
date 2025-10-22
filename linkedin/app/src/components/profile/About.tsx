import { CardLayout, CardLayoutItem } from "./CardLayout";
import type { Skill } from "@/lib/types/user";
import { HiOutlineArrowRight } from "react-icons/hi";
import { IoDiamondOutline } from "react-icons/io5";

interface AboutProps {
  about?: string;
  skills?: Skill[];
}

export default function About({ about, skills }: AboutProps) {
  if (!about) return null;

  const topSkills = skills?.slice(0, 5) || [];

  return (
    <CardLayout title="About">
      <CardLayoutItem>
        <p className="text-[14px] text-gray-900 leading-[1.4] whitespace-pre-line">
          {about}
        </p>
        <div className="flex items-center justify-between">
          <p>...</p>
          <button className="text-[14px] hover:underline mt-2 text-gray-600 cursor-pointer">
            ...see more
          </button>
        </div>
      </CardLayoutItem>

      {topSkills.length > 0 && (
        <CardLayoutItem>
          <div className="flex items-start border border-gray-200 p-3 rounded-lg">
            <IoDiamondOutline className="w-6 h-6 flex-shrink-0 mr-2" />
            <div className="flex-1">
              <h3 className="text-[16px] leading-[24px] font-semibold text-gray-900">
                Top skills
              </h3>
              <div className="text-[14px] leading-[20px] text-gray-900 line-clamp-2">
                <span>{topSkills.map((skill) => skill.name).join(" • ")}</span>
              </div>
            </div>

            <button className="h-8 w-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer self-center">
              <HiOutlineArrowRight className="w-4 h-4 flex-shrink-0" />
            </button>
          </div>
        </CardLayoutItem>
      )}
    </CardLayout>
  );
}
