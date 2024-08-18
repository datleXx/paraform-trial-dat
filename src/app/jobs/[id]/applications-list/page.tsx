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

interface Props {
  params: {
    id: string;
  };
}

const ApplicationsList = ({ params }: Props) => {
  const { data: job, isLoading } = api.job.fetchJobById.useQuery({
    id: params.id,
  });

  const candidates =
    job?.Application?.flatMap((app) =>
      app.CandidateToApplication.map((cta) => cta.candidate),
    ) ?? [];

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
      <Divider />
      <Table className="scrollbar-hide h-[calc(100vh-200px)] w-full overflow-y-scroll">
        <TableHead>
          <TableRow>
            <TableCell className="whitespace-normal font-semibold text-black">
              ID
            </TableCell>
            <TableCell className="whitespace-normal font-semibold text-black">
              First Name
            </TableCell>
            <TableCell className="whitespace-normal font-semibold text-black">
              Last Name
            </TableCell>
            <TableCell className="whitespace-normal font-semibold text-black">
              Email
            </TableCell>
            <TableCell className="whitespace-normal font-semibold text-black">
              Phone
            </TableCell>
            <TableCell className="whitespace-normal font-semibold text-black">
              Address
            </TableCell>
            <TableCell className="whitespace-normal font-semibold text-black">
              Company
            </TableCell>
            <TableCell className="whitespace-normal font-semibold text-black">
              Title
            </TableCell>
            <TableCell className="whitespace-normal font-semibold text-black">
              Social Media Address
            </TableCell>
          </TableRow>
        </TableHead>
        {isLoading ? (
          <ApplicationListSkeleton />
        ) : (
          <TableBody className="max-h-[calc(100vh-200px)] w-full">
            {candidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell className="whitespace-normal font-medium">
                  {candidate.id}
                </TableCell>
                <TableCell className="whitespace-normal">
                  {candidate.first_name}
                </TableCell>
                <TableCell className="whitespace-normal">
                  {candidate.last_name}
                </TableCell>
                <TableCell className="whitespace-normal">
                  {candidate.email}
                </TableCell>
                <TableCell className="whitespace-normal">
                  {candidate.phone}
                </TableCell>
                <TableCell className="whitespace-normal">
                  {candidate.address}
                </TableCell>
                <TableCell className="whitespace-normal">
                  {candidate.company}
                </TableCell>
                <TableCell className="whitespace-normal">
                  {candidate.title}
                </TableCell>
                <TableCell className="whitespace-normal">
                  {candidate.social_media_address}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </Card>
  );
};

export default ApplicationsList;
