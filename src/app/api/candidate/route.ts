import { NextResponse } from "next/server";
import {
  postCandidate,
  postAttachments,
  CandidateProps,
  ApplicationProps,
  AttachmentProps,
} from "~/helper/greenhouseHelper";

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const candidate = JSON.parse(
      data.get("candidate") as string,
    ) as CandidateProps;
    console.log("Candidate: ", candidate);

    // Post candidate
    const candidateResponse = await postCandidate(candidate);
    console.log("Candidate Response: ", candidateResponse.applications[0].jobs);
    if (candidateResponse) {
      // Post application
      const application = JSON.parse(
        data.get("application") as string,
      ) as ApplicationProps;
      console.log("Application: ", application);
      const attachmentPromises = application.attachments.map((attachment) =>
        postAttachments(candidateResponse.applications[0].id, attachment),
      );

      const attachmentResponses = await Promise.all(attachmentPromises);

      if (attachmentResponses) {
        return NextResponse.json({
          success: true,
          candidate: candidateResponse,
          attachments: attachmentResponses,
        });
      }
    }

    return NextResponse.json({
      success: true,
      candidate: candidateResponse,
      error: "Failed to submit application",
    });
  } catch (error) {
    console.error("Error in Greenhouse API:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit application" },
      { status: 500 },
    );
  }
}
