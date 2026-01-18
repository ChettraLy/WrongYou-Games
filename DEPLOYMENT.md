# 🚀 Deployment Guide for WrongYou Games

This guide covers deploying the **wrongyou-games** repository to **www.wrongyou.com** using **Firebase**.

---

## 📋 Pre-Deployment Checklist

- [ ] Firebase project created
- [ ] Firebase CLI installed and logged in
- [ ] Domain purchased and accessible (wrongyou.com)
- [ ] DNS access to configure records
- [ ] All games tested locally with Firebase emulators
- [ ] Environment variables configured (.env file)
- [ ] Firestore security rules tested
- [ ] Assets optimized (images compressed, code minified)
- [ ] .gitignore includes .env and firebase debug files

---

## 🔥 Firebase Hosting Deployment

**Why Firebase?**
- All-in-one solution (hosting + auth + database + storage)
- Free tier with generous limits
- Automatic HTTPS and global CDN
- Easy custom domain setup
- Real-time database and authentication built-in

### Step 1: Create Firebase Project

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com
   - Click "Add project"
   - Project name: `wrongyou-games`
   - Enable Google Analytics: Yes (recommended)

2. **Enable Required Services**

   **Authentication:**
   - Build → Authentication → Get Started
   - Enable: Email/Password, Google, Anonymous

   **Firestore Database:**
   - Build → Firestore Database → Create database
   - Start in **production mode**
   - Location: `us-central1`

   **Storage:**
   - Build → Storage → Get Started
   - Start in **production mode**

### Step 2: Install Firebase CLI

```bash
# Install globally
npm install -g firebase-tools

# Login
firebase login
```

### Step 3: Initialize Firebase

```bash
cd wrongyou-games

firebase init

# Select services:
# ◉ Firestore
# ◉ Hosting
# ◉ Storage
# ◉ Emulators

# Prompts:
# - Use existing project: wrongyou-games
# - Firestore rules: firestore.rules
# - Firestore indexes: firestore.indexes.json
# - Public directory: . (root)
# - Single-page app: No
# - Storage rules: storage.rules
# - Emulators: Auth, Firestore, Hosting, Storage
```

### Step 4: Configure Environment Variables

Create `.env` file (add to .gitignore):

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=wrongyou-games.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=wrongyou-games
VITE_FIREBASE_STORAGE_BUCKET=wrongyou-games.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

Get values from: Firebase Console → Project Settings → Your apps

### Step 5: Test Locally

```bash
# Start emulators
firebase emulators:start

# Access at:
# - Hosting: http://localhost:5000
# - Emulator UI: http://localhost:4000
```

### Step 6: Deploy to Firebase

```bash
# Deploy everything
firebase deploy

# Or deploy specific services
firebase deploy --only hosting
firebase deploy --only firestore:rules

# Your site is now live at:
# https://wrongyou-games.web.app
# https://wrongyou-games.firebaseapp.com
```

## 🌐 Custom Domain Setup (wrongyou.com)

### Step 1: Add Custom Domain in Firebase

1. **Go to Firebase Console**
   - Hosting → Add custom domain
   - Enter: `wrongyou.com`
   - Click "Continue"

2. **Add www subdomain**
   - Also add: `www.wrongyou.com`
   - Firebase will provide DNS records

### Step 2: Configure DNS at Your Registrar

At your domain registrar (GoDaddy, Namecheap, etc.):

```
Record Type | Name | Value                          | TTL
------------|------|--------------------------------|-----
A           | @    | 151.101.1.195                  | 3600
A           | @    | 151.101.65.195                 | 3600
CNAME       | www  | wrongyou-games.web.app         | 3600
```

**Note:** Firebase provides specific IP addresses in the console. Use those instead if different.

### Step 3: Wait for SSL Certificate

- Firebase automatically provisions SSL (Let's Encrypt)
- Can take up to 24 hours
- HTTPS will be enforced automatically
- Check status in Firebase Console → Hosting

### Step 4: Verify Domain

```bash
# Check DNS propagation
nslookup wrongyou.com
nslookup www.wrongyou.com

# Or use online tool
# https://dnschecker.org
```

---

## 🔒 Security Rules

### Firestore Rules (`firestore.rules`)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User data - users can only access their own
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;

      match /progress/{gameId} {
        allow read, write: if request.auth.uid == userId;
      }
    }

    // Leaderboards - read all, write own
    match /leaderboards/{gameId}/scores/{scoreId} {
      allow read: if true;
      allow create: if request.auth != null
                    && request.resource.data.userId == request.auth.uid;
      allow update, delete: if false;
    }
  }
}
```

### Storage Rules (`storage.rules`)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // User profile pictures
    match /users/{userId}/profile/{fileName} {
      allow read: if true;
      allow write: if request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024  // 5MB max
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

Deploy rules:
```bash
firebase deploy --only firestore:rules
firebase deploy --only storage
```

---

## 🔒 Security Best Practices

1. **Always use HTTPS**
   - Protects user data
   - Required for modern browser features

2. **Set Security Headers**
   Create `netlify.toml` or `vercel.json`:
   ```toml
   [[headers]]
     for = "/*"
     [headers.values]
       X-Frame-Options = "DENY"
       X-Content-Type-Options = "nosniff"
       X-XSS-Protection = "1; mode=block"
       Referrer-Policy = "strict-origin-when-cross-origin"
   ```

3. **Content Security Policy**
   ```toml
   Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
   ```

---

## 🎯 Post-Deployment Testing

1. **Test all pages**
   - Landing page: `https://wrongyou.com`
   - SQL Challengers: `https://wrongyou.com/games/sql-challengers`

2. **Check HTTPS**
   - Verify SSL certificate
   - Test redirect from HTTP to HTTPS

3. **Test on multiple devices**
   - Desktop browsers (Chrome, Firefox, Safari, Edge)
   - Mobile browsers (iOS Safari, Chrome Mobile)
   - Different screen sizes

4. **Performance Testing**
   - [Google PageSpeed Insights](https://pagespeed.web.dev/)
   - [GTmetrix](https://gtmetrix.com/)

---

## 📊 Analytics Setup (Optional)

### Google Analytics

Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🔄 Continuous Deployment

### Netlify/Vercel Auto-Deploy

1. Connect GitHub repository
2. Configure build settings
3. Every push to `main` auto-deploys

### Manual Deploy Script

Create `deploy.sh`:
```bash
#!/bin/bash
echo "🚀 Deploying to wrongyou.com..."
git pull origin main
netlify deploy --prod
echo "✅ Deployment complete!"
```

---

## 🆘 Troubleshooting

### Site not loading
- Check DNS propagation
- Verify hosting is active
- Check browser console for errors

### HTTPS not working
- Wait for SSL provisioning (can take 24 hours)
- Verify DNS is correct
- Check hosting SSL settings

### Games not loading
- Check file paths (case-sensitive on Linux servers)
- Verify all assets uploaded
- Check browser console for 404 errors

---

## 📞 Support Resources

- **Netlify Docs:** https://docs.netlify.com
- **Vercel Docs:** https://vercel.com/docs
- **GitHub Pages:** https://docs.github.com/pages
- **DNS Help:** https://dnschecker.org

---

**Ready to deploy? Choose your hosting option and follow the steps above!**

