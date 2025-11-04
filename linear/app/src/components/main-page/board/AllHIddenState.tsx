import { AllHidden } from "@/components/icons";

export default function AllHiddenStates({
  state,
}: {
  state: "columns" | "rows" | "all";
}) {
  return (
    <div className="m-8  h-[500px] flex flex-col gap-[22px] items-center justify-center">
      <AllHidden />
      <span className="text-[13px] leading-[15.5px] font-[450] text-neutral-3">
        {state === "columns"
          ? "All columns are hidden"
          : state === "rows"
          ? "All rows are hidden"
          : "All rows and columns are hidden"}
      </span>
    </div>
  );
}
