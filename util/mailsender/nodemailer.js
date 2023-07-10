const nodemailer = require('nodemailer');
const { emailPassword, emailUser } = require('../../config/config');

const sendMail = async (mailInfo) => {
  let transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 465,
    secure: true,
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });

  const info = await transporter.sendMail(mailInfo);
  return info;
};

module.exports = { sendMail };
