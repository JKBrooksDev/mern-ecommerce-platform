// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD,
//   },
// });

// exports.sendMail = async(receiverEmail,subject,body) => {
//     await transporter.sendMail({
//     from: process.env.EMAIL,
//     to: receiverEmail,
//     subject: subject,
//     html: body
//   });
// };

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendMail = async (receiverEmail, subject, body) => {
  await resend.emails.send({
    from: "Your App <onboarding@resend.dev>",
    to: receiverEmail,
    subject,
    html: body,
  });
};
