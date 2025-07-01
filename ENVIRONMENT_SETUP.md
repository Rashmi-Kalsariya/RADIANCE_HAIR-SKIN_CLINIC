# 🔐 Environment Variables Setup Guide

## 📋 **For Local Development**

### **Step 1: Create .env file**
```bash
# Copy the example file
cp .env.example .env
```

### **Step 2: Fill in your values**
Edit `.env` file with your actual credentials:
```env
# Gmail Configuration
SMTP_USER=rashmikalsariya02@gmail.com
SMTP_PASS=your-actual-gmail-app-password
GMAIL_USER=rashmikalsariya02@gmail.com
GMAIL_PASS=your-actual-gmail-app-password
EMAIL_FROM=rashmikalsariya02@gmail.com
BRAND_EMAIL=drbrijsclinic@gmail.com
```

---

## 🚀 **For Deployment**

### **Render.com Environment Variables**
Add these in Render dashboard:
```
NODE_ENV=production
EMAIL_SERVICE=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=rashmikalsariya02@gmail.com
SMTP_PASS=your-gmail-app-password
GMAIL_USER=rashmikalsariya02@gmail.com
GMAIL_PASS=your-gmail-app-password
EMAIL_FROM=info@radianceskin.org
EMAIL_FROM_NAME=Radiance Hair & Skin Clinic
BRAND_EMAIL=drbrijsclinic@gmail.com
WEBSITE_URL=https://radianceskin.org
```

### **Netlify Environment Variables**
Add these in Netlify dashboard:
```
GMAIL_USER=rashmikalsariya02@gmail.com
GMAIL_PASS=your-gmail-app-password
NODE_ENV=production
```

### **Railway Environment Variables**
Add these in Railway dashboard:
```
NODE_ENV=production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=rashmikalsariya02@gmail.com
SMTP_PASS=your-gmail-app-password
GMAIL_USER=rashmikalsariya02@gmail.com
GMAIL_PASS=your-gmail-app-password
EMAIL_FROM=info@radianceskin.org
BRAND_EMAIL=drbrijsclinic@gmail.com
WEBSITE_URL=https://radianceskin.org
```

---

## 🔑 **Gmail App Password Setup**

### **Step 1: Enable 2-Step Verification**
1. Go to **Google Account Settings**
2. **Security** → **2-Step Verification**
3. **Enable** if not already enabled

### **Step 2: Generate App Password**
1. **Security** → **App passwords**
2. **Select app:** Mail
3. **Select device:** Other (Custom name)
4. **Name:** "Radiance Clinic Website"
5. **Generate** and copy the 16-character password
6. **Remove spaces** from the password

### **Example:**
```
Generated: abcd efgh ijkl mnop
Use in .env: abcdefghijklmnop
```

---

## 🛡️ **Security Best Practices**

### **✅ Do:**
- Keep `.env` file local only
- Use `.env.example` for documentation
- Set environment variables in hosting dashboard
- Use strong, unique passwords
- Regularly rotate App passwords

### **❌ Don't:**
- Commit `.env` file to Git
- Share credentials in chat/email
- Use regular Gmail password
- Hardcode credentials in source code
- Use same password for multiple services

---

## 🧪 **Testing Environment Variables**

### **Local Testing:**
```bash
# Start server
npm start

# Check console for:
✅ Gmail service is ready
✅ Email system initialized
```

### **Production Testing:**
1. **Deploy to hosting platform**
2. **Set environment variables**
3. **Test contact form**
4. **Check email delivery**

---

## 🚨 **Troubleshooting**

### **Common Issues:**

**❌ "Invalid login" error:**
- Check Gmail App Password is correct
- Remove spaces from password
- Ensure 2-Step Verification is enabled

**❌ "EAUTH" error:**
- Regenerate Gmail App Password
- Check username is correct email
- Verify environment variables are set

**❌ "ECONNREFUSED" error:**
- Check SMTP host and port
- Verify internet connection
- Try different SMTP settings

**❌ Environment variables not loading:**
- Check .env file exists
- Verify variable names match exactly
- Restart server after changes

---

## 📞 **Support**

If you need help:
1. **Check this guide first**
2. **Verify all environment variables**
3. **Test with simple email first**
4. **Check server logs for errors**

---

## ✅ **Deployment Checklist**

### **Before Deployment:**
- [ ] `.env.example` file created
- [ ] `.gitignore` includes `.env`
- [ ] Gmail App Password generated
- [ ] Local testing successful

### **During Deployment:**
- [ ] Environment variables set in hosting dashboard
- [ ] No `.env` file committed to Git
- [ ] Production URLs updated
- [ ] SSL certificates configured

### **After Deployment:**
- [ ] Contact form tested
- [ ] Emails received successfully
- [ ] Error handling working
- [ ] All pages loading correctly

---

**🎉 Your environment is now secure and ready for deployment!**
