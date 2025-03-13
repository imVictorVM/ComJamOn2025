export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite = 'player') {
        super(scene, x, y, sprite); 
        scene.add.existing(this);
        this.setDisplaySize(150, 150); //tamaño
      
    }
}