import Player1 from "../Classes/Player1.js";
import Player2 from "../Classes/Player2.js";
import card from "../Classes/CardClass.js"
import Ninfa from "../Classes/Ninfa.js"
import Stats from "../Classes/Stats.js"
export default class GameScene extends Phaser.Scene {
constructor(){
    super({key: "GameScene"})
    this.whichRama;
    //Array the sprites
    this.spriteArray;
}

init(ramaSelected){
    this.whichRama = ramaSelected.selection;
}

preload(){

    //Precarga del fondo 

    //Precarga de las imágenes de las ramas

    //Precarga de las imágenes de las distintas ninfas

    //Precarga de las imágenes de las cartas

}

create(){
    //JUGADORES
            this.Player1 = new Player1(this, 100, 100, 'player1');
            this.Player2 = new Player2(this, 100, 100, 'player2');

    //selections
    this.selectionPlayer1 = 0;
    this.selectionPlayer2 = 2;
    
    //Creación de la respectiva Ninfa en función de la rama seleccionada por el jugador
    console.log(this.whichRama);
    switch(this.whichRama){

        case(0):
            this.NinfaStats = new Stats(1,2,3,1,2,3);
            this.spriteArray = ['rama','ramaSonrojada','rama1.','rama2.','rama3.','NinfaCerezo1','NinfaCerezo1Feliz','NinfaCerezo1Triste','NinfaCerezo1Enfadado']; //Seteamos su array de sprites
            this.ninfa = new Ninfa(this, this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, this.spriteArray,this.whichRama,this.NinfaStats); //Creamos la ninfa
        break;

        case(1):
            this.NinfaStats = new Stats(3,2,1,2,3,1);
            this.spriteArray = ['rama','ramaSonrojada','rama1.','rama2.','rama3.','NinfaCerezo2','NinfaCerezo2Feliz','NinfaCerezo2Triste','NinfaCerezo2Enfadado']; //Seteamos su array de sprites
            this.ninfa  = new Ninfa(this, this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, this.spriteArray,this.whichRama, this.NinfaStats); //Creamos la ninfa
        break;
        
        case(2):
            this.NinfaStats = new Stats(2,1,1,3,2,3);
            this.spriteArray = ['rama','ramaSonrojada','rama1.','rama2.','rama3.','NinfaSauceLloron1','NinfaSauceLloron1Feliz','NinfaSauceLloron1Triste','NinfaSauceLloron1Enfadado']; //Seteamos su array de sprites
            this.ninfa  = new Ninfa(this, this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, this.spriteArray,this.whichRama, this.NinfaStats); //Creamos la ninfa
        break;

        case(3):
            this.NinfaStats = new Stats(3,1,2,3,1,2);
            this.spriteArray = ['rama','ramaSonrojada','rama1.','rama2.','rama3.','NinfaSauceLloron2','NinfaSauceLloron2Feliz','NinfaSauceLloron2Triste','NinfaSauceLloron2Enfadado']; //Seteamos su array de sprites
            this.ninfa  = new Ninfa(this, this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, this.spriteArray,this.whichRama, this.NinfaStats); //Creamos la ninfa
        break;

        case(4):
            this.NinfaStats = new Stats(2,3,3,2,1,1);
            this.spriteArray = ['rama','ramaSonrojada','rama1.','rama2.','rama3.','NinfaPalmera1','NinfaPalmera1Feliz','NinfaPalmera1Triste','NinfaPalmera1Enfadado']; //Seteamos su array de sprites
            this.ninfa  = new Ninfa(this, this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, this.spriteArray,this.whichRama, this.NinfaStats); //Creamos la ninfa
        break;

        case(5):
            this.NinfaStats = new Stats(1,3,2,1,3,2);
            this.spriteArray = ['rama','ramaSonrojada','rama1.','rama2.','rama3.','NinfaPalmera2','NinfaPalmera2Feliz','NinfaPalmera2Triste','NinfaPalmera2Enfadado']; //Seteamos su array de sprites
            this.ninfa  = new Ninfa(this, this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, this.spriteArray,this.whichRama, this.NinfaStats); //Creamos la ninfa
        break;

    }



    //Crear cartas
    this.card1 = new card(this,this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2,'carta',0,1,0,0,0,0); //Chuleta de stats: [empatia, extroversion, estabilidadMental, creatividad, paciencia, inteligencia]
    this.card1.setSprite(this.sys.game.canvas.width / 8, this.sys.game.canvas.height / 2);

    this.selectedcard1 = this.add.text(
        this.sys.game.canvas.width / 20,
        this.sys.game.canvas.height / 1.5,
        '----', { 
        fontSize: '40px', 
        color: 'white',      
    }).setVisible(true);
    

    this.selectedcard2 = this.add.text(
        this.sys.game.canvas.width / 20,
        this.sys.game.canvas.height / 4,
        '----', { 
        fontSize: '40px', 
        color: 'red',      
    }).setVisible(false);

    this.card = new card(this,this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2,'carta',1,0,0,0,0,0); //Chuleta de stats: [empatia, extroversion, estabilidadMental, creatividad, paciencia, inteligencia]
    this.card.setSprite(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2);

    this.selectedcard3 = this.add.text(
        this.sys.game.canvas.width / 2,
        this.sys.game.canvas.height / 1.5,
        '----', { 
        fontSize: '40px', 
        color: 'white',      
    }).setVisible(false);

    this.selectedcard4 = this.add.text(
        this.sys.game.canvas.width / 2,
        this.sys.game.canvas.height / 4,
        '----', { 
        fontSize: '40px', 
        color: 'red',      
    }).setVisible(false);

    this.card2 = new card(this,this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2,'carta',1,0,0,0,0,0); //Chuleta de stats: [empatia, extroversion, estabilidadMental, creatividad, paciencia, inteligencia]
    this.card2.setSprite(this.sys.game.canvas.width / 1.5, this.sys.game.canvas.height / 2);

    this.selectedcard5 = this.add.text(
        this.sys.game.canvas.width / 1.5,
        this.sys.game.canvas.height / 1.5,
        '----', { 
        fontSize: '40px', 
        color: 'white',      
    }).setVisible(false);

    this.selectedcard6 = this.add.text(
        this.sys.game.canvas.width / 1.5,
        this.sys.game.canvas.height / 4,
        '----', { 
        fontSize: '40px', 
        color: 'red',      
    }).setVisible(true);

    /* Pruebas */
    console.log( this.ninfa );
    
    console.log(this.card);
    this.ninfa.ReadCardStats(this.card.stats)
        
}
changeScene(final){
    switch (final) {
        case 0: //Ninguno cumple los requisitos para pasar de ronda
            console.log("RamaKaboom");
        break;

        case 1: //Cumplen los requisitos para pasar de 1 ronda pero no para la segunda
            console.log("NosotrosKaboom");
        break;

        case 2: //Gana el player 1 pero no el player 2
            console.log("Win jaja player 2 kaboom");
        break;

        case 3: //Gana el player 2 pero no el player 1
            console.log("Win jaja player 1 kaboom");
        break;

        case 4: //Ganan ambos y se acepta poliamor
            console.log("2 pa 1 cada cual que interprete lo que quiera");
        break;

        case 5: //Ganan ambos pero uno rechaza el poliamor
            console.log("Todo hace kaboom");
        break;
    }
  }

  update(t,dt){
        super.update(t,dt);
        if( this.Player1.moveleft()){
            console.log("move left");
            if(this.selectionPlayer1 != 0){
                this.selectionPlayer1 -=1;
                this.changeSelection(this.selectionPlayer1);
            }
        }

        if(this.Player1.moveright()){
            console.log("move right");
            if(this.selectionPlayer1 != 2){
                this.selectionPlayer1 += 1;
                this.changeSelection(this.selectionPlayer1);
            }
        }

        if(this.Player1.select()){
            console.log("select");
            //this.changeScene(this.selectionPlayer1);
            //elegir carta
        }
    }

    changeSelection(whatSelection) {
        switch (whatSelection) {
            case 0:
                this.selectedcard1.setVisible(true);
                //this.selectedcard2.setVisible(true);
                this.selectedcard3.setVisible(false);
                //this.selectedcard4.setVisible(false);
                this.selectedcard5.setVisible(false);
                //this.selectedcard6.setVisible(false);
                break;
            case 1:
                this.selectedcard1.setVisible(false);
                //this.selectedcard2.setVisible(false);
                this.selectedcard3.setVisible(true);
                //this.selectedcard4.setVisible(true);
                this.selectedcard5.setVisible(false);
                //this.selectedcard6.setVisible(false);
                break;
            case 2:
                this.selectedcard1.setVisible(false);
                //this.selectedcard2.setVisible(false);
                this.selectedcard3.setVisible(false);
                //this.selectedcard4.setVisible(false);
                this.selectedcard5.setVisible(true);
                //this.selectedcard6.setVisible(true);
                break;
            
            /*    case 3:
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
                */
        }
    }
}