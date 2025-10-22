import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
}

interface LeftSidebarProps {
  activeSection: string;
  onSectionClick: (section: string) => void;
  availableSections: Section[];
}

export default function LeftSidebar({
  activeSection,
  onSectionClick,
  availableSections,
}: LeftSidebarProps) {
  if (availableSections.length === 0) {
    return null;
  }

  return (
    <div className="w-[225px] sticky top-[calc(53px+60px+24px)] self-start">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden pt-4 pb-2 flex flex-col">
        <h2 className="text-[20px] leading-[25px] font-semibold text-gray-900 px-4 pb-2">
          On this page
        </h2>
        <ul className="space-y-2">
          {availableSections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => onSectionClick(section.id)}
                className={cn(
                  "w-full text-left text-[14px] font-semibold px-4 h-8 items-center transition-all cursor-pointer text-gray-900 hover:bg-gray-100 border-l-2",
                  activeSection === section.id
                    ? "border-[#01754f]"
                    : "border-transparent"
                )}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
