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
import { AttachmentsIcon, SyncIcon } from "~/app/_components/icons";

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

  const candidates = applications?.map((application) => ({
    candidate: application.CandidateToApplication[0]?.candidate,
    attachments: application.Attachment,
    createdAt: application.created_at,
  }));

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
          icon={SyncIcon}
          className="!rounded-full !px-[5px] !py-[2px] !text-xs"
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
              <TableCell className="font-semibold text-black">
                First name
              </TableCell>
              <TableCell className="font-semibold text-black">
                Last name
              </TableCell>
              <TableCell className="font-semibold text-black">Email</TableCell>
              <TableCell className="font-semibold text-black">Phone</TableCell>
              <TableCell className="font-semibold text-black">
                Attachments
              </TableCell>
              <TableCell className="font-semibold text-black">
                Published at
              </TableCell>
            </TableRow>
          </TableHead>
          {isLoading || sync ? (
            <ApplicationListSkeleton />
          ) : (
            <TableBody className="max-h-[calc(100vh-200px)] w-full">
              {candidates?.map((candidate) => (
                <TableRow
                  key={candidate.candidate?.id}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <TableCell className="font-medium">
                    {candidate.candidate?.first_name}
                  </TableCell>
                  <TableCell className="font-medium">
                    {candidate.candidate?.last_name}
                  </TableCell>
                  <TableCell className="font-medium">
                    {candidate.candidate?.email}
                  </TableCell>
                  <TableCell className="font-medium">
                    {candidate.candidate?.phone}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    {candidate.attachments.map((attachment) => (
                      <Link
                        key={attachment.id}
                        href={attachment.url}
                        target="_blank"
                      >
                        <Button
                          className="!rounded-full !px-[4px] !py-[1px] !text-xs"
                          icon={AttachmentsIcon}
                        >
                          {truncateFilename(attachment.filename, 20)}
                        </Button>
                      </Link>
                    ))}
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatDistanceToNow(candidate.createdAt, {
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
