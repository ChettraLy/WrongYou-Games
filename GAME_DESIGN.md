# 🎮 SQL Challengers - Game Design Document

**Version:** 1.0  
**Platform:** Web (HTML5/Phaser 3)  
**Genre:** Educational Arcade / Puzzle  
**Target Audience:** Developers, students, SQL learners (ages 12+)

---

## 🎯 Game Overview

### High Concept
*"Number Munchers meets SQL - Learn database queries by munching data in a retro arcade adventure!"*

### Core Gameplay Loop
1. Player sees a SQL query prompt (e.g., "WHERE age > 25")
2. Navigate a 6x6 grid filled with data records
3. Munch cells that match the query condition
4. Avoid Syntax Troggles (enemies) that patrol the grid
5. Complete level when all correct cells are munched
6. Progress to harder SQL concepts

### Learning Objectives
- Understand SQL WHERE clauses
- Master logical operators (AND, OR, NOT)
- Learn comparison operators (=, >, <, !=)
- Practice aggregate functions (COUNT, SUM, AVG)
- Explore JOIN operations

---

## 🎨 Visual Design

### Art Style
- **8-bit pixel art** - Chunky, retro aesthetic
- **Limited color palette** - Neon colors on dark background
- **Grid-based layout** - Clear, organized structure
- **CRT effects** - Optional scanlines and glow

### Color Scheme
```
Background:     #0f0f0f (Almost black)
Primary:        #00ff00 (Matrix green)
Secondary:      #00ffff (Cyan)
Danger:         #ff0000 (Red)
Warning:        #ffff00 (Yellow)
Correct:        #00ff00 (Green)
Wrong:          #ff0000 (Red)
```

### Character Design

**Player Character: "The Query"**
- Small pixelated character (16x16 or 32x32)
- Bright green color
- Simple animation (2-4 frames for walking)
- Eating animation when munching

**Enemies: "Syntax Troggles"**
- Red/orange pixelated creatures
- Slightly larger than player (24x24 or 40x40)
- Random movement pattern
- Angry expression

**Data Cells**
- 64x64 pixel squares
- Display data values clearly
- Highlight on hover
- Different colors for munched/unmunched

---

## 🎮 Game Mechanics

### Movement System
- **Grid-based movement** - Snap to grid cells
- **Arrow keys** - Up, Down, Left, Right
- **Movement speed** - 2 cells per second (adjustable)
- **Collision** - Cannot move through walls or edges

### Munching Mechanic
- **Action key** - Spacebar to munch
- **Validation** - Check if cell matches SQL query
- **Feedback** - Immediate visual/audio response
- **Scoring** - Points awarded/deducted

### Enemy AI (Troggles)
- **Movement** - Random direction changes every 2-3 seconds
- **Speed** - Slightly slower than player
- **Collision** - Touching player causes life loss
- **Respawn** - After collision, respawn at random edge

### Lives System
- **Starting lives** - 3 hearts
- **Lose life when:**
  - Munching wrong cell (-1 life)
  - Touching a Troggle (-1 life)
- **Game over** - When lives reach 0

### Scoring System
```
Correct munch:        +10 points
Wrong munch:          -5 points (+ lose life)
Troggle collision:    -0 points (but lose life)
Level complete:       +50 bonus
Speed bonus:          +1 per second remaining
Perfect level:        +100 bonus (no mistakes)
```

---

## 📊 Level Progression

### Difficulty Curve

| Levels | SQL Concept | Grid Complexity | Troggles | Time Limit |
|--------|-------------|-----------------|----------|------------|
| 1-3    | Basic WHERE | Simple values   | 1        | 60s        |
| 4-6    | AND/OR      | Multiple fields | 2        | 50s        |
| 7-9    | Comparisons | Ranges          | 3        | 45s        |
| 10-12  | NOT/LIKE    | Patterns        | 3        | 40s        |
| 13-15  | Aggregates  | Calculations    | 4        | 40s        |
| 16-20  | JOINs       | Multiple tables | 4        | 35s        |

### Level Structure

**Level 1: Introduction**
```json
{
    "level": 1,
    "query": "SELECT * FROM users WHERE age > 25",
    "table": "users",
    "data": [
        {"id": 1, "name": "Alice", "age": 30},
        {"id": 2, "name": "Bob", "age": 22},
        {"id": 3, "name": "Carol", "age": 28},
        // ... 36 total cells
    ],
    "troggles": 1,
    "timeLimit": 60,
    "hint": "Munch all users older than 25!"
}
```

**Level 5: Logical Operators**
```json
{
    "level": 5,
    "query": "SELECT * FROM users WHERE age > 25 AND city = 'NYC'",
    "table": "users",
    "data": [
        {"id": 1, "name": "Alice", "age": 30, "city": "NYC"},
        {"id": 2, "name": "Bob", "age": 28, "city": "LA"},
        // ...
    ],
    "troggles": 2,
    "timeLimit": 50
}
```

**Level 15: Aggregates**
```json
{
    "level": 15,
    "query": "SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 3",
    "table": "employees",
    "data": [
        {"dept": "Sales", "count": 5},
        {"dept": "IT", "count": 2},
        // ...
    ],
    "troggles": 4,
    "timeLimit": 40
}
```

---

## 🎵 Audio Design

### Sound Effects
- **Munch (Correct)** - Satisfying "chomp" sound (8-bit)
- **Error (Wrong)** - Harsh buzzer sound
- **Collision** - "Oof" or damage sound
- **Level Complete** - Victory jingle
- **Game Over** - Sad trombone effect
- **Power-up** - Ascending chime

### Background Music
- **Menu Theme** - Upbeat chiptune loop
- **Gameplay** - Tense but fun 8-bit music
- **Boss Level** - More intense variation
- **Game Over** - Melancholic tune

### Audio Settings
- **Mute button** - Toggle all sounds
- **Volume control** - Adjust levels
- **Music/SFX separate** - Independent controls

---

## 🎁 Power-Ups

### Primary Key Shield 🔑
- **Effect** - Invincibility for 5 seconds
- **Visual** - Glowing aura around player
- **Spawn rate** - 20% chance per level
- **Duration** - 5 seconds

### Index Boost ⚡
- **Effect** - 2x movement speed
- **Visual** - Speed lines behind player
- **Spawn rate** - 15% chance per level
- **Duration** - 10 seconds

### Query Hint 🔍
- **Effect** - Highlights correct cells for 3 seconds
- **Visual** - Green glow on correct cells
- **Spawn rate** - 10% chance per level
- **Duration** - 3 seconds

### Syntax Freeze ❄️
- **Effect** - Stops all Troggles for 5 seconds
- **Visual** - Troggles turn blue and stop
- **Spawn rate** - 15% chance per level
- **Duration** - 5 seconds

---

## 🏆 Progression & Rewards

### Unlockables
- **Levels** - Unlock sequentially
- **Skins** - Unlock player skins at milestones
- **Themes** - Unlock color schemes
- **Difficulty modes** - Easy, Normal, Hard, Expert

### Achievements
```
🥉 First Steps       - Complete Level 1
🥈 Query Apprentice  - Complete 10 levels
🥇 SQL Master        - Complete all 20 levels
💎 Perfect Run       - Complete a level with no mistakes
👑 Speed Demon       - Complete a level in under 20 seconds
🔥 Combo King        - Munch 10 correct cells in a row
💯 High Scorer       - Reach 1000 points
🎯 Perfectionist     - Get perfect score on 5 levels
```

### Leaderboard
- **Local** - Top 10 scores stored in localStorage
- **Daily** - Reset every 24 hours (future feature)
- **All-Time** - Permanent high scores
- **Per-Level** - Best score for each level

---

## 🎯 User Interface

### Main Menu
```
┌─────────────────────────────────┐
│      SQL CHALLENGERS            │
│                                 │
│      [START GAME]               │
│      [LEADERBOARD]              │
│      [SETTINGS]                 │
│      [HOW TO PLAY]              │
│                                 │
│   High Score: 1250              │
└─────────────────────────────────┘
```

### In-Game HUD
```
┌─────────────────────────────────┐
│ CHALLENGE: WHERE age > 25       │
├─────────────────────────────────┤
│ ❤️❤️❤️  Score: 150  Time: 45s  │
├─────────────────────────────────┤
│                                 │
│     [6x6 GAME GRID]             │
│                                 │
├─────────────────────────────────┤
│ Level: 3/20    Combo: x2        │
└─────────────────────────────────┘
```

### Game Over Screen
```
┌─────────────────────────────────┐
│        GAME OVER                │
│                                 │
│    Final Score: 850             │
│    Level Reached: 7             │
│    Accuracy: 85%                │
│                                 │
│    [RETRY]  [MENU]              │
│                                 │
│    Enter Name: ___              │
│    [SAVE SCORE]                 │
└─────────────────────────────────┘
```

---

## 🎓 Tutorial System

### First-Time Player Experience

**Step 1: Welcome Screen**
- Brief introduction to the game
- "Learn SQL by playing!"

**Step 2: Movement Tutorial**
- "Use arrow keys to move"
- Highlight player character
- No enemies, no time limit

**Step 3: Munching Tutorial**
- "Press SPACE to munch cells"
- Show correct vs wrong feedback
- Simple query: "WHERE id = 1"

**Step 4: Query Tutorial**
- "Read the mission at the top"
- Explain WHERE clause
- Practice with "WHERE age > 20"

**Step 5: Enemies Tutorial**
- "Avoid the Syntax Troggles!"
- One slow-moving Troggle
- Show collision effect

**Step 6: Full Game**
- "Now you're ready! Good luck!"
- Start Level 1

---

## 📱 Responsive Design

### Desktop (Primary)
- **Resolution** - 1024x768 minimum
- **Controls** - Keyboard (arrow keys + spacebar)
- **Layout** - Centered game canvas

### Tablet
- **Resolution** - 768x1024
- **Controls** - Touch (virtual D-pad + button)
- **Layout** - Portrait or landscape

### Mobile (Future)
- **Resolution** - 375x667 minimum
- **Controls** - Touch with larger buttons
- **Layout** - Simplified UI

---

## 🔧 Technical Specifications

### Performance Targets
- **Frame rate** - 60 FPS
- **Load time** - < 3 seconds
- **Asset size** - < 5MB total
- **Memory** - < 100MB RAM

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Dependencies
- Phaser 3.60+
- NES.css (optional styling)
- No backend required

---

**This design document serves as the blueprint for SQL Challengers. Adjust and iterate based on playtesting feedback!**

