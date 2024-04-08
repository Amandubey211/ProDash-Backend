import nodemailer from "nodemailer";

export const sendMail = async function sendMail(str, data) {
  try {
    // Create transporter object
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let subject, html;

    if (str === "signup") {
      subject = `Welcome to Pro-Dash, ${data.userName}!`;
      html = `
        <h1>Welcome to Pro-Dash!</h1>
        <p>Thank you for signing up!</p>
        <p>Here are your details:</p>
        <ul>
          <li>Name: ${data.userName}</li>
          <li>Email: ${data.email}</li>
        </ul>
      `;
    }

    // Send email
    let info = await transporter.sendMail({
      from: "Pro-Dash <amanheller8833@gmail.com>",
      to: data.email,
      subject: subject,
      html: html,
    });
  } catch (error) {
    console.error("Error sending email");
  }
};
