const greenhouseApiKey = "f06b2b153e016f8e7c3632627af56b1d-7";
const greenhouseApiUrl = "https://harvest.greenhouse.io/v1";

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
