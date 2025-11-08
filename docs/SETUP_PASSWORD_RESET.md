# 🚀 Quick Setup Guide - Password Reset Feature

> For contributors wanting to test the Password Reset feature

---

## ⚡ Quick Start (5 minutes)

### 1. Install Dependencies ✅
```bash
# Already done!
cd backend && npm install
cd frontend && npm install
```

### 2. Setup Email (Choose One)

#### Option A: Gmail (Quick Test)
```bash
# Edit backend/.env
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16_char_app_password
EMAIL_FROM=noreply@pouranik.com
```

**Get Gmail App Password:**
1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Search "App passwords"
4. Generate password for "Mail"
5. Copy 16-character password

#### Option B: Mailtrap (Best for Testing)
```bash
# Sign up at https://mailtrap.io (free)
# Get credentials from inbox settings

# Edit backend/Utils/emailService.js
# Replace Gmail config with:
host: 'smtp.mailtrap.io',
port: 2525,
auth: {
  user: 'your_mailtrap_username',
  pass: 'your_mailtrap_password'
}
```

### 3. Setup MongoDB

#### Option A: MongoDB Atlas (Cloud - Recommended)
```bash
# 1. Sign up at https://www.mongodb.com/cloud/atlas (free)
# 2. Create free cluster
# 3. Get connection string
# 4. Edit backend/.env

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pouranik
```

#### Option B: Local MongoDB
```bash
# Install from: https://www.mongodb.com/try/download/community
# Start service
mongod

# backend/.env stays as:
MONGO_URI=mongodb://localhost:27017/pouranik
```

### 4. Start Servers
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

### 5. Test! 🎉
```
1. Visit: http://localhost:5174/signup
2. Create account with YOUR real email
3. Click "Forgot Password?"
4. Enter your email
5. Check email inbox
6. Click reset link
7. Set new password
8. Login with new password ✅
```

---

## 🔍 Verify It's Working

### Backend Console Should Show:
```
Server is running on http://localhost:5000
MongoDB Connected Successfully
```

### When Testing:
```
Password reset email sent: <message-id>
✓ Email sent successfully
```

---

## 🐛 Quick Fixes

### Email Not Sending?
```bash
# Check backend console for errors
# Verify EMAIL_USER and EMAIL_PASS are correct
# Try Mailtrap instead of Gmail
```

### MongoDB Not Connected?
```bash
# Use MongoDB Atlas (easier)
# Or install MongoDB locally
```

### Port Already in Use?
```bash
# Frontend will auto-use next port (5174, 5175, etc.)
# Backend: Change PORT in backend/.env
```

---

## 📸 What You Should See

### 1. Forgot Password Page
- Clean form with email input
- "Send Reset Link" button
- "Back to Login" link
- Note about 1-hour expiration

### 2. Email (Check Inbox/Spam)
- Subject: "Password Reset Request - Pouranik"
- From: Your configured email
- Beautiful HTML template
- "Reset Your Password" button
- 1-hour warning

### 3. Reset Password Page
- Password and confirm fields
- Eye icons to show/hide
- Real-time match validation
- "Reset Password" button
- Password requirements hint

### 4. Success!
- Green checkmark
- "Password Reset Successful!"
- Auto-redirect to login
- Can login with new password

---

## ✅ Feature Checklist

Test these to verify everything works:

- [ ] Click "Forgot Password?" on login
- [ ] Submit valid email address
- [ ] Receive email (check spam)
- [ ] Click link in email
- [ ] See reset password page
- [ ] Enter mismatched passwords → Error shown
- [ ] Enter matching passwords → Success
- [ ] Receive confirmation email
- [ ] Login with NEW password → Success
- [ ] Try login with OLD password → Fail

---

## 🎯 Files to Review

### Backend:
- `backend/Utils/emailService.js` - Email templates
- `backend/Controllers/user.controller.js` - Logic
- `backend/Models/user.model.js` - Database schema
- `backend/Routes/user.route.js` - API routes

### Frontend:
- `frontend/src/pages/ForgotPassword.jsx` - Request reset page
- `frontend/src/pages/ResetPassword.jsx` - Reset password page
- `frontend/src/components/AuthForm.jsx` - "Forgot Password?" link

---

## 🔗 Useful Links

- **Frontend:** http://localhost:5174
- **Backend:** http://localhost:5000
- **API Docs:** See `docs/FEATURE_PASSWORD_RESET.md`
- **Mailtrap:** https://mailtrap.io
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas

---

## 💡 Pro Tips

1. **Use your real email** for testing to see actual emails
2. **Use Mailtrap** to test without spamming your inbox
3. **Check spam folder** if email doesn't arrive
4. **Token expires in 1 hour** - test quickly!
5. **Backend console** shows helpful logs

---

## 🎉 That's It!

You're ready to test the Password Reset feature. If something doesn't work:

1. Check this guide
2. Review `docs/FEATURE_PASSWORD_RESET.md`
3. Check backend console logs
4. Verify `.env` configuration

---

**Need Help?** Open an issue with:
- Error message
- Backend console logs
- Steps to reproduce

Happy Testing! 🚀
