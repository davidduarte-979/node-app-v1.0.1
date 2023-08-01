import { createTransport } from 'nodemailer';
import config from '../../config/config.js';

const { emailPassword, emailUser } = config;
const sendMail = async (mailInfo) => {
  let transporter = createTransport({
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

export default sendMail ;
