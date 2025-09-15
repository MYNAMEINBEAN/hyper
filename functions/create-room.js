// File: functions/create-room.js

export async function handler(event, context) {
  const API_KEY = process.env.HYPERBEAM_API_KEY;

  if (!API_KEY) {
    console.error("❌ Missing HYPERBEAM_API_KEY env var");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing API key" }),
    };
  }

  try {
    const response = await fetch("https://enginetest.hyperbeam.com/v0", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ browser: "chromium" }),
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseErr) {
      data = { parse_error: "Invalid JSON in response", raw: text };
    }

    console.log("Hyperbeam API status:", response.status);
    console.log("Hyperbeam API response:", data);

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Hyperbeam error", details: data }),
      };
    }

    // On success, data should have an embed_url or url
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (fetchErr) {
    console.error("❌ Fetch failed:", fetchErr);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch from Hyperbeam", details: fetchErr.toString() }),
    };
  }
}
