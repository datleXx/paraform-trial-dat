"use client";

import JobPreviewCard from "./job-preview-card";
import JobContentCard from "./job-content-card";
import { Switch } from "@tremor/react";

const JobTab = () => {
  return (
    <div className="w-screen bg-gray-100">
      <div className="mx-auto flex max-w-7xl px-5">
        <div className="flex w-[50%] flex-col overflow-hidden">
          <div className="flex w-full items-center justify-between bg-black px-2 py-4 text-white">
            <div className="flex flex-col gap-1">
              <h1 className="text-md font-light">Jobs In Australia</h1>
              <p className="text-xs font-extralight">137,676 results</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs font-extralight">Set alert</p>
              <Switch />
            </div>
          </div>

          <div className="h-[calc(100vh-146px)] w-full overflow-y-scroll">
            {Array.from({ length: 10 }, (_, index) => (
              <JobPreviewCard key={index} />
            ))}
          </div>
        </div>
        <div className="scrollbar-hide w-[50%] overflow-hidden">
          <div className="h-[calc(100vh-70px)] w-full overflow-y-scroll">
            <JobContentCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobTab;
