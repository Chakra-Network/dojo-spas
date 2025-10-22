import type { JSX } from "react";
import {
  IoBookmarkSharp,
  IoPeopleSharp,
  IoNewspaperSharp,
  IoCalendarSharp,
} from "react-icons/io5";

export default function QuickLinks() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <ul className="space-y-4">
        <QuickLink Icon={IoBookmarkSharp} title="Saved items" />
        <QuickLink Icon={IoPeopleSharp} title="Groups" />
        <QuickLink Icon={IoNewspaperSharp} title="Newsletters" />
        <QuickLink Icon={IoCalendarSharp} title="Events" />
      </ul>
    </div>
  );
}

function QuickLink({
  Icon,
  title,
  href = "#",
}: {
  Icon: JSX.ElementType;
  title: string;
  href?: string;
}) {
  return (
    <li>
      <a
        href={href}
        className="flex items-center gap-2 hover:text-gray-900 text-gray-900 group cursor-pointer"
      >
        <Icon size={16} className="flex-shrink-0" />
        <span className="text-[12px] leading-[16px] font-semibold group-hover:underline">
          {title}
        </span>
      </a>
    </li>
  );
}
