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
