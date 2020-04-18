//Rocket (Player 2) prefab
class Rocket2 extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        
        scene.add.existing(this); //add objects to the existing scene, display list, and update list
        this.isFiring = false; //tracks rockets firing stats
        
        //add rocket sound
        this.sfxRocket = scene.sound.add('sfx_rocket');
   }

   update() {
       //left/right movement - Player 2
        if (!this.isFiring) {
            if (keyA.isDown && this.x >= 200){
                this.x -= 2;
            } else if (keyD.isDown && this.x <= 745){
                this.x += 2;
            }
        }
        
        //fire button 
        if (Phaser.Input.Keyboard.JustDown(keyW) && !this.isFiring) {
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