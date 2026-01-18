# 🔥 Firebase Setup Guide - WrongYou Games

Complete guide to setting up Firebase for the WrongYou Games platform.

---

## 📋 Overview

Firebase provides:
- **Hosting** - Fast CDN with auto SSL
- **Authentication** - User accounts and social login
- **Firestore** - Real-time NoSQL database
- **Storage** - File storage for user content
- **Analytics** - User behavior tracking
- **Functions** - Serverless backend (optional)

---

## 🚀 Quick Start

### 1. Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Project name: `wrongyou-games`
4. Enable Google Analytics: **Yes**
5. Analytics account: Create new or use existing
6. Click "Create project"

### 2. Enable Services

#### Authentication
```
Build → Authentication → Get Started

Enable sign-in methods:
✅ Email/Password
✅ Google
✅ Anonymous
```

#### Firestore Database
```
Build → Firestore Database → Create database

Mode: Production mode
Location: us-central1 (or closest to users)
```

#### Storage
```
Build → Storage → Get Started

Mode: Production mode
```

### 3. Get Firebase Config

```
Project Settings → General → Your apps → Web app

Click "Add app" or use existing web app
Copy the firebaseConfig object
```

Example config:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "wrongyou-games.firebaseapp.com",
  projectId: "wrongyou-games",
  storageBucket: "wrongyou-games.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
  measurementId: "G-XXXXXXXXXX"
};
```

### 4. Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### 5. Initialize Project

```bash
cd wrongyou-games
firebase init

# Select:
# ◉ Firestore
# ◉ Hosting  
# ◉ Storage
# ◉ Emulators

# Use existing project: wrongyou-games
# Accept defaults for file names
# Public directory: . (root)
# Single-page app: No
```

### 6. Create .env File

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=wrongyou-games.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=wrongyou-games
VITE_FIREBASE_STORAGE_BUCKET=wrongyou-games.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

Add to `.gitignore`:
```
.env
.env.local
.firebase/
*-debug.log
```

### 7. Test Locally

```bash
firebase emulators:start

# Access:
# Hosting: http://localhost:5000
# Emulator UI: http://localhost:4000
```

### 8. Deploy

```bash
firebase deploy

# Your site: https://wrongyou-games.web.app
```

---

## 📚 Next Steps

- See [DEPLOYMENT.md](DEPLOYMENT.md) for custom domain setup
- See [ARCHITECTURE.md](ARCHITECTURE.md) for Firebase integration details
- See [QUICKSTART.md](QUICKSTART.md) for development workflow

---

## 🆘 Troubleshooting

**Issue:** `firebase: command not found`
```bash
npm install -g firebase-tools
```

**Issue:** Permission denied
```bash
sudo npm install -g firebase-tools
```

**Issue:** Emulators won't start
```bash
firebase emulators:start --import=./firebase-data --export-on-exit
```

**Issue:** Can't find .env variables
- Make sure .env is in project root
- Restart dev server after creating .env
- Check variable names start with `VITE_`

