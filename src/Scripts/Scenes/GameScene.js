import Player1 from "../Classes/Player1.js";
import Player2 from "../Classes/Player2.js";
import card from "../Classes/CardClass.js"
import Ninfa from "../Classes/Ninfa.js"
import Stats from "../Classes/Stats.js"
import AffectionSystem from "../Classes/AffectionSystem.js";
import Timer from "../Classes/Timer.js";
import ReadDialog from "../Classes/ReadDialog.js";
import DialogSystem from "../Classes/DialogSystem.js";
import Explosion from "../Classes/Explosion.js";

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
    this.poninter = 2;
    this.explosionArray = [
        'explo1',
        'explo2',
        'explo3',
        'explo4',
        'explo5',
        'explo6',
        'explo7',
        'explo8',
        'explo9',
        'exploWhite',
        'exploBlackout'
    ]
}

init(ramaSelected){
    
    this.whichRama = ramaSelected.selection;
    console.log( this.whichRama);
    
}

preload(){

    //Precarga del fondo 

    //Precarga de las imágenes de las ramas

    //Precarga de las imágenes de las distintas ninfas

    //Precarga de las imágenes de las cartas

}

create(){

    this.explosion = this.sound.add("explosion");
        

    this.corazonbackground = this.add.image(
        this.sys.game.canvas.width / 2,
        this.sys.game.canvas.height / 2,
        'fondoCorazon')
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

    this.corazonbackground = this.add.image(
        this.sys.game.canvas.width / 2,
        this.sys.game.canvas.height / 2,
        'fondoCorazon')

    this.corazonbackground.setVisible(false);

    //CREAMOS JSON
    this.cardJson = this.cache.json.get('cardJson');

    //Tomamos las medidas de la pantalla para la camara
    const { width, height } = this.cameras.main;

    
    if(this.whichRama == 0 || this.whichRama == 1)
    {
       this.background =  this.add.image(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 2,
            'cerezo'
       )
    }
    else if(this.whichRama == 2 || this.whichRama == 3)
        {
            this.background =   this.add.image(
                this.sys.game.canvas.width / 2,
                this.sys.game.canvas.height / 2,
                'sauce'
            )
        }
    else if(this.whichRama == 4 || this.whichRama == 5)
        {
            this.background =   this.add.image(
                this.sys.game.canvas.width / 2,
                this.sys.game.canvas.height / 2,
                'palmera'
            )
        }
    
    //VS
    this.vs = this.add.image(this.sys.canvas.width/2, 140, 'VS').setVisible(false);
    this.vs.setScale(0.3,0.3);
    //J1
    this.j1 = this.add.image(300, 140, 'J1').setVisible(false);
    this.j1.setScale(0.3,0.3);
    //J2
    this.j2 = this.add.image(this.sys.canvas.width - 300, 140,'J2').setVisible(false);
    this.j2.setScale(0.3,0.3)

    
    this.prompt1 = this.add.image(this.sys.canvas.width/2, 140,'prompt1').setVisible(false);
    this.prompt1.setScale(0.3,0.3)

    this.prompt2 = this.add.image(this.sys.canvas.width/2, 140,'prompt2').setVisible(false);
    this.prompt2.setScale(0.3,0.3)

    this.prompt3 = this.add.image(this.sys.canvas.width/2, 140,'prompt3').setVisible(false);
    this.prompt3.setScale(0.3,0.3)

    this.prompt4 = this.add.image(this.sys.canvas.width/2, 140,'prompt4').setVisible(false);
    this.prompt4.setScale(0.3,0.3)

    this.prompt5 = this.add.image(this.sys.canvas.width/2, 140,'prompt5').setVisible(false);
    this.prompt5.setScale(0.3,0.3)

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


    //JUGADORES
            this.Player1 = new Player1(this, 100, 100, 'player1');
            this.Player2 = new Player2(this, 100, 100, 'player2');

    //selections
    this.selectionPlayer1 = 0;
    this.selectionPlayer2 = 5;

        switch(this.whichRama){

            case(0):
                this.NinfaStats = new Stats(0,1,-1,0,1,-1);
                this.ninfaName = "Avery";
                this.spriteArray = ['RamaAvery','RamaAveryKawaii','RamaAvery.1','RamaAvery.2','RamaAvery.3','Avery','AveryEnfadado','AverySonrojado']; //Seteamos su array de sprites
            break;
    
            case(1):
                this.NinfaStats = new Stats(0,-1,0,1,-1,1);
                this.ninfaName = "Cerine";
                this.spriteArray = ['RamaCerine','RamaCerineKawaii','RamaCerine.1','RamaCerine.2','RamaCerine.3','Cerine','CerineEnfadado','CerineSonrojado']; //Seteamos su array de sprites
            break;
            
            case(2):
                this.NinfaStats = new Stats(-1,-1,1,0,1,0);
                this.ninfaName = "Trix";
                this.spriteArray = ['RamaTrix','RamaTrixKawaii','RamaTrix.1','RamaTrix.2','RamaTrix.3','Trix','TrixEnfadado','TrixSonrojado']; //Seteamos su array de sprites
            break;
    
            case(3):
                this.NinfaStats = new Stats(-1,0,1,-1,0,1);
                this.spriteArray = ['RamaSalena','RamaSalenaKawaii','RamaSalena.1','RamaSalena.2','RamaSalena.3','RamaSalena','RamaSalena.3','RamaSalenaKawaii']; //Seteamos su array de sprites
            break;
    
            case(4):
                this.NinfaStats = new Stats(1,1,0,-1,-1,0);
                this.ninfaName = "Phoebe"
                this.spriteArray = ['RamaPhoebe','RamaPhoebeKawaii','RamaPhoebe.1','RamaPhoebe.2','RamaPhoebe.3','Phoebe','PhoebeEnfadado','PhoebeSonrojado']; //Seteamos su array de sprites
    
            case(5):
                this.NinfaStats = new Stats(1,0,-1,1,0,-1);
                this.ninfaName = "Pam"
                this.spriteArray = ['RamaPam','RamaPamKawaii','RamaPam.1','RamaPam.2','RamaPam.3','RamaPam','RamaPam.3','RamaPamKawaii']; //Seteamos su array de sprites
            break;
    
            
    
        }
    
        //Creación de la Ninfa con sus estadísticas
        this.ninfa  = new Ninfa(this, this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2.5, this.spriteArray,this.whichRama, this.NinfaStats); //Creamos la ninfa
    //Creación de las estadísticas de la Ninfa en función de la rama seleccionada por el jugador
   

    if(this.fase == 1){
            
        this.timerPlayer1 = new Timer(this,760,150,-1);
        this.timerPlayer2 = new Timer(this,1150,150,1);
       
        //TIMER
        this.initialTimer = this.time.addEvent({ 
        delay: 3 * 1000, //1000 por milisegundos
        callback: () => {this.startGame = true
            this.prompt.setVisible(true);
            this.vs.setVisible(false);
        } });
        this.vs.setVisible(true);
       
            //Startgame
    this.startGame = false; //booleano para empezar el juego
    this.countdown = 3 * 1000; //5 segundos
    this.countdownText = this.add.text(
        900,
        70,
        '3', { 
        fontSize: '150px', 
        color: 'white',      
    });
        
    this.countdownText.setVisible(false);
        this.selectCardQuestion();
         //Crear cartas
        this.createCards();  
        
        
    }

    if(this.fase == 2){
        //Crear las respuestas
        this.ninfa.changeSprite(5);
        this.vs.setVisible(false);
        this.j1.setVisible(true);
        this.prompt.setVisible(false);
        this.startGame = true
        this.createAnswers();
    }
      
   
}

selectCardQuestion()
{
    switch(this.round){
        case 1:
           this.cardQuestion= this.cardJson.Pregunta1;
           this.prompt = this.prompt1;
            break;
        case 2:
            this.cardQuestion= this.cardJson.Pregunta2;
            this.prompt = this.prompt2;
            break;
        case 3:
            this.cardQuestion= this.cardJson.Pregunta3;
            this.prompt = this.prompt3;
            break;
        case 4:
            this.cardQuestion= this.cardJson.Pregunta4;
            this.prompt = this.prompt3;
            break;
        case 5:
            this.cardQuestion= this.cardJson.Pregunta5;
            this.prompt = this.prompt4;
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
    this.startGame = true;
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
       // this.explosion.play();
        this.explosion = new Explosion(this,this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2.5,this.explosionArray);
        const fx= this.cameras.main.shake(500);
        setTimeout(() => {
            this.explosion.changeSprite(1);
           
        },500);

        setTimeout(() => {
            this.explosion.changeSprite(2);
        },600);

        setTimeout(() => {
            this.explosion.changeSprite(3);
        },700);

        setTimeout(() => {
            this.explosion.changeSprite(4);
        },800);

        setTimeout(() => {
            this.explosion.changeSprite(5);
        },900);

        setTimeout(() => {
            this.explosion.changeSprite(6);
        },1000);

        setTimeout(() => {
            this.explosion.changeSprite(7);
        },1100);

        setTimeout(() => {
            this.explosion.changeSprite(8);
        },1200);
        setTimeout(() => {
            this.scene.start('CreditsScene')
        },1300);
    }
    //Si pasan de fase
    else{
        if(this.affectionSystem.GetPlayer1() < 3 && this.affectionSystem.GetPlayer2() < 3){ //Cumplen los requisitos para pasar de 1 ronda pero no para la segunda
            //Seteo 2 imagenes de la explosion uno en cada lado representando a los players
            this.dialogueSystem.showEventDialogues(this.ninfaName + "EndBad", this.reader.dialogData.Eventos);
           
            this.events.emit("OnPointerDown");
            this.j1.setVisible(true);
            this.j2.setVisible(true);
         //   this.explosion.play();
            setTimeout(() => {
                const fx= this.cameras.main.shake(500);
            },2000);
            setTimeout(() => {
                this.explosion = new Explosion(this,this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2.5,this.explosionArray);
               
            },2500);
    
            setTimeout(() => {
                this.explosion.changeSprite(2);
            },2600);
    
            setTimeout(() => {
                this.explosion.changeSprite(3);
            },2700);
    
            setTimeout(() => {
                this.explosion.changeSprite(4);
            },2800);
    
            setTimeout(() => {
                this.explosion.changeSprite(5);
            },2900);
    
            setTimeout(() => {
                this.explosion.changeSprite(6);
            },3000);
    
            setTimeout(() => {
                this.explosion.changeSprite(7);
            },3100);
    
            setTimeout(() => {
                this.explosion.changeSprite(8);
            },3200);
            setTimeout(() => {
                this.scene.start('CreditsScene')
            },3300);
            
        }
        else if(this.affectionSystem.GetPlayer1() > this.affectionSystem.GetPlayer2()){ //Gana el player 1 pero no el player 2
            this.dialogueSystem.showEventDialogues(this.ninfaName + "EndOne", this.reader.dialogData.Eventos);
            this.events.emit("OnPointerDown");
            this.j1.setVisible(true);
            this.background.setVisible(false);
            this.corazonbackground.setVisible(true);
            setTimeout(() => {
                this.j1.setVisible(false);
                this.ninfa.sprite.setVisible(false);
                this.j2.setVisible(true);
                this.corazonbackground.setVisible(false);
                this.dialogBackground.setVisible(false);
            },4000);
            setTimeout(() => {
             //   this.explosion.play();
                const fx= this.cameras.main.shake(500);
                this.explosion = new Explosion(this,this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2.5,this.explosionArray);
               
            },4500);
    
            setTimeout(() => {
                this.explosion.changeSprite(2);
            },4600);
    
            setTimeout(() => {
                this.explosion.changeSprite(3);
            },4700);
    
            setTimeout(() => {
                this.explosion.changeSprite(4);
            },4800);
    
            setTimeout(() => {
                this.explosion.changeSprite(5);
            },4900);
    
            setTimeout(() => {
                this.explosion.changeSprite(6);
            },5000);
    
            setTimeout(() => {
                this.explosion.changeSprite(7);
            },5100);
    
            setTimeout(() => {
                this.explosion.changeSprite(8);
            },5200);
            setTimeout(() => {
                this.scene.start('CreditsScene')
            },5300);
        }
        else if(this.affectionSystem.GetPlayer1() < this.affectionSystem.GetPlayer2()){ //Gana el player 2 pero no el player 1
            this.dialogueSystem.showEventDialogues(this.ninfaName + "EndOne", this.reader.dialogData.Eventos);
            this.events.emit("OnPointerDown");
            this.j2.setVisible(true);
            this.background.setVisible(false);
            this.corazonbackground.setVisible(true);
            setTimeout(() => {
                this.j2.setVisible(false);
                this.ninfa.sprite.setVisible(false);
                this.j1.setVisible(true);
                this.corazonbackground.setVisible(false);
                this.dialogBackground.setVisible(false);
            },4000);
            setTimeout(() => {
         //       this.explosion.play();
                const fx= this.cameras.main.shake(500);
                this.explosion = new Explosion(this,this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2.5,this.explosionArray);
               
            },4500);
    
            setTimeout(() => {
                this.explosion.changeSprite(2);
            },4600);
    
            setTimeout(() => {
                this.explosion.changeSprite(3);
            },4700);
    
            setTimeout(() => {
                this.explosion.changeSprite(4);
            },4800);
    
            setTimeout(() => {
                this.explosion.changeSprite(5);
            },4900);
    
            setTimeout(() => {
                this.explosion.changeSprite(6);
            },5000);
    
            setTimeout(() => {
                this.explosion.changeSprite(7);
            },5100);
    
            setTimeout(() => {
                this.explosion.changeSprite(8);
            },5200);
            setTimeout(() => {
                this.scene.start('CreditsScene')
            },5300);
        }
        //Si empatan
        else{
            this.Player1.selectCard = false;
            this.Player2.selectCard = false;
            this.add.image(300, -700,'confirmar1');
            this.add.image(2000, 1300,'volver1');
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
                    this.background =   this.add.image(
                        this.sys.game.canvas.width / 2,
                        this.sys.game.canvas.height / 2,
                        'fondoCorazon'
                    )
                    setTimeout(() => {
                        this.scene.start('CreditsScene')
                        },1300);
                }
                else { //Si alguno rechaza
                           //Seteo de la explosión en la posición de la rama
                     //      this.explosion.play();
                    this.explosion = new Explosion(this,this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2.5,this.explosionArray);
                    const fx= this.cameras.main.shake(500);
                    setTimeout(() => {
                    this.explosion.changeSprite(1);
           
                     },500);

                    setTimeout(() => {
                    this.explosion.changeSprite(2);
                    },600);

                    setTimeout(() => {
                    this.explosion.changeSprite(3);
                    },700);

                    setTimeout(() => {
                    this.explosion.changeSprite(4);
                    },800);

                    setTimeout(() => {
                    this.explosion.changeSprite(5);
                    },900);

                    setTimeout(() => {
                    this.explosion.changeSprite(6);
                    },1000);

                    setTimeout(() => {
                    this.explosion.changeSprite(7);
                    },1100);

                    setTimeout(() => {
                    this.explosion.changeSprite(8);
                    },1200);
                    setTimeout(() => {
                    this.scene.start('CreditsScene')
                    },1300);
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
                        this.ninfa.sprite.setVisible(true);
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
                                let originalPoints = this.affectionSystem.GetPlayer1();
                                this.events.emit("selectAnswer");
                                this.dialogueSystem.handleOptionSelection(this.dialogueSystem.actualOption.gain,1,this.dialogueSystem.actualOption)
                                this.events.emit("OnPointerDown");
                                if(this.affectionSystem.GetPlayer1() > originalPoints){
                                    this.ninfa.changeSprite(7);
                                }
                                else if(this.affectionSystem.GetPlayer1() == originalPoints){
                                    this.ninfa.changeSprite(5);
                                }
                                else{
                                    this.ninfa.changeSprite(6);
                                }
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
                                this.ninfa.changeSprite(5);
                                this.j1.setVisible(false);
                                this.j2.setVisible(true);
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
                                let originalPoints = this.affectionSystem.GetPlayer2();
                                this.events.emit("selectAnswer");
                                this.dialogueSystem.handleOptionSelection(this.dialogueSystem.actualOption.gain,2,this.dialogueSystem.actualOption)
                                this.events.emit("OnPointerDown");
                                if(this.affectionSystem.GetPlayer2() > originalPoints){
                                    this.ninfa.changeSprite(7);
                                }
                                else if(this.affectionSystem.GetPlayer2() == originalPoints){
                                    this.ninfa.changeSprite(5);
                                }
                                else{
                                    this.ninfa.changeSprite(6);
                                }
                                this.respuestaP2 = true;
                            }
                            else{
                                this.dialogueSystem.actualOptionIndex = 0;
                                this.Player2.selectCard = true;
                                this.events.emit("OnPointerDown");
                                this.ninfa.changeSprite(5);
                                this.j2.setVisible(false);
                                this.End();
                            }
                        }
                    }
                  
                }
            }                         
            else{
                this.countdown -= dt;
                //this.countdownText.setText(Math.floor(this.countdown / 1000) + 1);
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
            if(this.fase == 1) this.ninfa.changeSprite(1);
            }
            else{
            //cambiar sprite a punto (1, 2 y 3)
            if(this.fase == 1){
            this.ninfa.changeSprite(2);
            setTimeout(() => {
                this.ninfa.changeSprite(3);
            },1000);
    
            setTimeout(() => {
                this.ninfa.changeSprite(4);
            },2000);
 
            }
            }
           
            if(this.fase == 1){
                setTimeout(() => {

                    if(this.affectionSystem.GetPlayer1() >=2 || this.affectionSystem.GetPlayer2() >=2){
                        this.fase = 2;
                    }
                    this.round++; // Aumentamos la ronda
                    this.playerHasAnsweredGood = 0; // Reiniciamos contador
                    this.scene.restart(); // Reiniciamos la escena
                    this.wait = false; 
    
                },  3000); // 3000 milisegundos = 3 segundos de retraso
            }
            else{
                this.round++; // Aumentamos la ronda
                this.playerHasAnsweredGood = 0; // Reiniciamos contador
                this.scene.restart(); // Reiniciamos la escena
                this.wait = false; 
            }
        }

    }
}