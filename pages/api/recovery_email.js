import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("Chat_emotion");
  const collection = db.collection("recovery_email");

  if (req.method === "POST") {
    const { email, recovery_email } = req.body;
    if (!email || !recovery_email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      await collection.updateOne(
        { email },
        { $set: { recovery_email } },
        { upsert: true }
      );
      return res.status(200).json({ message: "Recovery email saved" });
    } catch (error) {
      console.error("DB error:", error);
      return res.status(500).json({ message: "Database error" });
    }
  }

  if (req.method === "GET") {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      const user = await collection.findOne({ email });
      return res.status(200).json({ recovery_email: user?.recovery_email || null });
    } catch (error) {
      console.error("DB error:", error);
      return res.status(500).json({ message: "Database error" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
