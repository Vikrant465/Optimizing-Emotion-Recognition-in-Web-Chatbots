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

    // const mailOptions = {
    //   from: `"Emoti Bot Alert" <${process.env.ALERT_EMAIL_USER}>`,
    //   to,
    //   subject: `${userName || "Someone"} might need emotional support ❤️`,
    //   text: `${userName || "A user"} has been expressing sadness continuously. You might want to check in with them.`
    // };
    const mailOptions = {
    from: `"Emoti Bot Alert" <${process.env.ALERT_EMAIL_USER}>`,
    to,
    subject: '💙 We care about your emotional well-being',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
        <h2 style="text-align: center; color: #0077b6;">Hello,</h2>
        <p style="font-size: 16px; color: #333;">You are recieving this message as ${userName || "Someone"} has set your email as a recovery email</p>
        <p style="font-size: 16px; color: #333;">
          We’ve noticed some recent emotional patterns that may indicate that <span style="color: #007BFF;">${userName || "Someone"}</span>  might need <strong>emotional support</strong>.
        </p>
        <p style="font-size: 16px; color: #333;">
          Our users mental health is important to us. Please consider talking to them as soon as possible. Try telling them that they are not alone and that you are there for them.
        </p>
        <p style="margin-top: 30px; font-size: 14px; color: #;">
          This message is sent based on recent interactions with our Emoti Bot. If you believe this was a mistake, feel free to reach out.
        </p>
        <p style="font-size: 14px; color: #ff4d4d;">Emoti Bot Alert</p>
      </div>
    `,
  };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully" });

  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ message: "Failed to send email" });
  }
}
