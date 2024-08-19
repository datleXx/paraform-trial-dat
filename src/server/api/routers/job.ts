import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const jobRouter = createTRPCRouter({
  fetchAllJobs: publicProcedure.query(async ({ ctx }) => {
    try {
      const jobs = await ctx.db.job.findMany();
      return jobs;
    } catch (error) {
      console.error("Error fetching jobs:", error);
      return [];
    }
  }),
  fetchJobById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const job = await ctx.db.job.findUnique({
          where: {
            id: input.id,
          },
          include: {
            questions: true,
          },
        });
        return job;
      } catch (error) {
        console.error("Error fetching job by id:", error);
        return null;
      }
    }),

  fetchApplicationsByJob: publicProcedure
    .input(
      z.object({
        remote_id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const applications = await ctx.db.application.findMany({
          where: { job_id: input.remote_id },
          include: {
            CandidateToApplication: true,
            Attachment: true,
          },
        });
        return applications;
      } catch (error) {
        console.error("Error fetching applications by job:", error);
        return [];
      }
    }),
});
