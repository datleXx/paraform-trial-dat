import { length } from "./../../../../node_modules/@types/stylis/index.d";
import { NextResponse } from "next/server";
import {
  getApplications,
  getApplicationsByJobId,
  getGreenhouseJobs,
} from "~/helper/greenhouseHelper";
import { db } from "~/server/db";
export async function POST(req: Request) {
  try {
    // const application = await postApplication("31095551007", "4063668007", []);
    // console.log("Application length:", application.length);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error fetching applications from Greenhouse:", error);
    return NextResponse.json({
      error: "Error fetching applications from Greenhouse",
    });
  }
}
