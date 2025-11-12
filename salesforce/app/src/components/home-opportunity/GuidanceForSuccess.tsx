import type { OpportunityStage } from "@/lib/types";
import { GUIDANCE_CONTENT } from "@/lib/consts";

interface GuidanceForSuccessProps {
  stage: OpportunityStage;
}

export default function GuidanceForSuccess({ stage }: GuidanceForSuccessProps) {
  // Use "Closed Won" content for "Closed Lost" as well
  const displayStage: Exclude<OpportunityStage, "Closed Lost"> =
    stage === "Closed Lost" ? "Closed Won" : stage;
  const content = GUIDANCE_CONTENT[displayStage];

  return (
    <div className="pt-4 pb-5 text-[13px] leading-[19.5px]">
      <h3 className="text-[12px] leading-[13.5px] font-semibold text-gray-700 mb-5">
        Guidance for Success
      </h3>

      <div className="mb-5">
        <p className="font-semibold text-gray-700">{content.title}</p>
        <p className=" text-gray-600 whitespace-pre-line">
          {`- ${content.bullets.join("\n - ")}`}
        </p>
      </div>

      <p className="text-gray-600">{content.footer}</p>
    </div>
  );
}
