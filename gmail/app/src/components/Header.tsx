import { Menu, Mail, Search, HelpCircle, Settings, MoreVertical } from "lucide-react";

interface HeaderProps {
  onSearch: (query: string) => void;
  onMenuClick: () => void;
}

export default function Header({ onSearch, onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-4">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="p-2 hover:bg-gray-100 rounded-full">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <Mail className="w-6 h-6 text-red-500" />
          <span className="text-xl font-normal text-gray-600">Gmail</span>
        </div>
      </div>

      <div className="flex-1 max-w-3xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search mail"
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-gray-100 hover:bg-gray-200 focus:bg-white focus:shadow-md rounded-lg px-4 py-3 pl-12 outline-none transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Settings className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreVertical className="w-5 h-5" />
        </button>
        <div className="ml-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
          M
        </div>
      </div>
    </header>
  );
}
