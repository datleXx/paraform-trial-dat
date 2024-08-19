"use client";

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
import { AttachmentProps } from "~/helper/greenhouseHelper";
import ApplicationFormSkeleton from "./skeleton/application-form-skeleton";
import { useRouter } from "next/navigation";
const ApplicationForm = ({ id }: { id: string }) => {
  const { data: job, isLoading } = api.job.fetchJobById.useQuery({ id });

  const schema = generateApplicationFormSchema(job?.questions || []);
  const refResume = useRef<HTMLInputElement | null>(null);
  const refCoverLetter = useRef<HTMLInputElement | null>(null);

  const {
    setValue,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onSubmit",
  });

  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [coverLetterUrl, setCoverLetterUrl] = useState<string | null>(null);
  const [coverLetterFileName, setCoverLetterFileName] = useState<string | null>(
    null,
  );
  const [preview, setPreview] = useState(false);
  const fileUploader = api.file.uploadFile.useMutation();
  const urlResolver = api.file.getPresignedUrl.useMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const renderPreview = () => {
    const values = getValues();
    return (
      <div className="flex flex-col gap-2">
        {Object.entries(values).map(([key, value]) => (
          <div className="my-5 flex flex-col gap-2" key={key}>
            <h3 className="font-semibold capitalize">
              {key.replace("_", " ")}
            </h3>
            {value instanceof File ? (
              <p>{value.name}</p>
            ) : (
              <p>{value as string}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    try {
      const attachments: AttachmentProps[] = [];
      const candidateData = {
        first_name: data.first_name ?? "N/A",
        last_name: data.last_name ?? "N/A",
        email: data.email ?? "N/A",
        phone: data.phone ?? "N/A",
        website_url: data.website ?? "N/A",
        social_media_url: data.linkedin_profile ?? "N/A",
        address: data.address ?? "N/A",
        title: data.title ?? "N/A",
        company: data.company ?? "N/A",
        application: job?.id ?? "",
      };

      if (data.resume instanceof File) {
        const resume_blob = (await readFile(data.resume)) as string;
        const resume_base64 = btoa(resume_blob);
        const { success, key, fileType } = await fileUploader.mutateAsync({
          fileName: data.resume.name,
          fileType: "resume",
          fileBase64: resume_base64,
        });

        console.log("success:", key);

        const { url: resumeUrl } = await urlResolver.mutateAsync({
          key,
        });
        console.log("resumeUrl:", resumeUrl);
        if (resumeUrl) {
          attachments.push({
            url: resumeUrl,
            name: data.resume.name,
            type: "resume",
            content_type: "application/pdf",
          });
        }
      }

      if (data.cover_letter instanceof File) {
        const coverLetter_blob = (await readFile(data.cover_letter)) as string;
        const coverLetter_base64 = btoa(coverLetter_blob);
        const { success, key, fileType } = await fileUploader.mutateAsync({
          fileName: data.cover_letter.name,
          fileType: "cover_letter",
          fileBase64: coverLetter_base64,
        });

        const { url: coverLetterUrl } = await urlResolver.mutateAsync({
          key,
        });
        if (coverLetterUrl) {
          attachments.push({
            url: coverLetterUrl,
            name: data.cover_letter.name,
            type: "cover_letter",
            content_type: "application/pdf",
          });
        }
      }

      const applicationData = {
        job_id: job?.id ?? "",
        attachments,
      };

      const formData = new FormData();
      formData.append("candidate", JSON.stringify(candidateData));
      formData.append("application", JSON.stringify(applicationData));

      const response = await fetch("/api/candidate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      setIsSubmitting(false);
      router.push(`/jobs/${id}/applications-list`);
      const result = await response.json();
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

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

  const handlePreviewButton = () => {
    setPreview(true);
  };

  return isLoading ? (
    <ApplicationFormSkeleton />
  ) : isSubmitting ? (
    <ApplicationFormSkeleton />
  ) : (
    <div className="w-screen bg-gray-100">
      <div className="mx-auto flex max-w-2xl px-5 xl:max-w-3xl">
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
          </div>
          <Divider />
          <form onSubmit={handleSubmit(onSubmit)} className="">
            {job?.questions?.map((question) => (
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
                  <p className="text-xs text-red-500">
                    {String(errors[question.name]?.message)}
                  </p>
                )}
              </div>
            ))}

            <div className="my-7 flex items-center justify-end gap-2">
              <Link href="/">
                <Button
                  variant="secondary"
                  color="gray"
                  className="!rounded-full !px-2 !py-1"
                >
                  <p className="text-sm">Cancel</p>
                </Button>
              </Link>
              <Button
                className="!rounded-full !px-2 !py-1"
                onClick={handlePreviewButton}
              >
                <p className="text-sm">Preview</p>
              </Button>
            </div>
            {preview && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
                <Card className="w-full max-w-2xl">
                  <div className="flex items-center justify-between gap-2">
                    <h1 className="text-2xl font-medium">
                      Application Preview
                    </h1>
                    <RiCloseLine onClick={() => setPreview(false)} />
                  </div>
                  <Divider />
                  {renderPreview()}
                  <div className="flex items-center justify-end">
                    <Button
                      className="!rounded-full !px-2 !py-1"
                      type="submit"
                      onClick={() => setPreview(false)}
                    >
                      <p className="text-sm">Apply</p>
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationForm;
