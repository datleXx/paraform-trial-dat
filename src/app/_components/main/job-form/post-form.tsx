"use client";

import { Button, Card, Divider, TextInput, Textarea } from "@tremor/react";
import Link from "next/link";
import jobPostSchema from "../../schema/job-post-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { type Tag, TagInput } from "emblor";
import { useState } from "react";

type JobPostFormData = {
  companyName: string;
  role: string;
  jobTitle: string;
  jobDescription: string;
  skills: { id: string; text: string }[];
  jobLocation: string;
  collectionEmail: string;
};

const PostForm = () => {
  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobPostFormData>({
    resolver: zodResolver(jobPostSchema),
  });
  const defaultTags = [
    {
      id: "2656305916",
      text: "Communication",
    },
    {
      id: "233747852",
      text: "Leadership",
    },
    {
      id: "3360433541",
      text: "Teamwork",
    },
    {
      id: "3169804218",
      text: "MS Office",
    },
  ];
  const [tags, setTags] = useState<Tag[]>(defaultTags);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const onSubmit: SubmitHandler<JobPostFormData> = (data) => {
    console.log("Data: ", data);
  };

  return (
    <div className="w-screen bg-gray-100">
      <div className="mx-auto flex max-w-7xl px-5">
        <Card className="mx-auto my-5">
          <h1 className="text-xl font-medium">Tell us about the role</h1>
          <Divider />
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="my-7 flex w-full flex-col items-start gap-2">
              <h2 className="text-lg font-medium">Company Name *</h2>
              <TextInput
                placeholder="Company Name"
                {...register("companyName")}
              />
              {errors.companyName && (
                <p className="text-xs text-red-400">
                  {errors.companyName.message}
                </p>
              )}
            </div>
            <div className="my-7 flex w-full flex-col items-start gap-2">
              <h2 className="text-lg font-medium">Role *</h2>
              <TextInput placeholder="Company Position" {...register("role")} />
              {errors.role && (
                <p className="text-xs text-red-400">{errors.role.message}</p>
              )}
            </div>
            <div className="my-7 flex w-full flex-col items-start gap-2">
              <h2 className="text-lg font-medium">Job Title *</h2>
              <TextInput placeholder="Job Title" {...register("jobTitle")} />
              {errors.jobTitle && (
                <p className="text-xs text-red-400">
                  {errors.jobTitle.message}
                </p>
              )}
            </div>
            <div className="my-7 flex flex-col items-start gap-2">
              <h2 className="text-lg font-medium">Job Description *</h2>
              <Textarea {...register("jobDescription")} />
              {errors.jobDescription && (
                <p className="text-xs text-red-400">
                  {errors.jobDescription.message}
                </p>
              )}
            </div>
            <div className="my-7 flex flex-col items-start gap-2">
              <h2 className="text-lg font-medium">Skills *</h2>
              <p className="text-sm text-gray-500">
                Add skill keywords to make your job post more visible to
                candidates.
              </p>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <TagInput
                    {...field}
                    placeholder="Enter a topic"
                    tags={tags}
                    setTags={(newTags) => {
                      setTags(newTags);
                      setValue("skills", newTags as [Tag, ...Tag[]]);
                    }}
                    activeTagIndex={activeTagIndex}
                    setActiveTagIndex={setActiveTagIndex}
                    styleClasses={{
                      input: "w-full sm:max-w-[350px] h-full rounded-md",
                      tagList: {
                        container: "rounded-md bg-tremor-brand",
                      },
                      tag: {
                        body: "rounded-md bg-tremor-brand text-white",
                      },
                    }}
                  />
                )}
              />
              {errors.skills && (
                <p className="text-xs text-red-400">{errors.skills.message}</p>
              )}
            </div>
            <div className="my-7 flex w-full flex-col items-start gap-2">
              <h2 className="text-lg font-medium">Job Location *</h2>
              <TextInput
                placeholder="Job Location"
                {...register("jobLocation")}
              />
              {errors.jobLocation && (
                <p className="text-xs text-red-400">
                  {errors.jobLocation.message}
                </p>
              )}
            </div>
            <div className="my-7 flex flex-col items-start gap-2">
              <h2 className="text-lg font-medium">Application collection *</h2>
              <TextInput
                placeholder="Email"
                type="email"
                {...register("collectionEmail")}
              />
              {errors.collectionEmail && (
                <p className="text-xs text-red-400">
                  {errors.collectionEmail.message}
                </p>
              )}
            </div>
            <div className="my-7 flex items-center justify-between gap-2">
              <Button variant="secondary" color="blue">
                Preview
              </Button>
              <div className="flex items-center gap-2">
                <Link href="/">
                  <Button variant="secondary" color="gray">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit">Post Job!</Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default PostForm;
