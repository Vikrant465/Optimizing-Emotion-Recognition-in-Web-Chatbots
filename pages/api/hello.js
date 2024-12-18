// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: "John Doe" });
// }


import clientPromise from "../../lib/mongodb"; // Ensure this file exists as per earlier setup

export default async function handler(req, res) {
  console.log("Request method:", req.method);
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { email, user_msg, AI_response } = req.body;

  if (!email || !user_msg || !AI_response) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("Chat_emotion"); // Your database name
    const collection = db.collection("email"); // Your collection name

    const result = await collection.insertOne({ email, user_msg, AI_response });

    return res.status(200).json({ success: true, message: "Document added", result });
  } catch (error) {
    console.error("MongoDB Insertion Error:", error);
    return res.status(500).json({ success: false, message: "Database error" });
  }
}

