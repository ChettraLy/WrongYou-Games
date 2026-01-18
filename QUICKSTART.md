# ⚡ Quick Start Guide - WrongYou Games

Get your educational games platform up and running in minutes!

---

## 🎯 What You're Building

A retro arcade-style educational games platform in the **wrongyou-games** repository, hosted at **www.wrongyou.com**. This repository contains all games for the platform, starting with **SQL Challengers** - a game that teaches SQL through gameplay inspired by the classic Number Munchers.

---

## 📋 Prerequisites

- **Web Browser** (Chrome, Firefox, Safari, or Edge)
- **Text Editor** (VS Code, Sublime, or any editor)
- **Node.js 16+** (required for Firebase CLI)
- **Firebase Account** (free tier available at https://firebase.google.com)
- **Domain Access** (wrongyou.com DNS settings - for production only)

---

## 🚀 5-Minute Setup

### Step 1: Get the Code

```bash
# Clone or download this repository
git clone https://github.com/yourusername/wrongyou-games.git
cd wrongyou-games
```

### Step 2: Install Firebase CLI

```bash
# Install Firebase tools globally
npm install -g firebase-tools

# Login to Firebase
firebase login
```

### Step 3: Initialize Firebase (First Time Only)

```bash
# Initialize Firebase in your project
firebase init

# Select services:
# ◉ Firestore
# ◉ Hosting
# ◉ Storage
# ◉ Emulators

# Follow prompts:
# - Use existing project or create new: wrongyou-games
# - Public directory: . (root)
# - Single-page app: No
# - Set up emulators: Yes (Auth, Firestore, Hosting, Storage)
```

### Step 4: Configure Environment Variables

Create `.env` file in project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=wrongyou-games.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=wrongyou-games
VITE_FIREBASE_STORAGE_BUCKET=wrongyou-games.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Get these from: Firebase Console → Project Settings → Your apps

### Step 5: Start Local Development Server

```bash
# Start Firebase emulators (includes hosting, auth, firestore)
firebase emulators:start

# Access at:
# - Your site: http://localhost:5000
# - Emulator UI: http://localhost:4000
```

**Alternative: Simple HTTP Server (No Firebase features)**
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server -p 8000

# Then visit: http://localhost:8000
```

---

## 🎮 Development Workflow

### Phase 1: Build the Foundation (Week 1)

**Goal:** Get a playable grid with character movement

1. **Create the basic HTML structure**
   ```bash
   games/sql-challengers/index.html
   ```

2. **Set up Phaser 3**
   - Add Phaser CDN to HTML
   - Create basic game configuration
   - Implement 6x6 grid rendering

3. **Add player movement**
   - Arrow key controls
   - Grid-based movement
   - Spacebar to "munch" cells

**Test:** Can you move a character around a grid?

---

### Phase 2: Add SQL Logic (Week 2)

**Goal:** Implement the SQL evaluation engine

1. **Create SQL Evaluator**
   ```javascript
   // games/sql-challengers/js/utils/sqlEvaluator.js
   class SQLEvaluator {
       evaluate(whereClause, dataRow) {
           // Parse and evaluate WHERE conditions
       }
   }
   ```

2. **Create Level Data**
   ```json
   // games/sql-challengers/data/levels.json
   {
       "level1": {
           "query": "SELECT * FROM users WHERE age > 25",
           "data": [...]
       }
   }
   ```

3. **Connect Logic to Gameplay**
   - Display query at top of screen
   - Check munched cells against query
   - Award points for correct munches

**Test:** Does munching correct cells give points?

---

### Phase 3: Add Challenge (Week 3)

**Goal:** Implement enemies and game over conditions

1. **Create Troggles (Enemies)**
   ```javascript
   // games/sql-challengers/js/entities/Troggle.js
   class Troggle extends Phaser.GameObjects.Sprite {
       // Random movement AI
       // Collision with player
   }
   ```

2. **Add Lives System**
   - Start with 3 hearts
   - Lose life on wrong munch or collision
   - Game over at 0 lives

3. **Create Game Over Scene**
   - Display final score
   - Show leaderboard
   - Restart option

**Test:** Can you lose the game?

---

### Phase 4: Polish & Deploy (Week 4)

**Goal:** Make it look great and deploy to wrongyou.com

1. **Add Retro Styling**
   - NES.css integration
   - Pixel fonts
   - Scanline effects
   - Sound effects

2. **Create Landing Page**
   - Platform homepage
   - Game selection
   - About section

3. **Deploy to Production**
   - Choose hosting (Netlify recommended)
   - Configure domain
   - Enable HTTPS

**Test:** Is it live at wrongyou.com?

---

## 🛠️ Essential Files to Create

### Minimum Viable Product (MVP)

```
wrongyou-games/                         # This repository
├── index.html                          # Platform landing page
├── games/
│   └── sql-challengers/
│       ├── index.html                  # Game entry point
│       ├── js/
│       │   ├── game.js                 # Phaser config (START HERE)
│       │   ├── scenes/
│       │   │   ├── MenuScene.js        # Title screen
│       │   │   └── GameScene.js        # Main gameplay
│       │   ├── entities/
│       │   │   ├── Player.js           # Player character
│       │   │   └── DataCell.js         # Grid cells
│       │   └── utils/
│       │       └── sqlEvaluator.js     # SQL logic
│       ├── css/
│       │   └── style.css               # Game styles
│       └── data/
│           └── levels.json             # Level definitions
```

---

## 🎨 Styling Quick Reference

### Retro Color Palette

```css
/* Copy these to your CSS */
:root {
    --bg-dark: #0f0f0f;        /* Almost black */
    --primary: #00ff00;         /* Matrix green */
    --secondary: #00ffff;       /* Cyan */
    --danger: #ff0000;          /* Red */
    --warning: #ffff00;         /* Yellow */
}

body {
    background: var(--bg-dark);
    color: var(--primary);
    font-family: 'Press Start 2P', monospace;
}
```

### Import Retro Fonts

```html
<!-- Add to <head> -->
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
<link href="https://unpkg.com/nes.css@latest/css/nes.min.css" rel="stylesheet">
```

---

## 🐛 Common Issues & Fixes

### Issue: "Phaser is not defined"
**Fix:** Make sure Phaser CDN is loaded before your game.js
```html
<script src="https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js"></script>
<script src="js/game.js"></script>
```

### Issue: Assets not loading
**Fix:** Check file paths are relative to index.html
```javascript
// Correct
this.load.image('player', 'assets/sprites/player.png');

// Wrong (if index.html is in root)
this.load.image('player', '/assets/sprites/player.png');
```

### Issue: Grid not displaying
**Fix:** Ensure canvas size matches grid dimensions
```javascript
const config = {
    width: 6 * 64,  // 6 cells × 64px each
    height: 6 * 64,
    // ...
};
```

---

## 📚 Learning Resources

### Phaser 3 Tutorials
- [Official Phaser Tutorial](https://phaser.io/tutorials/making-your-first-phaser-3-game)
- [Phaser Examples](https://phaser.io/examples)

### Retro Game Design
- [Number Munchers Gameplay](https://www.youtube.com/watch?v=jyCIVL_TnfY)
- [8-bit Design Principles](https://lospec.com/palette-list)

### SQL Learning
- [W3Schools SQL](https://www.w3schools.com/sql/)
- [SQLBolt Interactive](https://sqlbolt.com/)

---

## 🎯 Next Steps

1. **Start with Phase 1** - Get the grid and movement working
2. **Test frequently** - Play your game after each feature
3. **Iterate quickly** - Don't aim for perfection first
4. **Deploy early** - Get it online and improve iteratively

---

## 💡 Pro Tips

- **Use browser DevTools** - Console.log everything while developing
- **Start simple** - One level, one enemy, basic graphics
- **Steal shamelessly** - Look at Phaser examples for inspiration
- **Test on mobile** - Even if not optimized, check responsiveness
- **Get feedback early** - Share with friends before "finishing"

---

## 🆘 Need Help?

- **Phaser Discord:** https://discord.gg/phaser
- **Stack Overflow:** Tag questions with `phaser3`
- **GitHub Issues:** Report bugs in this repo

---

## ✅ Checklist for Launch

- [ ] Game playable from start to game over
- [ ] At least 3 levels working
- [ ] Scoring system functional
- [ ] Leaderboard saves to localStorage
- [ ] Responsive on desktop browsers
- [ ] HTTPS enabled on wrongyou.com
- [ ] Tested in Chrome, Firefox, Safari
- [ ] Sound can be muted
- [ ] Instructions visible to new players

---

**Ready to build? Start with `games/sql-challengers/index.html` and have fun! 🎮**

*Remember: The best way to learn is by building. Don't overthink it - just start coding!*

