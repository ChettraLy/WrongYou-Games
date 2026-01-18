# Shared Resources

This directory contains shared resources used across all games in the WrongYou Games platform.

## Directory Structure

```
shared/
├── js/                      # Shared JavaScript utilities
│   ├── firebase-config.js   # Firebase initialization
│   ├── auth.js              # Authentication utilities
│   ├── firestore.js         # Database utilities
│   └── analytics.js         # Analytics tracking
├── css/                     # Shared CSS (future)
└── assets/                  # Shared assets (future)
```

## JavaScript Modules

### firebase-config.js
Initializes Firebase services (Auth, Firestore, Storage, Analytics).

```javascript
import { auth, db, storage } from '../../shared/js/firebase-config.js';
```

### auth.js
Authentication utilities for user sign-in/sign-up.

```javascript
import { signInWithEmail, signInWithGoogle, signInAnonymous } from '../../shared/js/auth.js';

// Sign in with email
const result = await signInWithEmail('user@example.com', 'password');

// Sign in with Google
const result = await signInWithGoogle();

// Sign in anonymously (guest)
const result = await signInAnonymous();
```

### firestore.js
Database utilities for saving/loading game data.

```javascript
import { saveProgress, getProgress, saveScore, getLeaderboard } from '../../shared/js/firestore.js';

// Save game progress
await saveProgress(userId, 'sql-challengers', {
    level: 5,
    score: 1000,
    lives: 3
});

// Get progress
const { data } = await getProgress(userId, 'sql-challengers');

// Save score to leaderboard
await saveScore('sql-challengers', {
    userId: userId,
    name: 'Player1',
    score: 5000
});

// Get leaderboard
const { scores } = await getLeaderboard('sql-challengers', 10);
```

### analytics.js
Analytics tracking for user events.

```javascript
import { trackGameStart, trackLevelComplete, trackAchievement } from '../../shared/js/analytics.js';

// Track game start
trackGameStart('sql-challengers');

// Track level completion
trackLevelComplete('sql-challengers', 5, 1000, 120);

// Track achievement
trackAchievement('first_win', 'sql-challengers');
```

## Usage in Games

All games should import these shared utilities instead of duplicating code:

```javascript
// In your game's main.js or boot scene
import { auth, db } from '../../shared/js/firebase-config.js';
import { getCurrentUser, onAuthChange } from '../../shared/js/auth.js';
import { saveProgress, getProgress } from '../../shared/js/firestore.js';
import { trackGameStart } from '../../shared/js/analytics.js';

// Check if user is signed in
onAuthChange((user) => {
    if (user) {
        console.log('User signed in:', user.email);
        // Load user progress
        loadUserProgress(user.uid);
    } else {
        console.log('User not signed in');
    }
});
```

## Future Additions

- Shared CSS for common UI components
- Shared audio assets (menu sounds, etc.)
- Shared sprite assets (UI elements, icons)
- Shared utility functions (score formatting, time formatting, etc.)

