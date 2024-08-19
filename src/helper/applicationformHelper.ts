import { Question } from "@prisma/client";
import { z } from "zod";

export const generateApplicationFormSchema = (questions: Question[]) => {
  const schemaShape: Record<string, any> = {};

  questions.forEach((question) => {
    let questionSchema;
    switch (question.type) {
      case "short_text":
        questionSchema = z.string();
        break;
      case "long_text":
        questionSchema = z.string();
        break;
      case "attachment":
        questionSchema = z.instanceof(File).nullish();
        break;
      default:
        questionSchema = z.string();
    }

    if (question.required) {
      if (question.type !== "attachment") {
        questionSchema = (questionSchema as z.ZodString).min(
          1,
          `${question.label} is required`,
        );
      }
    }
    const label = question.label.toLowerCase().replace(" ", "_");
    schemaShape[label] = questionSchema;
  });

  return z.object(schemaShape);
};

export const syncApplication = async (jobId: string) => {
  try {
    await fetch(`/api/application-by-job?jobId=${jobId}`);
  } catch (error) {
    console.log(error);
  }
};

export function truncateFilename(filename: string, maxLength: number): string {
  if (filename.length <= maxLength) return filename;
  const extension = filename.split(".").pop();
  const name = filename.substring(0, maxLength - 4);
  return `${name}...${extension}`;
}
