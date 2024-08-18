"use client";

import { Button, Card, Divider, TextInput, Textarea } from "@tremor/react";
import Link from "next/link";
import TagsInput from "./tags-input";

const PostForm = () => {
  return (
    <div className="w-screen bg-gray-100">
      <div className="mx-auto flex w-[90%] md:w-[80%] lg:w-[60%]">
        <Card className="mx-auto my-5">
          <h1 className="text-xl font-medium">Tell us about the role</h1>
          <Divider />
          <form className="">
            <div className="my-7 flex w-full flex-col items-start gap-2">
              <h2 className="text-lg font-medium">Company Name *</h2>
              <TextInput placeholder="Company Name" />
            </div>
            <div className="my-7 flex w-full flex-col items-start gap-2">
              <h2 className="text-lg font-medium">Role *</h2>
              <TextInput placeholder="Company Position" />
            </div>
            <div className="my-7 flex w-full flex-col items-start gap-2">
              <h2 className="text-lg font-medium">Job Title *</h2>
              <TextInput placeholder="Job Title" />
            </div>
            <div className="my-7 flex flex-col items-start gap-2">
              <h2 className="text-lg font-medium">Job Description *</h2>
              <Textarea />
            </div>
            <div className="my-7 flex flex-col items-start gap-2">
              <h2 className="text-lg font-medium">Skills *</h2>
              <p className="text-sm text-gray-500">
                Add skill keywords to make your job post more visible to
                candidates.
              </p>
              <TagsInput />
            </div>
            <div className="my-7 flex flex-col items-start gap-2">
              <h2 className="text-lg font-medium">Job Location *</h2>
              <TextInput placeholder="Job Location" />
            </div>
            <div className="my-7 flex flex-col items-start gap-2">
              <h2 className="text-lg font-medium">Application collection *</h2>
              <TextInput placeholder="Email" type="email" />
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
                <Button>Post Job!</Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default PostForm;
