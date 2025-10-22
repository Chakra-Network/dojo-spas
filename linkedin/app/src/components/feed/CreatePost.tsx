import type { User } from "@/lib/types";
import { IoPlayCircle, IoImage } from "react-icons/io5";
import { BsFillFileTextFill } from "react-icons/bs";

interface CreatePostProps {
  user: User;
}

export default function CreatePost({ user }: CreatePostProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Top Section with Avatar and Input */}
      <div className="p-3 pb-2">
        <div className="flex items-center gap-2">
          <a href="#" className="flex-shrink-0 cursor-pointer">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full"
            />
          </a>
          <button className="flex-1 text-left px-4 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors cursor-pointer">
            <span className="text-[14px] font-semibold text-gray-600">
              Start a post
            </span>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer">
          <IoPlayCircle size={24} className="text-[#5F9B41]" />
          <span className="text-[14px] font-semibold text-gray-600">Video</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer">
          <IoImage size={24} className="text-[#378FE9]" />
          <span className="text-[14px] font-semibold text-gray-600">Photo</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer">
          <BsFillFileTextFill size={20} className="text-[#C37D16]" />
          <span className="text-[14px] font-semibold text-gray-600">
            Write article
          </span>
        </button>
      </div>
    </div>
  );
}
