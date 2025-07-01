const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' })
        };
    }

    try {
        const { name, email, phone, message } = JSON.parse(event.body);

        // Validate required fields
        if (!name || !email || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    success: false,
                    message: 'Please fill in all required fields (Name, Email, and Message)'
                })
            };
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    success: false,
                    message: 'Please enter a valid email address'
                })
            };
        }

        // Create Gmail transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        // Email content
        const mailOptions = {
            from: `"Radiance Hair & Skin Clinic" <info@radianceskin.org>`,
            to: 'drbrijsclinic@gmail.com',
            subject: `🏥 New Contact Form - ${name} - Radiance Clinic`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Contact Form Inquiry</title>
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #0F3B4A, #1a5f7a); color: white; padding: 25px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="margin: 0; font-size: 28px;">🏥 Radiance Hair & Skin Clinic</h1>
                        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">New Contact Form Inquiry</p>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
                        <h2 style="color: #0F3B4A; margin-top: 0; border-bottom: 3px solid #C59D2F; padding-bottom: 10px;">
                            📋 Customer Details
                        </h2>
                        
                        <div style="background: white; padding: 25px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #0F3B4A; width: 120px;">👤 Name:</td>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 16px;">${name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #0F3B4A;">📧 Email:</td>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #C59D2F; text-decoration: none; font-weight: 500;">${email}</a></td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #0F3B4A;">📱 Phone:</td>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 16px;">${phone || 'Not provided'}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; font-weight: bold; color: #0F3B4A;">📅 Date:</td>
                                    <td style="padding: 12px 0; font-size: 16px;">${new Date().toLocaleString()}</td>
                                </tr>
                            </table>
                        </div>
                        
                        <h3 style="color: #0F3B4A; margin-top: 30px;">💬 Customer Message:</h3>
                        <div style="background: white; padding: 25px; border-radius: 8px; border-left: 5px solid #C59D2F; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <p style="margin: 0; line-height: 1.8; color: #333; font-size: 16px;">${message.replace(/\n/g, '<br>')}</p>
                        </div>
                        
                        <div style="background: #e8f4f8; padding: 25px; border-radius: 8px; margin: 30px 0; text-align: center;">
                            <h4 style="color: #0F3B4A; margin-top: 0; margin-bottom: 20px;">🔄 Quick Actions</h4>
                            <div style="margin-top: 15px;">
                                <a href="mailto:${email}?subject=Re: Your inquiry to Radiance Hair & Skin Clinic" 
                                   style="background: #0F3B4A; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 8px; font-weight: bold; font-size: 14px;">
                                    📧 Reply to Customer
                                </a>
                                ${phone ? `<a href="tel:${phone}" style="background: #C59D2F; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 8px; font-weight: bold; font-size: 14px;">📞 Call Customer</a>` : ''}
                            </div>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
                        <p>This email was sent from the Radiance Hair & Skin Clinic website contact form.</p>
                        <p style="margin: 5px 0;">🌐 Website: <a href="https://radianceskin.org" style="color: #C59D2F;">radianceskin.org</a></p>
                    </div>
                </body>
                </html>
            `,
            replyTo: email
        };

        // Send admin notification email
        await transporter.sendMail(mailOptions);

        // Send customer welcome email
        const customerMailOptions = {
            from: `"Radiance Hair & Skin Clinic" <info@radianceskin.org>`,
            to: email,
            subject: '✨ Thank you for contacting Radiance Hair & Skin Clinic',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #0F3B4A, #1a5f7a); color: white; padding: 25px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="margin: 0; font-size: 28px;">🏥 Radiance Hair & Skin Clinic</h1>
                        <p style="margin: 10px 0 0 0; font-size: 18px;">Thank you for reaching out!</p>
                    </div>
                    <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
                        <h2 style="color: #0F3B4A; margin-top: 0;">Dear ${name},</h2>
                        <p style="font-size: 16px; line-height: 1.8; margin-bottom: 25px;">
                            Thank you for contacting <strong>Radiance Hair & Skin Clinic</strong>. We have received your inquiry and our expert team will get back to you within <strong style="color: #C59D2F;">24 hours</strong>.
                        </p>
                        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 5px solid #C59D2F; margin: 20px 0;">
                            <h3 style="color: #0F3B4A; margin-top: 0;">📋 Your Message Summary:</h3>
                            <p style="margin: 0; color: #666; font-style: italic;">"${message.substring(0, 150)}${message.length > 150 ? '...' : ''}"</p>
                        </div>
                        <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #0F3B4A; margin-top: 0;">📞 Our Contact Information:</h3>
                            <p style="margin: 5px 0;"><strong>📱 Phone:</strong> +91 6352214662</p>
                            <p style="margin: 5px 0;"><strong>📧 Email:</strong> drbrijsclinic@gmail.com</p>
                            <p style="margin: 5px 0;"><strong>📍 Address:</strong> 408, 4th Floor, Green Palladia, Opp. Raj World Shopping, Palanpore Gam, Adajan, Surat, Gujarat (Pin-395009)</p>
                        </div>
                        <div style="text-align: center; margin: 25px 0;">
                            <a href="https://radianceskin.org" style="background: #0F3B4A; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 5px; font-weight: bold;">
                                🌐 Visit Our Website
                            </a>
                            <a href="tel:+916352214662" style="background: #C59D2F; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 5px; font-weight: bold;">
                                📞 Call Us Now
                            </a>
                        </div>
                        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #C59D2F;">
                            <h4 style="color: #0F3B4A; margin-top: 0;">⏰ What Happens Next?</h4>
                            <p style="margin: 5px 0;">• Our team will review your inquiry</p>
                            <p style="margin: 5px 0;">• We'll contact you within 24 hours</p>
                            <p style="margin: 5px 0;">• Schedule a consultation if needed</p>
                            <p style="margin: 5px 0;">• Provide personalized treatment recommendations</p>
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
                        <p>Best regards,<br><strong style="color: #0F3B4A;">Dr. Brijesha Chauhan & Radiance Team</strong></p>
                        <p>🌐 <a href="https://radianceskin.org" style="color: #C59D2F;">radianceskin.org</a> | 📧 <a href="mailto:drbrijsclinic@gmail.com" style="color: #C59D2F;">drbrijsclinic@gmail.com</a></p>
                    </div>
                </div>
            `,
            replyTo: 'drbrijsclinic@gmail.com'
        };

        await transporter.sendMail(customerMailOptions);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: JSON.stringify({
                success: true,
                message: 'Thank you! Your message has been sent successfully. We will contact you soon.'
            })
        };

    } catch (error) {
        console.error('Contact form error:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: JSON.stringify({
                success: false,
                message: 'Sorry, there was an error sending your message. Please try again later.'
            })
        };
    }
};
