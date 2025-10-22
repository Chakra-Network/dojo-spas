import { IoCaretDown } from "react-icons/io5";
import CreatePost from "./CreatePost";
import FeedPost from "./FeedPost";
import { useApp } from "@/contexts/AppContext";

export default function FeedCenter() {
  const {
    state: { currentUser, posts },
  } = useApp();
  return (
    <div className="flex-1 max-w-[550px] flex flex-col gap-2">
      {/* Create Post */}
      <CreatePost user={currentUser} />

      {/* Sort Divider */}
      <div className="flex items-center w-full">
        <hr className="flex-1 border-t border-gray-200 mr-2" />
        <button className="flex items-center text-[12px] leading-[16px] text-gray-900 hover:bg-gray-100 rounded transition-colors">
          <span className="text-gray-600">Sort by:</span>
          <span className="font-bold mx-1">Top</span>
          <IoCaretDown size={16} className="text-gray-600" />
        </button>
      </div>

      {/* Feed Posts */}
      {posts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </div>
  );
}
