"use client";

import JobPreviewCard from "./job-preview-card";
import JobContentCard from "./job-content-card";
import { Switch } from "@tremor/react";
import { useEffect, useRef, useState } from "react";

const JobTab = () => {
  const [activeJob, setActiveJob] = useState<number | null>(0);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeJob]);

  return (
    <div className="w-screen bg-gray-100">
      <div className="mx-auto flex max-w-7xl px-5">
        <div
          className={`flex w-full flex-col overflow-hidden ${
            activeJob !== null ? "hidden md:block md:w-[50%]" : "md:w-full"
          }`}
        >
          <div className="flex w-full items-center justify-between bg-black px-2 py-4 text-white">
            <div className="flex flex-col gap-1">
              <h1 className="text-md font-light">Jobs In Australia</h1>
              <p className="text-xs font-extralight">137,676 results</p>
            </div>
          </div>

          <div className="h-[calc(100vh-146px)] w-full overflow-y-scroll">
            {Array.from({ length: 10 }, (_, index) => (
              <div
                key={index}
                onClick={() => setActiveJob(index)}
                ref={activeJob === index ? ref : null}
              >
                <JobPreviewCard
                  isActive={activeJob === index}
                  onClick={() => setActiveJob(index)}
                />
              </div>
            ))}
          </div>
        </div>
        {activeJob !== null && (
          <div className="w-full md:w-[50%]">
            <div className="h-[calc(100vh-70px)] w-full overflow-y-scroll">
              <JobContentCard
                totalJobs={10}
                activeJob={activeJob}
                setActiveJob={setActiveJob}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobTab;
