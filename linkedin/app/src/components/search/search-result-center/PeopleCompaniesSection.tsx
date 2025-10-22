import type { User } from "@/lib/types";
import { MdVerified } from "react-icons/md";
import { useApp } from "@/contexts/AppContext";
import Button from "@/components/ui/button";

export default function PeopleCompaniesSection({
  title,
  items,
  sectionId,
}: {
  title: string;
  items: User[];
  sectionId?: string;
}) {
  const { navigateToProfile, setMainCategory } = useApp();
  return (
    <div
      id={sectionId}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden scroll-mt-[130px]"
    >
      <div className="p-4">
        <h2 className="text-[20px] font-semibold text-gray-900 mb-4 capitalize">
          {title}
        </h2>
        <div className="space-y-4">
          {items.map((person) => (
            <div
              key={person.id}
              className="flex items-start gap-3 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0 cursor-pointer"
              onClick={() => navigateToProfile(person.id)}
            >
              <img
                src={person.avatar}
                alt={person.name}
                className="w-12 h-12 rounded-full flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <h3 className="text-[14px] font-semibold text-gray-900 hover:underline cursor-pointer">
                    {person.name}
                  </h3>
                  {person.isVerified && (
                    <MdVerified className="text-[16px] text-gray-700 flex-shrink-0" />
                  )}
                  {person.connectionDegree && (
                    <span className="text-[14px] text-gray-600 ml-1">
                      • {person.connectionDegree}
                    </span>
                  )}
                </div>
                <p className="text-[14px] text-gray-600 mt-1">{person.title}</p>
                <p className="text-[12px] text-gray-600 mt-1">
                  {person.location}
                </p>
              </div>
              <Button variant="secondary">
                {person.connectionCount ? "Follow" : "Message"}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-200">
        <button
          onClick={() => setMainCategory(title)}
          className="w-full px-4 py-3 text-[16px] leading-[20px] text-gray-600 font-semibold hover:bg-gray-50 transition-colors text-center cursor-pointer"
        >
          See all {title} results
        </button>
      </div>
    </div>
  );
}
