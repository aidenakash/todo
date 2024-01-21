const nodeMailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = (name, email, token) => {
  // email transport details
  console.log(email)
  const transport = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // html temp
  const emailTemplateSource = fs.readFileSync(
    path.join(__dirname, "../auth/resetPassword.temp.hbs"),
    "utf-8"
  );

  // hbs
  const template = handlebars.compile(emailTemplateSource);
  const htmlToSend = template({ name: name, token: token });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "password reset",
    html: htmlToSend,
  };
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error(error);
      } else {
        console.log("Email sent successfully!");
        // Access envelope only on success
        console.log(info.envelope);
      }
  });
  return true
};

module.exports = { sendEmail };
