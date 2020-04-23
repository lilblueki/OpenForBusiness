//Implemented both S-Rank Tier Modifications:
//Implement a simultaneous two-player mode (50)
//Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (50)


//console.log("hello");
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Menu2, Menu3, Play, Play2],
}

let game = new Phaser.Game(config);

//define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000
}

//reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT, keyUP, keyA, keyW, keyD;