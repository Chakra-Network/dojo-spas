import { IoIosStar } from "react-icons/io";
import { VscTriangleDown } from "react-icons/vsc";
import { PiGitBranchBold } from "react-icons/pi";
import {
  PillButtonIconItem,
  PillButtonItem,
  PillButtonLayout,
} from "../common/SmallButtons";
import CommonHeader from "../common/header/CommonHeader";

export default function ContactHeader({ name }: { name: string }) {
  return (
    <CommonHeader
      title="Contact"
      name={name}
      icon={{ Icon: IoIosStar, bg: "bg-purple-500" }}
      rightButtons={<RightButtons />}
    />
  );
}

function RightButtons() {
  return (
    <>
      <PillButtonIconItem>
        <PiGitBranchBold className="w-[14px] h-[14px] rotate-180" />
      </PillButtonIconItem>
      <PillButtonLayout>
        <PillButtonItem className="border-r">New Opportunity</PillButtonItem>
        <PillButtonItem className="border-r">Edit</PillButtonItem>
        <PillButtonItem className="w-8 p-0" isLastItem>
          <VscTriangleDown className="w-[14px] h-[14px]" />
        </PillButtonItem>
      </PillButtonLayout>
    </>
  );
}
