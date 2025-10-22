import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SubSectionTitle({
  title,
  isRequired = false,
  size = "sm",
}: {
  title: string;
  isRequired?: boolean;
  size?: "medium" | "sm";
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 pt-1 pr-2 font-semibold",
        size === "sm"
          ? "text-[13px] leading-[19.5px] mb-1"
          : "text-[14px] leading-[21px] mb-2"
      )}
    >
      {isRequired && <span className="text-red-500">*</span>}
      <span className="text-gray-700">{title}</span>
    </div>
  );
}

export function DetailInput({
  label,
  value,
  setValue,
  isRequired = false,
  type = "text",
  className,
  options,
}: {
  label?: string;
  value: string;
  setValue: (value: string) => void;
  isRequired?: boolean;
  type?: "text" | "textarea" | "select";
  className?: string;
  options?: string[];
}) {
  return (
    <div className={cn("flex flex-col", label && "mb-1", className)}>
      {label && (
        <div className="flex items-center gap-1 text-[13px] leading-[19.5px] pr-2 mb-1 font-semibold">
          {isRequired && <span className="text-red-500">*</span>}
          <span className="text-gray-700">{label}</span>
        </div>
      )}
      {type === "textarea" ? (
        <textarea
          className="w-full px-3 py-2 h-[57px] border border-gray-600 rounded-lg text-[13px] leading-[19.5px] font-normal items-center"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : type === "select" ? (
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger className="w-full h-8 text-[13px] leading-[19.5px] font-normal border-gray-600 cursor-pointer">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <input
          type="text"
          className="w-full px-2 border border-gray-600 rounded-lg text-[13px] leading-[19.5px] font-normal h-8 items-center"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
    </div>
  );
}

export function CollapsedInput({
  value,
  onClick,
}: {
  value: string;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col mt-2 p-1 bg-white rounded-lg border border-gray-200">
      <button
        className="px-3 h-8 flex items-center bg-white border border-gray-600 rounded-full text-[13px] text-blue-700 font-semibold cursor-pointer hover:bg-gray-100"
        onClick={onClick}
      >
        {value}
      </button>
    </div>
  );
}

export function RadioInput({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="radio"
        id={id}
        checked={checked}
        onChange={onChange}
        className="cursor-pointer"
      />
      <label htmlFor={id} className="text-[13px] cursor-pointer text-gray-600">
        {label}
      </label>
    </div>
  );
}
