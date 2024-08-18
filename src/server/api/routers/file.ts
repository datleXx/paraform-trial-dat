import {
  uploadObject,
  deleteObject,
  createPresignedUrl,
} from "~/helper/s3-Helper";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

import { TRPCError } from "@trpc/server";

export const fileRouter = createTRPCRouter({
  uploadFile: publicProcedure
    .input(
      z.object({
        fileName: z.string(),
        fileType: z.string(),
        fileBase64: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const { fileName, fileType, fileBase64 } = input;
        const key = `uploads/${Date.now()}-${fileName}`;
        const fileBuffer = Buffer.from(fileBase64, "base64");
        const result = await uploadObject(key, fileBuffer, fileType);
        return result;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to upload file",
        });
      }
    }),

  deleteFile: publicProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const result = await deleteObject(input.key);
        return result;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete file",
        });
      }
    }),

  getPresignedUrl: publicProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ input }) => {
      try {
        const url = await createPresignedUrl(input.key);
        return { url };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate presigned URL",
        });
      }
    }),
});
