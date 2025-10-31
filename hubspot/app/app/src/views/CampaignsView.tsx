import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { useAppContext } from "../context/AppContext";
import type { Campaign, CampaignStage } from "../lib/types";
import KanbanColumn from "../components/campaigns/KanbanColumn";
import CampaignCard from "../components/campaigns/CampaignCard";

const STAGES: CampaignStage[] = ["Draft", "Scheduled", "Active", "Completed"];

function CampaignsView() {
  const { state, setState } = useAppContext();
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleStatusToggle = (campaignId: string) => {
    setState(prevState => {
      let toggledCampaign: Campaign | undefined;
      const updatedCampaigns = prevState.campaigns.map(campaign => {
        if (campaign.id === campaignId) {
          const newStatus: Campaign['status'] = campaign.status === 'Active' ? 'Paused' : 'Active';
          toggledCampaign = { ...campaign, status: newStatus };
          return toggledCampaign;
        }
        return campaign;
      });

      if (toggledCampaign && toggledCampaign.status === 'Active') {
        const newLogEntry = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString(),
          eventType: "Campaign Started" as const,
          description: `Campaign '${toggledCampaign.name}' has been activated.`,
        };
        return {
          ...prevState,
          campaigns: updatedCampaigns,
          automationLog: [...prevState.automationLog, newLogEntry],
        };
      }

      return { ...prevState, campaigns: updatedCampaigns };
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const campaign = state.campaigns.find(c => c.id === active.id);
    if (campaign) {
      setActiveCampaign(campaign);
    }
  };
  
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
  
    const activeId = active.id;
    const overId = over.id;
  
    if (activeId === overId) return;
  
    const activeCampaign = state.campaigns.find((c) => c.id === activeId);
    if (!activeCampaign) return;
  
    const isOverAColumn = STAGES.includes(over.id as CampaignStage);
  
    if (activeCampaign && isOverAColumn) {
      if (activeCampaign.stage !== over.id) {
        setState((prevState) => {
          const activeIndex = prevState.campaigns.findIndex((c) => c.id === activeId);
          prevState.campaigns[activeIndex].stage = over.id as CampaignStage;
          return { ...prevState, campaigns: [...prevState.campaigns] };
        });
      }
    }
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    setActiveCampaign(null);
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeCampaign = state.campaigns.find((c) => c.id === active.id);
    const overCampaign = state.campaigns.find((c) => c.id === over.id);

    if (activeCampaign && overCampaign && activeCampaign.stage === overCampaign.stage) {
      setState((prevState) => {
        const oldIndex = prevState.campaigns.findIndex((c) => c.id === active.id);
        const newIndex = prevState.campaigns.findIndex((c) => c.id === over.id);
        
        return {
          ...prevState,
          campaigns: arrayMove(prevState.campaigns, oldIndex, newIndex),
        };
      });
    }
  };
  
  return (
    <div className="p-4 lg:p-8 bg-hub-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-hub-text mb-6">Campaigns</h1>
        <DndContext 
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {/* Add a wrapper for horizontal scrolling on smaller screens */}
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-[1200px]">
              {STAGES.map((stage) => (
                <KanbanColumn
                  key={stage}
                  stage={stage}
                  campaigns={state.campaigns.filter((c) => c.stage === stage)}
                  onStatusToggle={handleStatusToggle}
                />
              ))}
            </div>
          </div>
          <DragOverlay>
            {activeCampaign ? (
              <CampaignCard campaign={activeCampaign} onStatusToggle={() => {}} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

export default CampaignsView;