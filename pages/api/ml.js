import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    // Use the environment variable for the external API URL
    const apiUrl = process.env.NEXT_PUBLIC_EXTERNAL_API_URL;

    if (!apiUrl) {
      throw new Error("External API URL is not defined in environment variables.");
    }

    // Forward the question to the external API
    const response = await axios.post(apiUrl, { question });

    const { ai_response, user_predicted_emotion, predicted_emotion } = response.data;

    // Send back the relevant response data
    res.status(200).json({
      ai_response,
      user_predicted_emotion,
      predicted_emotion,
    });
  } catch (error) {
    console.error("Error in /api/ml:", error.message || error);

    res.status(500).json({
      error: "Failed to process the request. Please try again later.",
    });
  }
}
