const axios = require('axios');

const sendOTPEmail = async (email, otp) => {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    if (!BREVO_API_KEY) {
        console.error('BREVO_API_KEY is missing in .env');
        return;
    }

    const data = {
        sender: { name: 'LawConnect OTP', email: 'no-reply@lawconnect.com' },
        to: [{ email: email }],
        subject: 'Your LawConnect Secure OTP Code',
        htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;">
                <h2 style="color: #1754cf; text-align: center;">LawConnect Verification</h2>
                <p>Hello,</p>
                <p>You requested a One-Time Password (OTP) for your LawConnect account. Use the code below to complete your login/registration:</p>
                <div style="background-color: #f4f7ff; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                    <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1754cf;">${otp}</span>
                </div>
                <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes. If you did not request this code, please ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="text-align: center; font-size: 12px; color: #999;">&copy; 2025 LawConnect. All rights reserved.</p>
            </div>
        `
    };

    try {
        await axios.post('https://api.brevo.com/v3/smtp/email', data, {
            headers: {
                'api-key': BREVO_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        console.log(`OTP sent to ${email}`);
    } catch (err) {
        console.error('Error sending email via Brevo:', err.response ? err.response.data : err.message);
    }
};

module.exports = sendOTPEmail;
