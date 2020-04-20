class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload(){
        this.load.audio('sfx_select', './modassets/pop.wav');
        this.load.audio('sfx_explosion', './modassets/kaching.wav');
        this.load.audio('sfx_rocket', './modassets/bell.wav');

        this.load.image('bg', './modassets/mainbg.png');
    }

    create(){

        this.bg = this.add.tileSprite(0, 0, 640, 480, 'bg').setOrigin(0,0);

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
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyA)){
            this.sound.play('sfx_select');
            this.scene.start("menu2Scene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            this.sound.play('sfx_select');
            this.scene.start("menu3Scene");
        }
    }   
}