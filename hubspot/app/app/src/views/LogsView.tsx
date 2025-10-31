import { useAppContext } from '../context/AppContext';
import { Megaphone, Mail, CheckCircle, type LucideIcon } from 'lucide-react';

// Map event types to specific icons and colors for better visual distinction
const eventConfig: Record<string, { icon: LucideIcon; color: string }> = {
  "Campaign Started": { icon: Megaphone, color: "bg-blue-500" },
  "Email Sent": { icon: Mail, color: "bg-purple-500" },
  "Lead Converted": { icon: CheckCircle, color: "bg-green-500" },
};

function LogsView() {
  const { state } = useAppContext();
  const { automationLog } = state;

  if (!automationLog) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">Loading Logs...</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-hub-text mb-6">Automation Log</h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        {automationLog.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
                <p>No automation events have been recorded yet.</p>
            </div>
        ) : (
            <div className="flow-root">
              {/* We reverse the array to show the most recent events first */}
              <ul className="-mb-8">
                {[...automationLog].reverse().map((log, logIdx) => {
                  const config = eventConfig[log.eventType] || { icon: Megaphone, color: "bg-gray-500" };
                  const Icon = config.icon;

                  return (
                    <li key={log.id}>
                      <div className="relative pb-8">
                        {/* Render the vertical line connecting the dots, but not for the last item */}
                        {logIdx !== automationLog.length - 1 ? (
                          <span className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                        ) : null}
                        <div className="relative flex items-start space-x-4">
                            {/* Icon */}
                            <div className={`relative h-10 w-10 flex items-center justify-center rounded-full ${config.color}`}>
                                <Icon className="h-5 w-5 text-white" />
                            </div>
                            {/* Log Content */}
                            <div className="min-w-0 flex-1 pt-1.5">
                                <p className="text-sm text-gray-800">
                                    {log.description}
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    {new Date(log.timestamp).toLocaleString()}
                                </p>
                            </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
        )}
      </div>
    </div>
  );
}

export default LogsView;