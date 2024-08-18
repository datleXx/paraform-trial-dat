"use client";
import { useState } from "react";
import { TagInput } from "emblor";
import { type Tag } from "emblor";

const TagsInput = () => {
  const tags = [
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
  const [exampleTags, setExampleTags] = useState<Tag[]>(tags);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  return (
    <TagInput
      tags={exampleTags}
      setTags={(newTags) => {
        setExampleTags(newTags);
      }}
      placeholder="Add a tag"
      className="p-0"
      styleClasses={{
        input: "w-full sm:max-w-[350px] h-full rounded-md",
        tagList: {
          container: "rounded-md bg-tremor-brand",
        },
        tag: {
          body: "rounded-md bg-tremor-brand text-white",
        },
      }}
      activeTagIndex={activeTagIndex}
      setActiveTagIndex={setActiveTagIndex}
    />
  );
};

export default TagsInput;
