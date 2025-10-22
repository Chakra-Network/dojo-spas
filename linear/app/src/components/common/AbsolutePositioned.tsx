import { cn } from "@/lib/utils";

export function AbsolutePositioned({
  children,
  position,
}: {
  children: React.ReactNode;
  position: string;
}) {
  return (
    <div className="relative">
      {/* absolute position children */}
      <div className={cn("absolute", position)}>{children}</div>
      {/*filler*/}
      <div className="invisible">{children}</div>
    </div>
  );
}
