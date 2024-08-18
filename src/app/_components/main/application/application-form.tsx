import { Button, Card, Divider, TextInput, Textarea } from "@tremor/react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { api } from "~/trpc/react";
import Logo from "../../home/logo";
import { generateApplicationFormSchema } from "~/helper/applicationformHelper";
import { z } from "zod";
import { RiLink } from "@remixicon/react";
import { RiCloseLine } from "@remixicon/react";
import { readFile } from "~/helper/s3-Helper";
import {
  CandidateProps,
  postCandidate,
  postApplication,
} from "~/helper/greenhouseHelper";
const ApplicationForm = ({ id }: { id: string }) => {
  const { data: job } = api.job.fetchJobById.useQuery({ id });

  const schema = generateApplicationFormSchema(job?.questions || []);
  const refResume = useRef<HTMLInputElement | null>(null);
  const refCoverLetter = useRef<HTMLInputElement | null>(null);

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: schema ? zodResolver(schema) : undefined,
  });

  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [coverLetterUrl, setCoverLetterUrl] = useState<string | null>(null);
  const [coverLetterFileName, setCoverLetterFileName] = useState<string | null>(
    null,
  );
  const fileUploader = api.file.uploadFile.useMutation();

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    try {
      const candidateData = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        website_url: data.website ?? "",
        social_media_url: data.linkedin_profile ?? "",
      };

      const applicationData = {
        custom_fields: {
          // Add any custom fields here
        },
        question_answers: job?.questions.map((question) => ({
          question_id: question.id,
          answer: data[question.label.toLowerCase().replace(" ", "_")],
        })),
      };

      const formData = new FormData();
      formData.append("candidate", JSON.stringify(candidateData));
      formData.append("application", JSON.stringify(applicationData));
      formData.append("jobId", job?.remote_job_id ?? "");
      if (data.resume instanceof File) formData.append("resume", data.resume);
      if (data.cover_letter instanceof File)
        formData.append("cover_letter", data.cover_letter);

      const response = await fetch("/api/candidate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      const result = await response.json();
      console.log("Application submitted:", result);
      // Handle successful submission (e.g., show success message, redirect)
    } catch (error) {
      console.error("Error submitting application:", error);
      // Handle error (e.g., show error message)
    }
  };

  if (!schema) {
    return <div>Loading...</div>;
  }

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const url = URL.createObjectURL(file);
      setResumeUrl(url);
      setResumeFileName(file.name);
      setValue("resume", file);
    }
  };

  const handleCoverLetterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setCoverLetterUrl(url);
      setCoverLetterFileName(file.name);
      setValue("cover_letter", file);
    }
  };

  const handleResumeClick = () => {
    if (refResume.current) {
      refResume.current.click();
    }
  };

  const handleCoverLetterClick = () => {
    if (refCoverLetter.current) {
      refCoverLetter.current.click();
    }
  };

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
                  {job?.title}
                </h1>
              </div>
            </div>
            <Link href={`/jobs/${id}/applications-list`}>
              <Button variant="secondary" color="gray">
                View applications
              </Button>
            </Link>
          </div>
          <Divider />
          <form onSubmit={handleSubmit(onSubmit)} className="">
            {job?.questions.map((question) => (
              <div
                className="my-7 flex w-full flex-col items-start gap-2"
                key={question.name}
              >
                <h2 className="text-lg font-medium">
                  {question.label + (question.required ? " *" : "")}
                </h2>
                {question.type === "short_text" ? (
                  <TextInput
                    {...register(
                      question.label.toLowerCase().replace(" ", "_"),
                    )}
                    placeholder="Answer"
                  />
                ) : question.type === "long_text" ? (
                  <Textarea
                    {...register(
                      question.label.toLowerCase().replace(" ", "_"),
                    )}
                    placeholder="Answer"
                  />
                ) : question.type === "attachment" &&
                  question.name === "resume" ? (
                  <>
                    {!resumeUrl && (
                      <div
                        onClick={handleResumeClick}
                        className="my-3 grid h-[200px] w-full place-items-center border-2 border-dashed border-gray-300 bg-gray-100 bg-cover object-cover text-center text-sm font-light text-[#787878] hover:bg-gray-200"
                      >
                        <div>Upload your file here</div>
                      </div>
                    )}
                    {resumeUrl && resumeFileName && (
                      <div className="flex cursor-pointer items-center gap-2 rounded-full bg-black p-2">
                        <RiLink color="white" />
                        <p className="text-sm text-white">{resumeFileName}</p>
                        <div
                          onClick={() => {
                            setResumeUrl(null);
                            setResumeFileName(null);
                          }}
                        >
                          <RiCloseLine color="white" />
                        </div>
                      </div>
                    )}
                    <input
                      type="file"
                      hidden
                      accept="application/pdf"
                      {...register(
                        question.label.toLowerCase().replace(" ", "_"),
                      )}
                      ref={refResume}
                      onChange={handleResumeChange}
                    />
                  </>
                ) : question.type === "attachment" &&
                  question.name === "cover_letter" ? (
                  <>
                    {!coverLetterUrl && (
                      <div
                        onClick={handleCoverLetterClick}
                        className="my-3 grid h-[200px] w-full place-items-center border-2 border-dashed border-gray-300 bg-gray-100 bg-cover object-cover text-center text-sm font-light text-[#787878] hover:bg-gray-200"
                      >
                        <div>Upload your file here</div>
                      </div>
                    )}
                    {coverLetterUrl && coverLetterFileName && (
                      <div className="flex cursor-pointer items-center gap-2 rounded-full bg-black p-2">
                        <RiLink color="white" />
                        <p className="text-sm text-white">
                          {coverLetterFileName}
                        </p>
                        <div
                          onClick={() => {
                            setCoverLetterUrl(null);
                            setCoverLetterFileName(null);
                          }}
                        >
                          <RiCloseLine color="white" />
                        </div>
                      </div>
                    )}
                    <input
                      type="file"
                      hidden
                      accept="application/pdf"
                      {...register(
                        question.label.toLowerCase().replace(" ", "_"),
                      )}
                      ref={refCoverLetter}
                      onChange={handleCoverLetterChange}
                    />
                  </>
                ) : null}
                {errors[question.name] && (
                  <p className="text-red-500">
                    {String(errors[question.name]?.message)}
                  </p>
                )}
              </div>
            ))}

            <div className="my-7 flex items-center justify-end gap-2">
              <Link href="/">
                <Button variant="secondary" color="gray">
                  Cancel
                </Button>
              </Link>
              <Button type="submit">Apply</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationForm;
