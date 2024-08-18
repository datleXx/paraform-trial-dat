"use client";

import JobPreviewCard from "./job-preview-card";
import JobContentCard from "./job-content-card";
import { useEffect, useRef, useState } from "react";
import { getGreenhouseJobs } from "~/helper/greenhouseHelper";
import { api } from "~/trpc/react";
import JobTabSkeleton from "./skeleton/job-tab-skeleton";
import JobContentCardSkeleton from "./skeleton/job-content-card-skeleton";

const JobTab = () => {
  const [activeJob, setActiveJob] = useState<string | null>("4063668007");

  const ref = useRef<HTMLDivElement>(null);
  const { data: jobs, isLoading: jobsLoading } =
    api.job.fetchAllJobs.useQuery();
  const { data: job, isLoading: jobLoading } = api.job.fetchJobById.useQuery({
    id: activeJob ?? "",
  });
  console.log(jobs);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeJob]);

  if (jobsLoading) {
    return <JobTabSkeleton activeJob={activeJob} />;
  }

  return (
    <div className="w-screen bg-gray-100">
      <div className="mx-auto flex max-w-7xl md:px-5">
        <div
          className={`flex w-full flex-col overflow-hidden ${
            activeJob !== null ? "hidden md:block md:w-[50%]" : "md:w-full"
          }`}
        >
          <div className="flex w-full items-center justify-between bg-black px-2 py-4 text-white">
            <div className="flex flex-col gap-1">
              <h1 className="text-md font-light">Job Posts</h1>
              <p className="text-xs font-extralight">
                {jobs?.length ?? 0} results
              </p>
            </div>
          </div>

          <div className="h-[calc(100vh-146px)] w-full overflow-y-scroll">
            {jobs?.map((job) => (
              <div
                key={job.id}
                onClick={() => setActiveJob(job.id)}
                ref={activeJob === job.id ? ref : null}
              >
                <JobPreviewCard
                  isActive={activeJob === job.id}
                  onClick={() => setActiveJob(job.id)}
                  title={job.title}
                  company={job.company ?? ""}
                  location={job.location ?? ""}
                />
              </div>
            ))}
          </div>
        </div>
        {activeJob !== null && job && (
          <div className="w-full md:w-[50%]">
            <div className="h-[calc(100vh-70px)] w-full overflow-y-scroll">
              <JobContentCard
                totalJobs={10}
                activeJob={activeJob}
                setActiveJob={setActiveJob}
                title={job.title}
                location={job.location}
                description={job.description}
              />
            </div>
          </div>
        )}
        {jobLoading && activeJob !== null && (
          <div className="w-full md:w-[50%]">
            <div className="h-[calc(100vh-70px)] w-full overflow-y-scroll">
              <JobContentCardSkeleton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobTab;
