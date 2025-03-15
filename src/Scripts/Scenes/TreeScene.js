import Player1 from "../Classes/Player1.js";
import Player2 from "../Classes/Player2.js";

export default class TreeScene extends Phaser.Scene {
    constructor(){
        super({key: "TreeScene"})

        this.whatSelection = 0;

    }

preload(){

}

    create(){

        const fx=this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.whatSelection = 0;

        //FONDO 

        this.fondo=this.add.image(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 2,
            '0'
       )


        //JUGADORES
        this.Player1 = new Player1(this, 100, 100, 'player1');
        this.Player2 = new Player2(this, 100, 100, 'player2');       


    }

    update(t,dt){
        super.update(t,dt);
        if( this.Player1.moveleft()|| this.Player2.moveleft()){
            if(this.whatSelection != 0){
                this.whatSelection -=1;
              
                console.log(this.whatSelection)
                this.fondo=this.add.image(
                    this.sys.game.canvas.width / 2,
                    this.sys.game.canvas.height / 2,
                    this.whatSelection
               )
            }
        }

        if(this.Player1.moveright()|| this.Player2.moveright()){
            if(this.whatSelection != 5){
                this.whatSelection += 1;
            
                this.fondo=this.add.image(
                    this.sys.game.canvas.width / 2,
                    this.sys.game.canvas.height / 2,
                    this.whatSelection
               )
            }
        }

        if(this.Player1.select()|| this.Player2.select()){


            this.changeScene(this.whatSelection);

        }
    }

    changeScene(whatSelection){
        this.scene.start('ProfileScene',{selection:whatSelection});
        
    }
}   