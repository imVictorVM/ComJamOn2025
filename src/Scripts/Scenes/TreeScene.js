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
        
        //ARBOL 1
        this.t1b1 = this.add.text(
            this.sys.game.canvas.width / 20,
            this.sys.game.canvas.height / 1.8,
            'T1B1', { 
            fontSize: '40px', 
            color: 'white',      
        });

        this.selectedt1b1 = this.add.text(
            this.sys.game.canvas.width / 20,
            this.sys.game.canvas.height / 1.7,
            '----', { 
            fontSize: '40px', 
            color: 'white',      
        });


        this.t1b2 = this.add.text(
            this.sys.game.canvas.width / 3.5,
            this.sys.game.canvas.height / 1.8,
            'T1B2', { 
            fontSize: '40px', 
            color: 'white',      
        });
        

        this.selectedt1b2 = this.add.text(
            this.sys.game.canvas.width / 3.5,
            this.sys.game.canvas.height / 1.7,
            '----', { 
            fontSize: '40px', 
            color: 'white',      
        }).setVisible(false);


        //ARBOL 2
        this.t2b1 = this.add.text(
            this.sys.game.canvas.width / 2.3,
            this.sys.game.canvas.height / 1.8,
            'T2B1', { 
            fontSize: '40px', 
            color: 'white',      
        });

        this.selectedt2b1 = this.add.text(
            this.sys.game.canvas.width / 2.3,
            this.sys.game.canvas.height / 1.7,
            '----', { 
            fontSize: '40px', 
            color: 'white',      
        }).setVisible(false);


        this.t2b2 = this.add.text(
            this.sys.game.canvas.width / 1.8,
            this.sys.game.canvas.height / 1.8,
            'T2B2', { 
            fontSize: '40px', 
            color: 'white',      
        });
        

        this.selectedt2b2 = this.add.text(
            this.sys.game.canvas.width / 1.8,
            this.sys.game.canvas.height / 1.7,
            '----', { 
            fontSize: '40px', 
            color: 'white',      
        }).setVisible(false);

        //ARBOL 3
        this.t3b1 = this.add.text(
            this.sys.game.canvas.width / 1.5,
            this.sys.game.canvas.height / 1.8,
            'T3B1', { 
            fontSize: '40px', 
            color: 'white',      
        });

        this.selectedt3b1 = this.add.text(
            this.sys.game.canvas.width / 1.5,
            this.sys.game.canvas.height / 1.7,
            '----', { 
            fontSize: '40px', 
            color: 'white',      
        }).setVisible(false);


        this.t3b2 = this.add.text(
            this.sys.game.canvas.width / 1.3,
            this.sys.game.canvas.height / 1.8,
            'T3B2', { 
            fontSize: '40px', 
            color: 'white',      
        });
        

        this.selectedt3b2 = this.add.text(
            this.sys.game.canvas.width / 1.3,
            this.sys.game.canvas.height / 1.7,
            '----', { 
            fontSize: '40px', 
            color: 'white',      
        }).setVisible(false);

        //JUGADORES
        this.Player1 = new Player1(this, 100, 100, 'player1');
        this.Player2 = new Player2(this, 100, 100, 'player2');       


    }

    update(t,dt){
        super.update(t,dt);
        if( this.Player1.moveleft()|| this.Player2.moveleft()){
            if(this.whatSelection != 0){
                this.whatSelection -=1;
                this.changeSelection(this.whatSelection);
            }
        }

        if(this.Player1.moveright()|| this.Player2.moveright()){
            if(this.whatSelection != 5){
                this.whatSelection += 1;
                this.changeSelection(this.whatSelection);
            }
        }

        if(this.Player1.select()|| this.Player2.select()){
            this.changeScene(this.whatSelection);
        }
    }

    changeSelection(whatSelection) {
        switch (whatSelection) {
            case 0:
                this.selectedt1b1.setVisible(true);
                this.selectedt1b2.setVisible(false);
                this.selectedt2b1.setVisible(false);
                this.selectedt2b2.setVisible(false);
                this.selectedt3b1.setVisible(false);
                this.selectedt3b2.setVisible(false);
                break;
            case 1:
                this.selectedt1b1.setVisible(false);
                this.selectedt1b2.setVisible(true);
                this.selectedt2b1.setVisible(false);
                this.selectedt2b2.setVisible(false);
                this.selectedt3b1.setVisible(false);
                this.selectedt3b2.setVisible(false);
                break;
            case 2:
                this.selectedt1b1.setVisible(false);
                this.selectedt1b2.setVisible(false);
                this.selectedt2b1.setVisible(true);
                this.selectedt2b2.setVisible(false);
                this.selectedt3b1.setVisible(false);
                this.selectedt3b2.setVisible(false);
                break;
            case 3:
                this.selectedt1b1.setVisible(false);
                this.selectedt1b2.setVisible(false);
                this.selectedt2b1.setVisible(false);
                this.selectedt2b2.setVisible(true);
                this.selectedt3b1.setVisible(false);
                this.selectedt3b2.setVisible(false);
                break;
            case 4:
                this.selectedt1b1.setVisible(false);
                this.selectedt1b2.setVisible(false);
                this.selectedt2b1.setVisible(false);
                this.selectedt2b2.setVisible(false);
                this.selectedt3b1.setVisible(true);
                this.selectedt3b2.setVisible(false);
                break;
            case 5:
                this.selectedt1b1.setVisible(false);
                this.selectedt1b2.setVisible(false);
                this.selectedt2b1.setVisible(false);
                this.selectedt2b2.setVisible(false);
                this.selectedt3b1.setVisible(false);
                this.selectedt3b2.setVisible(true);
                break;
        }
    }

    changeScene(whatSelection){
        this.scene.start('GameScene',{selection:whatSelection});
    }
}   