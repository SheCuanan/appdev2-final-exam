const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');

const sendEmail = async ({ to, subject, template, data }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or another email provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = pug.renderFile(
    path.join(__dirname, '..', 'emails', `${template}.pug`),
    data
  );

  const mailOptions = {
    from: `Event App <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
