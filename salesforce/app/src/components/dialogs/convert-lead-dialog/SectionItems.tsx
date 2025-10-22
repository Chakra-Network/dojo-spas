import { FaChevronDown } from "react-icons/fa6";

export function SectionLayout({
  firstSection,
  secondSection,
  title,
}: {
  firstSection: React.ReactNode;
  secondSection: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-start bg-gray-100 mb-1 pt-2 border-y border-gray-200 pb-3">
      <div className="w-[128px] flex items-center gap-2 px-3">
        <FaChevronDown className="w-[14px] h-[14px] text-gray-600 shrink-0" />
        <span className="text-base leading-[20px] text-gray-700 hover:text-blue-600 cursor-pointer hover:underline">
          {title}
        </span>
      </div>
      <div className="flex-1 flex items-start pr-4">
        <div className="flex-1 pl-1">{firstSection}</div>
        <div className="text-[13px] leading-[19.5px] text-gray-500 px-3 w-[70px]">
          - OR -
        </div>
        <div className="flex-1">{secondSection}</div>
      </div>
    </div>
  );
}

export function SubSectionContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col pt-2 pb-4 px-4 bg-white border rounded-lg mt-2">
      {children}
    </div>
  );
}

export function EmptySection({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 px-3 py-[6px] rounded-lg bg-gray-200 border border-gray-300 text-[13px] leading-[19.5px] text-gray-600">
      {children}
    </div>
  );
}
