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
    this.respuestaP1 = false;
    this.respuestaP2 = false;
    this.start = true;
    this.CallbackCreated = false;
    this.musicaGame;
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

    // Detener la música anterior si está en reproducción
    if (this.sound.get('musicaMenu')) {
        this.sound.get('musicaMenu').stop();
    }

    if(this.whichRama == 0 || this.whichRama == 1){
        // Reproducir la nueva música
         // Crear la instancia de la música si no existe
         if (!this.sound.get('musicaCerezo')) {
            this.musicaGame = this.sound.add('musicaCerezo', { loop: true });
            this.musicaGame.play();
        }

    }
    else if(this.whichRama == 2 || this.whichRama == 3){
        if (!this.sound.get('musicaSauce')) {
            this.musicaGame = this.sound.add('musicaSauce', { loop: true });
            this.musicaGame.play();
        }
            
    }
    else {
        if (!this.sound.get('musicaPalmera')) {
            this.musicaGame = this.sound.add('musicaPalmera', { loop: true });
            this.musicaGame.play();
        }
    }

    //CREAMOS JSON
    this.cardJson = this.cache.json.get('cardJson');

    //Tomamos las medidas de la pantalla para la camara
    const { width, height } = this.cameras.main;

    
    if(this.whichRama == 0 || this.whichRama == 1)
    {
        this.add.image(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 2,
            'cerezo'
       )
    }
    else if(this.whichRama == 2 || this.whichRama == 3)
        {
            this.add.image(
                this.sys.game.canvas.width / 2,
                this.sys.game.canvas.height / 2,
                'sauce'
            )
        }
    else if(this.whichRama == 4 || this.whichRama == 5)
        {
            this.add.image(
                this.sys.game.canvas.width / 2,
                this.sys.game.canvas.height / 2,
                'palmera'
            )
        }
    

    //Startgame
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

    if(this.fase == 1){
            
        this.timerPlayer1 = new Timer(this,600,100,-1);
        this.timerPlayer2 = new Timer(this,1200,100,1);
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
    switch(this.round){
        case 1:
           this.cardQuestion= this.cardJson.Pregunta1;
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
createCards() {
    function getRandomUniqueNumbers(count, min, max) {
        let numbers = [];
        while (numbers.length < count) {
            let num = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!numbers.includes(num)) numbers.push(num); // Evita duplicados
        }
        return numbers;
    }


    let uniqueIndices = getRandomUniqueNumbers(6, 1, 6);
    console.log("Índices generados:", uniqueIndices);

    // Configuración de tamaño y posición
    let cardWidth = 200;  
    let cardHeight = 280;  
    let spacing = 100;  // Reducción de espacio entre cartas
    let yPos = 820;     // Ubicación en la parte inferior

    // Calcular punto de inicio para centrar mejor
    let totalWidth = (6 * cardWidth) + (5 * spacing); 
    let startX = (this.sys.game.canvas.width - totalWidth) / 2 + (cardWidth / 2);

    // Crear cartas
    this.cardArray = uniqueIndices.map((i, index) => {
        let cartaKey = `carta${i}`;
        let cartaData = this.cardQuestion[cartaKey];

        let posX = startX + (index * (cardWidth + spacing)); // Posición centrada

        return new card(
            this,
            posX,
            yPos,
            cartaData.sprite,
            cardWidth,
            cardHeight,
            cartaData.stats.extroversion,
            cartaData.stats.confianza,
            cartaData.stats.creatividad,
            cartaData.stats.paciencia,
            cartaData.stats.empatia
        );
    })

    //Crear cartas
     //Chuleta de stats: [empatia, extroversion, estabilidadMental, creatividad, paciencia, inteligencia]
     this.selectedcard1Player1 = this.add.image(this.sys.game.canvas.width / 9.5,this.sys.game.canvas.height / 1.10,'jugador1').setVisible(true);
    this.selectedcard1Player2 = this.add.image(this.sys.game.canvas.width / 8.9,this.sys.game.canvas.height / 1.08,'jugador2').setVisible(false);

    this.selectedcard2Player1 = this.add.image(this.sys.game.canvas.width / 3.8,this.sys.game.canvas.height / 1.10,'jugador1').setVisible(false);
    this.selectedcard2Player2 = this.add.image(this.sys.game.canvas.width / 3.70,this.sys.game.canvas.height / 1.08,'jugador2').setVisible(false);

    this.selectedcard3Player1 = this.add.image(this.sys.game.canvas.width / 2.4,this.sys.game.canvas.height / 1.10,'jugador1').setVisible(false);
    this.selectedcard3Player2 = this.add.image(this.sys.game.canvas.width / 2.36,this.sys.game.canvas.height / 1.08,'jugador2').setVisible(false);

    this.selectedcard4Player1 = this.add.image(this.sys.game.canvas.width / 1.73,this.sys.game.canvas.height / 1.10,'jugador1').setVisible(false);
    this.selectedcard4Player2 = this.add.image(this.sys.game.canvas.width / 1.71,this.sys.game.canvas.height / 1.08,'jugador2').setVisible(false);

    this.selectedcard5Player1 = this.add.image(this.sys.game.canvas.width / 1.37,this.sys.game.canvas.height / 1.10,'jugador1').setVisible(false);
    this.selectedcard5Player2 = this.add.image(this.sys.game.canvas.width / 1.36,this.sys.game.canvas.height / 1.08,'jugador2').setVisible(false);

    this.selectedcard6Player1 = this.add.image(this.sys.game.canvas.width / 1.12,this.sys.game.canvas.height / 1.10,'jugador1').setVisible(false);
    this.selectedcard6Player2 = this.add.image(this.sys.game.canvas.width / 1.11,this.sys.game.canvas.height / 1.08,'jugador2').setVisible(true);

  
    this.totalOptions = 5; //Max of cards created - 1
}

createAnswers(){

    //Creación del diálogo background

    this.dialogBackground = this.add.graphics();
    this.dialogBackground.fillStyle(0xffffff, 0.4); // Blanco, 50% de transparencia
  //  this.dialogBackground.fillRect(0, 0, 300, 300);
    this.dialogBackground.setVisible(false); // Oculto al inicio

    //Instanciar ReadDialog
    this.reader = new ReadDialog(this);  

    // Cargar el archivo JSON con los diálogos
    this.reader.loadJSON('src/Scripts/Classes/Texto.json').then(() => {
    });
    // Inicializar el sistema de diálogos
   
    // Eventos para mostrar/ocultar capa de fondo
    if(!this.CallbackCreated){
        this.events.on('showDialogueBackground', () => {
            this.dialogBackground.setVisible(true);
        });
        this.events.on('hideDialogueBackground', () => {
            this.dialogBackground.setVisible(false);
        });   
        this.events.on('OnPointerDown',()=>{
            this.dialogueSystem.onPointerDown();
        }) 
        this.CallbackCreated = true;
    }
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
            ++this.contadorFase2;
            this.start = true; //Seteamos start a true;
            this.Player2.selectCard = false;
            this.Player1.selectCard = false;
            this.respuestaP1 = false;
            this.respuestaP2 = false;
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
            this.selectedPlayer1 = this.add.image(600,1000,'jugador1').setVisible(true);
   
            this.selectedPlayer2 = this.add.image(1200,1025,'jugador2').setVisible(true);
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
                        
                    if(this.timerPlayer1.value <=0 && this.timerPlayer2.value <=0 && !this.wait){
    
                        this.End();
    
                    }  
                }    
                else{
                    //Primer frame del update
                    if(this.start){
                        this.events.emit("OnPointerDown");
                        this.start = false;
                        this.Player2.selectCard = true;
                        this.changeSelectionFase2(this.dialogueSystem.actualOptionIndex)
                    }

                    //MAPEO DE INPUTS

                    //P1
                    if(this.Player1.moveleft()){
                        if(this.dialogueSystem.actualOptionIndex != 0 && !this.respuestaP1){
                            this.dialogueSystem.actualOptionIndex--;
                            this.changeSelectionFase2(this.dialogueSystem.actualOptionIndex)
                        }
                    }
                    else if(this.Player1.moveright()){
                        if(this.dialogueSystem.actualOptionIndex != 2 && !this.respuestaP1){
                            this.dialogueSystem.actualOptionIndex++;
                            this.changeSelectionFase2(this.dialogueSystem.actualOptionIndex)
                        }
                    }
                    else if(this.Player1.select()){
                        if(!this.Player1.selectCard){
                            if(!this.respuestaP1){
                                this.events.emit("selectAnswer");
                                this.dialogueSystem.handleOptionSelection(this.dialogueSystem.actualOption.gain,1,this.dialogueSystem.actualOption)
                                this.events.emit("OnPointerDown");
                                this.respuestaP1 = true;
                            }
                            else{
                                if (this.reader.dialogData.Eventos[this.eventoId2]) {
                                    this.dialogueSystem.showEventDialogues(this.eventoId2, this.reader.dialogData.Eventos);
                                    this.events.emit("OnPointerDown");
                                  
                                }   
                                else{
                                    console.log("No se ha encontrado el " + this.eventoId1);
                                }
                                this.dialogueSystem.actualOptionIndex = 0;
                                this.changeSelectionFase2(this.dialogueSystem.actualOptionIndex);
                                this.Player1.selectCard = true;
                                this.Player2.selectCard = false;
                            }
                        }
                    }
                    //P2
                    if(this.Player2.moveleft()){
                        if(this.dialogueSystem.actualOptionIndex != 0 && !this.respuestaP2){
                            this.dialogueSystem.actualOptionIndex--;
                            this.changeSelectionFase2(this.dialogueSystem.actualOptionIndex)
                        }
                    }
                    else if(this.Player2.moveright()){
                        if(this.dialogueSystem.actualOptionIndex != 2 && !this.respuestaP2){
                            this.dialogueSystem.actualOptionIndex++;
                            this.changeSelectionFase2(this.dialogueSystem.actualOptionIndex)
                        }
                    }
                    else if(this.Player2.select()){
                        if(!this.Player2.selectCard){
                            if(!this.respuestaP2){
                                this.events.emit("selectAnswer");
                                this.dialogueSystem.handleOptionSelection(this.dialogueSystem.actualOption.gain,2,this.dialogueSystem.actualOption)
                                this.events.emit("OnPointerDown");
                                this.respuestaP2 = true;
                            }
                            else{
                                this.dialogueSystem.actualOptionIndex = 0;
                                this.Player2.selectCard = true;
                                this.events.emit("OnPointerDown");
                                this.End();
                            }
                        }
                    }
                  
                }
            }                         
            else{
                this.countdown -= dt;
                this.countdownText.setText(Math.floor(this.countdown / 1000) + 1);
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
           
            setTimeout(() => {

                if(this.affectionSystem.GetPlayer1() >=2 || this.affectionSystem.GetPlayer2() >=2){
                    this.fase = 2;
                }

                this.round++; // Aumentamos la ronda
                this.playerHasAnsweredGood = 0; // Reiniciamos contador
                this.scene.restart(); // Reiniciamos la escena
                this.wait = false; 

            },  2000); // 2000 milisegundos = 2 segundos de retraso
        }

    }
}