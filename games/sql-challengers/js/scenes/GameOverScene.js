/**
 * GameOverScene - Game Over / Victory Screen
 * 
 * Displays final score and options to replay or return to menu
 */

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.finalScore = data.score || 0;
        this.reason = data.reason || 'Game Over';
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Background
        this.add.rectangle(0, 0, width, height, 0x000000, 0.9).setOrigin(0, 0);
        
        // Title
        const isWin = this.reason === 'You Win!';
        const titleColor = isWin ? '#00ff00' : '#ff0000';
        
        const title = this.add.text(width / 2, 150, this.reason.toUpperCase(), {
            fontFamily: 'Press Start 2P',
            fontSize: '36px',
            color: titleColor,
            align: 'center'
        });
        title.setOrigin(0.5, 0.5);
        
        // Pulse animation
        this.tweens.add({
            targets: title,
            scale: 1.1,
            duration: 500,
            yoyo: true,
            repeat: -1
        });
        
        // Final Score
        this.add.text(width / 2, 250, `FINAL SCORE`, {
            fontFamily: 'Press Start 2P',
            fontSize: '16px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0.5);
        
        this.add.text(width / 2, 290, `${this.finalScore}`, {
            fontFamily: 'Press Start 2P',
            fontSize: '32px',
            color: '#ffff00',
            align: 'center'
        }).setOrigin(0.5, 0.5);
        
        // High Score
        const highScore = this.registry.get('highScore');
        const isNewHighScore = this.finalScore >= highScore;
        
        if (isNewHighScore && this.finalScore > 0) {
            this.add.text(width / 2, 340, 'NEW HIGH SCORE!', {
                fontFamily: 'Press Start 2P',
                fontSize: '14px',
                color: '#00ffff',
                align: 'center'
            }).setOrigin(0.5, 0.5);
        } else {
            this.add.text(width / 2, 340, `HIGH SCORE: ${highScore}`, {
                fontFamily: 'Press Start 2P',
                fontSize: '14px',
                color: '#00ffff',
                align: 'center'
            }).setOrigin(0.5, 0.5);
        }
        
        // Buttons
        this.createButton(width / 2, 420, 'PLAY AGAIN', () => {
            this.scene.start('GameScene');
        });
        
        this.createButton(width / 2, 490, 'MAIN MENU', () => {
            this.scene.start('MenuScene');
        });
        
        // Keyboard shortcuts
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('GameScene');
        });
        
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.start('MenuScene');
        });
    }
    
    createButton(x, y, text, callback) {
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
}

