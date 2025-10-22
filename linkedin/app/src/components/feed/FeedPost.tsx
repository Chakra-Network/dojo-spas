import type { Post } from "@/lib/types";
import {
  IoEllipsisHorizontal,
  IoClose,
  IoChatboxOutline,
  IoRepeat,
  IoPaperPlaneOutline,
  IoEarth,
  IoAddCircleOutline,
} from "react-icons/io5";
import { useApp } from "@/contexts/AppContext";
import type { JSX } from "react";
import { SlLike } from "react-icons/sl";
import { cn } from "@/lib/utils";

interface FeedPostProps {
  post: Post;
}

const reactionImages = {
  like: "https://static.licdn.com/aero-v1/sc/h/8ekq8gho1ruaf8i7f86vd1ftt",
  celebrate: "https://static.licdn.com/aero-v1/sc/h/b1dl5jk88euc7e9ri50xy5qo8",
  love: "https://static.licdn.com/aero-v1/sc/h/cpho5fghnpme8epox8rdcds22",
};

export default function FeedPost({ post }: FeedPostProps) {
  const { navigateToProfile } = useApp();
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Post Header Section */}
      <div className="pt-3 px-3">
        {/* Repost indicator */}
        {post.isRepost && post.repostedBy && (
          <div className="flex items-center gap-1 mb-2 text-[12px] text-gray-600">
            <button
              onClick={() => navigateToProfile(post.repostedBy!.id)}
              className="flex-shrink-0 cursor-pointer"
            >
              <img
                src={post.repostedBy.avatar}
                alt={post.repostedBy.name}
                className="w-6 h-6 rounded-full hover:brightness-90 transition-all"
              />
            </button>
            <span>
              <button
                onClick={() => navigateToProfile(post.repostedBy!.id)}
                className="font-semibold hover:text-[#0A66C2] hover:underline cursor-pointer"
              >
                {post.repostedBy.name}
              </button>{" "}
              reposted this
            </span>
          </div>
        )}

        {/* Author Info and Controls */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-start gap-2 flex-1">
            <button
              onClick={() => navigateToProfile(post.author.id)}
              className="flex-shrink-0 cursor-pointer"
            >
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full hover:brightness-90 transition-all"
              />
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => navigateToProfile(post.author.id)}
                  className="group text-left cursor-pointer"
                >
                  <h3 className="text-[14px] font-bold text-gray-900 group-hover:underline group-hover:text-[#0A66C2]">
                    {post.author.name}
                  </h3>
                </button>
              </div>

              {post.authorType === "company" && post.followers && (
                <p className="text-[12px] text-gray-600">{post.followers}</p>
              )}

              <div className="flex items-center gap-1 text-[12px] text-gray-600">
                <span>{post.timestamp}</span>
                <span>•</span>
                <IoEarth size={14} className="text-gray-600" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 ml-2">
            {!post.isFollowing && (
              <button className="flex items-center gap-1 px-4 py-1 text-[#0A66C2] hover:bg-blue-50 rounded-full font-semibold text-[14px] border border-[#0A66C2] transition-colors cursor-pointer">
                <IoAddCircleOutline size={16} />
                <span>Follow</span>
              </button>
            )}
            <button className="text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors cursor-pointer">
              <IoEllipsisHorizontal size={20} />
            </button>
            <button className="text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors cursor-pointer">
              <IoClose size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Post Content */}
      {post.content && (
        <div className="px-3 pb-2">
          <p className="text-[14px] text-gray-900 leading-[1.4] whitespace-pre-line">
            {post.content.length > 200
              ? post.content.substring(0, 200)
              : post.content}
            {post.content.length > 200 && (
              <button className="text-[#0A66C2] hover:underline ml-1 cursor-pointer">
                ...more
              </button>
            )}
          </p>
        </div>
      )}

      {/* Post Images */}
      {post.images && post.images.length > 0 && (
        <div className="relative">
          {post.images.length === 1 && (
            <button className="w-full cursor-pointer">
              <img
                src={post.images[0]}
                alt=""
                className="w-full object-cover"
              />
            </button>
          )}

          {post.images.length === 2 && (
            <div className="grid grid-cols-2 gap-0.5">
              {post.images.map((image, index) => (
                <button key={index} className="w-full cursor-pointer">
                  <img
                    src={image}
                    alt=""
                    className="w-full h-[300px] object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {post.images.length === 3 && (
            <div className="grid grid-cols-2 gap-0.5">
              <button className="col-span-2 w-full cursor-pointer">
                <img
                  src={post.images[0]}
                  alt=""
                  className="w-full h-[300px] object-cover"
                />
              </button>
              {post.images.slice(1).map((image, index) => (
                <button key={index} className="w-full cursor-pointer">
                  <img
                    src={image}
                    alt=""
                    className="w-full h-[200px] object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {post.images.length >= 4 && (
            <div className="grid grid-cols-2 gap-0.5">
              {post.images.slice(0, 4).map((image, index) => (
                <button key={index} className="w-full relative cursor-pointer">
                  <img
                    src={image}
                    alt=""
                    className="w-full h-[250px] object-cover"
                  />
                  {index === 3 && post.images && post.images.length > 4 && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                      <span className="text-white text-3xl font-semibold">
                        +{post.images && post.images.length - 4}
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reactions and Stats */}
      <div className="px-3 py-2">
        <div className="flex items-center justify-between text-[12px]">
          <button className="flex items-center gap-1 hover:text-[#0A66C2] hover:underline cursor-pointer">
            <div className="flex items-center -space-x-1">
              <img src={reactionImages.like} alt="like" className="w-4 h-4" />
              <img
                src={reactionImages.celebrate}
                alt="celebrate"
                className="w-4 h-4"
              />
              <img src={reactionImages.love} alt="love" className="w-4 h-4" />
            </div>
            <span className="text-gray-600">
              {post.reactionText || `${post.totalReactions}`}
            </span>
          </button>

          <div className="flex items-center gap-2 text-gray-600">
            {post.commentCount > 0 && (
              <button className="hover:text-[#0A66C2] hover:underline cursor-pointer">
                {post.commentCount} comment{post.commentCount !== 1 && "s"}
              </button>
            )}
            {post.commentCount > 0 && post.repostCount > 0 && <span>•</span>}
            {post.repostCount > 0 && (
              <button className="hover:text-[#0A66C2] hover:underline cursor-pointer">
                {post.repostCount} repost{post.repostCount !== 1 && "s"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 flex items-center">
        <ActionButton Icon={SlLike} iconClassName="scale-x-[-1]" text="Like" />
        <ActionButton Icon={IoChatboxOutline} text="Comment" />
        <ActionButton Icon={IoRepeat} text="Repost" />
        <ActionButton Icon={IoPaperPlaneOutline} text="Send" />
      </div>
    </div>
  );
}

function ActionButton({
  Icon,
  text,
  iconClassName,
}: {
  Icon: JSX.ElementType;
  iconClassName?: string;
  text: string;
}) {
  return (
    <button className="flex-1 flex items-center justify-center gap-1 px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer">
      <Icon className={cn("text-gray-600 w-4 h-4", iconClassName)} />
      <span className="text-[14px] leading-[20px] font-semibold text-gray-600">
        {text}
      </span>
    </button>
  );
}
