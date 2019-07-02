
const nodemailer = require('nodemailer');

module.exports = async function sendMail(email, sub, content) {

    let transporter = nodemailer.createTransport({
        host: "ssl0.ovh.net",
        auth: {
            user: process.env.ARLEX_USER,
            pass: process.env.ARLEX_PASSWORD
        }
    });

    let mailOptions = {
        to: email,
        subject: sub,
        html: content,
    };
    await transporter.sendMail(mailOptions);
};