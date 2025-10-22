import type { Education } from "@/lib/types";
import { useApp } from "@/contexts/AppContext";
import { CardLayout, CardLayoutItem } from "./CardLayout";

interface EducationProps {
  education?: Education[];
  showAll?: boolean;
}

export default function Education({
  education,
  showAll = false,
}: EducationProps) {
  const { navigateToDetailSection } = useApp();

  if (!education || education.length === 0) return null;

  const displayedEducation = showAll ? education : education.slice(0, 2);
  const hasMore = education.length > 2;

  return (
    <CardLayout
      title="Education"
      hasMore={hasMore}
      hasMoreDetails={{
        buttonText: `Show all ${education.length} education`,
        onClick: () => navigateToDetailSection("education"),
      }}
    >
      {displayedEducation.map((edu) => (
        <CardLayoutItem key={edu.id} className="flex items-start gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
            {edu.logo && (
              <img
                src={edu.logo}
                alt={edu.school}
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-[16px] font-semibold text-gray-900">
              {edu.school}
            </h3>
            <p className="text-[14px] text-gray-900 mt-1">
              {edu.degree}
              {edu.field && `, ${edu.field}`}
            </p>
            <p className="text-[14px] text-gray-600 mt-1">
              {edu.startYear} - {edu.endYear || "Present"}
            </p>
          </div>
        </CardLayoutItem>
      ))}
    </CardLayout>
  );
}
