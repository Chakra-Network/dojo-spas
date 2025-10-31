import { useAppContext } from "@/context/AppProvider";
import {
  Settings,
  Search,
  Pencil,
  Table2,
  ArrowUpDown,
  PieChart,
  Filter,
  PinIcon,
} from "lucide-react";
import {
  PillButtonIconItem,
  PillButtonIconWithDropdown,
  PillButtonItem,
  PillButtonLayout,
} from "@/components/common/SmallButtons";
import { VscTriangleDown } from "react-icons/vsc";
import { IoRefresh } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa6";
import { DesertSmall } from "@/components/resources/svgs";

export default function HomeListLeads() {
  const { state } = useAppContext();
  const leads = state.leads.filter((lead) => lead.leadStatus !== "Converted");

  return (
    <div className="p-4 h-[calc(100vh-139px-40px)] flex flex-col">
      {/* Header Section */}
      <div className="flex-shrink-0">
        {/* Breadcrumb/Title */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
              <IoIosStar className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col ">
              <div className="text-[13px] leading-[13px] text-gray-600">
                Leads
              </div>
              <div className="flex items-center">
                <div className="flex items-center gap-1 w-[240px]">
                  <h2 className="text-[28px] leading-[49px] text-gray-800 cursor-pointer hover:underline ">
                    Recently Viewed
                  </h2>
                  <button className="w-6 h-6 flex items-center justify-center">
                    <VscTriangleDown className="w-[14px] h-[14px]" />
                  </button>
                </div>

                <button className="w-6 h-6 border border-gray-600 text-blue-600 rounded-full flex items-center justify-center">
                  <PinIcon className="w-[14px] h-[14px] rotate-45" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <PillButtonLayout>
            <PillButtonItem className="border-r">New</PillButtonItem>
            <PillButtonItem className="border-r">Import</PillButtonItem>
            <PillButtonItem className="border-r">
              Add to Campaign
            </PillButtonItem>
            <PillButtonItem className="border-r">Send Email</PillButtonItem>
            <PillButtonItem className="border-r">Change Owner</PillButtonItem>
            <PillButtonItem className="w-8 p-0" isLastItem>
              <VscTriangleDown className="w-[14px] h-[14px]" />
            </PillButtonItem>
          </PillButtonLayout>
        </div>

        {/* Search and Filter Bar */}
        <div className="px-6 pb-4 flex items-center">
          <div className="text-[12px] text-gray-600 flex-1">
            {leads.length} item{leads.length !== 1 ? "s" : ""} • Updated a few
            seconds ago
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search this list..."
              className="w-[240px] h-8 pl-10 pr-4 border border-gray-600 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <PillButtonIconWithDropdown Icon={Settings} className="ml-1" />
          <PillButtonIconWithDropdown Icon={Table2} className="ml-1" />
          <PillButtonIconItem className="ml-1">
            <Settings className="w-[14px] h-[14px]" />
          </PillButtonIconItem>
          <PillButtonIconItem className="ml-2">
            <IoRefresh className="w-[14px] h-[14px]" />
          </PillButtonIconItem>
          <PillButtonIconItem className="ml-2">
            <ArrowUpDown className="w-[14px] h-[14px]" />
          </PillButtonIconItem>
          <PillButtonIconItem className="ml-2">
            <Pencil className="w-[14px] h-[14px]" />
          </PillButtonIconItem>
          <PillButtonLayout className="ml-2">
            <PillButtonItem className="w-8 h-full p-0 bg-gray-100 hover:bg-gray-100">
              <PieChart className="w-[14px] h-[14px] text-gray-600" />
            </PillButtonItem>
            <PillButtonItem
              className="w-8 h-full p-0 bg-gray-100 hover:bg-gray-100"
              isLastItem
            >
              <Filter className="w-[14px] h-[14px] text-gray-600" />
            </PillButtonItem>
          </PillButtonLayout>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto flex-1 rounded-lg border border-gray-200 bg-gray-100">
        <table className="w-full">
          <thead className="rounded-t-lg">
            <tr className="border-b border-gray-200 h-8">
              <th className="w-12 px-2 h-8 text-left text-[12px] font-semibold text-gray-700">
                {""}
              </th>
              <th className="w-12 px-4 h-8 text-center hover:bg-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                />
              </th>
              <CustomHeader name="Name" />
              <CustomHeader name="Title" />
              <CustomHeader name="Company" />
              <CustomHeader name="Phone" />
              <CustomHeader name="Email" />
              <CustomHeader name="Lead Status" />
              <CustomHeader name="Owner Alias" />
              <th className="w-16 px-4 h-8 text-center text-[12px] font-semibold text-gray-700">
                {""}
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="h-[200px] w-[300px] shrink-0">
                      <DesertSmall className="h-[200px] w-auto mx-auto shrink-0" />
                    </div>
                    <span className="whitespace-pre-line text-[13px] leading-[19.5px]">
                      {
                        "You haven't viewed any Leads recently.\nTry switching list views."
                      }
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              leads.map((lead, index) => (
                <tr
                  key={lead.id}
                  className="h-8 border-b border-gray-200 hover:bg-gray-50 bg-white"
                >
                  <td className="px-2 py-1 text-[13px] text-gray-600">
                    {index + 1}
                  </td>
                  <td className="px-4 py-1">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-1">
                    <a
                      href="#"
                      className="text-[13px] text-blue-600 hover:text-blue-800 hover:underline font-medium"
                    >
                      {lead.name}
                    </a>
                  </td>
                  <td className="px-4 py-1 text-[13px] text-gray-700">
                    {lead.title || ""}
                  </td>
                  <td className="px-4 py-1 text-[13px] text-gray-700">
                    {lead.company || ""}
                  </td>
                  <td className="px-4 py-1 text-[13px] text-gray-700">
                    {lead.phone || ""}
                  </td>
                  <td className="px-4 py-1 text-[13px] text-gray-700">
                    {lead.email || ""}
                  </td>
                  <td className="px-4 py-1 text-[13px] text-gray-700">
                    {lead.leadStatus || "New"}
                  </td>
                  <td className="px-4 py-1 text-[13px] text-gray-700">
                    {lead.leadOwner
                      ? lead.leadOwner
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : "DA"}
                  </td>
                  <td className="px-4 py-1">
                    <button className="w-5 h-5 flex items-center justify-center hover:text-blue-700 hover:bg-gray-100 rounded-full border border-gray-600 text-blue-600 cursor-pointer">
                      <VscTriangleDown className="w-[14px] h-[14px]" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CustomHeader({ name }: { name: string }) {
  return (
    <th className="px-2 h-8 text-left text-[13px] font-semibold text-gray-600 border-r border-gray-200 hover:bg-gray-300 cursor-pointer">
      <div className="flex items-center justify-between">
        <span>{name}</span>
        <FaChevronDown className="w-[14px] h-[14px] text-blue-600" />
      </div>
    </th>
  );
}
