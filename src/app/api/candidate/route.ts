import { NextResponse } from "next/server";
import {
  postCandidate,
  postAttachments,
  CandidateProps,
  ApplicationProps,
  AttachmentProps
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
    const attachmentResponse: any[] = [];
    if (candidateResponse) {
      // Post application
      const application = JSON.parse(
        data.get("application") as string,
      ) as ApplicationProps;
      console.log("Application: ", application);
      const attachments = application.attachments;
      attachments.map(async (attachment) => {
        const response = await postAttachments(
          candidateResponse.applications[0].id,
          attachment,
        );
        console.log("Attachment Response: ", response);
        attachmentResponse.push(response);
      });

      if (attachmentResponse) {
        return NextResponse.json({
          success: true,
          candidate: candidateResponse,
          attachments: attachmentResponse,
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
