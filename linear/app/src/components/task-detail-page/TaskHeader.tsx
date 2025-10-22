import { Star, LucideEllipsis } from "lucide-react";
import Button from "@/components/common/Button";
import { CurrentCycle, LinearArrowDown } from "@/components/icons";
import { useLinearState } from "@/context/LinearStateContext";
import { useCallback, useMemo } from "react";
import type { Issue } from "@/lib/types";

export default function TaskHeader({ issue }: { issue: Issue }) {
  const { issues, setTaskId } = useLinearState();

  const issueName = useMemo(
    () => issues.find((i) => i.id === issue.id)?.identifier ?? "",
    [issues, issue.id]
  );
  const indexOfIssue = useMemo(
    () => issues.findIndex((i) => i.id === issue.id),
    [issues, issue.id]
  );
  const numberOfIssues = useMemo(() => issues.length, [issues]);
  const isFirstIssue = useMemo(() => indexOfIssue === 0, [indexOfIssue]);
  const isLastIssue = useMemo(
    () => indexOfIssue === numberOfIssues - 1,
    [indexOfIssue, numberOfIssues]
  );

  const nextIssue = useMemo(
    () => (indexOfIssue < numberOfIssues - 1 ? issues[indexOfIssue + 1] : null),
    [issues, indexOfIssue, numberOfIssues]
  );
  const previousIssue = useMemo(
    () => (indexOfIssue > 0 ? issues[indexOfIssue - 1] : null),
    [issues, indexOfIssue]
  );

  const handleNextIssue = useCallback(() => {
    if (!nextIssue) return;
    setTaskId(nextIssue?.id);
  }, [nextIssue, setTaskId]);

  const handlePreviousIssue = useCallback(() => {
    if (!previousIssue) return;
    setTaskId(previousIssue.id);
  }, [previousIssue, setTaskId]);

  return (
    <header className="flex flex-col">
      <div className="flex items-center justify-between border-b border-border pl-7 pr-[37px] h-[39px]">
        <div className="flex items-center gap-[6px]">
          <div className="flex items-center p-[5px]">
            <CurrentCycle className="w-4 h-4 shrink-0 mr-[6px]" />
            <h1
              className="text-[13px] leading-[16px] font-medium text-neutral-1 hover:text-neutral-2 cursor-pointer"
              onClick={() => setTaskId(undefined)}
            >
              Cycle 50
            </h1>
            <span className="text-neutral-5 px-2">›</span>
            <h1 className="text-[13px] leading-[16px] font-medium text-neutral-1">
              {issueName}
            </h1>
          </div>

          <Button variant="ghost" size="icon">
            <Star className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <LucideEllipsis className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center">
          <span
            className="text-[13px] leading-[15.5px] text-neutral-4 mr-1"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {indexOfIssue + 1}
          </span>
          <span
            className="text-[13px] leading-[15.5px] text-neutral-5 mr-2"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            / {numberOfIssues}
          </span>
          <Button
            variant="ghost"
            size="icon"
            disabled={isLastIssue}
            aria-disabled={isLastIssue}
            onClick={handleNextIssue}
            className="w-7 h-7 mr-[6px]"
          >
            <LinearArrowDown className="w-3 h-3" disabled={isLastIssue} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            disabled={isFirstIssue}
            aria-disabled={isFirstIssue}
            onClick={handlePreviousIssue}
            className="w-7 h-7"
          >
            <LinearArrowDown
              className="w-3 h-3"
              rotate={180}
              disabled={isFirstIssue}
            />
          </Button>
        </div>
      </div>
    </header>
  );
}
