import { Card } from "@tremor/react";
import Image from "next/image";

const JobPreviewCard = () => {
  return (
    <Card className="flex w-full cursor-pointer items-center gap-2 !rounded-none">
      <Image
        src="https://media.licdn.com/dms/image/v2/C560BAQG1SVZKSmiAfA/company-logo_100_100/company-logo_100_100/0/1630567848660/cdmguru_logo?e=1732147200&v=beta&t=5R5ZQZ5HLdQom5NP6TJJcsTkgCv-wNC20bhar_uefDM"
        alt="Job Preview Card"
        width={100}
        height={100}
      />
      <div className="flex flex-col items-start">
        <h1 className="cursor-pointer text-base font-semibold text-black transition-all hover:underline">
          INTERMEDIATE TAX ACCOUNTANT - LARGE CA FIRM NORTH QUEENSLAND – GREAT
          BARRIER REEF (Job ID:500)
        </h1>
        <p className="text-sm">Career Development & Management Guru</p>
        <p className="text-sm font-light text-gray-500">
          Townsville, Queensland, Australia (On-site)
        </p>
        <p className="mt-3 text-xs text-gray-500">Promoted</p>
      </div>
    </Card>
  );
};

export default JobPreviewCard;
