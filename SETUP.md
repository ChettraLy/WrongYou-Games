# 🚀 Setup Guide - WrongYou Games

Complete setup guide to get your WrongYou Games platform running locally and deployed to www.wrongyou.com.

---

## 📋 Prerequisites

Before you begin, make sure you have:

- ✅ **Node.js 16+** installed ([Download](https://nodejs.org/))
- ✅ **Firebase account** ([Sign up](https://firebase.google.com/))
- ✅ **Domain ownership** of wrongyou.com
- ✅ **Git** installed
- ✅ **Code editor** (VS Code recommended)

---

## 🔥 Step 1: Firebase Project Setup

### 1.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"**
3. Project name: `wrongyou-games`
4. Enable Google Analytics: **Yes**
5. Click **"Create project"**

### 1.2 Enable Firebase Services

#### Authentication
```
Build → Authentication → Get Started

Enable these sign-in methods:
✅ Email/Password
✅ Google
✅ Anonymous
```

#### Firestore Database
```
Build → Firestore Database → Create database

Mode: Production mode
Location: us-central1 (or closest to your users)
```

#### Storage
```
Build → Storage → Get Started

Mode: Production mode
```

### 1.3 Register Web App

```
Project Settings → General → Your apps

Click the Web icon (</>)
App nickname: WrongYou Games Web
✅ Also set up Firebase Hosting
Click "Register app"
```

### 1.4 Get Firebase Config

Copy the `firebaseConfig` object from the Firebase Console.

---

## 💻 Step 2: Local Development Setup

### 2.1 Clone Repository

```bash
git clone https://github.com/yourusername/wrongyou-games.git
cd wrongyou-games
```

### 2.2 Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### 2.3 Link Firebase Project

```bash
firebase use wrongyou-games
```

### 2.4 Create Environment File

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=wrongyou-games.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=wrongyou-games
VITE_FIREBASE_STORAGE_BUCKET=wrongyou-games.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc...
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 2.5 Deploy Security Rules

```bash
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
```

---

## 🧪 Step 3: Test Locally

### 3.1 Start Firebase Emulators

```bash
firebase emulators:start
```

This will start:
- 🌐 Hosting: http://localhost:5000
- 🔐 Auth Emulator: http://localhost:9099
- 📊 Firestore Emulator: http://localhost:8080
- 📁 Storage Emulator: http://localhost:9199
- 🎛️ Emulator UI: http://localhost:4000

### 3.2 Open in Browser

Navigate to http://localhost:5000 to see your landing page.

---

## 🚀 Step 4: Deploy to Firebase

### 4.1 Deploy Everything

```bash
firebase deploy
```

Your site will be live at:
- https://wrongyou-games.web.app
- https://wrongyou-games.firebaseapp.com

### 4.2 Verify Deployment

Test your deployed site:
- ✅ Landing page loads
- ✅ Firebase services initialized
- ✅ No console errors

---

## 🌐 Step 5: Custom Domain Setup (wrongyou.com)

### 5.1 Add Custom Domain in Firebase

```
Hosting → Add custom domain
Enter: www.wrongyou.com
```

### 5.2 Configure DNS

Add these DNS records at your domain registrar:

```
Type: A
Name: @
Value: (Firebase will provide IP addresses)

Type: A  
Name: www
Value: (Firebase will provide IP addresses)
```

### 5.3 Wait for SSL

Firebase will automatically provision SSL certificates. This can take up to 24 hours.

---

## ✅ Step 6: Verify Everything Works

Test these features:

- [ ] Landing page loads at www.wrongyou.com
- [ ] HTTPS works (SSL certificate)
- [ ] Firebase Authentication works
- [ ] Can create account
- [ ] Can sign in with Google
- [ ] Can sign in anonymously
- [ ] Firestore saves data
- [ ] Analytics tracking works

---

## 🎮 Next Steps

1. **Build SQL Challengers game** - See [GAME_DESIGN.md](GAME_DESIGN.md)
2. **Add more games** - Follow the architecture in [ARCHITECTURE.md](ARCHITECTURE.md)
3. **Customize landing page** - Edit `index.html` and `css/platform.css`
4. **Add your branding** - Replace assets in `assets/` directory

---

## 🆘 Troubleshooting

See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for common issues and solutions.

---

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Phaser 3 Documentation](https://photonstorm.github.io/phaser3-docs/)
- [NES.css Documentation](https://nostalgic-css.github.io/NES.css/)

---

**Ready to build amazing educational games! 🎮🚀**

