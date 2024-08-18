import { NextResponse } from "next/server";
import { getGreenhouseJobs } from "~/helper/greenhouseHelper";
import { db } from "~/server/db";
export async function GET() {
  try {
    const jobs = await getGreenhouseJobs();
    if (jobs && jobs.length === 0) {
      return NextResponse.json({ message: "No jobs found" });
    } else {
      for (const job of jobs) {
        const id = job.job_id.toString();
        const remote_job_id = job.id.toString();
        await db.job.upsert({
          where: {
            id: id,
          },
          update: {
            created_at: job.created_at,
            updated_at: job.updated_at,
            title: job.title,
            location: job.location.name,
            description: job.content,
            remote_job_id: remote_job_id,
          },
          create: {
            id: id,
            created_at: job.created_at,
            updated_at: job.updated_at,
            title: job.title,
            location: job.location.name,
            description: job.content,
            remote_job_id: remote_job_id,
          },
        });

        for (const question of job.questions) {
          const uniqueId = Buffer.from(
            job.id.toString() + remote_job_id + question.name,
          ).toString("base64");
          await db.question.upsert({
            where: {
              id: uniqueId,
            },
            update: {
              label: question.label,
              name: question.name,
              type: question.type,
              job_id: remote_job_id,
              private: question.private,
              required: question.required ?? false,
              description: question.description,
              created_at: job.created_at,
              updated_at: job.updated_at,
            },
            create: {
              id: uniqueId,
              label: question.label,
              name: question.name,
              type: question.type,
              job_id: remote_job_id,
              private: question.private,
              required: question.required ?? false,
              description: question.description,
              created_at: job.created_at,
              updated_at: job.updated_at,
            },
          });
        }
      }
    }

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Error fetching applications from Greenhouse:", error);
    return NextResponse.json({
      error: "Error fetching applications from Greenhouse",
    });
  }
}
