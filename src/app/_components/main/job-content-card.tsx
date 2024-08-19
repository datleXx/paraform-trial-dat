import { Button, Card } from "@tremor/react";
import Image from "next/image";
import {
  RiArrowGoBackFill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiHeart2Line,
  RiHeartLine,
} from "@remixicon/react";
import Logo from "../home/logo";
import Link from "next/link";

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
            <div className="mr-3 flex items-center gap-2 font-light text-gray-500 md:hidden">
              <RiArrowLeftSLine
                className="cursor-pointer"
                onClick={() => setActiveJob(null)}
                size={20}
              />
              Back
            </div>
          )}
        </div>
        <div className="mt-4 md:mt-0">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <Logo size={20} />
              <h1 className="text-base font-semibold leading-none transition-all hover:cursor-pointer">
                Paraform
              </h1>
            </div>
            <h1 className="cursor-pointer text-2xl font-medium transition-all">
              {title}
            </h1>
            <p className="text-sm font-light text-gray-500">{location}</p>
          </div>
          <div className="my-5 flex items-center gap-2">
            <Link href={`/jobs/${activeJob}/application`}>
              <Button className="!rounded-full !px-2 !py-1 hover:bg-blue-600">
                <p className="text-sm">Apply</p>
              </Button>
            </Link>
            <Link href={`/jobs/${activeJob}/applications-list`}>
              <Button variant="secondary" className="!rounded-full !px-2 !py-1">
                <p className="text-sm">View Applications</p>
              </Button>
            </Link>
          </div>
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
