// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// // export default function handler(req, res) {
// //   res.status(200).json({ name: "John Doe" });
// // }
// import clientPromise from "../../lib/mongodb"; // Ensure this file exists as per earlier setup

//   export const config = {
//     maxDuration: 60,
//   };

// export default async function handler(req, res) {
  
//   if (req.method !== "POST") {
//     console.log("Request method:", req.method);
//     return res.status(405).json({ success: false, message: "Method not allowed" });
//   }

//   const { email, user_msg, AI_response } = req.body;

//   if (!email || !user_msg || !AI_response) {
//     return res.status(400).json({ success: false, message: "Missing required fields" });
//   }
  
//   function formatDate(date) {
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//     const year = String(date.getFullYear()).slice(-2); // Get the last 2 digits of the year
  
//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     const seconds = String(date.getSeconds()).padStart(2, '0');
  
//     return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
//   }
  
//   try {
//     const client = await clientPromise;
//     const db = client.db("Chat_emotion"); // Your database name
//     const collection = db.collection("email"); // Your collection name
//     // const today = new Date();
//     const timestamp = Date.now();
    

//     const result = await collection.insertOne({ email, timeStamp:timestamp , user_msg, AI_response});

//     return res.status(200).json({ success: true, message: "Document added", result });
//   } catch (error) {
//     console.error("MongoDB Insertion Error:", error);
//     return res.status(500).json({ success: false, message: "Database error" });
//   }
// }




import clientPromise from "../../lib/mongodb";

export const config = {
  maxDuration: 60,
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { email, user_msg, AI_response } = req.body;

  if (!email || !user_msg || !AI_response) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("Chat_emotion");
    const collection = db.collection("chat_data");

    const timestamp = new Date();

    const messageEntry = { sender: "user", text: user_msg, timestamp };
    const botResponseEntry = { sender: "bot", text: AI_response, timestamp };

    await collection.updateOne(
      { email },
      { $push: { messages: { $each: [messageEntry, botResponseEntry] } } },
      { upsert: true }
    );

    return res.status(200).json({ success: true, message: "Chat saved successfully" });
  } catch (error) {
    console.error("MongoDB Insertion Error:", error);
    return res.status(500).json({ success: false, message: "Database error" });
  }
}
