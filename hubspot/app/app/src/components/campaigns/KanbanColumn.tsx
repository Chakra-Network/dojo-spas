import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { cn } from "../../lib/utils";
import type { Campaign, CampaignStage } from "../../lib/types";
import CampaignCard from "./CampaignCard";

interface KanbanColumnProps {
  stage: CampaignStage;
  campaigns: Campaign[];
  onStatusToggle: (campaignId: string) => void;
}

function KanbanColumn({ stage, campaigns, onStatusToggle }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });

  return (
    <div className="w-[300px] shrink-0 bg-hub-gray-100 rounded-lg p-3">
      <h3 className="font-bold text-hub-text mb-4 px-1">{stage} ({campaigns.length})</h3>
      <SortableContext
        id={stage}
        items={campaigns.map(c => c.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className={cn(
            "space-y-3 min-h-[500px] rounded-md transition-colors p-1",
            isOver ? "bg-hub-gray-200" : "bg-hub-gray-100"
          )}
        >
          {campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <CampaignCard 
                key={campaign.id} 
                campaign={campaign}
                onStatusToggle={onStatusToggle}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-40">
              <p className="text-sm text-hub-gray-600 text-center px-4">
                No campaigns in this stage.
              </p>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}

export default KanbanColumn;