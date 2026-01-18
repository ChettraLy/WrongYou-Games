# 🏗️ WrongYou Games Platform Architecture

This document outlines the technical architecture for the multi-game educational platform.

---

## 🎯 Platform Overview

**WrongYou Games** is a Firebase-powered web platform designed to host multiple educational arcade games within a single repository. The architecture prioritizes:

- **Firebase Integration** - All-in-one backend solution (hosting, auth, database)
- **Modularity** - Each game is self-contained
- **Scalability** - Firebase scales automatically with user growth
- **Real-time Features** - Live leaderboards and multiplayer support
- **Performance** - CDN hosting, offline support, fast loading
- **Retro Aesthetic** - Consistent 8-bit visual theme

---

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Firebase Platform                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Hosting    │  │     Auth     │  │  Firestore   │         │
│  │     CDN      │  │   Users      │  │   Database   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Storage    │  │  Analytics   │  │   Functions  │         │
│  │    Files     │  │   Metrics    │  │  (Optional)  │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              wrongyou-games Repository                          │
│                                                                 │
│  ┌───────────────────────────────────────────────────────┐     │
│  │         wrongyou.com (Landing Page)                   │     │
│  │                                                       │     │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │     │
│  │  │   SQL    │  │  RegEx   │  │   Git    │           │     │
│  │  │Challengers│  │  Racer   │  │ Gauntlet │    ...    │     │
│  │  └──────────┘  └──────────┘  └──────────┘           │     │
│  └───────────────────────────────────────────────────────┘     │
│           │              │              │                      │
│           ▼              ▼              ▼                      │
│      ┌────────┐    ┌────────┐    ┌────────┐                  │
│      │ Phaser │    │ Phaser │    │ Phaser │                  │
│      │ Game 1 │    │ Game 2 │    │ Game 3 │                  │
│      └────────┘    └────────┘    └────────┘                  │
│           │              │              │                      │
│           └──────────────┴──────────────┘                      │
│                         │                                      │
│                         ▼                                      │
│              ┌─────────────────────┐                           │
│              │   Shared Resources  │                           │
│              │  - Firebase SDK     │                           │
│              │  - Auth Utils       │                           │
│              │  - Firestore Utils  │                           │
│              │  - CSS Themes       │                           │
│              │  - Fonts            │                           │
│              └─────────────────────┘                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Directory Structure

```
wrongyou-games/                   # This repository
│
├── index.html                    # Platform landing page
├── README.md                     # Main documentation
├── ARCHITECTURE.md               # This file
├── DEPLOYMENT.md                 # Deployment guide
├── GAME_DESIGN.md                # Game design document
├── ROADMAP.md                    # Development roadmap
├── QUICKSTART.md                 # Quick start guide
├── PROJECT_SUMMARY.md            # Project summary
│
├── games/                        # All games directory
│   │
│   ├── sql-challengers/          # Game 1: SQL Learning
│   │   ├── index.html
│   │   ├── js/
│   │   │   ├── game.js           # Phaser config
│   │   │   ├── scenes/
│   │   │   │   ├── BootScene.js
│   │   │   │   ├── MenuScene.js
│   │   │   │   ├── GameScene.js
│   │   │   │   ├── GameOverScene.js
│   │   │   │   └── LeaderboardScene.js
│   │   │   ├── entities/
│   │   │   │   ├── Player.js
│   │   │   │   ├── Troggle.js
│   │   │   │   ├── DataCell.js
│   │   │   │   └── PowerUp.js
│   │   │   └── utils/
│   │   │       ├── sqlEvaluator.js
│   │   │       ├── levelGenerator.js
│   │   │       └── scoreManager.js
│   │   ├── assets/
│   │   │   ├── sprites/
│   │   │   │   ├── player.png
│   │   │   │   ├── troggle.png
│   │   │   │   └── cells.png
│   │   │   ├── sounds/
│   │   │   │   ├── munch.wav
│   │   │   │   ├── error.wav
│   │   │   │   └── levelup.wav
│   │   │   └── fonts/
│   │   │       └── PressStart2P.ttf
│   │   ├── css/
│   │   │   └── style.css
│   │   └── data/
│   │       ├── levels.json
│   │       └── config.json
│   │
│   ├── regex-racer/              # Game 2: RegEx Learning (Future)
│   │   └── [Similar structure]
│   │
│   └── git-gauntlet/             # Game 3: Git Learning (Future)
│       └── [Similar structure]
│
├── shared/                       # Shared platform resources
│   ├── css/
│   │   ├── platform.css          # Global styles
│   │   ├── nes-theme.css         # Retro theme
│   │   └── animations.css        # Shared animations
│   ├── js/
│   │   ├── firebase-config.js    # Firebase initialization
│   │   ├── auth.js               # Authentication utilities
│   │   ├── firestore.js          # Firestore database utilities
│   │   ├── analytics.js          # Firebase Analytics wrapper
│   │   ├── storage.js            # LocalStorage + Firebase Storage
│   │   └── navigation.js         # Platform navigation
│   └── fonts/
│       ├── PressStart2P.woff2
│       └── VT323.woff2
│
├── assets/                       # Platform-level assets
│   ├── logo.png
│   ├── favicon.ico
│   └── og-image.png              # Social media preview
│
├── firebase.json                 # Firebase configuration
├── .firebaserc                   # Firebase project settings
├── firestore.rules               # Firestore security rules
├── firestore.indexes.json        # Firestore indexes
├── storage.rules                 # Storage security rules
└── .env                          # Environment variables (not in git)
```

---

## 🎮 Game Architecture (SQL Challengers Example)

### Phaser 3 Scene Flow

```
┌──────────────┐
│  BootScene   │  Load assets, initialize
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  MenuScene   │  Title screen, start game
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  GameScene   │  Main gameplay loop
└──────┬───────┘
       │
       ├─────────────┐
       │             │
       ▼             ▼
┌──────────────┐  ┌──────────────┐
│ GameOverScene│  │LevelComplete │
└──────┬───────┘  └──────┬───────┘
       │                 │
       └────────┬────────┘
                ▼
       ┌──────────────┐
       │Leaderboard   │
       │   Scene      │
       └──────────────┘
```

### Core Game Loop (GameScene)

```javascript
class GameScene extends Phaser.Scene {
    
    create() {
        // 1. Load level data
        this.currentLevel = loadLevel(this.levelNumber);
        
        // 2. Create grid
        this.grid = new Grid(6, 6);
        this.grid.populate(this.currentLevel.data);
        
        // 3. Spawn player
        this.player = new Player(this, 0, 0);
        
        // 4. Spawn troggles
        this.troggles = this.spawnTroggles(this.currentLevel.troggles);
        
        // 5. Display mission
        this.displayQuery(this.currentLevel.query);
        
        // 6. Setup UI
        this.setupHUD();
    }
    
    update(time, delta) {
        // 1. Handle input
        this.handlePlayerInput();
        
        // 2. Update entities
        this.player.update(delta);
        this.troggles.forEach(t => t.update(delta));
        
        // 3. Check collisions
        this.checkCollisions();
        
        // 4. Check win/lose conditions
        if (this.allCorrectCellsMunched()) {
            this.scene.start('LevelComplete');
        }
        if (this.lives <= 0) {
            this.scene.start('GameOver');
        }
    }
}
```

---

## 🧩 Key Components

### 1. SQL Evaluator (`sqlEvaluator.js`)

**Purpose:** Parse and evaluate WHERE clause conditions against data rows

```javascript
class SQLEvaluator {
    evaluate(whereClause, dataRow) {
        // Parse: "age > 25 AND city = 'NYC'"
        // Return: true/false
    }
    
    parseCondition(condition) {
        // Extract: field, operator, value
    }
    
    evaluateCondition(field, operator, value, dataRow) {
        // Compare and return boolean
    }
}
```

**Supported Operators:**
- Comparison: `=`, `!=`, `>`, `<`, `>=`, `<=`
- Logical: `AND`, `OR`, `NOT`
- Pattern: `LIKE` (basic wildcard)

---

### 2. Level Generator (`levelGenerator.js`)

**Purpose:** Create procedural levels with appropriate difficulty

```javascript
class LevelGenerator {
    generate(levelNumber) {
        const difficulty = this.calculateDifficulty(levelNumber);
        
        return {
            query: this.generateQuery(difficulty),
            data: this.generateData(difficulty),
            troggles: this.calculateTroggles(difficulty),
            timeLimit: this.calculateTime(difficulty)
        };
    }
}
```

---

### 3. Score Manager (`scoreManager.js`)

**Purpose:** Track scores, manage leaderboard, persist to Firestore and localStorage

```javascript
import { saveScore, getLeaderboard } from '../../shared/js/firestore.js';

class ScoreManager {
    constructor(userId) {
        this.userId = userId;
        this.currentScore = 0;
    }

    addScore(points) {
        this.currentScore += points;
    }

    async saveHighScore(name, score) {
        // Save to Firestore for global leaderboard
        await saveScore('sql-challengers', {
            userId: this.userId,
            name: name,
            score: score,
            timestamp: Date.now()
        });

        // Also cache locally
        localStorage.setItem('lastScore', score);
    }

    async getLeaderboard(limit = 10) {
        // Fetch from Firestore
        return await getLeaderboard('sql-challengers', limit);
    }
}
```

---

## 🔥 Firebase Architecture

### Firebase Services Integration

```javascript
// shared/js/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "wrongyou-games.firebaseapp.com",
    projectId: "wrongyou-games",
    storageBucket: "wrongyou-games.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
```

### Firestore Data Structure

```
wrongyou-games (Firestore Database)
│
├── users/                          # User profiles
│   └── {userId}/
│       ├── profile
│       │   ├── displayName: string
│       │   ├── email: string
│       │   ├── photoURL: string
│       │   ├── createdAt: timestamp
│       │   └── lastLogin: timestamp
│       │
│       ├── progress/               # Game progress subcollection
│       │   └── {gameId}/
│       │       ├── currentLevel: number
│       │       ├── highScore: number
│       │       ├── totalPlayTime: number
│       │       ├── achievements: array
│       │       └── lastPlayed: timestamp
│       │
│       └── settings/               # User preferences
│           ├── soundEnabled: boolean
│           ├── musicEnabled: boolean
│           └── difficulty: string
│
├── leaderboards/                   # Global leaderboards
│   └── {gameId}/
│       └── scores/                 # Scores subcollection
│           └── {scoreId}/
│               ├── userId: string
│               ├── displayName: string
│               ├── score: number
│               ├── level: number
│               ├── timestamp: timestamp
│               └── verified: boolean
│
├── achievements/                   # Achievement definitions
│   └── {achievementId}/
│       ├── name: string
│       ├── description: string
│       ├── icon: string
│       ├── gameId: string
│       └── criteria: object
│
└── games/                          # Game metadata
    └── {gameId}/
        ├── name: string
        ├── description: string
        ├── version: string
        ├── active: boolean
        └── stats/
            ├── totalPlayers: number
            ├── totalGamesPlayed: number
            └── averageScore: number
```

### Authentication Flow

```javascript
// shared/js/auth.js
import { auth } from './firebase-config.js';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signInAnonymously,
    onAuthStateChanged
} from 'firebase/auth';

export async function signInWithEmail(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
}

export async function signUpWithEmail(email, password) {
    return await createUserWithEmailAndPassword(auth, email, password);
}

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
}

export async function signInAnonymous() {
    return await signInAnonymously(auth);
}

export function onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
}
```

### Firestore Utilities

```javascript
// shared/js/firestore.js
import { db } from './firebase-config.js';
import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    updateDoc,
    serverTimestamp
} from 'firebase/firestore';

// Save user progress
export async function saveProgress(userId, gameId, progressData) {
    const progressRef = doc(db, `users/${userId}/progress/${gameId}`);
    await setDoc(progressRef, {
        ...progressData,
        lastPlayed: serverTimestamp()
    }, { merge: true });
}

// Get user progress
export async function getProgress(userId, gameId) {
    const progressRef = doc(db, `users/${userId}/progress/${gameId}`);
    const snapshot = await getDoc(progressRef);
    return snapshot.exists() ? snapshot.data() : null;
}

// Save score to leaderboard
export async function saveScore(gameId, scoreData) {
    const scoresRef = collection(db, `leaderboards/${gameId}/scores`);
    await setDoc(doc(scoresRef), {
        ...scoreData,
        timestamp: serverTimestamp(),
        verified: false // Anti-cheat verification pending
    });
}

// Get leaderboard
export async function getLeaderboard(gameId, limitCount = 10) {
    const scoresRef = collection(db, `leaderboards/${gameId}/scores`);
    const q = query(
        scoresRef,
        where('verified', '==', true),
        orderBy('score', 'desc'),
        limit(limitCount)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

// Update user profile
export async function updateProfile(userId, profileData) {
    const userRef = doc(db, `users/${userId}/profile`);
    await updateDoc(userRef, profileData);
}
```

### Security Rules (`firestore.rules`)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // User profiles - users can only read/write their own
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;

      // User progress
      match /progress/{gameId} {
        allow read: if request.auth.uid == userId;
        allow write: if request.auth.uid == userId;
      }

      // User settings
      match /settings {
        allow read, write: if request.auth.uid == userId;
      }
    }

    // Leaderboards - anyone can read, only authenticated can write
    match /leaderboards/{gameId}/scores/{scoreId} {
      allow read: if true;
      allow create: if request.auth != null
                    && request.resource.data.userId == request.auth.uid;
      allow update, delete: if false; // Prevent score manipulation
    }

    // Achievements - read only
    match /achievements/{achievementId} {
      allow read: if true;
      allow write: if false;
    }

    // Games metadata - read only
    match /games/{gameId} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

---

## 🎨 Styling Architecture

### CSS Organization

```
shared/css/
├── platform.css       # Global resets, layout
├── nes-theme.css      # 8-bit component styles
└── animations.css     # Keyframe animations

games/query-munchers/css/
└── style.css          # Game-specific overrides
```

### Design Tokens

```css
:root {
    /* Colors */
    --color-bg: #0f0f0f;
    --color-primary: #00ff00;
    --color-secondary: #00ffff;
    --color-danger: #ff0000;
    --color-warning: #ffff00;
    
    /* Typography */
    --font-primary: 'Press Start 2P', monospace;
    --font-secondary: 'VT323', monospace;
    
    /* Spacing */
    --grid-size: 8px;
    --cell-size: 64px;
    
    /* Animation */
    --transition-fast: 0.1s;
    --transition-normal: 0.3s;
}
```

---

## 💾 Data Management

### LocalStorage Schema

```javascript
// High Scores
{
    "sqlChallengers_highScores": [
        { "name": "AAA", "score": 1250, "date": "2026-01-18" },
        { "name": "BBB", "score": 980, "date": "2026-01-17" }
    ],

    // Player Progress
    "sqlChallengers_progress": {
        "currentLevel": 5,
        "unlockedLevels": [1, 2, 3, 4, 5],
        "totalScore": 3450
    },

    // Settings
    "platform_settings": {
        "soundEnabled": true,
        "musicEnabled": true,
        "difficulty": "normal"
    }
}
```

---

## 🔌 External Dependencies

### Required Libraries

```html
<!-- Phaser 3 Game Framework -->
<script src="https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js"></script>

<!-- NES.css for Retro Styling -->
<link href="https://unpkg.com/nes.css@latest/css/nes.min.css" rel="stylesheet" />

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
```

### Optional Enhancements

- **Howler.js** - Advanced audio management
- **Particles.js** - Visual effects
- **Chart.js** - Statistics visualization

---

## 🚀 Performance Considerations

### Asset Optimization
- Sprite sheets instead of individual images
- Compressed audio (MP3/OGG)
- Minified JavaScript in production
- Lazy loading for non-critical assets

### Code Optimization
- Object pooling for frequently created entities
- Efficient collision detection (spatial hashing)
- RequestAnimationFrame for smooth rendering
- Debounced input handling

---

## 🔐 Security Considerations

- **No backend** - No server-side vulnerabilities
- **Client-side only** - No sensitive data storage
- **HTTPS enforced** - Secure transmission
- **CSP headers** - Prevent XSS attacks
- **Input sanitization** - Prevent injection in leaderboard names

---

## 📈 Future Scalability

### Adding New Games

1. Create new directory: `games/[game-name]/`
2. Copy structure from `query-munchers`
3. Implement game-specific logic
4. Add to platform landing page
5. Update navigation

### Platform Features Roadmap

- **User Accounts** - Cloud save, cross-device progress
- **Multiplayer** - WebSocket-based real-time play
- **Game API** - Allow third-party game submissions
- **Mobile Apps** - Cordova/Capacitor wrappers
- **Analytics Dashboard** - Player statistics

---

**This architecture supports rapid development while maintaining code quality and user experience.**

