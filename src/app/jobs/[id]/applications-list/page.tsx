"use client";

import { Skeleton } from "@mui/material";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Card,
  Title,
  Text,
  Divider,
} from "@tremor/react";
import ApplicationListSkeleton from "~/app/_components/main/application/skeleton/application-list-skeleton";
import { api } from "~/trpc/react";
import { formatDistanceToNow } from "date-fns";
import { RiFileTextFill, RiLink, RiLoopLeftLine } from "@remixicon/react";
import {
  syncApplication,
  truncateFilename,
} from "~/helper/applicationformHelper";
import { useState } from "react";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

const ApplicationsList = ({ params }: Props) => {
  const {
    data: job,
    isLoading,
    refetch,
  } = api.job.fetchJobById.useQuery({
    id: params.id,
  });

  const {
    data: applications,
    isLoading: isApplicationsLoading,
    refetch: refetchApplications,
  } = api.job.fetchApplicationsByJob.useQuery({
    remote_id: job?.remote_job_id ?? "",
  });

  const handleSyncClick = async () => {
    try {
      setSync(true);
      await syncApplication(params.id);
      setSync(false);
      await refetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  const [sync, setSync] = useState(false);

  return (
    <Card className="mx-auto h-full max-w-7xl !rounded-none">
      <div className="flex flex-col items-center gap-2">
        <Title>Applications</Title>
        <Text>
          List of applications for{" "}
          {job?.title ? (
            job.title
          ) : (
            <Skeleton variant="text" width={100} height={20} />
          )}
        </Text>
      </div>
      <div className="flex items-center justify-end">
        <Button
          onClick={handleSyncClick}
          icon={RiLoopLeftLine}
          className="!rounded-full !p-2 !text-xs"
          loading={sync}
        >
          Sync
        </Button>
      </div>
      <Divider />
      {applications?.length === 0 && !sync ? (
        <div className="h-[calc(100vh-200px)]">
          <Text>No applications yet</Text>
        </div>
      ) : (
        <Table className="scrollbar-hide h-[calc(100vh-200px)] w-full overflow-y-scroll">
          <TableHead>
            <TableRow>
              <TableCell className="whitespace-normal font-semibold text-black">
                ID
              </TableCell>
              <TableCell className="whitespace-normal font-semibold text-black">
                Candidate ID
              </TableCell>
              <TableCell className="whitespace-normal font-semibold text-black">
                Attachments
              </TableCell>
              <TableCell className="whitespace-normal font-semibold text-black">
                Published at
              </TableCell>
            </TableRow>
          </TableHead>
          {isLoading || sync ? (
            <ApplicationListSkeleton />
          ) : (
            <TableBody className="max-h-[calc(100vh-200px)] w-full">
              {applications?.map((application) => (
                <TableRow
                  key={application.id}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <TableCell className="font-medium">
                    {application.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    {application.CandidateToApplication[0]?.id}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    {application.Attachment.map((attachment) => (
                      <Link
                        key={attachment.id}
                        href={attachment.url}
                        target="_blank"
                      >
                        <Button
                          className="!rounded-full !p-2 !text-xs"
                          icon={RiLink}
                        >
                          {truncateFilename(attachment.filename, 5)}
                        </Button>
                      </Link>
                    ))}
                  </TableCell>

                  <TableCell className="font-medium">
                    {formatDistanceToNow(application.created_at, {
                      addSuffix: true,
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      )}
    </Card>
  );
};

export default ApplicationsList;
