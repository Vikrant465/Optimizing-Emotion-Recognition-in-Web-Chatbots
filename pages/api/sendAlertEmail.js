import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { to, userName } = req.body;

  if (!to) {
    return res.status(400).json({ message: "Recovery email is required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ALERT_EMAIL_USER,       // your Gmail
        pass: process.env.ALERT_EMAIL_PASSWORD    // app password
      }
    });

    const mailOptions = {
      from: `"Emoti Bot Alert" <${process.env.ALERT_EMAIL_USER}>`,
      to,
      subject: `${userName || "Someone"} might need emotional support ❤️`,
      text: `${userName || "A user"} has been expressing sadness continuously. You might want to check in with them.`
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully" });

  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ message: "Failed to send email" });
  }
}
