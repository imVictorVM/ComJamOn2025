import Player1 from "../Classes/Player1.js";
import Player2 from "../Classes/Player2.js";
import card from "../Classes/CardClass.js"
import Ninfa from "../Classes/Ninfa.js"
import Stats from "../Classes/Stats.js"
import AffectionSystem from "../Classes/AffectionSystem.js";
import Timer from "../Classes/Timer.js";
import ReadDialog from "../Classes/ReadDialog.js";
import DialogSystem from "../Classes/DialogSystem.js";

export default class GameScene extends Phaser.Scene {
constructor(){
    super({key: "GameScene"})
    this.whichRama;
    //Array the sprites
    this.spriteArray;
    this.initialTimer;
    this.startGame;
    this.round = 1;
    this.fase = 1;
    this.playerHasAnsweredGood = 0;
    this.delayTime = 1;
    this.wait = false;
    this.affectionSystem = new AffectionSystem();
    this.isPoliamor = false;
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

    //Tomamos las medidas de la pantalla para la camara
    const { width, height } = this.cameras.main;

    console.log("round" + this.round);
    console.log("fase" + this.fase);
    
    
    //Startgame
    
    this.timerPlayer1 = new Timer(this,600,100,-1);
    this.timerPlayer2 = new Timer(this,1200,100,1);
    this.startGame = false; //booleano para empezar el juego
    this.countdown = 3 * 1000; //5 segundos
    this.countdownText = this.add.text(
        this.sys.game.canvas.width / 2,
        this.sys.game.canvas.height / 2,
        '3', { 
        fontSize: '80px', 
        color: 'white',      
    });

    // Capa de fondo dialog
    this.dialogBackground = this.add.graphics();
    this.dialogBackground.fillStyle(0xffffff, 0.4); // Blanco, 50% de transparencia
    this.dialogBackground.fillRect(0, 0, width, height);
    this.dialogBackground.setVisible(false); // Oculto al inicio

    this.reader = new ReadDialog(this);  // Instanciar ReadDialog

            // Cargar el archivo JSON con los diálogos
            this.reader.loadJSON('src/Scripts/Classes/Texto.json').then(() => {
            });

            // Inicializar el sistema de diálogos

            this.dialogueSystem = new DialogSystem(this, this.inventory,this.reader.dialogData.Eventos);

            
    

    //TIMER
    this.initialTimer = this.time.addEvent({ 
        delay: 3 * 1000, //1000 por milisegundos
        callback: () => {this.startGame = true} });

    //JUGADORES
            this.Player1 = new Player1(this, 100, 100, 'player1');
            this.Player2 = new Player2(this, 100, 100, 'player2');

    //selections
    this.selectionPlayer1 = 0;
    this.selectionPlayer2 = 5;
    
    //Creación de las estadísticas de la Ninfa en función de la rama seleccionada por el jugador
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

    //Creación de la Ninfa con sus estadísticas
    this.ninfa  = new Ninfa(this, this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, this.spriteArray,this.whichRama, this.NinfaStats); //Creamos la ninfa

    if(this.fase ==1){

         //Crear cartas
        this.createCards();   

    }

    if(this.fase == 2){



    }
      
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
            if(this.ninfa.NinfaStats.statsArray[i]==1) {
                this.playerHasAnsweredGood++;
            }
        }
    }
}


changeScene(){
    
    //Escondemos las barras de tiempo
    this.timerPlayer1.HideTimer()
    this.timerPlayer2.HideTimer()

    //Escondemos el timer 
    this.countdownText.setVisible(false);
    
    //Escondemos las referencias de ambos players (no me duele, me quema, me lastima)

    //Player 1
    this.selectedcard1Player1.setVisible(false);
    this.selectedcard2Player1.setVisible(false);
    this.selectedcard3Player1.setVisible(false);
    this.selectedcard4Player1.setVisible(false);
    this.selectedcard5Player1.setVisible(false);
    this.selectedcard6Player1.setVisible(false);
    //Player 2
    this.selectedcard1Player2.setVisible(false);
    this.selectedcard2Player2.setVisible(false);
    this.selectedcard3Player2.setVisible(false);
    this.selectedcard4Player2.setVisible(false);
    this.selectedcard5Player2.setVisible(false);
    this.selectedcard6Player2.setVisible(false);

//Prueba
   this.affectionSystem.Player1 = 4;
   this.affectionSystem.Player2 = 4;
    if(this.fase == 1){ //Ninguno cumple los requisitos para pasar de ronda
        //Seteo de la explosión en la posición de la rama
        console.log("RamaKaboom");
    }
    //Si pasan de fase
    else{
        if(this.affectionSystem.GetPlayer1() < 3 && this.affectionSystem.GetPlayer2() < 3){ //Cumplen los requisitos para pasar de 1 ronda pero no para la segunda
            //Seteo 2 imagenes de la explosion uno en cada lado representando a los players
            console.log("NosotrosKaboom");
        }
        else if(this.affectionSystem.GetPlayer1() > this.affectionSystem.GetPlayer2()){ //Gana el player 1 pero no el player 2
            //Seteo 1 imagen de explosion en la posición del player 2
            console.log("Win jaja player 2 kaboom");
        }
        else if(this.affectionSystem.GetPlayer1() < this.affectionSystem.GetPlayer2()){ //Gana el player 2 pero no el player 1
            //Seteo 1 imagen de explosion en la posición del player 1
            console.log("Win jaja player 1 kaboom");
        }
        //Si empatan
        else{
            this.Player1.selectCard = false;
            this.Player2.selectCard = false;
            this.add.image(600, 950,'acepto');
            this.add.image(1200, 950,'rechazo');
            this.selectedPlayer1 = this.add.text(
                600,
                1000,
                '----', { 
                fontSize: '40px', 
                color: 'blue',      
            }).setVisible(true);
            this.selectedPlayer2 = this.add.text(
                1200,
                1025,
                '----', { 
                fontSize: '40px', 
                color: 'red',      
            }).setVisible(true);
            this.isPoliamor = true;
            this.player1accepts = false;
            this.player2accepts = false;
        }
    }
    //delay raro de spm
    
    //Llamar a la escena fianl
  }

  update(t,dt){
        super.update(t,dt);
        if(this.isPoliamor){
            //Comprobación de que ambos hayan elegido una opción
            if(this.Player1.selectCard && this.Player2.selectCard){
                if(this.player1accepts && this.player2accepts){ //Si ambos aceptan
                    //Lamentablemente no hay explosiones
                    console.log("2 pa 1 cada cual que interprete lo que quiera");
                }
                else { //Si alguno rechaza
                    //Explosión nuclear superMegaHiperRealistaQueSeCargaHastaTusGanasDeVivir
                    console.log("ExplosiónNuclearSuperMegaHiperRealistaQueSeCargaHastaTusGanasDeVivir");
                }
            }
            //Input Player 1
            if(this.Player1.moveleft()){
                if( this.selectedPlayer1.x != 600){
                    this.selectedPlayer1.x = 600;
                }
            }
            else if(this.Player1.moveright()){
                if(this.selectedPlayer1.x != 1200){
                    this.selectedPlayer1.x = 1200;
                }
            }
            else if(this.Player1.select()){
                if(this.selectedPlayer1.x == 600){
                    this.player1accepts = true;
                }
                else this.player1accepts = false;
                this.Player1.selectCard = true;
            }

            //Input Player 2
            if(this.Player2.moveleft()){
                if( this.selectedPlayer2.x != 600){
                    this.selectedPlayer2.x = 600;
                }
            }
            else if(this.Player2.moveright()){
                if( this.selectedPlayer2.x != 1200){
                    this.selectedPlayer2.x = 1200;
                }
            }
            else if(this.Player2.select()){
                if( this.selectedPlayer2.x  == 600){
                    this.player2accepts= true;
                }
                else this.player2accepts = false;
                this.Player2.selectCard = true;
            }
        }
        else{
            if(this.startGame == true) {
                this.countdownText.setVisible(false);
                this.timerPlayer1.decreaseValue(this.delayTime);
                this.timerPlayer2.decreaseValue(this.delayTime);
                //PLAYER 1
                if( this.Player1.moveleft()){
                    if(this.selectionPlayer1 != 0){
                        this.selectionPlayer1 -=1;
                        this.changeSelectionPlayer1(this.selectionPlayer1);
                    }
                }
    
                if(this.Player1.moveright()){
                    if(this.selectionPlayer1 != 5){
                        this.selectionPlayer1 += 1;
                        this.changeSelectionPlayer1(this.selectionPlayer1);
                    }
                }
    
                if(this.Player1.select() && this.cardArray[this.selectionPlayer1].selected == false){
                  
                    //Elimina el Input del player 1
                    this.Player1.selectCard = true;
                    //TIMER
                    this.timerPlayer1.HideTimer(); //Pone a false la visibilidad del timer
                    this.delayTime = 2; //Aumenta la velocidad del otro timer
                    //elegir carta
                    this.checkPlayerElection(1,this.selectionPlayer1);
                    this.cardArray[this.selectionPlayer1].selected = true;
                    
                    
                    
                }
    
                //PLAYER 2
                if( this.Player2.moveleft()){
                  
                    if(this.selectionPlayer2 != 0){
                        this.selectionPlayer2 -=1;
                        this.changeSelectionPlayer2(this.selectionPlayer2);
                    }
                }
    
                if(this.Player2.moveright()){
                    
                    if(this.selectionPlayer2 != 5){
                        this.selectionPlayer2 += 1;
                        this.changeSelectionPlayer2(this.selectionPlayer2);
                    }
                }
    
                if(this.Player2.select() && this.cardArray[this.selectionPlayer2].selected == false){
                  
                    //Elimina el Input del player 1
                    this.Player2.selectCard = true;
                    //TIMER
                    this.timerPlayer2.HideTimer(); //Pone a false la visibilidad del timer
                    this.delayTime = 4; //Aumenta la velocidad del otro timer
    
                    //elegir carta
                    this.checkPlayerElection(2,this.selectionPlayer2);
                    this.cardArray[this.selectionPlayer2].selected = true;
                }
            }
            else{
                this.countdown -= dt;
                this.countdownText.setText(Math.floor(this.countdown / 1000) + 1);
            }
    
            if(this.timerPlayer1.value <=0 && this.timerPlayer2.value <=0 && !this.wait){
    
                this.End();
    
            }      
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
    End(){
        //Comprobamos que haya llegado a la última ronda y sacamos el final en cuestión
        if(this.round >= 3){
            this.changeScene();
        }
        else{
            this.wait = true;
            this.delayTime = 1;

            if(this.playerHasAnsweredGood>=1){
            //cambiar sprite a sonrojo y lo que coño más sea
            }
            else{
            //cambiar sprite a punto (1, 2 y 3)
            }

            console.log(this.affectionSystem.GetPlayer1());

            setTimeout(() => {

                if(this.affectionSystem.GetPlayer1() >=2 || this.affectionSystem.GetPlayer2() >=2){
                    this.fase = 2;
                }

                this.round++; // Aumentamos la ronda
                this.playerHasAnsweredGood = 0; // Reiniciamos contador
                this.scene.restart(); // Reiniciamos la escena
                console.log("reinicio");
                this.wait = false; 

            },  2000); // 2000 milisegundos = 2 segundos de retraso
        }

    }
}