import nodemailer from "nodemailer";

export default async function nodeMailer(
  to: string,
  subject: string,
  text: string,
) {
  const provider = "gmail";

  const transporter = nodemailer.createTransport({
    service: provider,
    auth: {
      user: process.env.Email_user,
      pass: process.env.Email_pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.Email_user,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("chyba při odeslání emailu", error);
  }
}
