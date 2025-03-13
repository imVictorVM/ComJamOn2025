import Player from "./Player.js";

export default class Player1 extends Player {
    constructor(scene, x, y, sprite = 'player') {
        super(scene, x, y, sprite); 
        scene.add.existing(this);
        this.setDisplaySize(150, 150); //tamaño
 

        this.leftMovKey = this.scene.input.keyboard.addKey('A'); //izquierda
        this.rightMovKey = this.scene.input.keyboard.addKey('D'); //derecha
        this.selectKey = this.scene.input.keyboard.addKey('S'); //seleccionar
        

    }
    
init(){
    Player.leftMovKey = this.leftMovKey;
    Player.rightMovKey = this.rightMovKey;
    Player.selectKey = this.selectKey;
}

}