// File: functions/create-room.js

export async function handler(event, context) {
  const API_KEY = process.env.HYPERBEAM_API_KEY;

  if (!API_KEY) {
    console.error("API key missing!");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing API key" }),
    };
  }

  try {
    const response = await fetch("https://engine.hyperbeam.com/v0/vm", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ browser: "chromium" }),
    });

    const data = await response.json();

    console.log("Hyperbeam response:", data);

    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Fetch failed:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch from Hyperbeam" }),
    };
  }
}
