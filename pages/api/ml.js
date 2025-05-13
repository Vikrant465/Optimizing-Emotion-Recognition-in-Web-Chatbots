import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question,pre_chat } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_EXTERNAL_API_URL;
    
    console.log("url : ",apiUrl)
    if (!apiUrl) {
      throw new Error("External API URL is not defined in environment variables.");
    }
    const chatHistory = Array.isArray(pre_chat) ? pre_chat : [];
    // const response = await axios.post(apiUrl, { question });
    const response = await axios.post(apiUrl, { question, pre_chat: chatHistory });

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
