//Multiplayer Mode
class Play2 extends Phaser.Scene {
    constructor() {
        super("play2Scene");
    }

    preload(){
        //load images/tile sprites
        this.load.image('rocket', './modassets/burger1.png');
        this.load.image('rocket2', './modassets/taco1.png');
        this.load.image('spaceship', './modassets/eater.png');
        this.load.image('starfield', './modassets/floorplan.png');
        this.load.image('end', './modassets/endbg2.png');
        this.load.spritesheet('explosion', './modassets/eating2.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 18});
    }

    create(){
        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);
        
        //boarder
        this.add.rectangle(5, 443, 630, 32, 0x011726).setOrigin(0,0);
       
        //add the rocket - player1
        this.p1Rocket = new Rocket1(this, game.config.width/2 + 150, 431, 'rocket').setOrigin(0, 0); //adjust location <------
        //add 2nd rocket - Multiplayer, Player2
        this.p2Rocket = new Rocket2(this, game.config.width/2 - 150, 431, 'rocket2').setOrigin(0, 0); //adjust location <------
    
        //add spaceships
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'spaceship', 0, 10).setOrigin(0,0);

        //define keyboard keys - Player 1
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F); //single player mode (shoot)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP); //mulitplayer mode (shoot)
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); //both modes
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); //both modes
        
        //define keyboard keys - Player 2
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 18, first: 0}),
            framerate: 30,
        });

        //score - intialized at 0pts
        this.p1Score = 0;
            //added
        this.p2Score = 0; //Player 2 score

        //white rectangle border
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
        this.scoreLeft = this.add.text(469, 54, this.p1Score, scoreConfig); //score display - Player 1
            
        this.scoreRight = this.add.text(69, 54, this.p2Score, scoreConfig); //score display - Multiplayer, Player 2
        
        //game over flag
        this.gameOver = false;

        //60-sec playtime clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall (game.settings.gameTimer, () => {
            this.end = this.add.tileSprite(0, 0, 640, 480, 'end').setOrigin(0,0);
            this.scoreLeft = this.add.text(540, 54, this.p1Score, scoreConfig); //score display - Player 1
            this.scoreRight = this.add.text(69, 54, this.p2Score, scoreConfig); //score display - Multiplayer, Player 2
            this.gameOver = true;
        }, null, this);
    }

    update(){
        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyA)){
            this.scene.restart(this.p1Score);
            this.scene.restart(this.p2Score);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('sfx_select');
            this.scene.start("menuScene");
        }

        //scroll starField
        this.starfield.tilePositionX -= 4;

        //update rocket
        this.p1Rocket.update();
        //update Player 2 
        this.p2Rocket.update();

        //update spaceship
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.p2Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        //check collisions 
        if (this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            this.p1Score += this.ship03.points;
            this.scoreLeft.text = this.p1Score;
            this.sound.play('sfx_explosion');
        }
        if (this.checkCollision(this.p2Rocket, this.ship03)){
            this.p2Rocket.reset();
            this.shipExplode(this.ship03);
            this.p2Score += this.ship03.points;
            this.scoreRight.text = this.p2Score;
            this.sound.play('sfx_explosion');
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            this.p1Score += this.ship02.points;
            this.scoreLeft.text = this.p1Score;
            this.sound.play('sfx_explosion');
        }
        if (this.checkCollision(this.p2Rocket, this.ship02)){
            this.p2Rocket.reset();
            this.shipExplode(this.ship02);
            this.p2Score += this.ship02.points;
            this.scoreRight.text = this.p2Score;
            this.sound.play('sfx_explosion');
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.p1Score += this.ship01.points;
            this.scoreLeft.text = this.p1Score;
            this.sound.play('sfx_explosion');
        }
        if (this.checkCollision(this.p2Rocket, this.ship01)){
            this.p2Rocket.reset();
            this.shipExplode(this.ship01);
            this.p2Score += this.ship01.points;
            this.scoreRight.text = this.p2Score;
            this.sound.play('sfx_explosion');
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
    }
}