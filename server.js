const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API route FIRST
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Please fill in all required fields (Name, Email, and Message)' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"Radiance Hair & Skin Clinic" <${process.env.GMAIL_USER}>`,
            to: process.env.TO_EMAIL || process.env.GMAIL_USER,
            subject: `New Contact Form Inquiry - ${name}`,
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f3f8fa; padding: 32px;">
                  <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 16px rgba(15,59,74,0.08); border: 2px solid #0f3b4a; padding: 0;">
                    <div style="background: #0f3b4a; border-radius: 10px 10px 0 0; padding: 28px 32px 18px 32px; text-align:center;">
                      <h2 style="color: #c59d2f; margin: 0 0 8px 0; font-size: 26px; letter-spacing: 1px;">Radiance Hair & Skin Clinic</h2>
                      <div style="color: #fff; font-size: 18px; font-weight: 600; letter-spacing: 0.5px;">New Contact Form Inquiry</div>
                    </div>
                    <div style="padding: 32px 32px 18px 32px;">
                      <div style="font-size:17px; color:#0f3b4a; font-weight:600; margin-bottom: 12px;">📋 Customer Details</div>
                      <table style="width:100%; font-size:16px; color:#222; border-collapse:collapse; margin-bottom: 18px;">
                        <tr><td style="padding:8px 0; width:120px; color:#0f3b4a; font-weight:600;">👤 Name:</td><td>${name}</td></tr>
                        <tr><td style="padding:8px 0; color:#0f3b4a; font-weight:600;">📧 Email:</td><td>${email}</td></tr>
                        <tr><td style="padding:8px 0; color:#0f3b4a; font-weight:600;">📱 Phone:</td><td>${phone || 'Not provided'}</td></tr>
                        <tr><td style="padding:8px 0; color:#0f3b4a; font-weight:600;">📅 Date:</td><td>${new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}</td></tr>
                      </table>
                      <div style="font-size:17px; color:#0f3b4a; font-weight:600; margin-bottom: 8px;">💬 Customer Message:</div>
                      <div style="background:#f3f8fa; border-left:4px solid #c59d2f; padding:16px 20px; margin-bottom: 24px; border-radius:6px; color:#222;">${message.replace(/\n/g, '<br>')}</div>
                      <div style="font-size:17px; color:#0f3b4a; font-weight:600; margin-bottom: 8px;">🔄 Quick Actions</div>
                      <div style="margin-bottom: 8px;">
                        <a href="mailto:${email}" style="display:inline-block; background:#c59d2f; color:#fff; font-weight:600; text-decoration:none; padding:10px 22px; border-radius:6px; margin-right:10px;">📧 Reply to Customer</a>
                        <a href="tel:${phone}" style="display:inline-block; background:#0f3b4a; color:#fff; font-weight:600; text-decoration:none; padding:10px 22px; border-radius:6px;">📞 Call Customer</a>
                      </div>
                    </div>
                    <div style="background: #0f3b4a; border-radius: 0 0 10px 10px; padding: 18px 32px; border-top: 2px solid #c59d2f; text-align:center;">
                      <span style="font-size:13px; color:#fff;">This message was sent from the website contact form.<br>Radiance Hair & Skin Clinic</span>
                    </div>
                  </div>
                </div>
            `,
            replyTo: email
        });

        await transporter.sendMail({
            from: `"Radiance Hair & Skin Clinic" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: 'Thank you for contacting Radiance Hair & Skin Clinic',
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f3f8fa; padding: 32px;">
                  <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 16px rgba(15,59,74,0.08); border: 2px solid #0f3b4a; padding: 0;">
                    <div style="background: #0f3b4a; border-radius: 10px 10px 0 0; padding: 28px 32px 18px 32px; text-align:center;">
                      <h2 style="color: #c59d2f; margin: 0 0 8px 0; font-size: 26px; letter-spacing: 1px;">Thank You for Reaching Out!</h2>
                      <div style="color: #fff; font-size: 16px; font-weight: 600;">Radiance Hair & Skin Clinic</div>
                    </div>
                    <div style="padding: 32px 32px 18px 32px;">
                      <p style="font-size:16px; color:#0f3b4a; margin-bottom: 18px; font-weight:600;">Dear ${name},</p>
                      <p style="font-size:16px; color:#222; margin-bottom: 18px;">Thank you for contacting <span style='color:#c59d2f; font-weight:600;'>Radiance Hair & Skin Clinic</span>.<br>We have received your message and our expert team will get back to you as soon as possible.<br><br>We are committed to providing you with the most advanced and compassionate skin and hair care in Surat.</p>
                      <div style="background:#f3f8fa; border-left:4px solid #c59d2f; padding:16px 20px; margin:24px 0; border-radius:6px;">
                        <b style="color:#0f3b4a;">Your Message:</b><br>
                        <span style="white-space:pre-line; color:#222;">${message.replace(/\n/g, '<br>')}</span>
                      </div>
                      <p style="font-size:15px; color:#0f3b4a; margin:24px 0 0 0; font-weight:600;">Best regards,<br>Dr. Brijesha Chauhan & Team<br>Radiance Hair & Skin Clinic</p>
                    </div>
                    <div style="background: #0f3b4a; border-radius: 0 0 10px 10px; padding: 18px 32px; border-top: 2px solid #c59d2f; text-align:center;">
                      <span style="font-size:13px; color:#fff;">408, 4th Floor, Green Palladia, Opp. Raj World Shopping, Palanpore Gam, Adajan, Surat, Gujarat (Pin-395009)<br>Phone: +91 6352214662 | Email: radiance.srt@gmail.com<br>Monday – Saturday: 10:00 AM to 1:00 PM & 5:00 PM to 8:00 PM<br>Sunday: 10:00 AM to 1:00 PM (By Appointment Only)</span>
                    </div>
                  </div>
                </div>
            `
        });

        res.json({ success: true, message: 'Thank you! Your message has been sent successfully. We will contact you soon.' });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ success: false, message: 'Sorry, there was an error sending your message. Please try again later.' });
    }
});

// Static files and catch-all routes AFTER API
app.use(express.static(__dirname));
app.get(/^\/(?!api\/).*/, (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
