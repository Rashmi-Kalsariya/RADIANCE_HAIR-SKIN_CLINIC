# 🏢 Professional SMTP Setup for Radiance Hair & Skin Clinic

## 🎯 **Why Company Domain Email?**

Using your company domain email (like `info@radianceclinic.com`) instead of Gmail provides:
- ✅ **Professional branding** - Emails come from your domain
- ✅ **Trust & credibility** - Customers see your brand name
- ✅ **Better deliverability** - Less likely to be marked as spam
- ✅ **Brand consistency** - Matches your website domain

---

## 📧 **Step 1: Get Your Company Email**

### **Option A: Use Your Existing Domain**
1. **Your domain:** `radianceskin.org` ✅ (Already owned)
2. **Get email hosting** from providers like:
   - **Hostinger** - ₹99/month (recommended)
   - **GoDaddy** - ₹199/month
   - **Namecheap** - ₹150/month
   - **Bluehost** - ₹299/month

### **Option B: Use Existing Hosting**
If you already have website hosting, most providers include email:
- **cPanel hosting** - Usually includes unlimited emails
- **Check with your hosting provider** for email setup

### **Option C: Google Workspace (Professional)**
- **₹136/month per user** - Professional Gmail with your domain
- **Email:** `info@radianceclinic.com` powered by Gmail
- **Most reliable option** but costs monthly

---

## 🔧 **Step 2: Create Professional Email Addresses**

### **Recommended Email Addresses:**
```
info@radianceskin.org        - General inquiries
contact@radianceskin.org     - Contact form submissions
appointments@radianceskin.org - Booking requests
support@radianceskin.org     - Customer support
admin@radianceskin.org       - Admin notifications
```

### **For This Setup, Create:**
- `info@radianceskin.org` - Main sending email
- Forward all emails to: `drbrijsclinic@gmail.com`

---

## ⚙️ **Step 3: Get SMTP Settings**

### **From Your Hosting Provider:**
Contact your hosting provider and ask for:
1. **SMTP Host** (e.g., `mail.radianceclinic.com`)
2. **SMTP Port** (usually 587 or 465)
3. **Username** (usually your full email)
4. **Password** (your email password)
5. **Security type** (TLS/SSL)

### **Common SMTP Settings by Provider:**

**Hostinger:**
```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=info@radianceclinic.com
SMTP_PASS=your-email-password
```

**GoDaddy:**
```
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=587
SMTP_USER=info@radianceclinic.com
SMTP_PASS=your-email-password
```

**cPanel Hosting:**
```
SMTP_HOST=mail.radianceskin.org
SMTP_PORT=587
SMTP_USER=info@radianceskin.org
SMTP_PASS=your-email-password
```

**Google Workspace:**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=info@radianceskin.org
SMTP_PASS=your-google-workspace-password
```

---

## 📝 **Step 4: Configure Your .env File**

Update your `.env` file with your SMTP settings:

```env
# Professional SMTP Configuration
EMAIL_SERVICE=smtp

# Your SMTP Settings (get from hosting provider)
SMTP_HOST=mail.radianceskin.org
SMTP_PORT=587
SMTP_SECURE=false

# Your Company Email Credentials
SMTP_USER=info@radianceskin.org
SMTP_PASS=your-email-password

# Email Branding
EMAIL_FROM=info@radianceskin.org
EMAIL_FROM_NAME=Radiance Hair & Skin Clinic
BRAND_EMAIL=drbrijsclinic@gmail.com

# Server Settings
PORT=3000
WEBSITE_URL=https://radianceskin.org
```

---

## 🚀 **Step 5: Test Your Setup**

### **1. Start the server:**
```bash
npm install
npm start
```

### **2. Check console output:**
You should see:
```
📧 SMTP Configuration:
   Host: mail.radianceskin.org
   Port: 587
   Secure: false
   User: info@radianceskin.org
   From: info@radianceskin.org
✅ Email server is ready to send messages
🚀 Radiance Clinic Server running on http://localhost:3000
```

### **3. Test contact form:**
- Open: `http://localhost:3000`
- Fill contact form
- Submit and check for success message

### **4. Check emails:**
- **Admin email** goes to: `drbrijsclinic@gmail.com`
- **Customer confirmation** goes to: customer's email
- **Both emails sent from:** `info@radianceclinic.com`

---

## 📧 **What Your Customers Will See:**

### **Email Header:**
```
From: Radiance Hair & Skin Clinic <info@radianceskin.org>
To: customer@email.com
Subject: ✨ Thank you for contacting Radiance Hair & Skin Clinic
```

### **Professional Benefits:**
- ✅ **Branded sender** - Your clinic name appears
- ✅ **Professional domain** - Not Gmail or Yahoo
- ✅ **Trust factor** - Customers trust domain emails
- ✅ **Consistent branding** - Matches your website

---

## 🛠️ **Troubleshooting Common Issues:**

### **❌ "Connection refused" Error:**
- **Check SMTP host** - Make sure it's correct
- **Try different port** - 587, 465, or 25
- **Contact hosting provider** - Verify SMTP settings

### **❌ "Authentication failed" Error:**
- **Check email/password** - Make sure they're correct
- **Create email account first** - Must exist in hosting
- **Check username format** - Some need full email, others just name

### **❌ "Certificate error" Error:**
- **Add to .env:** `SMTP_SECURE=false`
- **Or try:** `SMTP_PORT=587`
- **Contact hosting** - They may have specific settings

### **❌ "Emails not received" Error:**
- **Check spam folder** - New domains may go to spam
- **Verify email forwarding** - Make sure it's set up
- **Test with different email** - Try Gmail, Yahoo, etc.

---

## 💡 **Pro Tips:**

### **1. Email Forwarding:**
Set up forwarding so all emails to `info@radianceskin.org` go to `drbrijsclinic@gmail.com`

### **2. Multiple Recipients:**
You can send to multiple emails:
```env
BRAND_EMAIL=drbrijsclinic@gmail.com,admin@radianceskin.org
```

### **3. Email Signatures:**
The system automatically adds professional signatures with your clinic info.

### **4. Backup Email:**
Keep Gmail as backup in case SMTP has issues.

---

## 📞 **Need Help?**

### **Contact Your Hosting Provider:**
- **Hostinger:** Live chat support
- **GoDaddy:** Phone support
- **Namecheap:** Ticket support
- **Bluehost:** Phone/chat support

### **Ask for:**
1. "SMTP settings for sending emails"
2. "How to create email accounts"
3. "Email forwarding setup"
4. "Port 587 or 465 for SMTP"

---

## ✅ **Success Checklist:**

- [ ] Domain purchased (if needed)
- [ ] Email hosting set up
- [ ] Email account created (`info@radianceskin.org`)
- [ ] SMTP settings obtained from provider
- [ ] `.env` file updated with SMTP settings
- [ ] Email forwarding configured
- [ ] Server started successfully
- [ ] Contact form tested
- [ ] Emails received at `drbrijsclinic@gmail.com`
- [ ] Customer confirmation emails working
- [ ] Professional branding verified

---

**🎉 Congratulations!**

Your clinic now has a professional email system that:
- ✅ **Sends from your domain** - `info@radianceskin.org`
- ✅ **Builds brand trust** - Professional appearance
- ✅ **Delivers reliably** - Direct SMTP connection
- ✅ **Looks professional** - Branded email templates
- ✅ **Forwards to Gmail** - Easy management

**Your customers will see emails from:** `Radiance Hair & Skin Clinic <info@radianceskin.org>`
**You'll receive notifications at:** `drbrijsclinic@gmail.com`
