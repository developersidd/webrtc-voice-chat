import nodemailer from "nodemailer";

console.log("🚀 ~ process.env.MY_EMAIL:", process.env.MY_EMAIL)
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_EMAIL_PASSWORD,
  },
});

const sendMail = async (to, subject, text, ...rest) => {
  const mailOptions = {
    from: process.env.MY_EMAIL,
    to,
    subject,
    text,
    ...rest,
  };

  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("🚀 ~ error:", error)
    throw error;
  }
};

export default sendMail;
