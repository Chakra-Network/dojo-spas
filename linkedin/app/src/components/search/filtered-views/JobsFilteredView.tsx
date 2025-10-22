import { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { useApp } from "@/contexts/AppContext";
import NoResultsView from "./NoResultsView";

export default function JobsFilteredView() {
  const {
    searchResults: { allJobs: jobs, totalJobs: totalCount },
  } = useApp();
  const [selectedJobId, setSelectedJobId] = useState(jobs[0]?.id);
  const selectedJob = jobs.find((job) => job.id === selectedJobId) || jobs[0];

  if (jobs.length === 0) {
    return <NoResultsView />;
  }

  return (
    <div className="flex-1 flex flex-col gap-4 h-full overflow-hidden">
      <div className="mb-3 flex items-center gap-6">
        <p className="text-[14px] text-gray-600">{totalCount} results</p>
        <button className="flex items-center gap-1 text-[14px] text-[#0A66C2] hover:underline cursor-pointer">
          <IoLocationOutline className="text-[16px]" />
          <span>Greater Sydney Area</span>
        </button>
      </div>
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Left column - Job list */}
        <div className="w-[320px] flex-shrink-0 flex flex-col h-full">
          <div className="bg-white rounded-lg border border-gray-200 overflow-y-auto flex-1">
            {jobs.map((job, index) => (
              <button
                key={job.id}
                onClick={() => setSelectedJobId(job.id)}
                className={`w-full text-left p-4 transition-colors cursor-pointer ${
                  selectedJobId === job.id ? "bg-gray-50" : "hover:bg-gray-50"
                } ${
                  index !== jobs.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-12 h-12 rounded flex-shrink-0 object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-semibold text-[#0A66C2] line-clamp-2 mb-1">
                      {job.title}
                    </h3>
                    <p className="text-[14px] text-gray-900">{job.company}</p>
                    <p className="text-[14px] text-gray-600 mt-1">
                      {job.location}
                    </p>
                    {job.alumni && (
                      <div className="flex items-center gap-1 mt-2">
                        <div className="w-4 h-4 bg-red-600 rounded-sm flex items-center justify-center">
                          <span className="text-[10px] text-white font-bold">
                            U
                          </span>
                        </div>
                        <span className="text-[12px] text-gray-600">
                          {job.alumni} school alumni work here
                        </span>
                      </div>
                    )}
                    <p className="text-[12px] text-gray-600 mt-2">
                      {job.postedTime}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right column - Job detail */}
        {selectedJob && (
          <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-y-auto h-full">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={selectedJob.logo}
                  alt={selectedJob.company}
                  className="w-14 h-14 rounded flex-shrink-0 object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h2 className="text-[20px] font-semibold text-gray-900 mb-2">
                    {selectedJob.title}
                  </h2>
                  <p className="text-[16px] text-gray-900 mb-1">
                    {selectedJob.company}
                  </p>
                  <p className="text-[14px] text-gray-600">
                    {selectedJob.location}
                  </p>
                  <p className="text-[14px] text-gray-600 mt-2">
                    {selectedJob.postedTime} • 11 people clicked apply
                  </p>
                  <p className="text-[12px] text-gray-600 mt-1">
                    Responses managed off LinkedIn
                  </p>
                </div>
              </div>

              {/* Job type badges */}
              <div className="flex items-center gap-2 mb-6">
                <span className="px-3 py-1 border border-gray-600 rounded-full text-[14px] text-gray-900">
                  On-site
                </span>
                <span className="px-3 py-1 border border-gray-600 rounded-full text-[14px] text-gray-900">
                  {selectedJob.employmentType}
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 mb-6">
                <button className="flex-1 px-6 py-2 bg-[#0A66C2] text-white rounded-full text-[16px] font-semibold hover:bg-[#004182] transition-colors cursor-pointer">
                  Apply
                </button>
                <button className="px-6 py-2 border-2 border-[#0A66C2] text-[#0A66C2] rounded-full text-[16px] font-semibold hover:bg-[#0A66C2] hover:bg-opacity-10 transition-colors cursor-pointer">
                  Save
                </button>
              </div>

              {/* Profile status */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-[16px] font-semibold text-gray-900 mb-2">
                  Your profile is <span className="text-red-600">missing</span>{" "}
                  required qualifications
                </h3>
                <button className="text-[14px] text-[#0A66C2] hover:underline cursor-pointer">
                  ⭐ Show match details
                </button>
              </div>

              {/* People you can reach out to */}
              {selectedJob.alumni && (
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="text-[16px] font-semibold text-gray-900 mb-4">
                    People you can reach out to
                  </h3>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50">
                    <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center">
                      <span className="text-[16px] text-white font-bold">
                        U
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] font-semibold text-gray-900">
                        School alumni from University of Sydney
                      </p>
                    </div>
                    <button className="px-4 py-1.5 border border-gray-900 text-gray-900 rounded-full text-[14px] font-semibold hover:bg-gray-100 transition-colors cursor-pointer">
                      Show all
                    </button>
                  </div>
                </div>
              )}

              {/* About the job */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-[16px] font-semibold text-gray-900 mb-3">
                  About the job
                </h3>
                <p className="text-[14px] text-gray-700 leading-relaxed mb-3">
                  We are looking for a talented professional to join our
                  dynamic, collaborative team. As part of our organization, you
                  will work on high-impact projects that directly contribute to
                  our company’s mission and growth. This role offers extensive
                  opportunities to expand your skills, take ownership of
                  challenging tasks, and make a meaningful difference in a
                  supportive environment.
                </p>
                <p className="text-[14px] text-gray-700 leading-relaxed mb-3">
                  In this position, you will collaborate with cross-functional
                  teams to drive continuous improvement, solve complex problems,
                  and help us deliver exceptional value to our customers. We are
                  committed to empowering our employees through mentorship,
                  training, and clear pathways for advancement.
                </p>
                <p className="text-[14px] text-gray-700 leading-relaxed">
                  If you are passionate about innovation, eager to take the next
                  step in your career, and ready to contribute your expertise to
                  a company that values diversity and creativity, we want to
                  hear from you!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
