/**
 * PreloadScene - Asset loading
 * 
 * Loads all game assets (we'll use procedural graphics for now)
 */

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Display loading message
        const loadingText = this.add.text(width / 2, height / 2, 'INITIALIZING SQL CHALLENGERS...', {
            fontFamily: 'Press Start 2P',
            fontSize: '16px',
            color: '#00ffff',
            align: 'center',
            wordWrap: { width: width - 100 }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        // For now, we'll create procedural graphics in the create method
        // In the future, you can load sprite sheets here:
        // this.load.spritesheet('player', 'assets/player.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        // Create procedural graphics for game entities
        this.createPlayerGraphic();
        this.createEnemyGraphic();
        this.createDataItemGraphics();
        
        // Move to menu
        this.time.delayedCall(1000, () => {
            this.scene.start('MenuScene');
        });
    }
    
    createPlayerGraphic() {
        // Create a simple player sprite (green square with face)
        const graphics = this.add.graphics();
        graphics.fillStyle(0x00ff00, 1);
        graphics.fillRect(0, 0, 28, 28);
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(8, 8, 4, 4);  // Left eye
        graphics.fillRect(16, 8, 4, 4); // Right eye
        graphics.fillRect(6, 18, 16, 2); // Smile
        
        graphics.generateTexture('player', 32, 32);
        graphics.destroy();
    }
    
    createEnemyGraphic() {
        // Create enemy sprite (red angry face)
        const graphics = this.add.graphics();
        graphics.fillStyle(0xff0000, 1);
        graphics.fillRect(0, 0, 28, 28);
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(8, 8, 4, 4);  // Left eye
        graphics.fillRect(16, 8, 4, 4); // Right eye
        graphics.fillRect(6, 20, 16, 2); // Frown
        graphics.fillRect(4, 4, 2, 8);  // Left eyebrow
        graphics.fillRect(22, 4, 2, 8); // Right eyebrow
        
        graphics.generateTexture('enemy', 32, 32);
        graphics.destroy();
    }
    
    createDataItemGraphics() {
        // Create correct data item (cyan crystal)
        let graphics = this.add.graphics();
        graphics.fillStyle(0x00ffff, 1);
        graphics.fillRect(8, 0, 16, 8);
        graphics.fillRect(4, 8, 24, 16);
        graphics.fillRect(8, 24, 16, 8);
        
        graphics.generateTexture('dataCorrect', 32, 32);
        graphics.destroy();
        
        // Create incorrect data item (magenta X)
        graphics = this.add.graphics();
        graphics.fillStyle(0xff00ff, 1);
        graphics.fillRect(4, 4, 4, 24);
        graphics.fillRect(24, 4, 4, 24);
        graphics.fillRect(8, 8, 4, 16);
        graphics.fillRect(20, 8, 4, 16);
        graphics.fillRect(12, 12, 8, 8);
        
        graphics.generateTexture('dataIncorrect', 32, 32);
        graphics.destroy();
    }
}

