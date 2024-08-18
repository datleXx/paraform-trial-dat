const greenhouseApiKey = "f06b2b153e016f8e7c3632627af56b1d-7";
const greenhouseApiUrl = "https://harvest.greenhouse.io/v1";

export interface CandidateProps {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  website_url: string;
  social_media_url: string;
  attachments: File[];
}

export const getGreenhouseJobs = async () => {
  try {
    const encodedAuth = Buffer.from(greenhouseApiKey + ":").toString("base64");
    const response = await fetch(`${greenhouseApiUrl}/job_posts`, {
      headers: {
        Authorization: `Basic ${encodedAuth}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch jobs from Greenhouse");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching jobs from Greenhouse:", error);
    return [];
  }
};

export const getApplications = async () => {
  try {
    const encodedAuth = Buffer.from(greenhouseApiKey + ":").toString("base64");
    const response = await fetch(`${greenhouseApiUrl}/applications`, {
      headers: {
        Authorization: `Basic ${encodedAuth}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch applications from Greenhouse");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching applications from Greenhouse:", error);
    return [];
  }
};

export const getApplicationsByJobId = async (jobId: string) => {
  try {
    const encodedAuth = Buffer.from(greenhouseApiKey + ":").toString("base64");
    const response = await fetch(
      `${greenhouseApiUrl}/applications?job_id=${jobId}`,
      {
        headers: {
          Authorization: `Basic ${encodedAuth}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch applications from Greenhouse");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching applications from Greenhouse:", error);
    return [];
  }
};

export const getCandidate = async (candidateId: string) => {
  try {
    const encodedAuth = Buffer.from(greenhouseApiKey + ":").toString("base64");
    const response = await fetch(
      `${greenhouseApiUrl}/candidates/${candidateId}`,
      {
        headers: {
          Authorization: `Basic ${encodedAuth}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch candidate from Greenhouse");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching candidate from Greenhouse:", error);
    return [];
  }
};

export const postCandidate = async (data: CandidateProps) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      website_url,
      social_media_url,
      attachments,
    } = data;
    const encodedAuth = Buffer.from(greenhouseApiKey + ":").toString("base64");
    const response = await fetch(`${greenhouseApiUrl}/candidates`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${encodedAuth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        phone,
        website_url,
        social_media_addresses: [{ value: social_media_url }],
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to post candidate to Greenhouse");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error posting candidate to Greenhouse:", error);
    throw error;
  }
};

export const postApplication = async (
  candidateId: string,
  jobId: string,
  data: any,
) => {
  try {
    const encodedAuth = Buffer.from(greenhouseApiKey + ":").toString("base64");
    const response = await fetch(`${greenhouseApiUrl}/applications`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${encodedAuth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        candidate_id: candidateId,
        job_id: jobId,
        custom_fields: data.custom_fields,
        question_answers: data.question_answers,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to post application to Greenhouse");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error posting application to Greenhouse:", error);
    throw error;
  }
};
