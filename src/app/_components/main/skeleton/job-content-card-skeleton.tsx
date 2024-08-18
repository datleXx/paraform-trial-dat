import { Button, Card } from "@tremor/react";
import { Skeleton } from "@mui/material";

const JobContentCardSkeleton = () => {
  return (
    <Card className="h-full !rounded-none">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Skeleton variant="rectangular" width={20} height={20} />

          <h1 className="text-sm font-semibold transition-all hover:underline">
            <Skeleton variant="text" width={200} height={20} />
          </h1>
        </div>
        <div>
          <div className="flex items-center justify-start gap-2">
            <h1 className="cursor-pointer text-2xl font-medium transition-all hover:underline">
              <Skeleton variant="text" width={200} height={20} />
            </h1>
            <button className="rounded-full p-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-red-600">
              <Skeleton variant="rectangular" width={20} height={20} />
            </button>
            <div className="ml-auto flex items-center gap-2">
              <Button className="rounded-full hover:bg-blue-600">
                <Skeleton variant="text" width={50} height={20} />
              </Button>
            </div>
          </div>
          <p className="text-sm font-light text-gray-500">
            <Skeleton variant="text" width={200} height={20} />
          </p>
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <div className="text-base font-medium">Skills</div>
            <div className="mt-2 flex flex-wrap gap-2">
              <div className="rounded-full bg-black px-2 py-1 text-xs text-white hover:bg-black/75">
                <Skeleton variant="text" width={40} height={20} />
              </div>
            </div>
          </div>
          <div>
            <div className="text-base font-medium">Salary Range</div>
            <div className="mt-1 text-sm font-light text-gray-500">
              <Skeleton variant="text" width={100} height={20} />
            </div>
          </div>
          <div>
            <div className="text-base font-medium">Equity</div>
            <div className="mt-1 text-sm font-light text-gray-500">
              <Skeleton variant="text" width={100} height={20} />
            </div>
          </div>

          <div>
            <div className="text-base font-medium">Location</div>
            <div className="mt-1 text-sm font-light text-gray-500">
              <Skeleton variant="text" width={200} height={20} />
            </div>
          </div>
          <div>
            <div className="text-base font-medium">Application Deadline</div>
            <div className="mt-1 text-sm font-light text-gray-500">
              <Skeleton variant="text" width={100} height={20} />
            </div>
          </div>
          <div>
            <div className="text-base font-medium">About the job</div>
            <p className="mt-1 text-sm font-light text-gray-500">
              <Skeleton variant="text" width={200} height={50} />
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JobContentCardSkeleton;
