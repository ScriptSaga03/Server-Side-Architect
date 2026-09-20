import nodemailer from "nodemailer";

export const sendMail = async (options) => {
  // CREATE TRANSPORTER
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  //   define email option\
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  //   SEND MAIL
  await transporter.sendMail(mailOptions);
};
