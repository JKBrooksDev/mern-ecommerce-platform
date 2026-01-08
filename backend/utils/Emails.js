const axios = require("axios");

exports.sendMail = async (to, subject, html) => {
  try {
    const response = await axios.post(
      "https://api.resend.com/emails",
      {
        from: "MERN Shop <onboarding@resend.dev>",
        to,
        subject,
        html,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return true;
  } catch (error) {
    console.log("Resend error:", error.response?.data || error.message);
    throw new Error("Failed to send email");
  }
};
