import { profileLanguage } from "@/lib/const";
import { publicProfileURL } from "@/lib/const";
import { HiOutlinePencil } from "react-icons/hi2";

export default function LanguageAndURL() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden p-4 flex flex-col gap-4">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 justify-between">
          <h3 className="text-[18px] leading-[24px] font-semibold text-gray-900">
            Profile language
          </h3>
          <HiOutlinePencil className="w-6 h-6 text-gray-600" />
        </div>
        <p className="text-[14px] leading-[20px] text-gray-600 mt-1">
          {profileLanguage.language}
        </p>
      </div>

      <div className="border-b border-gray-200" />

      <div className="flex flex-col">
        <div className="flex items-center gap-2 justify-between">
          <h3 className="text-[18px] leading-[24px] font-semibold text-gray-900">
            Public profile & URL
          </h3>
          <HiOutlinePencil className="w-6 h-6 text-gray-600" />
        </div>

        <p className="text-[14px] leading-[20px] text-gray-600 mt-1 line-clamp-2">
          {publicProfileURL.url}
        </p>
      </div>
    </div>
  );
}
