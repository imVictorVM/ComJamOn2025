export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite = 'player') {
        super(scene, x, y, sprite); 
        this.setDisplaySize(150, 150); //tamaño
        this.selectCard = false;
    }
}