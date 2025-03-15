import Player1 from "../Classes/Player1.js";
import Player2 from "../Classes/Player2.js";
import card from "../Classes/CardClass.js"
import Ninfa from "../Classes/Ninfa.js"
import Stats from "../Classes/Stats.js"
import AffectionSystem from "../Classes/AffectionSystem.js";

export default class GameScene extends Phaser.Scene {
constructor(){
    super({key: "GameScene"})
    this.whichRama;
    //Array the sprites
    this.spriteArray;
    this.timer;
    this.startGame;
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
    //Startgame
    this.affectionSystem = new AffectionSystem();
    this.startGame = false; //booleano para empezar el juego
    this.countdown = 5 * 1000; //5 segundos
    this.countdownText = this.add.text(
        this.sys.game.canvas.width / 2,
        this.sys.game.canvas.height / 2,
        '5', { 
        fontSize: '80px', 
        color: 'white',      
    });
    
    //TIMER
    this.timer = this.time.addEvent({ 
        delay: 5 * 1000, //1000 por milisegundos
        callback: () => {this.startGame = true} });

    //JUGADORES
            this.Player1 = new Player1(this, 100, 100, 'player1');
            this.Player2 = new Player2(this, 100, 100, 'player2');

    //selections
    this.selectionPlayer1 = 0;
    this.selectionPlayer2 = 5;
    
    //Creación de la respectiva Ninfa en función de la rama seleccionada por el jugador
    console.log(this.whichRama);
    switch(this.whichRama){

        case(0):
            this.NinfaStats = new Stats(-1,0,1,-1,0,1);
            this.spriteArray = ['rama','ramaSonrojada','rama1.','rama2.','rama3.','NinfaCerezo1','NinfaCerezo1Feliz','NinfaCerezo1Triste','NinfaCerezo1Enfadado']; //Seteamos su array de sprites
        break;

        case(1):
            this.NinfaStats = new Stats(1,0,-1,0,1,-1);
            this.spriteArray = ['rama','ramaSonrojada','rama1.','rama2.','rama3.','NinfaCerezo2','NinfaCerezo2Feliz','NinfaCerezo2Triste','NinfaCerezo2Enfadado']; //Seteamos su array de sprites
        break;
        
        case(2):
            this.NinfaStats = new Stats(0,-1,-1,1,0,1);
            this.spriteArray = ['rama','ramaSonrojada','rama1.','rama2.','rama3.','NinfaSauce1','NinfaSauce1Feliz','NinfaSauce1Triste','NinfaSauce1Enfadado']; //Seteamos su array de sprites
        break;

        case(3):
            this.NinfaStats = new Stats(1,-1,0,1,-1,0);
            this.spriteArray = ['rama','ramaSonrojada','rama1.','rama2.','rama3.','NinfaSauce2','NinfaSauce2Feliz','NinfaSauce2Triste','NinfaSauce2Enfadado']; //Seteamos su array de sprites
        break;

        case(4):
            this.NinfaStats = new Stats(0,1,1,0,-1,-1);
            this.spriteArray = ['rama','ramaSonrojada','rama1.','rama2.','rama3.','NinfaPalmera1','NinfaPalmera1Feliz','NinfaPalmera1Triste','NinfaPalmera1Enfadado']; //Seteamos su array de sprites

        case(5):
            this.NinfaStats = new Stats(-1,1,0,-1,1,0);
            this.spriteArray = ['rama','ramaSonrojada','rama1.','rama2.','rama3.','NinfaPalmera2','NinfaPalmera2Feliz','NinfaPalmera2Triste','NinfaPalmera2Enfadado']; //Seteamos su array de sprites
        break;

        

    }

    this.ninfa  = new Ninfa(this, this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, this.spriteArray,this.whichRama, this.NinfaStats); //Creamos la ninfa

    //Crear cartas
    this.createCards();


    

        
}

//metodo para ocultar mierda
createCards(){
    //Proximamente se puede pasar como parametro la pool de cartas(respuestas) dado una pregunta
    //Lo que habra que cambiar son las estadisticas que se pueden leer del json correspondiente
    //la posicion de las cartas es fija, asi como su tamaño.
    
    //crear array
    this.cardArray = [

        this.card1 = new card(this,this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2,'carta',0,1,0,0,0,0),
        this.card2 = new card(this,this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2,'carta',1,0,0,0,0,0),
        this.card3 = new card(this,this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2,'carta',0,0,1,0,0,0),
        this.card4 = new card(this,this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2,'carta',0,0,0,1,0,0),
        this.card5 = new card(this,this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2,'carta',0,0,0,0,1,0),
        this.card6 = new card(this,this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2,'carta',0,0,0,0,0,1)
    ];

    //Crear cartas
     //Chuleta de stats: [empatia, extroversion, estabilidadMental, creatividad, paciencia, inteligencia]
    this.card1.setSprite(this.sys.game.canvas.width / 8, this.sys.game.canvas.height / 2);

    this.selectedcard1Player1 = this.add.text(
        this.sys.game.canvas.width / 8,
        this.sys.game.canvas.height / 1.3,
        '----', { 
        fontSize: '40px', 
        color: 'white',      
    }).setVisible(true);
    

    this.selectedcard1Player2 = this.add.text(
        this.sys.game.canvas.width /8,
        this.sys.game.canvas.height / 4,
        '----', { 
        fontSize: '40px', 
        color: 'red',      
    }).setVisible(false);

   
    this.card2.setSprite(this.sys.game.canvas.width / 5, this.sys.game.canvas.height / 2);

    this.selectedcard2Player1 = this.add.text(
        this.sys.game.canvas.width / 5,
        this.sys.game.canvas.height / 1.3,
        '----', { 
        fontSize: '40px', 
        color: 'white',      
    }).setVisible(false);

    this.selectedcard2Player2 = this.add.text(
        this.sys.game.canvas.width / 5,
        this.sys.game.canvas.height / 4,
        '----', { 
        fontSize: '40px', 
        color: 'red',      
    }).setVisible(false);

    this.card3.setSprite(this.sys.game.canvas.width / 3, this.sys.game.canvas.height / 2);

    this.selectedcard3Player1 = this.add.text(
        this.sys.game.canvas.width / 3,
        this.sys.game.canvas.height / 1.3,
        '----', { 
        fontSize: '40px', 
        color: 'white',      
    }).setVisible(false);

    this.selectedcard3Player2 = this.add.text(
        this.sys.game.canvas.width / 3,
        this.sys.game.canvas.height / 4,
        '----', { 
        fontSize: '40px', 
        color: 'red',      
    }).setVisible(false);

    this.card4.setSprite(this.sys.game.canvas.width / 1.5, this.sys.game.canvas.height / 2);

    this.selectedcard4Player1 = this.add.text(
        this.sys.game.canvas.width / 1.5,
        this.sys.game.canvas.height / 1.3,
        '----', { 
        fontSize: '40px', 
        color: 'white',      
    }).setVisible(false);

    this.selectedcard4Player2 = this.add.text(
        this.sys.game.canvas.width / 1.5,
        this.sys.game.canvas.height / 4,
        '----', { 
        fontSize: '40px', 
        color: 'red',      
    }).setVisible(false);
    
    this.card5.setSprite(this.sys.game.canvas.width / 1.35, this.sys.game.canvas.height / 2);

    this.selectedcard5Player1 = this.add.text(
        this.sys.game.canvas.width / 1.35,
        this.sys.game.canvas.height / 1.3,
        '----', { 
        fontSize: '40px', 
        color: 'white',      
    }).setVisible(false);

    this.selectedcard5Player2 = this.add.text(
        this.sys.game.canvas.width / 1.35,
        this.sys.game.canvas.height / 4,
        '----', { 
        fontSize: '40px', 
        color: 'red',      
    }).setVisible(false);

    this.card6.setSprite(this.sys.game.canvas.width / 1.15, this.sys.game.canvas.height / 2);

    this.selectedcard6Player1 = this.add.text(
        this.sys.game.canvas.width / 1.15,
        this.sys.game.canvas.height / 1.3,
        '----', { 
        fontSize: '40px', 
        color: 'white',      
    }).setVisible(false);

    this.selectedcard6Player2 = this.add.text(
        this.sys.game.canvas.width / 1.15,
        this.sys.game.canvas.height / 4,
        '----', { 
        fontSize: '40px', 
        color: 'red',      
    }).setVisible(true);
}

//para comprobar la eleccion

checkPlayerElection(player, selection) {
    for (let i = 0; i < this.cardArray.length; i++) {
        if (this.cardArray[selection].stats.statsArray[i] === 1) {
            this.affectionSystem.AddAffection(this.ninfa.NinfaStats.statsArray[i], player);
        }
    }
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

        if(this.startGame == true) {
            this.countdownText.setVisible(false);
            
            //PLAYER 1
            if( this.Player1.moveleft()){
                console.log("move left");
                if(this.selectionPlayer1 != 0){
                    this.selectionPlayer1 -=1;
                    this.changeSelectionPlayer1(this.selectionPlayer1);
                }
            }

            if(this.Player1.moveright()){
                console.log("move right");
                if(this.selectionPlayer1 != 5){
                    this.selectionPlayer1 += 1;
                    this.changeSelectionPlayer1(this.selectionPlayer1);
                }
            }

            if(this.Player1.select() && this.cardArray[this.selectionPlayer1].selected == false){
                console.log("select");
                //this.changeScene(this.selectionPlayer1);
                //elegir carta
                this.checkPlayerElection(1,this.selectionPlayer1);
                this.cardArray[this.selectionPlayer1].selected = true;
                console.log("has been selected");
            }

            //PLAYER 2
            if( this.Player2.moveleft()){
                console.log("move left");
                if(this.selectionPlayer2 != 0){
                    this.selectionPlayer2 -=1;
                    this.changeSelectionPlayer2(this.selectionPlayer2);
                }
            }

            if(this.Player2.moveright()){
                console.log("move right");
                if(this.selectionPlayer2 != 5){
                    this.selectionPlayer2 += 1;
                    this.changeSelectionPlayer2(this.selectionPlayer2);
                }
            }

            if(this.Player2.select() && this.cardArray[this.selectionPlayer2].selected == false){
                console.log("select");
                //this.changeScene(this.selectionPlayer1);
                //elegir carta
                this.checkPlayerElection(2,this.selectionPlayer2);
                this.cardArray[this.selectionPlayer2].selected = true;
                console.log("has been selected 2");
            }
        }
        else{
            this.countdown -= dt;
            this.countdownText.setText(Math.floor(this.countdown / 1000) + 1);
        }
        
    }

    changeSelectionPlayer1(whatSelection) {
        switch (whatSelection) {
            case 0:
                this.selectedcard1Player1.setVisible(true);
                this.selectedcard2Player1.setVisible(false);
                this.selectedcard3Player1.setVisible(false);
                this.selectedcard4Player1.setVisible(false);
                this.selectedcard5Player1.setVisible(false);
                this.selectedcard6Player1.setVisible(false);
                break;
            case 1:
                console.log("entra");
                this.selectedcard1Player1.setVisible(false);
                this.selectedcard2Player1.setVisible(true);
                this.selectedcard3Player1.setVisible(false);
                this.selectedcard4Player1.setVisible(false);
                this.selectedcard5Player1.setVisible(false);
                this.selectedcard6Player1.setVisible(false);
                break;
            case 2:
                this.selectedcard1Player1.setVisible(false);
                this.selectedcard2Player1.setVisible(false);
                this.selectedcard3Player1.setVisible(true);
                this.selectedcard4Player1.setVisible(false);
                this.selectedcard5Player1.setVisible(false);
                this.selectedcard6Player1.setVisible(false);
                break;
            case 3:
                this.selectedcard1Player1.setVisible(false);
                this.selectedcard2Player1.setVisible(false);
                this.selectedcard3Player1.setVisible(false);
                this.selectedcard4Player1.setVisible(true);
                this.selectedcard5Player1.setVisible(false);
                this.selectedcard6Player1.setVisible(false);
                break;
            case 4:
                this.selectedcard1Player1.setVisible(false);
                this.selectedcard2Player1.setVisible(false);
                this.selectedcard3Player1.setVisible(false);
                this.selectedcard4Player1.setVisible(false);
                this.selectedcard5Player1.setVisible(true);
                this.selectedcard6Player1.setVisible(false);
                break;
            case 5:
                this.selectedcard1Player1.setVisible(false);
                this.selectedcard2Player1.setVisible(false);
                this.selectedcard3Player1.setVisible(false);
                this.selectedcard4Player1.setVisible(false);
                this.selectedcard5Player1.setVisible(false);
                this.selectedcard6Player1.setVisible(true);
                break;
        }
    }

    changeSelectionPlayer2(whatSelection) {
        switch (whatSelection) {
            case 0:
                this.selectedcard1Player2.setVisible(true);
                this.selectedcard2Player2.setVisible(false);
                this.selectedcard3Player2.setVisible(false);
                this.selectedcard4Player2.setVisible(false);
                this.selectedcard5Player2.setVisible(false);
                this.selectedcard6Player2.setVisible(false);
                break;
            case 1:
                this.selectedcard1Player2.setVisible(false);
                this.selectedcard2Player2.setVisible(true);
                this.selectedcard3Player2.setVisible(false);
                this.selectedcard4Player2.setVisible(false);
                this.selectedcard5Player2.setVisible(false);
                this.selectedcard6Player2.setVisible(false);
                break;
            case 2:
                this.selectedcard1Player2.setVisible(false);
                this.selectedcard2Player2.setVisible(false);
                this.selectedcard3Player2.setVisible(true);
                this.selectedcard4Player2.setVisible(false);
                this.selectedcard5Player2.setVisible(false);
                this.selectedcard6Player2.setVisible(false);
                break;
            case 3:
                this.selectedcard1Player2.setVisible(false);
                this.selectedcard2Player2.setVisible(false);
                this.selectedcard3Player2.setVisible(false);
                this.selectedcard4Player2.setVisible(true);
                this.selectedcard5Player2.setVisible(false);
                this.selectedcard6Player2.setVisible(false);
                break;
            case 4:
                this.selectedcard1Player2.setVisible(false);
                this.selectedcard2Player2.setVisible(false);
                this.selectedcard3Player2.setVisible(false);
                this.selectedcard4Player2.setVisible(false);
                this.selectedcard5Player2.setVisible(true);
                this.selectedcard6Player2.setVisible(false);
                break;
            case 5:
                this.selectedcard1Player2.setVisible(false);
                this.selectedcard2Player2.setVisible(false);
                this.selectedcard3Player2.setVisible(false);
                this.selectedcard4Player2.setVisible(false);
                this.selectedcard5Player2.setVisible(false);
                this.selectedcard6Player2.setVisible(true);
                break;
        }
    }
}