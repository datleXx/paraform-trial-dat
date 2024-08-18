"use client";

import ApplicationForm from "~/app/_components/main/application/application-form";
import { api } from "~/trpc/react";

interface Props {
  params: {
    id: string;
  };
}

const ApplicationPage = ({ params }: Props) => {
  const { id } = params;

  return <ApplicationForm id={id} />;
};

export default ApplicationPage;
