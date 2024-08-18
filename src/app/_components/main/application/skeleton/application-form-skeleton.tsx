import { Skeleton } from "@mui/material";
import { Button, Card, Divider } from "@tremor/react";
import Logo from "~/app/_components/home/logo";

const ApplicationFormSkeleton = () => {
  return (
    <div className="w-screen bg-gray-100">
      <div className="mx-auto flex max-w-7xl px-5">
        <Card className="mx-auto my-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5">
                <Logo size={20} />
                <h1 className="text-base font-semibold leading-none transition-all hover:underline">
                  Paraform
                </h1>
              </div>
              <div className="flex items-center justify-start gap-2">
                <h1 className="cursor-pointer text-2xl font-medium transition-all hover:underline">
                  <Skeleton variant="text" width={400} height={80} />
                </h1>
              </div>
            </div>
            <Button variant="secondary" color="gray">
              <Skeleton variant="text" width={100} height={20} />
            </Button>
          </div>
          <Divider />
          <form className="">
            {Array.from({ length: 15 }).map((_, index) => (
              <div
                className="my-7 flex w-full flex-col items-start gap-2"
                key={index}
              >
                <h2 className="text-lg font-medium">
                  <Skeleton width={300} height={40} />
                </h2>
                <Skeleton width={600} height={80} />
              </div>
            ))}

            <div className="my-7 flex items-center justify-end gap-2">
              <Button variant="secondary" color="gray">
                <Skeleton width={100} height={20} />
              </Button>
              <Button>
                <Skeleton width={100} height={20} />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationFormSkeleton;
