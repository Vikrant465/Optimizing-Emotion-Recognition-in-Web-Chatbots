// import clientPromise from "../../lib/mongodb";
// export default async function handler(req, res) {
//   if (req.method !== "GET") {
//     return res.status(405).json({ success: false, message: "Method not allowed" });
//   }
//   const { email } = req.query;
//   if (!email) {
//     return res.status(400).json({ success: false, message: "Email is required" });
//   }
//   try { 
//     const client = await clientPromise;
//     const db = client.db("Chat_emotion");
//     const collection = db.collection("chat_data");
//     const userChats = await collection.findOne({ email });
//     const lastFiveMessages = userChats?.messages?.slice(-10) || [];
//     res.status(200).json({ success: true, messages: lastFiveMessages });
//   } catch (error) {
//     console.error("MongoDB Retrieval Error:", error);
//     res.status(500).json({ success: false, message: "Database error" });
//   }
// }

import clientPromise from "../../lib/mongodb";
export default async function handler(req, res) {
  if (req.method === "GET") {
    return await getChatHistory(req, res);
  } else if (req.method === "DELETE") {
    return await deleteLastMessages(req, res);
  } else {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
}

// Function to retrieve the last 10 messages
async function getChatHistory(req, res) {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("Chat_emotion");
    const collection = db.collection("chat_data");
    const userChats = await collection.findOne({ email });

    const lastFiveMessages = userChats?.messages?.slice(-10) || [];
    // const userMessages = userChats?.messages
    //   ?.filter(msg => msg.sender === "user" && msg.User_MSG)
    //   ?.map(msg => msg.User_MSG)
    //   ?.slice(-10) || [];
    // res.status(200).json({ success: true, messages: userMessages });
    res.status(200).json({ success: true, messages: lastFiveMessages });
  } catch (error) {
    console.error("MongoDB Retrieval Error:", error);
    res.status(500).json({ success: false, message: "Database error" });
  }
}

// Function to delete the last messages
async function deleteLastMessages(req, res) {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("Chat_emotion");
    const collection = db.collection("chat_data");

    const userChats = await collection.findOne({ email });

    if (!userChats || !userChats.messages || userChats.messages.length === 0) {
      return res.status(200).json({ success: true, message: "No messages to delete." });
    }

    // Remove the last 5 messages
    const updatedMessages = userChats.messages.slice(0, -2);

    // Update the database
    await collection.updateOne(
      { email },
      { $set: { messages: updatedMessages } }
    );

    res.status(200).json({ success: true, message: "Last 5 messages deleted successfully." });
  } catch (error) {
    console.error("MongoDB Deletion Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete messages." });
  }
}