import { IoChevronDown } from "react-icons/io5";
import LinkedinFullLogo from "@/components/icons/LinkedinFullLogo";

export default function SidebarFooter() {
  return (
    <div className="px-3 py-4">
      <ul className="flex justify-center flex-wrap gap-x-3 gap-y-2 text-[12px] text-gray-600 mb-4">
        <li>
          <a
            href="#"
            className="hover:text-[#0A66C2] hover:underline cursor-pointer"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#"
            className="hover:text-[#0A66C2] hover:underline cursor-pointer"
          >
            Accessibility
          </a>
        </li>
        <li>
          <a
            href="#"
            className="hover:text-[#0A66C2] hover:underline cursor-pointer"
          >
            Help Center
          </a>
        </li>
        <li>
          <button className="hover:text-[#0A66C2] hover:underline flex items-center gap-0.5 cursor-pointer">
            Privacy & Terms
            <IoChevronDown size={12} />
          </button>
        </li>
        <li>
          <a
            href="#"
            className="hover:text-[#0A66C2] hover:underline cursor-pointer"
          >
            Ad Choices
          </a>
        </li>
        <li>
          <a
            href="#"
            className="hover:text-[#0A66C2] hover:underline cursor-pointer"
          >
            Advertising
          </a>
        </li>
        <li>
          <button className="hover:text-[#0A66C2] hover:underline flex items-center gap-0.5 cursor-pointer">
            Business Services
            <IoChevronDown size={12} />
          </button>
        </li>
        <li>
          <button className="hover:text-[#0A66C2] hover:underline cursor-pointer">
            Get the LinkedIn app
          </button>
        </li>
        <li>
          <button className="hover:text-[#0A66C2] hover:underline cursor-pointer">
            More
          </button>
        </li>
      </ul>

      {/* LinkedIn Logo and Copyright */}
      <div className="flex items-center gap-1 justify-center">
        <LinkedinFullLogo className="w-14 h-3.5" />
        <span className="text-[12px] text-gray-600">
          LinkedIn Corporation © 2025
        </span>
      </div>
    </div>
  );
}
