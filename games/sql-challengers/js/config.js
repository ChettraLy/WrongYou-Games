/**
 * SQL Challengers - Game Configuration
 * 
 * Core game settings and constants
 */

export const GameConfig = {
    // Display settings
    width: 800,
    height: 600,
    pixelArt: true,
    
    // Grid settings
    gridSize: 32,
    gridWidth: 20,
    gridHeight: 15,
    
    // Game settings
    startingLives: 3,
    playerSpeed: 150,
    enemySpeed: 60,  // Reduced from 100 to give players more time
    
    // Colors (retro palette)
    colors: {
        background: 0x0f0f0f,
        grid: 0x333333,
        player: 0x00ff00,
        enemy: 0xff0000,
        dataCorrect: 0x00ffff,
        dataIncorrect: 0xff00ff,
        ui: 0xffffff
    },
    
    // Scoring
    points: {
        correctData: 100,
        levelComplete: 500,
        enemyAvoid: 10
    },
    
    // Level progression
    levels: [
        {
            id: 1,
            name: "SELECT Basics",
            query: "SELECT * FROM users WHERE age > 18",
            correctData: ["Alice", "Bob", "Charlie"],
            incorrectData: ["Dave", "Eve"],
            enemyCount: 2,
            timeLimit: 90  // Increased from 60
        },
        {
            id: 2,
            name: "WHERE Clause",
            query: "SELECT name FROM products WHERE price < 50",
            correctData: ["Keyboard", "Mouse", "Cable"],
            incorrectData: ["Monitor", "Laptop"],
            enemyCount: 3,
            timeLimit: 80  // Increased from 55
        },
        {
            id: 3,
            name: "ORDER BY",
            query: "SELECT * FROM scores ORDER BY points DESC LIMIT 3",
            correctData: ["Player1", "Player2", "Player3"],
            incorrectData: ["Player4", "Player5"],
            enemyCount: 4,
            timeLimit: 75  // Increased from 50
        }
    ]
};

// Export for use in other modules
export default GameConfig;

