// File: api/create-room.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const API_KEY = process.env.HYPERBEAM_API_KEY;

  const hyperbeamRes = await fetch("https://engine.hyperbeam.com/v0/vm", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ browser: "chromium" }),
  });

  const data = await hyperbeamRes.json();

  if (!hyperbeamRes.ok) {
    return res.status(hyperbeamRes.status).json(data);
  }

  return res.status(200).json(data);
}
