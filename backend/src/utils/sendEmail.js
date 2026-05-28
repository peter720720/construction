const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'oyinloyepeter273@gmail.com', // Your explicit email string
      pass: 'xzxjqrzdduamficu',           // Your explicit 16-character Google app password
    },
  });

  try {
    await transporter.verify();
  } catch (error) {
    console.error('❌ Nodemailer Auth Configuration Failed:', error.message);
    throw new Error('Email transport auth layer mismatch.');
  }

  const mailOptions = {
    from: '"Titan Construction" <oyinloyepeter273@gmail.com>',
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
