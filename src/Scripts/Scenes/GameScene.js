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
    this.contadorFase2 = 1;
    this.ninfaName;
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

    //CREAMOS JSON
    this.cardJson = this.cache.json.get('cardJson');

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
            this.NinfaStats = new Stats(0,1,-1,0,1,-1);
            this.ninfaName = "Avery";
            this.spriteArray = ['rama','ramaSonrojada','rama1.','rama2.','rama3.','NinfaCerezo1','NinfaCerezo1Feliz','NinfaCerezo1Triste','NinfaCerezo1Enfadado']; //Seteamos su array de sprites
        break;

        case(1):
            this.NinfaStats = new Stats(0,-1,0,1,-1,1);
            this.ninfaName = "Cerine";
            this.spriteArray = ['rama','ramaSonrojada','rama1.','rama2.','rama3.','NinfaCerezo2','NinfaCerezo2Feliz','NinfaCerezo2Triste','NinfaCerezo2Enfadado']; //Seteamos su array de sprites
        break;
        
        case(2):
            this.NinfaStats = new Stats(-1,-1,1,0,1,0);
            this.spriteArray = ['rama','ramaSonrojada','rama1.','rama2.','rama3.','NinfaSauce1','NinfaSauce1Feliz','NinfaSauce1Triste','NinfaSauce1Enfadado']; //Seteamos su array de sprites
        break;

        case(3):
            this.NinfaStats = new Stats(-1,0,1,-1,0,1);
            this.spriteArray = ['rama','ramaSonrojada','rama1.','rama2.','rama3.','NinfaSauce2','NinfaSauce2Feliz','NinfaSauce2Triste','NinfaSauce2Enfadado']; //Seteamos su array de sprites
        break;

        case(4):
            this.NinfaStats = new Stats(1,1,0,-1,-1,0);
            this.spriteArray = ['rama','ramaSonrojada','rama1.','rama2.','rama3.','NinfaPalmera1','NinfaPalmera1Feliz','NinfaPalmera1Triste','NinfaPalmera1Enfadado']; //Seteamos su array de sprites

        case(5):
            this.NinfaStats = new Stats(1,0,-1,1,0,-1);
            this.spriteArray = ['rama','ramaSonrojada','rama1.','rama2.','rama3.','NinfaPalmera2','NinfaPalmera2Feliz','NinfaPalmera2Triste','NinfaPalmera2Enfadado']; //Seteamos su array de sprites
        break;

        

    }

    //Creación de la Ninfa con sus estadísticas
    this.ninfa  = new Ninfa(this, this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, this.spriteArray,this.whichRama, this.NinfaStats); //Creamos la ninfa

    if(this.fase ==1){
        this.selectCardQuestion();
         //Crear cartas
        this.createCards();   
    }

    if(this.fase == 2){
        //Crear las respuestas
        this.createAnswers();
    }
      
   
}

selectCardQuestion()
{
    console.log("entra al switch")
    console.log(this.round)
    switch(this.round){
        case 1:
           this.cardQuestion= this.cardJson.Pregunta1;
           console.log(this.cardQuestion)
            break;
        case 2:
            this.cardQuestion= this.cardJson.Pregunta2;
            break;
        case 3:
            this.cardQuestion= this.cardJson.Pregunta3;
            break;
        case 4:
            this.cardQuestion= this.cardJson.Pregunta4;
            break;
        case 5:
            this.cardQuestion= this.cardJson.Pregunta5;
            break;
        case 6:
            this.cardQuestion= this.cardJson.Pregunta6;
            break;
    }
}


//metodo para ocultar mierda
createCards(){
    //Proximamente se puede pasar como parametro la pool de cartas(respuestas) dado una pregunta
    //Lo que habra que cambiar son las estadisticas que se pueden leer del json correspondiente
    //la posicion de las cartas es fija, asi como su tamaño.
    console.log(this.cardQuestion.carta1.sprite);
    //crear array
    this.cardArray = [
        this.card1 = new card(this,this.sys.game.canvas.width / 10, this.sys.game.canvas.height / 2,this.cardQuestion.carta1.sprite, 700, 500,
            this.cardQuestion.carta1.stats.extroversion,
            this.cardQuestion.carta1.stats.confianza,
            this.cardQuestion.carta1.stats.creatividad,
            this.cardQuestion.carta1.stats.paciencia,
            this.cardQuestion.carta1.stats.empatia),
        
            this.card2 = new card(this,this.sys.game.canvas.width / 8, this.sys.game.canvas.height / 2,this.cardQuestion.carta2.sprite,700, 500,
            this.cardQuestion.carta2.stats.extroversion,
            this.cardQuestion.carta2.stats.confianza,
            this.cardQuestion.carta2.stats.creatividad,
            this.cardQuestion.carta2.stats.paciencia,
            this.cardQuestion.carta2.stats.empatia),
        this.card3 = new card(this,this.sys.game.canvas.width / 6, this.sys.game.canvas.height / 2,this.cardQuestion.carta3.sprite,700, 500,
            this.cardQuestion.carta3.stats.extroversion,
            this.cardQuestion.carta3.stats.confianza,
            this.cardQuestion.carta3.stats.creatividad,
            this.cardQuestion.carta3.stats.paciencia,
            this.cardQuestion.carta3.stats.empatia),
        this.card4 = new card(this,this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2,this.cardQuestion.carta4.sprite,700, 500,
            this.cardQuestion.carta4.stats.extroversion,
            this.cardQuestion.carta4.stats.confianza,
            this.cardQuestion.carta4.stats.creatividad,
            this.cardQuestion.carta4.stats.paciencia,
            this.cardQuestion.carta4.stats.empatia),
        this.card5 = new card(this,this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2,this.cardQuestion.carta5.sprite,700, 500,
            this.cardQuestion.carta5.stats.extroversion,
            this.cardQuestion.carta5.stats.confianza,
            this.cardQuestion.carta5.stats.creatividad,
            this.cardQuestion.carta5.stats.paciencia,
            this.cardQuestion.carta5.stats.empatia),
        this.card6 = new card(this,this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2,this.cardQuestion.carta6.sprite,700, 500,
            this.cardQuestion.carta6.stats.extroversion,
            this.cardQuestion.carta6.stats.confianza,
            this.cardQuestion.carta6.stats.creatividad,
            this.cardQuestion.carta6.stats.paciencia,
            this.cardQuestion.carta6.stats.empatia)
    ];

    //Crear cartas
     //Chuleta de stats: [empatia, extroversion, estabilidadMental, creatividad, paciencia, inteligencia]
   // this.card1.setSprite(250, 250);
    //this.card1.setScale(2, 2); // Duplica el tamaño del sprite
    //this.card1.setSize(200, 300); // Ajusta el tamaño a 200x300 píxeles
    //this.card1.displayWidth = this.card1.width * 0;
    //this.card1.displayHeight = this.card1.height * 0;

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

    //this.card2.setSprite(500, 500);
    //this.card2.setSprite(this.sys.game.canvas.width / 5, this.sys.game.canvas.height / 2);
    //this.card2.displayWidth = this.card1.width * 0.15;
    //this.card2.displayHeight = this.card1.height * 0.15;

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
    
    //this.card3.setSprite(500, 500);
    //this.card3.setSprite(this.sys.game.canvas.width / 3, this.sys.game.canvas.height / 2);
    //this.card3.displayWidth = this.card1.width * 0.15;
    //this.card3.displayHeight = this.card1.height * 0.15;

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
    
    //this.card4.setSprite(500, 500);
    //this.card4.setSprite(this.sys.game.canvas.width / 1.5, this.sys.game.canvas.height / 2);
   // this.card4.displayWidth = this.card1.width * 0.15;
    //this.card4.displayHeight = this.card1.height * 0.15;
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

    //this.card1.setSprite(500, 500);
    //this.card5.setSprite(this.sys.game.canvas.width / 1.35, this.sys.game.canvas.height / 2);

   // this.card5.displayWidth = this.card1.width * 0.15;
    //this.card5.displayHeight = this.card1.height * 0.15;

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
   
   // this.card6.setSprite(500, 500);
    //this.card6.setSprite(this.sys.game.canvas.width / 1.15, this.sys.game.canvas.height / 2);
    //this.card6.displayWidth = this.card1.width * 0.15;
   // this.card6.displayHeight = this.card1.height * 0.15;
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

    this.totalOptions = 5; //Max of cards created - 1
}

createAnswers(){

    //Creación del diálogo background

    this.dialogBackground = this.add.graphics();
    this.dialogBackground.fillStyle(0xffffff, 0.4); // Blanco, 50% de transparencia
    this.dialogBackground.fillRect(0, 0, 300, 300);
    this.dialogBackground.setVisible(false); // Oculto al inicio

    //Instanciar ReadDialog
    this.reader = new ReadDialog(this);  

    // Cargar el archivo JSON con los diálogos
    this.reader.loadJSON('src/Scripts/Classes/Texto.json').then(() => {
    });
    // Inicializar el sistema de diálogos

    this.dialogueSystem = new DialogSystem(this, this.affectionSystem,this.reader.dialogData.Eventos);
   
    // Eventos para mostrar/ocultar capa de fondo
    this.events.on('showDialogueBackground', () => {
        this.dialogBackground.setVisible(true);
    });
    this.events.on('hideDialogueBackground', () => {
        this.dialogBackground.setVisible(false);
    });   
    this.events.on('OnPointerDown',()=>{
        this.dialogueSystem.onPointerDown();
    }) 
    // Mostrar dialogos
            this.dialogueSystem = new DialogSystem(this, this.affectionSystem,this.reader.dialogData.Eventos);
            this.eventoId1 = `${this.ninfaName}${this.contadorFase2}.${1}`;  
            this.eventoId2 = `${this.ninfaName}${this.contadorFase2}.${2}`;

            if (this.reader.dialogData.Eventos[this.eventoId1]) {
                this.dialogueSystem.showEventDialogues(this.eventoId1, this.reader.dialogData.Eventos);
            }   
            else{
                console.log("No se ha encontrado el " + this.eventoId1);
            }
            this.contadorFase2++;
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
                if(this.fase == 1){
                    this.timerPlayer1.decreaseValue(this.delayTime);
                    this.timerPlayer2.decreaseValue(this.delayTime);
                    //PLAYER 1
                    if( this.Player1.moveleft()){
                        if(this.selectionPlayer1 != 0){
                            this.selectionPlayer1 -=1;
                            this.changeSelectionPlayer1Fase1(this.selectionPlayer1);
                        }
                    }
        
                    if(this.Player1.moveright()){
                        if(this.selectionPlayer1 != 5){
                            this.selectionPlayer1 += 1;
                            this.changeSelectionPlayer1Fase1(this.selectionPlayer1);
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
                            this.changeSelectionPlayer2Fase1(this.selectionPlayer2);
                        }
                    }
        
                    if(this.Player2.moveright()){
                        
                        if(this.selectionPlayer2 != 5){
                            this.selectionPlayer2 += 1;
                            this.changeSelectionPlayer2Fase1(this.selectionPlayer2);
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
                    //Si el valor del timer es el máximo lee el diálogo (indica que es el principio)
                    if(this.timerPlayer1.value == this.timerPlayer1.GetMaxValue()){
                        if (this.reader.dialogData.Eventos[this.eventoId1]) {
                            this.dialogueSystem.showEventDialogues(this.eventoId1, this.reader.dialogData.Eventos);
                            this.events.emit("OnPointerDown");
                            this.Player2.selectCard = true;
                        }   
                        else{
                            console.log("No se ha encontrado el " + this.eventoId1);
                        }
                        this.timerPlayer2.HideTimer(); //Escondemos el segundo Timer 
                        this.timerPlayer2.value = this.timerPlayer2.GetMaxValue() //Asignamos nuevamente el valor máximo
                        this.changeSelectionFase2(this.dialogueSystem.actualOptionIndex)
                    }
                    //Si el player 1 ha terminado y el valor del player 2 es el máximo (indica que lee el diálogo del p2 SOLO 1 vez)
                    if(this.timerPlayer1.value <= 0 && this.timerPlayer2.value == this.timerPlayer2.GetMaxValue()){
                        if (this.reader.dialogData.Eventos[this.eventoId2]) {
                            this.dialogueSystem.showEventDialogues(this.eventoId2, this.reader.dialogData.Eventos);
                            this.events.emit("OnPointerDown");
                          
                        }   
                        else{
                            console.log("No se ha encontrado el " + this.eventoId1);
                        }
                        this.dialogueSystem.actualOptionIndex = 0;
                        this.changeSelectionFase2(this.dialogueSystem.actualOptionIndex)
                        this.Player2.selectCard = false;
                    }
                    //Resta el tiempo del timer1 mientras le quede tiempo
                    if(this.timerPlayer1.value > 0 ){
                        this.timerPlayer1.decreaseValue(this.delayTime);
                    }
                     //Resta el tiempo del timer2 mientras le quede tiempo
                    else {
                        this.timerPlayer2.decreaseValue(this.delayTime);
                    }

                    //MAPEO DE INPUTS

                    //P1
                    if(this.Player1.moveleft()){
                        if(this.dialogueSystem.actualOptionIndex != 0){
                            this.dialogueSystem.actualOptionIndex--;
                            this.changeSelectionFase2(this.dialogueSystem.actualOptionIndex)
                        }
                    }
                    else if(this.Player1.moveright()){
                        if(this.dialogueSystem.actualOptionIndex != 2){
                            this.dialogueSystem.actualOptionIndex++;
                            this.changeSelectionFase2(this.dialogueSystem.actualOptionIndex)
                        }
                    }
                    else if(this.Player1.select()){
                        if(!this.Player1.selectCard){
                            this.events.emit("selectAnswer");
                            this.dialogueSystem.handleOptionSelection(this.dialogueSystem.actualOption.gain,1,this.dialogueSystem.actualOption)
                            this.timerPlayer1.HideTimer();
                            this.Player1.selectCard = true;
                        }
                    }
                    //P2
                    if(this.Player2.moveleft()){
                        if(this.dialogueSystem.actualOptionIndex != 0){
                            this.dialogueSystem.actualOptionIndex--;
                            this.changeSelectionFase2(this.dialogueSystem.actualOptionIndex)
                        }
                    }
                    else if(this.Player2.moveright()){
                        if(this.dialogueSystem.actualOptionIndex != 2){
                            this.dialogueSystem.actualOptionIndex++;
                            this.changeSelectionFase2(this.dialogueSystem.actualOptionIndex)
                        }
                    }
                    else if(this.Player2.select()){
                        if(!this.Player2.selectCard){
                            this.events.emit("selectAnswer");
                            this.dialogueSystem.handleOptionSelection(this.dialogueSystem.actualOption.gain,2,this.dialogueSystem.actualOption)
                            this.timerPlayer2.HideTimer();
                            this.Player2.selectCard = true;
                            this.events.emit("OnPointerDown");
                        }
                    }
                  
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

    changeSelectionPlayer1Fase1(whatSelection) {
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

    changeSelectionPlayer2Fase1(whatSelection) {
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
    changeSelectionFase2(whatSelection){
        switch(whatSelection){
            case(0):
            this.dialogueSystem.button[2].setStyle({ fill: '#fff', backgroundColor: '#000000' }); 
            this.dialogueSystem.button[1].setStyle({ fill: '#000000', backgroundColor: '#ffffff' });
            this.dialogueSystem.button[0].setStyle({ fill: '#000000', backgroundColor: '#ffffff' });
            break;
            case(1):
            this.dialogueSystem.button[2].setStyle({ fill: '#000000', backgroundColor: '#ffffff' });
            this.dialogueSystem.button[1].setStyle({ fill: '#fff', backgroundColor: '#000000' }); 
            this.dialogueSystem.button[0].setStyle({ fill: '#000000', backgroundColor: '#ffffff' });
            break;
            case(2):
            this.dialogueSystem.button[2].setStyle({ fill: '#000000', backgroundColor: '#ffffff' });
            this.dialogueSystem.button[1].setStyle({ fill: '#000000', backgroundColor: '#ffffff' });
            this.dialogueSystem.button[0].setStyle({ fill: '#fff', backgroundColor: '#000000' }); 
            break;
        }
    }
    End(){
        //Comprobamos que haya llegado a la última ronda y sacamos el final en cuestión
        if(this.round >= 5){
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