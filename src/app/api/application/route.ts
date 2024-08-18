import { length } from "./../../../../node_modules/@types/stylis/index.d";
import { NextResponse } from "next/server";
import {
  getApplications,
  getApplicationsByJobId,
  getGreenhouseJobs,
} from "~/helper/greenhouseHelper";
import { db } from "~/server/db";
export async function GET() {
  try {
    const application = await getApplicationsByJobId("4063671007");
    console.log("Application length:", application.length);

    return NextResponse.json({ application });
  } catch (error) {
    console.error("Error fetching applications from Greenhouse:", error);
    return NextResponse.json({
      error: "Error fetching applications from Greenhouse",
    });
  }
}
