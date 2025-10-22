import type { Experience } from "@/lib/types";
import { useApp } from "@/contexts/AppContext";
import { CardLayout, CardLayoutItem } from "./CardLayout";

interface ExperienceProps {
  experience?: Experience[];
  showAll?: boolean;
}

export default function Experience({
  experience,
  showAll = false,
}: ExperienceProps) {
  const { navigateToDetailSection } = useApp();

  if (!experience || experience.length === 0) return null;

  const displayedExperience = showAll ? experience : experience.slice(0, 5);
  const hasMore = experience.length > 5;

  return (
    <CardLayout
      title="Experience"
      hasMore={hasMore}
      hasMoreDetails={{
        buttonText: `Show all ${experience.length} experiences`,
        onClick: () => navigateToDetailSection("experience"),
      }}
    >
      {displayedExperience.map((exp) => (
        <CardLayoutItem key={exp.id} className="flex items-start gap-3">
          {exp.companyLogo ? (
            <img
              src={exp.companyLogo}
              alt={exp.company}
              className="w-12 h-12 object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0 overflow-hidden" />
          )}

          <div className="flex-1">
            <h3 className="text-[16px] font-semibold text-gray-900">
              {exp.title}
            </h3>
            <p className="text-[14px] text-gray-900 mt-1">{exp.company}</p>
            {exp.employmentType && (
              <p className="text-[14px] text-gray-600">{exp.employmentType}</p>
            )}
            <p className="text-[14px] text-gray-600 mt-1">
              {exp.startDate} - {exp.endDate || "Present"}
            </p>
            {exp.location && (
              <p className="text-[14px] text-gray-600">{exp.location}</p>
            )}
            {exp.description && (
              <p className="text-[14px] text-gray-900 mt-2 leading-[1.4]">
                {exp.description}
              </p>
            )}
          </div>
        </CardLayoutItem>
      ))}
    </CardLayout>
  );
}
