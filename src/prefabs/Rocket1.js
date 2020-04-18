//Rocket (Player 1/ Multiplayer) prefab
class Rocket1 extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        
        scene.add.existing(this); //add objects to the existing scene, display list, and update list
        this.isFiring = false; //tracks rockets firing stats
        
        //add rocket sound
        this.sfxRocket = scene.sound.add('sfx_rocket');
   }

   update() {
       //left/right movement - Player1
        if (!this.isFiring) {
            if (keyLEFT.isDown && this.x >=-120){ 
                this.x -= 2; 
            } else if (keyRIGHT.isDown && this.x <= 425){
                this.x += 2;
            }
        }
        
        //fire button  ***make it so the in multiplayer you cant shoot using F***
        if (Phaser.Input.Keyboard.JustDown(keyUP) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
        }

        if (this.isFiring && this.y >= 108) {
            this.y -= 2;
        }

        //reset on miss
        if (this.y <= 108){
           this.reset();
        }
        
    }
    //rocket goes back to starting postion
    reset() {
        this.isFiring = false;
        this.y = 431
    }
}