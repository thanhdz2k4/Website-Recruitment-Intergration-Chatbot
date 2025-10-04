const nodemailer = require("nodemailer");

module.exports.sendMail = async (email, subject, html) => {
  if (!email) throw new Error("Email recipient is undefined");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent: " + info.response);
  } catch (error) {
    console.error("❌ Lỗi gửi email:", error);
    throw error;
  }
};
