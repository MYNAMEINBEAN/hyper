// File: functions/create-room.js

export async function handler(event, context) {
  const API_KEY = process.env.HYPERBEAM_API_KEY;

  const response = await fetch("https://engine.hyperbeam.com/v0/vm", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ browser: "chromium" }),
  });

  const data = await response.json();

  return {
    statusCode: response.status,
    body: JSON.stringify(data),
  };
}
