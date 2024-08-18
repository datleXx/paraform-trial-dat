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
        });
        return job;
      } catch (error) {
        console.error("Error fetching job by id:", error);
        return null;
      }
    }),
});
