/**
 * SQL Challengers - Main Entry Point
 * 
 * Initializes Phaser game with all scenes
 */

import { GameConfig } from './config.js';
import BootScene from './scenes/BootScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import MenuScene from './scenes/MenuScene.js';
import GameScene from './scenes/GameScene.js';
import GameOverScene from './scenes/GameOverScene.js';

// Phaser game configuration
const config = {
    type: Phaser.AUTO,
    width: GameConfig.width,
    height: GameConfig.height,
    parent: 'game-container',
    backgroundColor: '#0f0f0f',
    pixelArt: GameConfig.pixelArt,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [
        BootScene,
        PreloadScene,
        MenuScene,
        GameScene,
        GameOverScene
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

// Create game instance
const game = new Phaser.Game(config);

// Global game state (accessible across scenes)
game.registry.set('currentLevel', 0);
game.registry.set('score', 0);
game.registry.set('lives', GameConfig.startingLives);
game.registry.set('highScore', parseInt(localStorage.getItem('sqlChallengersHighScore')) || 0);

// Export game instance
export default game;

