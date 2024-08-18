import { Card } from "@tremor/react";
import Image from "next/image";

const JobPreviewCard = ({
  isActive,
  onClick,
  title,
  location,
}: {
  isActive: boolean;
  onClick: () => void;
  title: string;
  company: string;
  location: string;
}) => {
  return (
    <Card
      className={`flex w-full cursor-pointer items-center gap-2 !rounded-none ${isActive ? "bg-gray-100" : ""}`}
    >
      <div className="flex flex-col items-start">
        <h1 className="cursor-pointer text-base font-semibold text-black transition-all hover:underline">
          {title}
        </h1>
        <p className="text-sm">Paraform</p>
        <p className="text-sm font-light text-gray-500">
          {location}
        </p>
        <p className="mt-3 text-xs text-gray-500">Promoted</p>
      </div>
    </Card>
  );
};

export default JobPreviewCard;
