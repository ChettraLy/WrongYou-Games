/**
 * MenuScene - Main Menu
 * 
 * Displays title, high score, and menu options
 */

import { GameConfig } from '../config.js';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Animated starfield background
        this.createStarfield();
        
        // Title with glitch effect
        const title = this.add.text(width / 2, 100, 'SQL\nCHALLENGERS', {
            fontFamily: 'Press Start 2P',
            fontSize: '48px',
            color: '#00ff00',
            align: 'center',
            lineSpacing: 10
        });
        title.setOrigin(0.5, 0.5);
        
        // Glitch animation
        this.tweens.add({
            targets: title,
            x: width / 2 + Phaser.Math.Between(-2, 2),
            duration: 50,
            repeat: -1,
            yoyo: true
        });
        
        // Subtitle
        this.add.text(width / 2, 200, 'LEARN SQL THROUGH GAMEPLAY', {
            fontFamily: 'Press Start 2P',
            fontSize: '12px',
            color: '#00ffff',
            align: 'center'
        }).setOrigin(0.5, 0.5);
        
        // High Score
        const highScore = this.registry.get('highScore');
        this.add.text(width / 2, 250, `HIGH SCORE: ${highScore}`, {
            fontFamily: 'Press Start 2P',
            fontSize: '14px',
            color: '#ffff00',
            align: 'center'
        }).setOrigin(0.5, 0.5);
        
        // Menu options
        this.createMenuButton(width / 2, 350, 'START GAME', () => {
            this.scene.start('GameScene');
        });
        
        this.createMenuButton(width / 2, 420, 'HOW TO PLAY', () => {
            this.showInstructions();
        });
        
        this.createMenuButton(width / 2, 490, 'BACK TO LOBBY', () => {
            window.location.href = '../../index.html';
        });
        
        // Footer
        this.add.text(width / 2, height - 30, 'WRONGYOU GAMES © 2026', {
            fontFamily: 'Press Start 2P',
            fontSize: '10px',
            color: '#666666',
            align: 'center'
        }).setOrigin(0.5, 0.5);
        
        // Keyboard shortcut
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('GameScene');
        });
    }
    
    createStarfield() {
        // Create animated stars
        for (let i = 0; i < 50; i++) {
            const x = Phaser.Math.Between(0, this.cameras.main.width);
            const y = Phaser.Math.Between(0, this.cameras.main.height);
            const star = this.add.circle(x, y, 1, 0xffffff, Phaser.Math.FloatBetween(0.3, 1));
            
            this.tweens.add({
                targets: star,
                alpha: Phaser.Math.FloatBetween(0.2, 1),
                duration: Phaser.Math.Between(1000, 3000),
                repeat: -1,
                yoyo: true
            });
        }
    }
    
    createMenuButton(x, y, text, callback) {
        const button = this.add.text(x, y, text, {
            fontFamily: 'Press Start 2P',
            fontSize: '16px',
            color: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 }
        });
        button.setOrigin(0.5, 0.5);
        button.setInteractive({ useHandCursor: true });
        
        button.on('pointerover', () => {
            button.setStyle({ color: '#00ff00', backgroundColor: '#555555' });
        });
        
        button.on('pointerout', () => {
            button.setStyle({ color: '#ffffff', backgroundColor: '#333333' });
        });
        
        button.on('pointerdown', callback);
        
        return button;
    }
    
    showInstructions() {
        // Create instruction overlay
        const overlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.9);
        overlay.setOrigin(0, 0);
        overlay.setInteractive();
        
        const instructions = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 
            'HOW TO PLAY\n\n' +
            'Use ARROW KEYS to move\n' +
            'Collect CYAN data items\n' +
            'Avoid MAGENTA data items\n' +
            'Dodge RED enemies\n' +
            'Complete SQL challenges!\n\n' +
            'Click to close', {
            fontFamily: 'Press Start 2P',
            fontSize: '14px',
            color: '#00ffff',
            align: 'center',
            lineSpacing: 10
        });
        instructions.setOrigin(0.5, 0.5);
        
        overlay.on('pointerdown', () => {
            overlay.destroy();
            instructions.destroy();
        });
    }
}

