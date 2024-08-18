import { Skeleton } from "@mui/material";
import JobContentCardSkeleton from "./job-content-card-skeleton";
import JobPreviewCardSkeleton from "./job-preview-card-skeleton";

const JobTabSkeleton = ({ activeJob }: { activeJob: string | null }) => {
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
              <h1 className="text-md font-light">Job Posts</h1>
              <p className="text-xs font-extralight">
                <Skeleton variant="text" width={200} height={20} />
              </p>
            </div>
          </div>

          <div className="h-[calc(100vh-146px)] w-full overflow-y-scroll">
            {Array.from({ length: 10 }, (_, index) => (
              <JobPreviewCardSkeleton key={index} />
            ))}
          </div>
        </div>
        {activeJob !== null && (
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

export default JobTabSkeleton;
