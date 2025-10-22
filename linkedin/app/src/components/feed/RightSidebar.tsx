import {
  IoInformationCircle,
  IoChevronDown,
  IoChevronForward,
} from "react-icons/io5";
import SidebarFooter from "../common/SidebarFooter";
import { newsItems, puzzles } from "@/lib/const";

const puzzleImages: { [key: string]: string } = {
  "Mini Sudoku":
    "https://static.licdn.com/aero-v1/sc/h/9apueo26n1nt4ih0y65rq1r2l",
  Zip: "https://static.licdn.com/aero-v1/sc/h/6h34s6l8pidi1mp97ykfks8tl",
  Tango: "https://static.licdn.com/aero-v1/sc/h/im5l00imv9odauybfemlfxm6",
  Queens: "https://static.licdn.com/aero-v1/sc/h/25itbd3dpc6ockbgvdhot9qp1",
};

export default function RightSidebar() {
  return (
    <div className="w-[300px] flex flex-col gap-2">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden pt-3 pb-4">
        {/* LinkedIn News */}
        <div className="overflow-hidden">
          {/* Header */}
          <div className="flex items-start justify-between pl-5 pr-2">
            <h2 className="text-[20px] leading-[28px] font-semibold text-gray-900">
              LinkedIn News
            </h2>
            <button
              className="text-gray-600 hover:text-gray-900 cursor-pointer"
              aria-label="Information about LinkedIn News"
            >
              <IoInformationCircle size={16} />
            </button>
          </div>

          {/* Top stories subheader */}
          <h3 className="text-[16px] leading-[20px] font-semibold text-gray-600 pt-2 px-5">
            Top stories
          </h3>

          {/* News Items */}
          <ul className="space-y-0 mt-1">
            {newsItems.map((item) => (
              <li key={item.id}>
                <a
                  href="#"
                  className="block hover:bg-gray-50 pl-5 pr-3 py-2 transition-colors h-12 items-center cursor-pointer"
                >
                  <h4 className="text-[14px] font-semibold text-gray-900 mb-1 leading-tight pr-4 truncate">
                    {item.title}
                  </h4>
                  <p className="text-[12px] text-gray-600 truncate">
                    {item.timeAgo} • {item.readerCount}
                  </p>
                </a>
              </li>
            ))}
          </ul>

          {/* Show more button */}
          <button className="w-fit text-left ml-3 mb-3 px-2 py-1 hover:bg-gray-50 transition-colors flex items-center gap-1 text-gray-600 rounded-md cursor-pointer">
            <span className="text-[14px] font-semibold">Show more</span>
            <IoChevronDown size={16} />
          </button>
        </div>

        {/* Today's Puzzles */}
        <div className="overflow-hidden">
          {/* Header */}
          <h2 className="text-[16px] leading-[20px] font-semibold text-gray-600 pl-5 pt-2">
            Today's puzzles
          </h2>

          {/* Puzzle Items */}
          <ul className="space-y-0 mt-2">
            {puzzles.map((puzzle) => (
              <li key={puzzle.id}>
                <a
                  href="#"
                  className="flex items-center hover:bg-gray-50 px-5 py-3 transition-colors h-12 cursor-pointer"
                >
                  <div className="flex items-center flex-1 gap-2">
                    <img
                      src={puzzleImages[puzzle.name]}
                      alt={puzzle.name}
                      className="w-8 h-8 rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[14px] font-semibold text-gray-900 mb-0 truncate">
                        {puzzle.name}
                      </h3>
                      <p className="text-[12px] text-gray-600 truncate">
                        {puzzle.connectionsPlayed} connections played
                      </p>
                    </div>
                  </div>
                  <IoChevronForward
                    size={16}
                    className="text-gray-400 flex-shrink-0"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Show more button */}
        <button className="w-fit text-left ml-3 px-2 py-1 hover:bg-gray-50 transition-colors flex items-center gap-1 text-gray-600 rounded-md cursor-pointer">
          <span className="text-[14px] font-semibold">Show more</span>
          <IoChevronDown size={16} />
        </button>
      </div>

      <SidebarFooter />
    </div>
  );
}
