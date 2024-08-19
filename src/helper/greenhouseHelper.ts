const greenhouseApiKey = "f06b2b153e016f8e7c3632627af56b1d-7";
const greenhouseApiUrl = "https://harvest.greenhouse.io/v1";

export interface CandidateProps {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  website_url: string;
  social_media_url: string;
  address: string;
  title: string;
  company: string;
  application: string;
}

export interface AttachmentProps {
  name: string;
  type: string;
  url: string;
  content_type: string;
}

export interface ApplicationProps {
  job_id: string;
  attachments: AttachmentProps[];
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
  const website_addresses =
    data.website_url !== "" && data.website_url !== "N/A"
      ? [{ value: data.website_url, type: "personal" }]
      : [];
  const social_media_addresses =
    data.social_media_url !== "" && data.social_media_url !== "N/A"
      ? [{ value: data.social_media_url, type: "personal" }]
      : [];
  const phone_numbers =
    data.phone !== "" && data.phone !== "N/A"
      ? [{ value: data.phone, type: "home" }]
      : [];
  const addresses =
    data.address !== "" && data.address !== "N/A"
      ? [{ value: data.address, type: "home" }]
      : [];
  const email_addresses =
    data.email !== "" && data.email !== "N/A"
      ? [{ value: data.email, type: "personal" }]
      : [];

  try {
    const { first_name, last_name, title, company, application } = data;
    const encodedAuth = Buffer.from(greenhouseApiKey + ":").toString("base64");
    const response = await fetch(`${greenhouseApiUrl}/candidates`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${encodedAuth}`,
        "Content-Type": "application/json",
        "On-Behalf-Of": "4117006007",
      },
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        email_addresses: email_addresses,
        phone_numbers: phone_numbers,
        website_addresses: website_addresses,
        social_media_addresses: social_media_addresses,
        title: title,
        company: company,
        addresses: addresses,
        applications: [{ job_id: application }],
      }),
    });
    console.log("Response: ", response);
    const responseData = await response.json();
    console.log("Response Data: ", responseData);
    return responseData;
  } catch (error) {
    console.error("Error posting candidate to Greenhouse:", error);
    throw error;
  }
};

export const postAttachments = async (
  applicationId: string,
  attachment: AttachmentProps,
) => {
  try {
    if (
      attachment.name === "" ||
      attachment.name === "N/A" ||
      attachment.url === "" ||
      attachment.url === "N/A" ||
      attachment.type === "" ||
      attachment.type === "N/A" ||
      attachment.content_type === "" ||
      attachment.content_type === "N/A"
    ) {
      return attachment;
    }

    const filteredAttachments = {
      filename: attachment.name,
      type: attachment.type,
      url: attachment.url,
      content_type: attachment.content_type,
    };

    console.log("Filtered Attachments: ", filteredAttachments);

    const encodedAuth = Buffer.from(greenhouseApiKey + ":").toString("base64");

    const response = await fetch(
      `${greenhouseApiUrl}/applications/${applicationId}/attachments`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${encodedAuth}`,
          "Content-Type": "application/json",
          "On-Behalf-Of": "4117006007",
        },
        body: JSON.stringify(filteredAttachments),
      },
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error posting application to Greenhouse:", error);
    throw error;
  }
};

