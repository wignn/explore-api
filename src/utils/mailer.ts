import * as nodemailer from 'nodemailer';



type MailerRequest = {
    email: string;
    subject: string;
    text: string;
    html: string;
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
  
      
  
      await transporter.sendMail({
        from: 'wignn',
        to: request.email,
        subject: request.subject,
        html: request.html,
      });
  
      return 'Email verified';
}
