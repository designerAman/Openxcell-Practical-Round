module.exports = function makeSendEmail({ nodemailer }) {
  return async function sendEmail({ email, subject, html }) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "amangupta.ag26011998@gmail.com",
        pass: "bhcaqzhtqedathfw",
      },
    });

    const mailOptions = {
      from: "amangupta.ag26011998@gmail.com",
      to: email,
      subject,
      html,
    };

    return transporter.sendMail(mailOptions);
  };
};