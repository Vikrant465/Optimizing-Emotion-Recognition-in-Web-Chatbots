import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try { 
    const client = await clientPromise;
    const db = client.db("Chat_emotion");
    const collection = db.collection("chat_data");

    const userChats = await collection.findOne({ email });

    res.status(200).json({ success: true, messages: userChats?.messages || [] });
  } catch (error) {
    console.error("MongoDB Retrieval Error:", error);
    res.status(500).json({ success: false, message: "Database error" });
  }
}
