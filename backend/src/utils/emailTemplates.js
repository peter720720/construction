/**
 * Generates a clean, professional welcome email layout
 */
const getWelcomeTemplate = (userName) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Titan Construction</title>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f4f4f5; padding-bottom: 40px; }
        .main-table { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); margin-top: 40px; }
        .header { background-color: #18181b; padding: 40px 20px; text-align: center; color: #ffffff; }
        .logo { font-size: 26px; font-weight: 800; letter-spacing: 1px; color: #f59e0b; margin: 0; text-transform: uppercase; }
        .logo span { color: #ffffff; }
        .content { padding: 40px 30px; color: #3f3f46; line-height: 1.6; }
        .greeting { font-size: 22px; font-weight: 700; color: #18181b; margin-top: 0; margin-bottom: 20px; }
        .body-text { font-size: 16px; margin-bottom: 30px; }
        .cta-button { display: inline-block; background-color: #f59e0b; color: #18181b !important; text-decoration: none; padding: 14px 28px; font-weight: 700; border-radius: 5px; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
        .footer { background-color: #f4f4f5; padding: 24px; text-align: center; font-size: 12px; color: #71717a; border-top: 1px solid #e4e4e7; }
        .footer-links a { color: #f59e0b; text-decoration: none; margin: 0 8px; }
      </style>
    </head>
    <body>
      <center class="wrapper">
        <table class="main-table" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td class="header">
              <!-- Company branding logo block -->
              <h1 class="logo">Titan <span>Construction</span></h1>
            </td>
          </tr>
          <tr>
            <td class="content">
              <h2 class="greeting">Hi ${userName},</h2>
              <p class="body-text">Welcome to <strong>Titan Construction</strong>. We are thrilled to have you join our premium platform. Your personal dashboard is now completely setup and ready for use.</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${process.env.FRONTEND_URL}/user-login" class="cta-button">Access Your Dashboard</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="footer">
              <p style="margin: 0 0 10px 0;">© 2026 Titan Construction Company. All rights reserved.</p>
              <p style="margin: 0 0 15px 0;">123 Innovation Boulevard, Suite 500, Corporate Plaza</p>
              <div class="footer-links">
                <a href="#">Instagram</a> • <a href="#">Twitter</a> • <a href="#">LinkedIn</a>
              </div>
            </td>
          </tr>
        </table>
      </center>
    </body>
    </html>
  `;
};

/**
 * Generates a clean, high-visibility OTP verification email layout
 */
const getOtpTemplate = (userName, otpCode) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 0; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f4f4f5; padding-bottom: 40px; }
        .main-table { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); margin-top: 40px; }
        .header { background-color: #18181b; padding: 40px 20px; text-align: center; color: #ffffff; }
        .logo { font-size: 26px; font-weight: 800; letter-spacing: 1px; color: #f59e0b; margin: 0; text-transform: uppercase; }
        .logo span { color: #ffffff; }
        .content { padding: 40px 30px; color: #3f3f46; line-height: 1.6; }
        .greeting { font-size: 22px; font-weight: 700; color: #18181b; margin-top: 0; margin-bottom: 20px; }
        .body-text { font-size: 16px; margin-bottom: 25px; }
        .otp-container { background-color: #f4f4f5; border: 2px dashed #e4e4e7; border-radius: 6px; padding: 20px; text-align: center; margin-bottom: 25px; }
        .otp-code { font-size: 36px; font-weight: 800; letter-spacing: 6px; color: #18181b; margin: 0; }
        .expiry-text { font-size: 13px; color: #ef4444; font-weight: 600; text-align: center; margin-bottom: 25px; }
        .footer { background-color: #f4f4f5; padding: 24px; text-align: center; font-size: 12px; color: #71717a; border-top: 1px solid #e4e4e7; }
      </style>
    </head>
    <body>
      <center class="wrapper">
        <table class="main-table" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td class="header">
              <h1 class="logo">Titan <span>Construction</span></h1>
            </td>
          </tr>
          <tr>
            <td class="content">
              <h2 class="greeting">Password Reset Request</h2>
              <p class="body-text">Hi ${userName}, you requested to reset your account password. Use the verification code below to authorize this change:</p>
              <div class="otp-container">
                <h2 class="otp-code">${otpCode}</h2>
              </div>
              <p class="expiry-text">⚠️ This code is secure and will expire in exactly 15 minutes.</p>
              <p class="body-text" style="font-size: 14px; color: #71717a;">If you did not initiate this request, you can safely ignore this email. Your password will remain unchanged.</p>
            </td>
          </tr>
          <tr>
            <td class="footer">
              <p style="margin: 0;">© 2026 Titan Construction Company. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </center>
    </body>
    </html>
  `;
};

module.exports = {
  getWelcomeTemplate,
  getOtpTemplate
};
