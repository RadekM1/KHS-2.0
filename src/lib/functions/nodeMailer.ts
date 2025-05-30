import nodemailer from "nodemailer";

export default async function nodeMailer(
  to: string,
  subject: string,
  text: string,
) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const htmlBody = `
      <br>
      <p>
        ${text}
      </p>
      <br>
      <p>
        S pozdravem
        <br>
        <br>
        <strong>KHS TEAM</strong>
        <br>
        <br>
      </p>
    `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject,
      html: htmlBody,
    });
  } catch (error) {
    console.log("Chyba při odeslání emailu:", error);
    throw new Error("Chyba při odeslání emailu");
  }
}
