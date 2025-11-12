import type { LucideIcon } from "lucide-react";

interface FieldItem {
  label: string;
  value: string;
  isLink?: boolean;
}

interface ConvertedRecordCardProps {
  sectionTitle: string;
  icon: LucideIcon;
  iconBgColor: string;
  recordName: string;
  fields: FieldItem[];
}

export default function ConvertedRecordCard({
  sectionTitle,
  icon: Icon,
  iconBgColor,
  recordName,
  fields,
}: ConvertedRecordCardProps) {
  return (
    <div className="flex flex-col p-4 w-[320px] shrink-0">
      <div className="text-[20.8px] leading-[26px] font-light text-gray-500 tracking-wider py-4 pr-4 ">
        {sectionTitle}
      </div>
      <div className="bg-white border border-gray-200 rounded-lg h-[176px] relative">
        <div
          className={`w-8 h-8 rounded-full ${iconBgColor} flex items-center justify-center flex-shrink-0 absolute top-4 left-4`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>

        <div className="flex-1 min-w-0 mt-4 ml-[60px]">
          <h3 className="text-[28px] leading-[42px] text-blue-600 mb-1 truncate">
            {recordName}
          </h3>
        </div>
        <div className="text-[14px] leading-[21px] mb-4 mr-4 ml-[60px] mt-1">
          {fields.map((field, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="text-gray-500">{field.label}:</div>
              <div className={field.isLink ? "text-blue-600" : "text-gray-900"}>
                {field.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
