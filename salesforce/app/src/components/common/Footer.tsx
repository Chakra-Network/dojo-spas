import { ListTodo } from "lucide-react";

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-[76px] right-0 bg-white border-t border-gray-200 z-40 h-[40px]">
      <button className="flex items-center px-4 h-full text-gray-600 hover:text-[#0176D3] transition-colors border-b-3 border-transparent hover:border-[#0176D3] cursor-pointer">
        <ListTodo className="w-[14px] h-[14px] mr-2" />
        <span className="text-[13px] font-semibold">To Do List</span>
      </button>
    </div>
  );
}
