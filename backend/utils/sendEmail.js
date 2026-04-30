const nodemailer = require('nodemailer');

const sendWelcomeEmail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `LawConnect <${process.env.EMAIL_USER}>`,
            to: options.email,
            subject: options.subject,
            html: options.html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (err) {
        console.error('Email could not be sent. Check your App Password credentials.', err.message);
    }
};

module.exports = sendWelcomeEmail;
