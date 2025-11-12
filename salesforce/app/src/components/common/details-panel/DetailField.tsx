import { Pencil } from "lucide-react";
import { useAppContext } from "@/context/AppProvider";
import { cn } from "@/lib/utils";
import { PROFILE_AVATAR_IMAGE } from "@/components/resources/images";

interface DetailFieldProps {
  label: string;
  value: string;
  hasAvatar?: boolean;
  hasEditButton?: boolean;
  timestamp?: string;
}

export default function DetailField({
  label,
  value,
  hasAvatar = false,
  hasEditButton = true,
  timestamp,
}: DetailFieldProps) {
  const { activeTab, updateTabField } = useAppContext();
  const isEditDetails = activeTab?.isEditDetails || false;
  const toggleEditMode = () => {
    if (activeTab) {
      updateTabField(activeTab.id, "isEditDetails", !isEditDetails);
    }
  };
  return (
    <div className="flex flex-col px-1 border-b border-gray-300 text-[13px] leading-[19.5px]">
      <label className="block text-gray-600 pt-1 pr-2 font-semibold">
        {label}
      </label>

      <div className="flex items-center">
        <div className="relative py-[2px] flex-1">
          {hasAvatar && value && (
            <div className="flex items-center gap-1">
              <img
                src={PROFILE_AVATAR_IMAGE}
                alt="Profile"
                className="w-5 h-5 rounded-full"
              />
              <div className="mt-1">
                <span className="text-blue-600 hover:underline cursor-pointer">
                  {value}
                </span>
                {timestamp && (
                  <span className="text-gray-500">{`, ${timestamp}`}</span>
                )}
              </div>
            </div>
          )}
          {!hasAvatar && (
            <div className="text-gray-800">
              {value || <span className="text-gray-400">-</span>}
            </div>
          )}
        </div>
        {hasEditButton && (
          <button
            className="w-4 h-4 flex items-center justify-center text-gray-600 hover:text-gray-800 cursor-pointer"
            onClick={toggleEditMode}
          >
            <Pencil className="w-[14px] h-[14px]" />
          </button>
        )}
      </div>
    </div>
  );
}

interface DetailFieldSimpleProps {
  label: string;
  value: string;
  timestamp?: string;
}

export function DetailFieldSimple({
  label,
  value,
  timestamp,
}: DetailFieldSimpleProps) {
  return (
    <div className="flex flex-col text-[13px] leading-[19.5px]">
      <label className="block text-gray-600 pt-1 pr-2 font-semibold">
        {label}
      </label>

      <div className="flex items-center">
        <div className="relative py-[2px] flex-1">
          <div className="flex items-center gap-1">
            <img
              src={PROFILE_AVATAR_IMAGE}
              alt="Profile"
              className="w-5 h-5 rounded-full"
            />
            <div className="flex items-center mt-1 text-gray-500">
              {`${value} ${timestamp ? `, ${timestamp}` : ""}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function KeyFieldsItem({
  label,
  value,
  isLink = false,
  isEditable = false,
  toggleEditMode,
  isBorder = true,
}: {
  label: string;
  value: string;
  isLink?: boolean;
  isEditable?: boolean;
  toggleEditMode?: () => void;
  isBorder?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col px-1 text-[13px] leading-[19.5px]",
        isBorder && "border-b border-gray-300"
      )}
    >
      <div className="pt-1 pr-2">
        <span className="font-semibold text-gray-700">{label}</span>
      </div>
      <div className="py-[2px] flex items-center">
        {isLink ? (
          <span className="text-blue-600 hover:underline cursor-pointer flex-1">
            {value}
          </span>
        ) : (
          <span className="text-gray-600 flex-1">{value}</span>
        )}
        {isEditable && (
          <button
            className="w-4 h-4 flex items-center justify-center text-gray-600 hover:text-gray-800 cursor-pointer"
            onClick={toggleEditMode}
          >
            <Pencil className="w-[14px] h-[14px]" />
          </button>
        )}
      </div>
    </div>
  );
}
