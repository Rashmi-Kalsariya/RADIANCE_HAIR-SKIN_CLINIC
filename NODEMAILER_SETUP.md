# 🏥 Radiance Hair & Skin Clinic - Nodemailer Setup Guide

## 📧 Complete Email System with Nodemailer

This guide will help you set up a professional email system using Nodemailer that sends emails directly to your brand email when users submit forms.

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Gmail App Password
1. **Go to Google Account Settings**: https://myaccount.google.com/
2. **Security** → **2-Step Verification** (Enable if not already)
3. **App passwords** → **Generate new app password**
4. **Select app**: Mail
5. **Select device**: Other (Custom name) → "Radiance Clinic Website"
6. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

### Step 3: Update .env File
Open `.env` file and replace:
```env
EMAIL_USER=rashmikalsariya02@gmail.com
EMAIL_PASS=your-16-character-app-password-here
```

### Step 4: Start Server
```bash
npm start
```

### Step 5: Test
- Open: http://localhost:3000
- Fill contact form and submit
- Check `rashmikalsariya02@gmail.com` for emails!

---

## 📋 What's Included

### ✅ Backend Features:
- **Node.js + Express** server
- **Nodemailer** for email sending
- **Professional HTML emails** with clinic branding
- **Contact form** endpoint (`/api/contact`)
- **Newsletter** endpoint (`/api/newsletter`)
- **Email validation** and error handling
- **CORS enabled** for frontend integration

### ✅ Frontend Features:
- **JavaScript client** (`js/nodemailer-client.js`)
- **Form validation** before sending
- **Loading states** with spinners
- **Success/error messages** with animations
- **Auto-reset forms** after submission
- **Professional notifications**

### ✅ Email Features:
- **Admin notification** - You receive formatted emails
- **Customer confirmation** - Customers get thank you emails
- **Professional design** - Clinic branding and colors
- **Mobile responsive** - Emails look great on all devices
- **Quick action buttons** - Reply and call buttons in emails

---

## 📧 Email Templates

### Admin Email (What You Receive):
```
Subject: 🏥 New Contact Form - [Customer Name] - Radiance Clinic

- Beautiful HTML template with clinic branding
- Customer details in organized table
- Customer message highlighted
- Quick action buttons (Reply, Call)
- Professional footer with clinic info
```

### Customer Email (What They Receive):
```
Subject: ✨ Thank you for contacting Radiance Hair & Skin Clinic

- Thank you message with clinic branding
- Confirmation of their inquiry
- Your contact information
- Professional clinic details
- Branded design matching website
```

---

## 🔧 Technical Details

### Server Configuration:
- **Port**: 3000 (configurable in .env)
- **Email Service**: Gmail SMTP
- **Security**: App passwords (not regular passwords)
- **CORS**: Enabled for all origins
- **Static Files**: Serves your HTML files

### API Endpoints:
- **POST /api/contact** - Contact form submissions
- **POST /api/newsletter** - Newsletter subscriptions
- **GET /** - Serves index-4.html as homepage

### File Structure:
```
├── server.js              # Main Node.js server
├── package.json           # Dependencies
├── .env                   # Email configuration
├── js/nodemailer-client.js # Frontend JavaScript
├── contactus.html         # Contact page (updated)
├── index-4.html          # Homepage (updated)
└── NODEMAILER_SETUP.md   # This guide
```

---

## 🛠️ Commands

```bash
# Install dependencies
npm install

# Start production server
npm start

# Start development server (auto-restart)
npm run dev

# Complete setup
npm run setup
```

---

## 🔒 Security Features

### ✅ Email Security:
- **App passwords** instead of regular passwords
- **Environment variables** for sensitive data
- **Input validation** on all form fields
- **Email format validation**
- **XSS protection** in email templates

### ✅ Server Security:
- **CORS configured** properly
- **Request validation** before processing
- **Error handling** without exposing sensitive info
- **Rate limiting** ready (can be added)

---

## 📱 Testing

### Contact Form Test:
1. Open http://localhost:3000/contactus.html
2. Fill out the form with real information
3. Click "SEND MESSAGE"
4. Check for success message
5. Check `rashmikalsariya02@gmail.com` for email

### Newsletter Test:
1. Find newsletter form on any page
2. Enter email address
3. Click subscribe
4. Check for success message
5. Check admin email for subscription notice

---

## 🚨 Troubleshooting

### Common Issues:

**❌ "Invalid login" error:**
- Make sure you're using App Password, not regular password
- Enable 2-Step Verification first
- Generate new App Password

**❌ "ECONNREFUSED" error:**
- Check internet connection
- Verify Gmail SMTP settings
- Try different network

**❌ Form not submitting:**
- Check browser console for errors
- Verify server is running on port 3000
- Check if nodemailer-client.js is loaded

**❌ Emails not received:**
- Check spam folder
- Verify email address in .env file
- Test with different email address

---

## 🎯 Production Deployment

### For Live Website:
1. **Update .env** with production settings
2. **Change PORT** if needed
3. **Update WEBSITE_URL** to your domain
4. **Deploy to hosting service** (Heroku, DigitalOcean, etc.)
5. **Update frontend URLs** to point to your server

### Hosting Recommendations:
- **Heroku** - Easy deployment
- **DigitalOcean** - More control
- **Vercel** - Good for static + API
- **Netlify** - With serverless functions

---

## 📞 Support

If you need help:
1. Check this guide first
2. Test with simple email first
3. Check server logs for errors
4. Verify all configuration steps

---

## ✅ Success Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] Gmail App Password generated
- [ ] .env file configured with correct credentials
- [ ] Server starts without errors (`npm start`)
- [ ] Website loads at http://localhost:3000
- [ ] Contact form submits successfully
- [ ] Admin receives formatted emails
- [ ] Customers receive confirmation emails
- [ ] Newsletter subscription works
- [ ] All error messages display properly

---

**🎉 Congratulations! Your professional email system is now ready!**

Your website now has a complete, professional email system that:
- ✅ Sends emails directly to your brand email
- ✅ Provides beautiful, branded email templates
- ✅ Gives customers confirmation emails
- ✅ Works reliably with Gmail
- ✅ Handles errors gracefully
- ✅ Looks professional and trustworthy
