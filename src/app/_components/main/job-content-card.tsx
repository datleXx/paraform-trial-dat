import { Button, Card } from "@tremor/react";
import Image from "next/image";
import {
  RiArrowGoBackFill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiHeart2Line,
  RiHeartLine,
} from "@remixicon/react";

const JobContentCard = ({
  totalJobs,
  activeJob,
  setActiveJob,
  title,
  location,
  description,
}: {
  totalJobs: number;
  activeJob: string;
  setActiveJob: (index: string | null) => void;
  title: string;
  location: string;
  description: string;
}) => {
  return (
    <Card className="h-full !rounded-none">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {activeJob !== null && (
            <div className="mr-3 md:hidden">
              <RiArrowLeftSLine
                className="cursor-pointer"
                onClick={() => setActiveJob(null)}
                size={20}
              />
            </div>
          )}
          <h1 className="text-sm font-semibold transition-all hover:underline">
            Paraform
          </h1>
        </div>
        <div>
          <div className="flex items-center justify-start gap-2">
            <h1 className="cursor-pointer text-2xl font-medium transition-all hover:underline">
              {title}
            </h1>
            <button className="rounded-full p-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-red-600">
              <RiHeartLine className="h-6 w-6" />
            </button>
            <div className="ml-auto flex items-center gap-2">
              <Button className="rounded-full hover:bg-blue-600">
                Easy Apply
              </Button>
            </div>
          </div>
          <p className="text-sm font-light text-gray-500">{location}</p>
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <div className="text-base font-medium">Skills</div>
            <div className="mt-2 flex flex-wrap gap-2">
              <div className="rounded-full bg-black px-2 py-1 text-xs text-white hover:bg-black/75">
                N/A
              </div>
            </div>
          </div>
          <div>
            <div className="text-base font-medium">Salary Range</div>
            <div className="mt-1 text-sm font-light text-gray-500">N/A</div>
          </div>
          <div>
            <div className="text-base font-medium">Equity</div>
            <div className="mt-1 text-sm font-light text-gray-500">N/A</div>
          </div>

          <div>
            <div className="text-base font-medium">Location</div>
            <div className="mt-1 text-sm font-light text-gray-500">
              {location}
            </div>
          </div>
          <div>
            <div className="text-base font-medium">Application Deadline</div>
            <div className="mt-1 text-sm font-light text-gray-500">N/A</div>
          </div>
          <div>
            <div className="text-base font-medium">About the job</div>
            <p className="mt-1 text-sm font-light text-gray-500">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JobContentCard;
