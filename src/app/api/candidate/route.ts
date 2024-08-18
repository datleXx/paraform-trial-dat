import { NextResponse } from 'next/server';
import { postCandidate, postApplication} from '~/helper/greenhouseHelper';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Post candidate
    const candidateResponse = await postCandidate(data.candidate);

    // Upload attachments


    // Post application
    const applicationResponse = await postApplication(
      candidateResponse.id,
      data.jobId,
      data.application
    );

    return NextResponse.json({ success: true, application: applicationResponse });
  } catch (error) {
    console.error('Error in Greenhouse API:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit application' }, { status: 500 });
  }
}