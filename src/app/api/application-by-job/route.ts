import { NextResponse } from "next/server";
import {
  getApplications,
  getApplicationsByJobId,
  getGreenhouseJobs,
  getCandidate,
} from "~/helper/greenhouseHelper";
import { db } from "~/server/db";
import { api } from "~/trpc/react";
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("jobId");
    const job = await db.job.findFirst({
      where: {
        id: jobId ?? "",
      },
    });
    const applications = await getApplicationsByJobId(jobId ?? "");
    if (applications) {
      if (applications) {
        for (const application of applications) {
          try {
            const id = application.id.toString();
            await db.application.upsert({
              where: {
                id: id,
              },
              update: {
                job_id: job?.remote_job_id.toString() ?? "",
                created_at: application.applied_at,
              },
              create: {
                id: id,
                job_id: job?.remote_job_id.toString() ?? "",
                created_at: application.applied_at,
              },
            });
          } catch (error) {
            console.error(
              "Error fetching applications from Greenhouse:",
              error,
            );
          }

          if (application.candidate_id) {
            const candidate = await getCandidate(application.candidate_id);
            try {
              await db.candidate.upsert({
                where: {
                  id: candidate.id.toString(),
                },
                create: {
                  id: candidate.id.toString(),
                  first_name: candidate.first_name ?? "N/A",
                  last_name: candidate.last_name ?? "N/A",
                  created_at: candidate.created_at,
                  company: candidate.company ?? "N/A",
                  email:
                    candidate.email_addresses
                      ?.map((email: { value: string }) => email.value)
                      .join("|") ?? "N/A",
                  phone:
                    candidate.phone_numbers
                      ?.map((phone: { value: string }) => phone.value)
                      .join("|") ?? "N/A",
                  social_media_address:
                    candidate.social_media_addresses
                      ?.map(
                        (social_media_address: { value: string }) =>
                          social_media_address.value,
                      )
                      .join("|") ?? "N/A",
                  title: candidate.title ?? "N/A",
                  is_private: candidate.is_private ?? false,
                },
                update: {
                  first_name: candidate.first_name ?? "N/A",
                  last_name: candidate.last_name ?? "N/A",
                  created_at: candidate.created_at,
                  company: candidate.company ?? "N/A",
                  email:
                    candidate.email_addresses
                      ?.map((email: { value: string }) => email.value)
                      .join("|") ?? "N/A",
                  phone:
                    candidate.phone_numbers
                      ?.map((phone: { value: string }) => phone.value)
                      .join("|") ?? "N/A",
                  social_media_address:
                    candidate.social_media_addresses
                      ?.map(
                        (social_media_address: { value: string }) =>
                          social_media_address.value,
                      )
                      .join("|") ?? "N/A",
                  title: candidate.title ?? "N/A",
                  is_private: candidate.is_private ?? false,
                },
              });

              await db.candidateToApplication.upsert({
                where: {
                  id: application.id.toString() + candidate.id.toString(),
                },
                update: {
                  candidate_id: candidate.id.toString(),
                  application_id: application.id.toString(),
                  created_at: application.applied_at,
                },
                create: {
                  id: application.id.toString() + candidate.id.toString(),
                  candidate_id: candidate.id.toString(),
                  application_id: application.id.toString(),
                  created_at: application.applied_at,
                },
              });
            } catch (error) {
              console.error(
                "Error fetching applications from Greenhouse:",
                error,
              );
            }

            try {
              if (application.attachments) {
                for (const attachment of application.attachments) {
                  await db.attachment.upsert({
                    where: {
                      id: Buffer.from(
                        application.id.toString() + attachment.filename,
                      ).toString("base64"),
                    },
                    update: {
                      filename: attachment.filename,
                      url: attachment.url,
                      type: attachment.type,
                      application_id: application.id.toString(),
                    },
                    create: {
                      id: Buffer.from(
                        application.id.toString() + attachment.filename,
                      ).toString("base64"),
                      filename: attachment.filename,
                      url: attachment.url,
                      type: attachment.type,
                      application_id: application.id.toString(),
                    },
                  });
                }
              }
            } catch (error) {
              console.error(
                "Error fetching applications from Greenhouse:",
                error,
              );
            }
          }
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error fetching applications from Greenhouse:", error);
    return NextResponse.json({
      error: "Error fetching applications from Greenhouse",
    });
  }
}
