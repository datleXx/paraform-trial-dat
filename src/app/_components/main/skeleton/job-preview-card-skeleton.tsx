import { Card } from "@tremor/react";
import { Skeleton } from "@mui/material";

const JobPreviewCardSkeleton = () => {
  return (
    <Card
      className={`flex w-full cursor-pointer items-center gap-2 !rounded-none`}
    >
      <div className="flex flex-col items-start">
        <h1 className="cursor-pointer text-base font-semibold text-black transition-all hover:underline">
          <Skeleton variant="text" width={400} height={30} />
        </h1>
        <Skeleton variant="text" width={100} height={20} />
        <p className="text-sm font-light text-gray-500">
          <Skeleton variant="text" width={80} height={20} />
        </p>
        <Skeleton variant="text" width={70} height={20} />
      </div>
    </Card>
  );
};

export default JobPreviewCardSkeleton;
