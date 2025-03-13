import Player1 from "../Classes/Player1.js";
import Player2 from "../Classes/Player2.js";

export default class MainMenuScene extends Phaser.Scene {
    constructor(){
        super({key: "MainMenuScene"})
    }
 

    preload() {

    }

    create(){

        var Title =  this.add.text(
            this.sys.game.canvas.width / 5,
            this.sys.game.canvas.height / 5,
            'JuegoDeLigar_buildbuena(1)', { 
            fontSize: '20px', 
            color: 'blue',         
        });

        var PlayButton = this.add.text(
            this.sys.game.canvas.width / 3,
            this.sys.game.canvas.height / 1.8,
            'Start', { 
            fontSize: '40px', 
            color: 'white',      
        }).setInteractive().on('pointerdown', ()=>this.changeScene());
        

        this.Player1 = new Player1(this, 100, 100, 'player1');
        this.Player2 = new Player2(this, 100, 100, 'player2');       

    }



    update(t,dt){
        super.update(t,dt);
        if(this.Player1.selectKey.isDown || this.Player2.selectKey.isDown){
            console.log("selected");
        }

        if(this.Player2.leftMovKey.isDown){
            console.log("Player2 left");
        }
    }


    changeScene(){
        this.scene.start('PruebaDialog');
    }
}