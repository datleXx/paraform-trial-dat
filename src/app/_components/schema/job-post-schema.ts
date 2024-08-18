import { z } from "zod";

const jobPostSchema = z.object({
  companyName: z.string().min(1, "Company Name is required"),
  role: z.string().min(1, "Role is required"),
  jobTitle: z.string().min(1, "Job Title is required"),
  jobDescription: z.string().min(1, "Job Description is required"),
  skills: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    }),
  ),
  jobLocation: z.string().min(1, "Job Location is required"),
  collectionEmail: z.string().email("Invalid email address"),
});

export default jobPostSchema;
