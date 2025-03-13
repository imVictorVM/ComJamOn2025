import Player from "./Player.js";

export default class Player2 extends Player {
    constructor(scene, x, y, sprite = 'player') {
        super(scene, x, y, sprite); 
        scene.add.existing(this);
        this.setDisplaySize(150, 150); //tamaño
 

        this.leftMovKey = this.scene.input.keyboard.addKey('J'); //izquierda
        this.rightMovKey = this.scene.input.keyboard.addKey('L'); //derecha
        this.selectKey = this.scene.input.keyboard.addKey('K'); //seleccionar
        

    }
    
init(){
}

moveleft(){
    return Phaser.Input.Keyboard.JustDown(this.leftMovKey);
}

moveright(){
    return Phaser.Input.Keyboard.JustDown(this.rightMovKey);
}

select(){
   return Phaser.Input.Keyboard.JustDown(this.selectKey);
}

}