import type { Job } from "@/lib/types";
import { useApp } from "@/contexts/AppContext";
import Button from "@/components/ui/button";

export default function JobsSection({ jobs }: { jobs: Job[] }) {
  const { setMainCategory } = useApp();
  return (
    <div
      id="jobs"
      className="bg-white rounded-lg border border-gray-200 overflow-hidden scroll-mt-[calc(53px+60px+24px)]"
    >
      <div className="p-4">
        <h2 className="text-[20px] font-semibold text-gray-900 mb-4">Jobs</h2>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex items-start gap-3 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0 cursor-pointer"
              onClick={() => setMainCategory("Jobs")}
            >
              <img
                src={job.logo}
                alt={job.company}
                className="w-12 h-12 rounded flex-shrink-0 object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-[14px] font-semibold text-[#0A66C2] hover:underline cursor-pointer line-clamp-2">
                  {job.title}
                </h3>
                <p className="text-[14px] text-gray-900 mt-1">{job.company}</p>
                <p className="text-[14px] text-gray-600 mt-1">{job.location}</p>
                {job.alumni && (
                  <div className="flex items-center gap-1 mt-2">
                    <div className="w-4 h-4 bg-red-600 rounded-sm flex items-center justify-center">
                      <span className="text-[10px] text-white font-bold">
                        U
                      </span>
                    </div>
                    <span className="text-[12px] text-gray-600">
                      {job.alumni} alumni work here
                    </span>
                  </div>
                )}
                <p className="text-[12px] text-gray-600 mt-2">
                  {job.postedTime}
                </p>
              </div>
              <Button variant="secondary">Save</Button>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-200">
        <button
          onClick={() => setMainCategory("Jobs")}
          className="w-full px-4 py-3 text-[16px] leading-[20px] text-gray-600 font-semibold hover:bg-gray-50 transition-colors text-center cursor-pointer"
        >
          See all job results
        </button>
      </div>
    </div>
  );
}
