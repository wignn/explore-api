import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';



type MailerRequest = {
    email: string;
    subject: string;
    text: string;
    valtoken: string;
}

export const sendMail = async (request: MailerRequest) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
  
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Roboto', Arial, sans-serif; background-color: #f4f4f4; color: #333333;">
  <!-- Preheader text -->
  <div style="display: none; max-height: 0px; overflow: hidden;">
    Verify your email to activate your Explore account
  </div>
  <!-- End preheader text -->

  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h1 style="margin: 0 0 20px; font-size: 28px; font-weight: bold; text-align: center; color: #1a73e8;">Email Verification</h1>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5; text-align: center;">Hi there,</p>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5; text-align: center;">You're almost there! Click the button below to verify your email and activate your account.</p>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="https://explore-ecru-seven.vercel.app/reset/${request.email}/${request.valtoken}" style="display: inline-block; padding: 14px 30px; background-color: #1a73e8; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 5px; text-transform: uppercase;">Verify Email</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.5; text-align: center; color: #666666;">If you didn't request this, you can safely ignore this email.</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f8f8f8; border-radius: 0 0 8px 8px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="text-align: center; font-size: 12px; color: #888888;">
                    <p style="margin: 0;">wign &copy; ${new Date().getFullYear()}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
    
      await transporter.sendMail({
        from: 'wignn',
        to: request.email,
        subject: request.subject,
        html: html,
      });
  
      return 'Email verified';
}
