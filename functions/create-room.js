// netlify/functions/create-room.js
import fetch from "node-fetch";

const API_URL = "https://enginetest.hyperbeam.com/v0/vm";

export async function handler(event, context) {
  const apiKey = process.env.HYPERBEAM_API_KEY; // Your test API key from Netlify env vars

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        embedUrl: data.embed_url,
        adminToken: data.admin_token,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
