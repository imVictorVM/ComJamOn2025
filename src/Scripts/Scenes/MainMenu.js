import Player1 from "../Classes/Player1.js";
import Player2 from "../Classes/Player2.js";

export default class MainMenuScene extends Phaser.Scene {
    constructor(){
        super({key: "MainMenuScene"})

        this.whatSelection = 0;

    }
 

    preload() {

    }

    create(){

        this.whatSelection = 0;

        this.title =  this.add.text(
            this.sys.game.canvas.width / 5,
            this.sys.game.canvas.height / 5,
            'JuegoDeLigar_buildbuena(1)', { 
            fontSize: '20px', 
            color: 'blue',         
        });

        this.playButton = this.add.text(
            this.sys.game.canvas.width / 3,
            this.sys.game.canvas.height / 1.8,
            'Jugar', { 
            fontSize: '40px', 
            color: 'white',      
        });


        this.creditsButton = this.add.text(
            this.sys.game.canvas.width / 1.5,
            this.sys.game.canvas.height / 1.8,
            'Creditos', { 
            fontSize: '40px', 
            color: 'white',      
        });
        

        this.selectedStart = this.add.text(
            this.sys.game.canvas.width / 3,
            this.sys.game.canvas.height / 1.7,
            '-----', { 
            fontSize: '40px', 
            color: 'white',      
        });

        this.selectedCredits = this.add.text(
            this.sys.game.canvas.width / 1.5,
            this.sys.game.canvas.height / 1.7,
            '--------', { 
            fontSize: '40px', 
            color: 'white',      
        }).setVisible(false);

        this.Player1 = new Player1(this, 100, 100, 'player1');
        this.Player2 = new Player2(this, 100, 100, 'player2');       

    }



    update(t,dt){
        super.update(t,dt);
        if( this.Player1.moveleft()|| this.Player2.moveleft()){
            console.log("move left");
            if(this.whatSelection == 1){
                this.whatSelection = 0;
                this.changeSelection();
            }
        }

        if(this.Player1.moveright()|| this.Player2.moveright()){
            console.log("move right");
            if(this.whatSelection == 0){
                this.whatSelection = 1;
                this.changeSelection();
            }
        }

        if(this.Player1.select()|| this.Player2.select()){
            console.log("select");
            this.changeScene(this.whatSelection);
        }
    }


    changeScene(whatSelection){
        
        if(whatSelection == 0){
            //this.scene.start('TreeScene');
            console.log("Jugar")
        }
        else if(whatSelection == 1){
            //this.scene.start('CreditsScene');
            console.log("Creditos")
        }
    }

    changeSelection() {
        this.selectedStart.setVisible(!this.selectedStart.visible);
        this.selectedCredits.setVisible(!this.selectedCredits.visible);
    }
    }
