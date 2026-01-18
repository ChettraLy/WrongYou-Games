# 🎮 WrongYou Games - Educational Arcade Games Platform

**Repository:** wrongyou-games
**Live at:** [www.wrongyou.com](http://www.wrongyou.com)

A collection of retro-inspired educational arcade games that make learning technical concepts fun and engaging. This repository contains the primary application for the WrongYou gaming platform. All games, starting with **SQL Challengers**, are developed and maintained within this single repository.

---

## 🌟 Platform Vision

WrongYou Games is designed to host multiple educational games with a nostalgic arcade aesthetic. Each game teaches complex technical concepts through engaging gameplay mechanics inspired by classic 80s and 90s arcade games.

All games are developed within this **wrongyou-games** repository, making it easy to share assets, maintain consistent styling, and deploy the entire platform together.

### Current Games
- **SQL Challengers** - Learn SQL through retro arcade action (inspired by Number Munchers)

### Planned Games (All in this repository)
- **RegEx Racer** - Master regular expressions through racing challenges
- **Git Gauntlet** - Learn version control through dungeon exploration
- **API Assault** - Understand REST APIs through space shooter mechanics

---

## 🎯 SQL Challengers - The SQL Learning Game

### Game Concept

Navigate a 6x6 grid of data cells and "munch" only the cells that satisfy the given SQL query condition. Avoid the dreaded **Syntax Troggles** that patrol the board!

### Core Mechanics

**The Grid:** 6x6 grid populated with database records (represented as data cells)

**The Mission:** Each level presents a SQL query prompt (e.g., `SELECT * FROM users WHERE age > 25`)

**The Challenge:** Move your character and munch ONLY cells that match the query condition

**The Danger:** Syntax Troggles roam the board - touch them and lose a life!

**Lives System:** Start with 3 hearts ❤️❤️❤️

**Scoring:** 
- Correct munch: +10 points
- Wrong munch: -5 points, lose a life
- Troggles collision: lose a life

### Level Progression

| Level | SQL Concept | Example Query | Difficulty |
|-------|-------------|---------------|------------|
| **1-3** | Basic SELECT & WHERE | `WHERE age > 25` | ⭐ Easy |
| **4-6** | Logical Operators | `WHERE age > 25 AND city = 'NYC'` | ⭐⭐ Medium |
| **7-9** | Aggregates & GROUP BY | `WHERE COUNT(*) > 5` | ⭐⭐⭐ Hard |
| **10+** | JOINs & Complex Queries | `WHERE users.id = orders.user_id` | ⭐⭐⭐⭐ Expert |

### Power-Ups

- **🔑 Primary Key Shield** - 5 seconds of invincibility
- **⚡ Index Boost** - 2x movement speed for 10 seconds
- **🔍 Query Hint** - Highlights correct cells for 3 seconds

---

## 🛠️ Technical Stack

### Frontend Framework
- **Phaser 3** - Industry-standard HTML5 game framework
- **HTML5 Canvas** - Hardware-accelerated rendering
- **JavaScript (ES6+)** - Modern game logic

### Styling & UI
- **NES.css** - Authentic 8-bit pixel art styling
- **Custom Pixel Fonts** - Press Start 2P / VT323
- **Retro Color Palette** - Dark backgrounds with neon accents

### Game Engine Components
- **Mini SQL Evaluator** - Custom JavaScript SQL parser for WHERE clause evaluation
- **JSON Database Mock** - Level-based data structures representing database tables
- **Collision Detection** - Phaser's built-in arcade physics
- **State Management** - Game states (Menu, Playing, GameOver, LevelComplete)

### Backend & Data (Firebase)
- **Firebase Hosting** - Fast, secure CDN hosting with auto SSL
- **Firebase Authentication** - User accounts (email, Google, anonymous auth)
- **Cloud Firestore** - Real-time database for user profiles, progress, leaderboards
- **Firebase Storage** - User-generated content and custom levels (future)
- **Firebase Analytics** - User behavior and game metrics tracking
- **LocalStorage** - Offline cache and temporary game state

---

## 📁 Project Structure

```
wrongyou-games/             # This repository
├── index.html              # Platform landing page (game selector)
├── README.md               # This file
├── ARCHITECTURE.md         # Technical architecture
├── DEPLOYMENT.md           # Deployment guide
├── GAME_DESIGN.md          # Game design document
├── ROADMAP.md              # Development roadmap
├── QUICKSTART.md           # Quick start guide
├── PROJECT_SUMMARY.md      # Project summary
│
├── games/
│   ├── sql-challengers/    # First game - SQL learning
│   │   ├── index.html      # Game entry point
│   │   ├── js/
│   │   │   ├── game.js     # Main Phaser game configuration
│   │   │   ├── scenes/
│   │   │   │   ├── MenuScene.js
│   │   │   │   ├── GameScene.js
│   │   │   │   ├── GameOverScene.js
│   │   │   ├── entities/
│   │   │   │   ├── Player.js
│   │   │   │   ├── Troggle.js
│   │   │   │   ├── DataCell.js
│   │   │   ├── utils/
│   │   │   │   ├── sqlEvaluator.js
│   │   │   │   ├── levelGenerator.js
│   │   ├── assets/
│   │   │   ├── sprites/
│   │   │   ├── sounds/
│   │   │   ├── fonts/
│   │   ├── css/
│   │   │   ├── style.css
│   │   ├── data/
│   │   │   ├── levels.json
│   │
│   ├── regex-racer/        # Future game - RegEx learning
│   └── git-gauntlet/       # Future game - Git learning
│
├── shared/
│   ├── css/
│   │   ├── platform.css    # Shared platform styles
│   ├── js/
│   │   ├── firebase-config.js  # Firebase initialization
│   │   ├── auth.js         # Authentication utilities
│   │   ├── firestore.js    # Database utilities
│   │   └── analytics.js    # Firebase Analytics wrapper
│   └── fonts/
│
├── assets/
│   ├── platform-logo.png
│   └── favicon.ico
│
├── firebase.json           # Firebase configuration
├── .firebaserc            # Firebase project settings
└── firestore.rules        # Firestore security rules
```

---

## 🚀 Development Phases

### Phase 1: Minimum Viable Product ✅
- [x] 6x6 grid rendering
- [x] Player movement (arrow keys)
- [x] Cell munching (spacebar)
- [x] Retro visual styling

### Phase 2: SQL Evaluation Engine 🔄
- [ ] Mini SQL WHERE clause parser
- [ ] JSON database structure
- [ ] Query validation logic
- [ ] Scoring system

### Phase 3: Firebase Integration 📋
- [ ] Firebase project setup
- [ ] Firebase Authentication implementation
- [ ] Cloud Firestore database structure
- [ ] User profile system
- [ ] Cloud save/load progress

### Phase 4: Game Polish & UI 📋
- [ ] Mission display header
- [ ] Lives counter (hearts)
- [ ] Score display
- [ ] Level progression system
- [ ] User account UI

### Phase 5: Enemies & Challenge 📋
- [ ] Syntax Troggle AI
- [ ] Collision detection
- [ ] Game over conditions

### Phase 6: Social Features 📋
- [ ] Global leaderboards (Firestore)
- [ ] User achievements
- [ ] Friend system
- [ ] Score sharing

### Phase 7: Enhancement & Polish 📋
- [ ] Power-ups system
- [ ] Sound effects (beep-boop retro)
- [ ] Particle effects
- [ ] Firebase Analytics events

### Phase 8: Platform Integration 📋
- [ ] Multi-game landing page
- [ ] Shared navigation
- [ ] Cross-game progress tracking

---

## 🎮 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js 16+ (required for Firebase)
- Firebase account (free tier available)
- Git

### Quick Start - Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wrongyou-games.git
   cd wrongyou-games
   ```

2. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

3. **Login to Firebase**
   ```bash
   firebase login
   ```

4. **Initialize Firebase (first time only)**
   ```bash
   firebase init
   # Select: Hosting, Firestore, Authentication, Storage
   # Choose existing project or create new one
   # Public directory: . (current directory)
   # Configure as single-page app: No
   ```

5. **Serve locally with Firebase**
   ```bash
   firebase serve
   # Or use emulators for full Firebase features
   firebase emulators:start
   ```

6. **Open in browser**
   ```
   http://localhost:5000/games/sql-challengers/
   ```

### Quick Start - Play Online

Simply visit: **[www.wrongyou.com/games/sql-challengers](http://www.wrongyou.com/games/sql-challengers)**

---

## 🎨 Design Philosophy

### Visual Aesthetic
- **Retro 8-bit Graphics** - Chunky pixels, limited color palette
- **Neon on Dark** - High contrast for readability (green/cyan on black)
- **Pixel-Perfect UI** - Authentic arcade cabinet feel
- **Scanline Effects** - Optional CRT monitor simulation

### Educational Approach
- **Learn by Doing** - No tutorials, just play
- **Immediate Feedback** - Visual and audio cues for right/wrong
- **Progressive Difficulty** - Gentle learning curve
- **Gamified Mastery** - High scores encourage practice

### Accessibility
- **Keyboard Controls** - Arrow keys + Spacebar
- **Colorblind Friendly** - Patterns in addition to colors
- **Adjustable Speed** - Difficulty settings
- **Clear Typography** - High-contrast pixel fonts

---

## 🎯 Game Controls

### SQL Challengers

| Key | Action |
|-----|--------|
| **↑ ↓ ← →** | Move player |
| **SPACE** | Munch cell |
| **P** | Pause game |
| **M** | Mute/Unmute |
| **ESC** | Return to menu |

---

## 🏆 Scoring System

### SQL Challengers

- **Correct Munch:** +10 points
- **Wrong Munch:** -5 points + lose 1 life
- **Troggle Collision:** Lose 1 life
- **Level Complete Bonus:** +50 points
- **Speed Bonus:** +1 point per second remaining
- **Perfect Level:** +100 bonus (no mistakes)

### Leaderboard Tiers

| Score | Rank | Title |
|-------|------|-------|
| 0-100 | 🥉 Bronze | SQL Newbie |
| 101-300 | 🥈 Silver | Query Apprentice |
| 301-600 | 🥇 Gold | Database Warrior |
| 601-1000 | 💎 Platinum | SQL Master |
| 1000+ | 👑 Legend | Query Grandmaster |

---

## 🌐 Deployment Guide

### Firebase Hosting Deployment

This platform is deployed using **Firebase Hosting** with integrated backend services.

#### Initial Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create new project: "wrongyou-games"
   - Enable Google Analytics (recommended)

2. **Enable Firebase Services**
   - **Authentication**: Enable Email/Password, Google, Anonymous
   - **Firestore Database**: Create database in production mode
   - **Storage**: Enable for user content
   - **Hosting**: Will be configured via CLI

3. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

4. **Initialize Firebase in Project**
   ```bash
   cd wrongyou-games
   firebase init

   # Select services:
   # ◉ Firestore
   # ◉ Hosting
   # ◉ Storage
   # ◉ Emulators (for local development)

   # Firestore setup:
   # - Use default firestore.rules
   # - Use default firestore.indexes.json

   # Hosting setup:
   # - Public directory: . (root)
   # - Single-page app: No
   # - GitHub auto-deploy: Yes (optional)
   ```

#### Deploy to Firebase

```bash
# Deploy everything
firebase deploy

# Deploy only hosting
firebase deploy --only hosting

# Deploy with custom message
firebase deploy -m "Added SQL Challengers game"
```

#### Custom Domain Configuration (wrongyou.com)

1. **Add Custom Domain in Firebase Console**
   - Go to Hosting → Add custom domain
   - Enter: `wrongyou.com`
   - Add: `www.wrongyou.com` as well

2. **Update DNS Records**
   At your domain registrar (e.g., GoDaddy, Namecheap):
   ```
   A Record:  @    →  151.101.1.195
   A Record:  @    →  151.101.65.195
   CNAME:     www  →  wrongyou-games.web.app
   ```

3. **Wait for SSL Certificate**
   - Firebase automatically provisions SSL
   - Can take up to 24 hours
   - HTTPS will be enforced automatically

#### Environment Configuration

Create `.env` file (not committed to git):
```env
# Firebase Configuration (from Firebase Console)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=wrongyou-games.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=wrongyou-games
VITE_FIREBASE_STORAGE_BUCKET=wrongyou-games.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

---

## 🔧 Configuration

### Game Settings

Edit `games/sql-challengers/data/config.json`:

```json
{
  "gridSize": 6,
  "startingLives": 3,
  "troggleSpeed": 50,
  "playerSpeed": 100,
  "pointsPerCorrect": 10,
  "pointsPerWrong": -5,
  "enableSounds": true,
  "enableParticles": true,
  "difficulty": "normal"
}
```

### Level Design

Edit `games/sql-challengers/data/levels.json`:

```json
{
  "level1": {
    "query": "SELECT * FROM users WHERE age > 25",
    "table": "users",
    "data": [
      {"id": 1, "name": "Alice", "age": 30},
      {"id": 2, "name": "Bob", "age": 22}
    ],
    "troggles": 1,
    "timeLimit": 60
  }
}
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Adding New Levels
1. Edit `games/sql-challengers/data/levels.json`
2. Follow the existing level structure
3. Test thoroughly
4. Submit a pull request

### Creating New Games
1. Create new directory in `games/[your-game-name]`
2. Follow the SQL Challengers structure
3. Update platform landing page
4. Document in README

### Reporting Bugs
- Use GitHub Issues
- Include browser/OS info
- Provide steps to reproduce

---

## 📚 Learning Resources

### SQL Concepts Covered

- **SELECT statements** - Retrieving data
- **WHERE clauses** - Filtering records
- **Logical operators** - AND, OR, NOT
- **Comparison operators** - =, >, <, >=, <=, !=
- **Aggregate functions** - COUNT, SUM, AVG, MIN, MAX
- **GROUP BY** - Grouping results
- **JOINs** - Combining tables (INNER, LEFT, RIGHT)

### External Resources

- [W3Schools SQL Tutorial](https://www.w3schools.com/sql/)
- [SQLZoo Interactive Tutorials](https://sqlzoo.net/)
- [LeetCode SQL Problems](https://leetcode.com/problemset/database/)

---

## 📄 License

MIT License - Feel free to use, modify, and distribute.

---

## 🙏 Credits

### Inspiration
- **Number Munchers** (1986) - MECC
- **Pac-Man** (1980) - Namco

### Technologies
- [Phaser 3](https://phaser.io/) - Game framework
- [NES.css](https://nostalgic-css.github.io/NES.css/) - Retro styling

### Assets
- Pixel art sprites: Custom created
- Sound effects: Generated with [jsfxr](https://sfxr.me/)
- Fonts: Press Start 2P (Google Fonts)

---

## 📞 Contact

- **Website:** [www.wrongyou.com](http://www.wrongyou.com)
- **Issues:** GitHub Issues
- **Email:** contact@wrongyou.com

---

## 🗺️ Roadmap

### Q1 2026
- ✅ Launch SQL Challengers MVP
- [ ] Add 20 levels
- [ ] Implement leaderboard
- [ ] Mobile responsive design

### Q2 2026
- [ ] Launch Game #2: RegEx Racer
- [ ] Add multiplayer mode
- [ ] User accounts & progress tracking

### Q3 2026
- [ ] Launch Game #3: Git Gauntlet
- [ ] Achievement system
- [ ] Social sharing features

### Q4 2026
- [ ] Launch Game #4: API Assault
- [ ] Platform API for third-party games
- [ ] Mobile app versions

---

**Made with ❤️ and lots of ☕ for developers who love retro games**

*"Get it wrong, learn it right - at WrongYou.com"*

