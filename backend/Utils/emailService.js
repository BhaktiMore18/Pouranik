import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Creates a nodemailer transporter for sending emails
 * For development, you can use:
 * - Gmail with app password
 * - Mailtrap for testing
 * - SendGrid, Mailgun for production
 */
const createTransporter = () => {
  // For development with Gmail:
  // 1. Enable 2-Factor Authentication
  // 2. Create an App Password
  // 3. Use that password in EMAIL_PASS
  
  return nodemailer.createTransporter({
    service: 'gmail', // or 'hotmail', 'yahoo', etc.
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

/**
 * Send password reset email
 * @param {string} to - Recipient email address
 * @param {string} resetToken - Password reset token
 * @returns {Promise} - Promise resolving to email info
 */
export const sendPasswordResetEmail = async (to, resetToken) => {
  const transporter = createTransporter();
  
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: to,
    subject: 'Password Reset Request - Pouranik',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 30px;
              border-radius: 10px;
            }
            .content {
              background: white;
              padding: 30px;
              border-radius: 8px;
            }
            .logo {
              text-align: center;
              font-size: 32px;
              font-weight: bold;
              color: #667eea;
              margin-bottom: 20px;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background: #667eea;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
              font-weight: bold;
            }
            .button:hover {
              background: #5568d3;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 12px;
              color: #666;
            }
            .warning {
              background: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 10px;
              margin: 15px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="content">
              <div class="logo">📚 Pouranik</div>
              
              <h2>Password Reset Request</h2>
              
              <p>Hello,</p>
              
              <p>You recently requested to reset your password for your Pouranik account. Click the button below to reset it:</p>
              
              <div style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset Your Password</a>
              </div>
              
              <div class="warning">
                <strong>⚠️ Important:</strong> This link will expire in 1 hour for security reasons.
              </div>
              
              <p>If the button doesn't work, copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #667eea;">${resetUrl}</p>
              
              <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
              
              <p>Thanks,<br>The Pouranik Team</p>
              
              <div class="footer">
                <p>This is an automated email, please do not reply.</p>
                <p>&copy; 2025 Pouranik. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Password Reset Request
      
      You recently requested to reset your password for your Pouranik account.
      
      Click the link below to reset your password:
      ${resetUrl}
      
      This link will expire in 1 hour.
      
      If you didn't request a password reset, please ignore this email.
      
      Thanks,
      The Pouranik Team
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
};

/**
 * Send password reset confirmation email
 * @param {string} to - Recipient email address
 * @returns {Promise} - Promise resolving to email info
 */
export const sendPasswordResetConfirmation = async (to) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: to,
    subject: 'Password Reset Successful - Pouranik',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 30px;
              border-radius: 10px;
            }
            .content {
              background: white;
              padding: 30px;
              border-radius: 8px;
            }
            .logo {
              text-align: center;
              font-size: 32px;
              font-weight: bold;
              color: #667eea;
              margin-bottom: 20px;
            }
            .success {
              background: #d4edda;
              border-left: 4px solid #28a745;
              padding: 15px;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="content">
              <div class="logo">📚 Pouranik</div>
              
              <h2>Password Reset Successful!</h2>
              
              <div class="success">
                <strong>✅ Success!</strong> Your password has been reset successfully.
              </div>
              
              <p>Hello,</p>
              
              <p>This is a confirmation that your Pouranik account password was just changed.</p>
              
              <p>If you did not make this change, please contact our support team immediately.</p>
              
              <p>Thanks,<br>The Pouranik Team</p>
              
              <div class="footer">
                <p>This is an automated email, please do not reply.</p>
                <p>&copy; 2025 Pouranik. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Password Reset Successful!
      
      This is a confirmation that your Pouranik account password was just changed.
      
      If you did not make this change, please contact our support team immediately.
      
      Thanks,
      The Pouranik Team
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset confirmation email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw new Error('Failed to send confirmation email');
  }
};
