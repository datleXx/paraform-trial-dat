import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import jobPostSchema from "~/app/_components/schema/job-post-schema";

export const jobRouter = createTRPCRouter({
  createJob: protectedProcedure
    .input(jobPostSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.job.create({
          data: {
            title: input.jobTitle,
            description: input.jobDescription,
            location: input.jobLocation,
            skills: input.skills.map((skill) => skill.text),
            recruiterId: ctx.session.user.id,
            company: input.companyName,
            collectionEmail: input.collectionEmail,
          },
        });
      } catch (e) {
        console.log(e);
      }
    }),
});
