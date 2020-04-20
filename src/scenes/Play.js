//Single Player Mode
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        //load images/tile sprites
        this.load.image('rocket', './modassets/burger1.png');
        this.load.image('spaceship', './modassets/eater.png');
        this.load.image('starfield', './modassets/floorplan.png');
        this.load.image('end1', './modassets/endbg.png');
        this.load.spritesheet('explosion', './modassets/eating2.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 18});
    }

    create(){
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);

        //boarder
        this.add.rectangle(5, 443, 630, 32, 0x011726).setOrigin(0,0);

        //add the rocket - player1
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket').setOrigin(0, 0);
    
        //add spaceships
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'spaceship', 0, 10).setOrigin(0,0);

        //define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 18, first: 0}),
            framerate: 30,
        });

        //score - intialized at 0pts
        this.p1Score = 0;

        //NAVY rectangle border
        this.add.rectangle(5, 5, 630, 32, 0x011726).setOrigin(0,0);
        this.add.rectangle(5, 5, 32, 455, 0x011726).setOrigin(0,0);
        this.add.rectangle(603, 5, 32, 455, 0x011726).setOrigin(0,0);

        //score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#E92525',
            color: "#000",
            align: 'right',
            padding: {top: 5, bottom: 5,},
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);
        
        //game over flag
        this.gameOver = false;

        //60-sec playtime clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall (game.settings.gameTimer, () => {
            this.end1 = this.add.tileSprite(0, 0, 640, 480, 'end1').setOrigin(0,0);
            this.final = this.add.text (160, 54, 'FINAL SCORE: ', scoreConfig);
            this.scoreLeft = this.add.text(440, 54, this.p1Score, scoreConfig);
            this.gameOver = true;
        }, null, this);
    }

    update(){
        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)){
            this.scene.restart(this.p1Score);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        //scroll starField
        this.starfield.tilePositionX -= 4;

        //update rocket
        this.p1Rocket.update();

        //update spaceship
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
    
        //check collisions 
        if (this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }  
    }

    //collision checking - do the two "rectangles" overlap?
    checkCollision (rocket, ship) {
        //simple Axis Aligned Bounding Boxes aka making a box around the sprite
        if (rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }
    }
    shipExplode(ship){
        ship.alpha = 0;
        //create explosion
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        //score increment and adjustment
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }
}