# 🚀 Radiance Hair & Skin Clinic - Deployment Guide

## 📋 **Backend Deployment (Step 1)**

### **Option 1: Render.com (Recommended - Free)**

#### **Step 1: Create GitHub Repository**
1. **Go to GitHub.com** and create new repository
2. **Repository name:** `radiance-clinic-backend`
3. **Make it public** (required for free tier)
4. **Don't initialize** with README (we'll push existing code)

#### **Step 2: Push Code to GitHub**
```bash
# In your project folder
git init
git add .
git commit -m "Initial commit - Radiance Clinic Backend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/radiance-clinic-backend.git
git push -u origin main
```

#### **Step 3: Deploy to Render**
1. **Go to** https://render.com/
2. **Sign up** with GitHub account
3. **Click "New +"** → **"Web Service"**
4. **Connect GitHub** repository: `radiance-clinic-backend`
5. **Configure deployment:**
   ```
   Name: radiance-clinic-backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

#### **Step 4: Set Environment Variables**
In Render dashboard, add these environment variables:
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
EMAIL_FROM=rashmikalsariya02@gmail.com
EMAIL_FROM_NAME=Radiance Hair & Skin Clinic
BRAND_EMAIL=drbrijsclinic@gmail.com
WEBSITE_URL=https://radianceskin.org
```

#### **Step 5: Deploy**
1. **Click "Create Web Service"**
2. **Wait for deployment** (5-10 minutes)
3. **Get your backend URL:** `https://radiance-clinic-backend.onrender.com`

---

### **Option 2: Railway (Alternative)**

#### **Step 1: Deploy to Railway**
1. **Go to** https://railway.app/
2. **Sign up** with GitHub
3. **Click "Deploy from GitHub repo"**
4. **Select** your repository
5. **Add environment variables** (same as above)

#### **Step 2: Get URL**
- **Your backend URL:** `https://your-app.railway.app`

---

### **Option 3: Heroku (Alternative)**

#### **Step 1: Install Heroku CLI**
```bash
# Download from: https://devcenter.heroku.com/articles/heroku-cli
```

#### **Step 2: Deploy to Heroku**
```bash
heroku login
heroku create radiance-clinic-backend
git push heroku main
```

#### **Step 3: Set Environment Variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set SMTP_HOST=smtp.gmail.com
heroku config:set SMTP_USER=rashmikalsariya02@gmail.com
# ... add all other variables
```

---

## 🌐 **Frontend Deployment (Step 2)**

### **Option 1: Hostinger (Your Current Host)**

#### **Step 1: Update Frontend URLs**
Update all API calls in your HTML/JS files to point to your deployed backend:
```javascript
// Change from:
fetch('/api/contact', ...)

// Change to:
fetch('https://radiance-clinic-backend.onrender.com/api/contact', ...)
```

#### **Step 2: Upload to Hostinger**
1. **Upload all HTML, CSS, JS files** to your Hostinger hosting
2. **Update domain** to point to your files
3. **Test the website**

### **Option 2: Netlify (Alternative)**
1. **Go to** https://netlify.com/
2. **Drag and drop** your website folder
3. **Update API URLs** to your backend
4. **Deploy**

### **Option 3: Vercel (Alternative)**
1. **Go to** https://vercel.com/
2. **Import GitHub repository**
3. **Deploy static files**

---

## 🔧 **Post-Deployment Setup**

### **Step 1: Update CORS**
Add your frontend domain to CORS in server.js:
```javascript
app.use(cors({
    origin: ['https://radianceskin.org', 'https://your-frontend-url.com'],
    credentials: true
}));
```

### **Step 2: Test Email System**
1. **Visit your deployed website**
2. **Submit contact form**
3. **Check** `rashmikalsariya02@gmail.com` for emails

### **Step 3: Update DNS (if needed)**
If using custom domain:
1. **Point domain** to your hosting
2. **Update SSL certificates**
3. **Test all functionality**

---

## ✅ **Deployment Checklist**

### **Backend:**
- [ ] Code pushed to GitHub
- [ ] Deployed to Render/Railway/Heroku
- [ ] Environment variables configured
- [ ] Backend URL working
- [ ] Email system tested

### **Frontend:**
- [ ] API URLs updated to backend
- [ ] Files uploaded to hosting
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Contact form working

### **Testing:**
- [ ] Website loads properly
- [ ] Contact form submits
- [ ] Emails received at rashmikalsariya02@gmail.com
- [ ] All pages working
- [ ] Mobile responsive

---

## 🎯 **Quick Start (Recommended)**

### **For Render Deployment:**
1. **Create GitHub repo** and push code
2. **Deploy to Render** with environment variables
3. **Update frontend** API URLs
4. **Upload to Hostinger**
5. **Test everything**

### **Your URLs will be:**
- **Backend:** `https://radiance-clinic-backend.onrender.com`
- **Frontend:** `https://radianceskin.org`
- **API Endpoint:** `https://radiance-clinic-backend.onrender.com/api/contact`

---

## 🚨 **Important Notes**

1. **Free tier limitations:**
   - Render: May sleep after 15 minutes of inactivity
   - Railway: 500 hours/month free
   - Heroku: 550 hours/month free

2. **Environment variables:**
   - Never commit `.env` file to GitHub
   - Set all variables in hosting dashboard
   - Use secure Gmail App Password

3. **CORS configuration:**
   - Update allowed origins for production
   - Test from your actual domain

---

**Ready to deploy? Let's start with Step 1: Creating GitHub repository!** 🚀
