import { Pencil, Inbox, Star, Clock, Send, FileText, AlertTriangle, Trash2, Tag } from "lucide-react";
import type { Label } from "./types";

interface SidebarProps {
  labels: Label[];
  currentLabel: string;
  onLabelClick: (labelId: string) => void;
  onCompose: () => void;
  collapsed: boolean;
}

const iconMap = {
  inbox: Inbox,
  star: Star,
  clock: Clock,
  send: Send,
  "file-text": FileText,
  "alert-triangle": AlertTriangle,
  "trash-2": Trash2,
  tag: Tag,
};

export default function Sidebar({
  labels,
  currentLabel,
  onLabelClick,
  onCompose,
  collapsed,
}: SidebarProps) {
  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-300 ${collapsed ? "w-0 overflow-hidden" : "w-64"}`}>
      <div className="p-4">
        <button
          onClick={onCompose}
          className="flex items-center gap-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-full px-6 py-3 shadow-sm transition-all hover:shadow-md"
        >
          <Pencil className="w-5 h-5" />
          <span className="font-medium text-gray-700">Compose</span>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        {labels.map((label) => {
          const IconComponent = iconMap[label.icon as keyof typeof iconMap];
          return (
            <button
              key={label.id}
              onClick={() => onLabelClick(label.id)}
              className={`w-full flex items-center gap-4 px-6 py-2 hover:bg-gray-100 transition-colors ${
                currentLabel === label.id
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700"
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="flex-1 text-left text-sm">{label.name}</span>
              {label.count !== undefined && label.count > 0 && (
                <span className="text-xs font-semibold">{label.count}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <div className="flex justify-between mb-1">
            <span>15 GB of 15 GB used</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-blue-600 h-1 rounded-full"
              style={{ width: "80%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
