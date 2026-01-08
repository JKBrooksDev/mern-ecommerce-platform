const nodemailer = require("nodemailer");

exports.sendMail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    return true;
  } catch (error) {
    console.log("Nodemailer error:", error);
    throw new Error("Failed to send email");
  }
};
