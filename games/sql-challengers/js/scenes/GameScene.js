/**
 * GameScene - Main Gameplay
 * 
 * Handles player movement, enemies, data collection, and SQL challenges
 */

import { GameConfig } from '../config.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init() {
        // Reset game state
        this.currentLevel = this.registry.get('currentLevel') || 0;
        this.score = this.registry.get('score') || 0;
        this.lives = this.registry.get('lives') || GameConfig.startingLives;

        this.levelData = GameConfig.levels[this.currentLevel];
        this.collectedCorrect = 0;
        this.totalCorrect = this.levelData.correctData.length;
        this.gamePaused = true;  // Start paused for countdown
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Create grid background
        this.createGrid();
        
        // Create HUD
        this.createHUD();
        
        // Create player
        this.player = this.physics.add.sprite(width / 2, height / 2, 'player');
        this.player.setCollideWorldBounds(true);
        
        // Create input
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Create data items
        this.dataItems = this.physics.add.group();
        this.spawnDataItems();
        
        // Create enemies
        this.enemies = this.physics.add.group();
        this.spawnEnemies();
        
        // Collisions
        this.physics.add.overlap(this.player, this.dataItems, this.collectData, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this);
        
        // Level timer
        this.timeRemaining = this.levelData.timeLimit;
        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        // Start with countdown
        this.startCountdown();
    }

    update() {
        // Don't update game logic during countdown
        if (this.gamePaused) {
            return;
        }

        // Player movement
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-GameConfig.playerSpeed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(GameConfig.playerSpeed);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-GameConfig.playerSpeed);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(GameConfig.playerSpeed);
        }

        // Enemy AI - simple chase behavior
        this.enemies.children.entries.forEach(enemy => {
            this.physics.moveToObject(enemy, this.player, GameConfig.enemySpeed);
        });
    }

    createGrid() {
        const graphics = this.add.graphics();
        graphics.lineStyle(1, GameConfig.colors.grid, 0.3);
        
        // Vertical lines
        for (let x = 0; x < this.cameras.main.width; x += GameConfig.gridSize) {
            graphics.lineBetween(x, 0, x, this.cameras.main.height);
        }
        
        // Horizontal lines
        for (let y = 0; y < this.cameras.main.height; y += GameConfig.gridSize) {
            graphics.lineBetween(0, y, this.cameras.main.width, y);
        }
    }

    createHUD() {
        const padding = 10;
        
        // SQL Query display
        this.queryText = this.add.text(padding, padding, `QUERY: ${this.levelData.query}`, {
            fontFamily: 'Press Start 2P',
            fontSize: '10px',
            color: '#00ffff',
            backgroundColor: '#000000',
            padding: { x: 5, y: 5 }
        });
        
        // Score
        this.scoreText = this.add.text(padding, 50, `SCORE: ${this.score}`, {
            fontFamily: 'Press Start 2P',
            fontSize: '12px',
            color: '#ffff00'
        });
        
        // Lives
        this.livesText = this.add.text(padding, 75, `LIVES: ${this.lives}`, {
            fontFamily: 'Press Start 2P',
            fontSize: '12px',
            color: '#ff0000'
        });
        
        // Progress
        this.progressText = this.add.text(padding, 100, `COLLECTED: ${this.collectedCorrect}/${this.totalCorrect}`, {
            fontFamily: 'Press Start 2P',
            fontSize: '12px',
            color: '#00ff00'
        });
        
        // Timer
        this.timerText = this.add.text(this.cameras.main.width - padding, padding, `TIME: ${this.timeRemaining}`, {
            fontFamily: 'Press Start 2P',
            fontSize: '12px',
            color: '#ffffff'
        });
        this.timerText.setOrigin(1, 0);
    }

    spawnDataItems() {
        // Spawn correct data items
        this.levelData.correctData.forEach((data, index) => {
            const x = Phaser.Math.Between(100, this.cameras.main.width - 100);
            const y = Phaser.Math.Between(150, this.cameras.main.height - 100);

            const item = this.dataItems.create(x, y, 'dataCorrect');
            item.setData('correct', true);
            item.setData('label', data);

            // Add label text
            const label = this.add.text(x, y - 20, data, {
                fontFamily: 'Press Start 2P',
                fontSize: '8px',
                color: '#00ffff'
            });
            label.setOrigin(0.5, 0.5);
            item.setData('labelText', label);
        });

        // Spawn incorrect data items
        this.levelData.incorrectData.forEach((data, index) => {
            const x = Phaser.Math.Between(100, this.cameras.main.width - 100);
            const y = Phaser.Math.Between(150, this.cameras.main.height - 100);

            const item = this.dataItems.create(x, y, 'dataIncorrect');
            item.setData('correct', false);
            item.setData('label', data);

            // Add label text
            const label = this.add.text(x, y - 20, data, {
                fontFamily: 'Press Start 2P',
                fontSize: '8px',
                color: '#ff00ff'
            });
            label.setOrigin(0.5, 0.5);
            item.setData('labelText', label);
        });
    }

    spawnEnemies() {
        for (let i = 0; i < this.levelData.enemyCount; i++) {
            const x = Phaser.Math.Between(50, this.cameras.main.width - 50);
            const y = Phaser.Math.Between(50, 150);

            const enemy = this.enemies.create(x, y, 'enemy');
        }
    }

    collectData(player, item) {
        const isCorrect = item.getData('correct');
        const label = item.getData('label');
        const labelText = item.getData('labelText');

        if (isCorrect) {
            // Correct data collected
            this.collectedCorrect++;
            this.score += GameConfig.points.correctData;

            // Show feedback
            this.showFeedback(item.x, item.y, `+${GameConfig.points.correctData}`, '#00ff00');

            // Update HUD
            this.scoreText.setText(`SCORE: ${this.score}`);
            this.progressText.setText(`COLLECTED: ${this.collectedCorrect}/${this.totalCorrect}`);

            // Check level complete
            if (this.collectedCorrect >= this.totalCorrect) {
                this.levelComplete();
            }
        } else {
            // Incorrect data collected - lose a life
            this.lives--;
            this.livesText.setText(`LIVES: ${this.lives}`);

            // Show feedback
            this.showFeedback(item.x, item.y, 'WRONG!', '#ff0000');

            // Flash screen red
            this.cameras.main.flash(200, 255, 0, 0);

            if (this.lives <= 0) {
                this.gameOver();
            }
        }

        // Remove item and label
        if (labelText) {
            labelText.destroy();
        }
        item.destroy();
    }

    hitEnemy(player, enemy) {
        // Lose a life
        this.lives--;
        this.livesText.setText(`LIVES: ${this.lives}`);

        // Flash screen
        this.cameras.main.shake(200, 0.01);
        this.cameras.main.flash(200, 255, 0, 0);

        // Respawn player
        player.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

        // Brief invincibility
        player.setAlpha(0.5);
        this.time.delayedCall(1000, () => {
            player.setAlpha(1);
        });

        if (this.lives <= 0) {
            this.gameOver();
        }
    }

    showFeedback(x, y, text, color) {
        const feedback = this.add.text(x, y, text, {
            fontFamily: 'Press Start 2P',
            fontSize: '12px',
            color: color
        });
        feedback.setOrigin(0.5, 0.5);

        this.tweens.add({
            targets: feedback,
            y: y - 50,
            alpha: 0,
            duration: 1000,
            onComplete: () => feedback.destroy()
        });
    }

    updateTimer() {
        this.timeRemaining--;
        this.timerText.setText(`TIME: ${this.timeRemaining}`);

        if (this.timeRemaining <= 0) {
            this.gameOver();
        }
    }

    levelComplete() {
        // Stop timer
        this.timerEvent.remove();

        // Bonus points
        this.score += GameConfig.points.levelComplete;
        this.score += this.timeRemaining * 10; // Time bonus

        // Update registry
        this.registry.set('score', this.score);
        this.registry.set('lives', this.lives);
        this.registry.set('currentLevel', this.currentLevel + 1);

        // Show completion message
        const message = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2,
            'LEVEL COMPLETE!\n\n' +
            `BONUS: ${GameConfig.points.levelComplete + (this.timeRemaining * 10)}\n\n` +
            'NEXT LEVEL...', {
            fontFamily: 'Press Start 2P',
            fontSize: '16px',
            color: '#00ff00',
            align: 'center',
            backgroundColor: '#000000',
            padding: { x: 20, y: 20 }
        });
        message.setOrigin(0.5, 0.5);

        // Next level or game complete
        this.time.delayedCall(3000, () => {
            if (this.currentLevel + 1 < GameConfig.levels.length) {
                this.scene.restart();
            } else {
                this.gameComplete();
            }
        });
    }

    gameOver() {
        // Update high score
        const highScore = this.registry.get('highScore');
        if (this.score > highScore) {
            this.registry.set('highScore', this.score);
            localStorage.setItem('sqlChallengersHighScore', this.score);
        }

        // Reset for next game
        this.registry.set('currentLevel', 0);
        this.registry.set('score', 0);
        this.registry.set('lives', GameConfig.startingLives);

        this.scene.start('GameOverScene', { score: this.score, reason: 'Game Over' });
    }

    gameComplete() {
        // Update high score
        const highScore = this.registry.get('highScore');
        if (this.score > highScore) {
            this.registry.set('highScore', this.score);
            localStorage.setItem('sqlChallengersHighScore', this.score);
        }

        // Reset for next game
        this.registry.set('currentLevel', 0);
        this.registry.set('score', 0);
        this.registry.set('lives', GameConfig.startingLives);

        this.scene.start('GameOverScene', { score: this.score, reason: 'You Win!' });
    }

    startCountdown() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Create semi-transparent overlay
        const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.7);
        overlay.setOrigin(0, 0);
        overlay.setDepth(1000);

        // Show level info
        const levelInfo = this.add.text(width / 2, height / 2 - 100,
            `LEVEL ${this.currentLevel + 1}: ${this.levelData.name}`, {
            fontFamily: 'Press Start 2P',
            fontSize: '20px',
            color: '#00ffff',
            align: 'center'
        });
        levelInfo.setOrigin(0.5, 0.5);
        levelInfo.setDepth(1001);

        // Show objective
        const objective = this.add.text(width / 2, height / 2 - 40,
            `COLLECT ALL CYAN DATA\nAVOID MAGENTA DATA\nDODGE RED ENEMIES`, {
            fontFamily: 'Press Start 2P',
            fontSize: '12px',
            color: '#ffffff',
            align: 'center',
            lineSpacing: 10
        });
        objective.setOrigin(0.5, 0.5);
        objective.setDepth(1001);

        // Countdown text
        const countdownText = this.add.text(width / 2, height / 2 + 80, '3', {
            fontFamily: 'Press Start 2P',
            fontSize: '72px',
            color: '#00ff00',
            align: 'center'
        });
        countdownText.setOrigin(0.5, 0.5);
        countdownText.setDepth(1001);

        // Countdown sequence
        let count = 3;
        const countdownTimer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                count--;
                if (count > 0) {
                    countdownText.setText(count.toString());
                } else if (count === 0) {
                    countdownText.setText('GO!');
                    countdownText.setColor('#ffff00');
                } else {
                    // Remove overlay and start game
                    overlay.destroy();
                    levelInfo.destroy();
                    objective.destroy();
                    countdownText.destroy();
                    this.gamePaused = false;
                    countdownTimer.destroy();
                }
            },
            callbackScope: this,
            loop: true
        });
    }
}
