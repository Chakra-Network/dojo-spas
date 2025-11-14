import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Calendar, User, BarChart2, Play, Pause, Clock } from "lucide-react";
import type { Campaign } from "../../lib/types";
import { useAppContext } from "../../context/AppContext";
import { cn } from "../../lib/utils";

interface CampaignCardProps {
  campaign: Campaign;
  onStatusToggle: (campaignId: string) => void;
}

function CampaignCard({ campaign, onStatusToggle }: CampaignCardProps) {
  const { state } = useAppContext();
  const owner = state.users.find(u => u.id === campaign.ownerId);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: campaign.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the drag from starting when clicking the button
    onStatusToggle(campaign.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 touch-none flex flex-col gap-3 hover:shadow-md hover:border-hub-blue/50 transition-all duration-200"
    >
      <div className="flex justify-between items-start">
        <h4 className="font-semibold text-hub-text pr-2 text-sm">{campaign.name}</h4>
        <div {...listeners} className="cursor-grab text-gray-400 hover:text-hub-text p-1 -m-1">
          <GripVertical size={16} />
        </div>
      </div>
      {/* Refined secondary info section with more icons and clearer labels */}
      <div className="text-xs text-hub-gray-600 space-y-2">
        <div className="flex items-center">
          <User size={14} className="mr-2 shrink-0" />
          <span className="truncate" title={owner?.name || 'Unassigned'}>Owner: {owner?.name || 'Unassigned'}</span>
        </div>
        <div className="flex items-center">
          <Clock size={14} className="mr-2 shrink-0" />
          <span>Created: {new Date(campaign.createDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <BarChart2 size={14} className="mr-2 shrink-0" />
          <span>{campaign.performanceMetrics.clicks} Clicks · {campaign.performanceMetrics.conversions} Conversions</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-1 border-t pt-3">
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleClick}
            className={cn(
                "flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-md transition-colors focus-ring active:scale-[0.97]",
                campaign.status === 'Active' 
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : "bg-gray-200 text-hub-gray-800 hover:bg-gray-300"
            )}
          >
            {campaign.status === 'Active' ? <Pause size={12} /> : <Play size={12} />}
            {campaign.status}
          </button>
          <button
            disabled
            className="flex items-center gap-1.5 text-xs text-gray-400 px-2 py-1 rounded-md border cursor-not-allowed"
          >
            <Calendar size={12} />
            {campaign.scheduledDate ? new Date(campaign.scheduledDate).toLocaleDateString() : 'Schedule'}
          </button>
        </div>
        
        {owner?.avatar && (
            <img src={owner.avatar} alt={owner.name} className="w-6 h-6 rounded-full" title={`Owner: ${owner.name}`} />
        )}
      </div>
    </div>
  );
}

export default CampaignCard;