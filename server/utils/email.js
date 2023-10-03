const nodemailer = require('nodemailer');
const {EMAIL_KEY, SECRET} = require('../utils/config')
const jwt = require('jsonwebtoken')

const sendVerificationMail = (newUser) => {
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ajayjain1024@gmail.com',
      pass: EMAIL_KEY
    }
  });

  const token = jwt.sign({id:newUser._id.toString()},SECRET,{expiresIn:'2h'})
  const link = `http://localhost:3000/verify/${token}`

  const mailContent = 
  `Welcome to Flow Chat!\nTo verify your email click on the link below\n <a href="${link}">Link</a>`

  const mailDetails = {
    from: 'ajayjain1024@gmail.com',
    to: `${newUser.email}`,
    subject: 'Verification Email',
    html: mailContent
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log('Error Occurs',err);
    } else {
      console.log('Email sent successfully');
    }
  });
}

module.exports = {sendVerificationMail}