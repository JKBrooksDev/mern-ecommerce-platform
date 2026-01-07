const axios = require("axios");

exports.sendMail = async (receiverEmail, subject, body) => {
  try {
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;

    const templateParams = {
      to_email: receiverEmail,
      subject: subject,
      message: body,
    };

    await axios.post("https://api.emailjs.com/api/v1.0/email/send", {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: templateParams,
    });

  } catch (error) {
    console.error("EmailJS sendMail error:", error.response?.data || error);
    throw new Error("Failed to send email");
  }
};
