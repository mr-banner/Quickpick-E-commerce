// controllers/subscribe.controller.js

import { sendEmail } from "../utils/sendEmail.js";
import { subscriptionTemplate } from "../utils/emailTemplates.js";

export const subscribeUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    await sendEmail({
      to: email,
      subject: "🎉 Welcome to QuickPick by PK 😉",
      html: subscriptionTemplate(email),
    });

    return res.status(200).json({ message: "Subscription email sent!" });
  } catch (err) {
    console.error("Email sending failed:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
