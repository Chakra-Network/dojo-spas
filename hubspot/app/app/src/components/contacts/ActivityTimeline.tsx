import type { ContactActivity } from '../../lib/types';
import { Mail, Phone, Users, StickyNote } from 'lucide-react';

const activityIconMap = {
  Email: Mail,
  Call: Phone,
  Meeting: Users,
  Note: StickyNote,
};

function ActivityTimeline({ activities }: { activities: ContactActivity[] }) {
  return (
    <div>
      <h4 className="text-md font-semibold text-gray-700 mb-3">Activity</h4>
      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map(activity => {
            const Icon = activityIconMap[activity.type];
            return (
              <div key={activity.id} className="flex gap-3">
                <div className="shrink-0 bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-800">{activity.description}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500">No activities logged.</p>
        )}
      </div>
    </div>
  );
}

export default ActivityTimeline;