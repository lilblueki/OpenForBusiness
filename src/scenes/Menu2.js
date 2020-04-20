//Multiplayer - Difficulty Menu
class Menu2 extends Phaser.Scene {
    constructor() {
        super("menu2Scene");
    }

    preload(){
        this.load.audio('sfx_select', './modassets/pop.wav');
        this.load.audio('sfx_explosion', './modassets/kaching.wav');
        this.load.audio('sfx_rocket', './modassets/bell.wav');

        this.load.image('bg2', './modassets/multibg.png');
    }

    create(){

        this.bg = this.add.tileSprite(0, 0, 640, 480, 'bg2').setOrigin(0,0);

        //menu screen 
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: "#000",
            align: 'right',
            padding: {top: 5, bottom: 5,},
            fixedWidth: 0
        }

        //define play mode/level difficulty keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy mode
            game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000}
            this.sound.play('sfx_select');
            this.scene.start("play2Scene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //hard mode
            game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000}
            this.sound.play('sfx_select');
            this.scene.start("play2Scene");
        }
    }   
}