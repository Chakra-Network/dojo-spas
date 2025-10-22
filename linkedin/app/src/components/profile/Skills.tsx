import type { Skill } from "@/lib/types";
import { useApp } from "@/contexts/AppContext";
import { CardLayout, CardLayoutItem } from "./CardLayout";

interface SkillsProps {
  skills?: Skill[];
  showAll?: boolean;
}

export default function Skills({ skills, showAll = false }: SkillsProps) {
  const { navigateToDetailSection } = useApp();

  if (!skills || skills.length === 0) return null;

  const displayedSkills = showAll ? skills : skills.slice(0, 2);
  const hasMore = skills.length > 2;

  return (
    <CardLayout
      title="Skills"
      hasMore={hasMore}
      hasMoreDetails={{
        buttonText: `Show all ${skills.length} skills`,
        onClick: () => navigateToDetailSection("skills"),
      }}
    >
      {displayedSkills.map((skill) => (
        <CardLayoutItem key={skill.id} className="flex items-start gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-[16px] font-semibold text-gray-900">
              {skill.name}
            </h3>
            {skill.endorsements && skill.endorsements > 0 && (
              <p className="text-[14px] text-gray-600 mt-1">
                {skill.endorsements} endorsement
                {skill.endorsements !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </CardLayoutItem>
      ))}
    </CardLayout>
  );
}
