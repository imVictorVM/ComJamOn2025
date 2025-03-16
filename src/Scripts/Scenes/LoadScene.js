export default class loadScene extends Phaser.Scene {
    constructor(){
        super({key: "loadScene"})
    }


  preload() {

    // Texto de carga
    this.loadingText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2.4,
      "Cargando...",
      {
        font: "100px Arial",
        fill: "#ffffff",
      }
    ).setOrigin(0.5);

    // Barra de progreso
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 150, height / 2, 300, 50);

    // Listener para actualizar la barra de progreso
    this.load.on("progress", (value) => {
      
    
      //this.add.image(0, 0, 'imLoad').setOrigin(0, 0);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(
        width / 2 - 140,
        height / 2 + 10,
        280 * value,
        30
      );
    });


    // AQUÍ CARGAMOS TODOS LOS RECURSOS
    this.load.image('carta', 'src/Assets/cartaDebug.png');
    this.load.image('fondoMenuInicial', 'src/Assets/fondo.png');
    this.load.image('creditos', 'src/Assets/boton-creditos.png');
    this.load.image('empezar', 'src/Assets/boton-empezar.png');

    this.load.image('ficha0', 'src/Assets/ficha0.jpg');
    this.load.image('ficha1', 'src/Assets/ficha1.png');
    this.load.image('ficha2', 'src/Assets/ficha2.png');
    this.load.image('ficha3', 'src/Assets/ficha3.jpg');
    this.load.image('ficha4', 'src/Assets/ficha4.jpg');
    this.load.image('ficha5', 'src/Assets/ficha5.jpg');
    

    
    this.load.image('fondo0', 'src/Assets/cerezoIzquierda.png');
    this.load.image('fondo1', 'src/Assets/cerezoDerecha.png');
    this.load.image('fondo4', 'src/Assets/palmeraIzquierda.png');
    this.load.image('fondo5', 'src/Assets/palmeraDerecha.png');
    this.load.image('fondo2', 'src/Assets/sauceIzquierda.png');
    this.load.image('fondo3', 'src/Assets/sauceDerecha.png');
    this.load.image('fondoCorazon','src/Assets/fondoCorazon.jpg')

    this.load.image('confirmar0', 'src/Assets/confirmar0.png');
    this.load.image('volver0', 'src/Assets/volver0.png');
    this.load.image('confirmar1', 'src/Assets/confirmar1.png');
    this.load.image('volver1', 'src/Assets/volver1.png');
    this.load.image('confirmar2', 'src/Assets/confirmar2.png');
    this.load.image('volver2', 'src/Assets/volver2.png');
    this.load.image('confirmar3', 'src/Assets/confirmar3.png');
    this.load.image('volver3', 'src/Assets/volver3.png');
    this.load.image('confirmar4', 'src/Assets/confirmar4.png');
    this.load.image('volver4', 'src/Assets/volver4.png');
    this.load.image('confirmar5', 'src/Assets/confirmar5.png');
    this.load.image('volver5', 'src/Assets/volver5.png');

    this.load.image('titulo', 'src/Assets/titulo.png');

    this.load.image('cerezo', 'src/Assets/cerezo.jpg');
    this.load.image('sauce', 'src/Assets/sauce.jpg');
    this.load.image('palmera', 'src/Assets/palmera.jpg');

    this.load.image('instrucciones', 'src/Assets/instrucciones.png');

    //CardImages
    this.load.image('carta1.1', 'src/Assets/carta1.1.png');
    this.load.image('carta1.2', 'src/Assets/carta1.2.png');
    this.load.image('carta1.3', 'src/Assets/carta1.3.png');
    this.load.image('carta1.4', 'src/Assets/carta1.4.png');
    this.load.image('carta1.5', 'src/Assets/carta1.5.png');
    this.load.image('carta1.6', 'src/Assets/carta1.6.png');
    this.load.image('carta2.1', 'src/Assets/carta2.1.png');
    this.load.image('carta2.2', 'src/Assets/carta2.2.png');
    this.load.image('carta2.3', 'src/Assets/carta2.3.png');
    this.load.image('carta2.4', 'src/Assets/carta2.4.png');
    this.load.image('carta2.5', 'src/Assets/carta2.5.png');
    this.load.image('carta2.6', 'src/Assets/carta2.6.png');
    this.load.image('carta3.1', 'src/Assets/carta3.1.png');
    this.load.image('carta3.2', 'src/Assets/carta3.2.png');
    this.load.image('carta3.3', 'src/Assets/carta3.3.png');
    this.load.image('carta3.4', 'src/Assets/carta3.4.png');
    this.load.image('carta3.5', 'src/Assets/carta3.5.png');
    this.load.image('carta3.6', 'src/Assets/carta3.6.png');
    this.load.image('carta4.1', 'src/Assets/carta4.1.png');
    this.load.image('carta4.2', 'src/Assets/carta4.2.png');
    this.load.image('carta4.3', 'src/Assets/carta4.3.png');
    this.load.image('carta4.4', 'src/Assets/carta4.4.png');
    this.load.image('carta4.5', 'src/Assets/carta4.5.png');
    this.load.image('carta4.6', 'src/Assets/carta4.6.png');
    this.load.image('carta5.1', 'src/Assets/carta5.1.png');
    this.load.image('carta5.2', 'src/Assets/carta5.2.png');
    this.load.image('carta5.3', 'src/Assets/carta5.3.png');
    this.load.image('carta5.4', 'src/Assets/carta5.4.png');
    this.load.image('carta5.5', 'src/Assets/carta5.5.png');
    this.load.image('carta5.6', 'src/Assets/carta5.6.png');

    //Frames explosion (cargarlas en este orden)
    this.load.image('explo1', 'src/Assets/1.png');
    this.load.image('explo2', 'src/Assets/2.png');
    this.load.image('explo3', 'src/Assets/3.png');
    this.load.image('explo4', 'src/Assets/4.png');
    this.load.image('explo5', 'src/Assets/5.png');
    this.load.image('explo6', 'src/Assets/6.png');
    this.load.image('explo7', 'src/Assets/7.png');
    this.load.image('explo8', 'src/Assets/8.png');
    this.load.image('explo9', 'src/Assets/9.jpg');
    this.load.image('exploWhite', 'src/Assets/white.jpg');
    this.load.image('exploBlackout', 'src/Assets/blackout.jpg');

    //Players
    this.load.image('jugador1', 'src/Assets/jugador1.png');
    this.load.image('jugador2', 'src/Assets/jugador2.png');

    //json
    this.load.json("cardJson", 'src/Scripts/Classes/Phase1Cards.json');

    ///////////////////////////
    //Imagenes de los personajes
    
    //Cerezo

    //Avery Rama
    this.load.image('RamaAvery', 'src/Assets/RamaAvery.png')
    this.load.image('RamaAveryKawaii', 'src/Assets/RamaAveryKawaii.png')
    this.load.image('RamaAvery.1', 'src/Assets/RamaAvery.1.png')
    this.load.image('RamaAvery.2', 'src/Assets/RamaAvery.2.png')
    this.load.image('RamaAvery.3', 'src/Assets/RamaAvery.3.png')
    //Avery
    this.load.image('Avery', 'src/Assets/Avery.png')
    this.load.image('AveryEnfadado', 'src/Assets/AveryEnfadado.png')
    this.load.image('AverySonrojado', 'src/Assets/AverySonrojado.png')

    //Cerine Rama
    this.load.image('RamaCerine', 'src/Assets/RamaCerine.png')
    this.load.image('RamaCerineKawaii', 'src/Assets/RamaCerineKawaii.png')
    this.load.image('RamaCerine.1', 'src/Assets/RamaCerine.1.png')
    this.load.image('RamaCerine.2', 'src/Assets/RamaCerine.2.png')
    this.load.image('RamaCerine.3', 'src/Assets/RamaCerine.3.png')

    //Cerine
    this.load.image('Cerine', 'src/Assets/Cerine.png')
    this.load.image('CerineEnfadado', 'src/Assets/CerineEnfadada.png')
    this.load.image('CerineSonrojado', 'src/Assets/CerineSonrojada.png')

    //Sauce

    //Rama Trix
    this.load.image('RamaTrix', 'src/Assets/RamaTrix.png')
    this.load.image('RamaTrixKawaii', 'src/Assets/RamaTrixKawaii.png')
    this.load.image('RamaTrix.1', 'src/Assets/RamaTrix.1.png')
    this.load.image('RamaTrix.2', 'src/Assets/RamaTrix.2.png')
    this.load.image('RamaTrix.3', 'src/Assets/RamaTrix.3.png')

    //Trix
    this.load.image('Trix', 'src/Assets/Trix.png')
    this.load.image('TrixEnfadado', 'src/Assets/TrixEnfadada.png')
    this.load.image('TrixSonrojado', 'src/Assets/TrixSonrojada.png')

    //Rama Salena
    this.load.image('RamaSalena', 'src/Assets/RamaSalena.png')
    this.load.image('RamaSalenaKawaii', 'src/Assets/RamaSalenaKawaii.png')
    this.load.image('RamaSalena.1', 'src/Assets/RamaSalena.1.png')
    this.load.image('RamaSalena.2', 'src/Assets/RamaSalena.2.png')
    this.load.image('RamaSalena.3', 'src/Assets/RamaSalena.3.png')

    //Palmera

    //Rama Phoebe
    this.load.image('RamaPhoebe', 'src/Assets/RamaPhoebe.png')
    this.load.image('RamaPhoebeKawaii', 'src/Assets/RamaPhoebeKawaii.png')
    this.load.image('RamaPhoebe.1', 'src/Assets/RamaPhoebe.1.png')
    this.load.image('RamaPhoebe.2', 'src/Assets/RamaPhoebe.2.png')
    this.load.image('RamaPhoebe.3', 'src/Assets/RamaPhoebe.3.png')

    //Phoebe
    this.load.image('Phoebe', 'src/Assets/Phoebe.png')
    this.load.image('PhoebeEnfadado', 'src/Assets/PhoebeEnfadado.png')
    this.load.image('PhoebeSonrojado', 'src/Assets/PhoebeSonrojado.png')

    //Rama Pam
    this.load.image('RamaPam', 'src/Assets/RamaPam.png')
    this.load.image('RamaPamKawaii', 'src/Assets/RamaPamKawaii.png')
    this.load.image('RamaPam.1', 'src/Assets/RamaPam.1.png')
    this.load.image('RamaPam.2', 'src/Assets/RamaPam.2.png')
    this.load.image('RamaPam.3', 'src/Assets/RamaPam.3.png')

    ///////////////////////////

    //UI

    this.load.image('VS', 'src/Assets/VS.png')
    this.load.image('J1', 'src/Assets/J1.png')
    this.load.image('J2', 'src/Assets/J2.png')
    this.load.image('prompt1', 'src/Assets/prompt1.png')
    this.load.image('prompt2', 'src/Assets/prompt2.png')
    this.load.image('prompt3', 'src/Assets/prompt3.png')
    this.load.image('prompt4', 'src/Assets/prompt4.png')
    this.load.image('prompt5', 'src/Assets/prompt5.png')
    //////////////////////////
    //AUDIOS
    this.load.audio('cambiarBoton', 'src/Sounds/SFX/click_boton.wav');
    this.load.audio('cambiarRama', 'src/Sounds/SFX/pasar_hojas.wav');
    this.load.audio('musicaMenu', 'src/Sounds/Music/mainmenu.wav');
    this.load.audio('musicaCerezo', 'src/Sounds/Music/Cerezo.wav');
    this.load.audio('musicaSauce', 'src/Sounds/Music/saucelloron.wav');
    this.load.audio('musicaPalmera', 'src/Sounds/Music/palmera.wav');

     // Evento para limpiar una vez que todo esté cargado
 this.load.on("complete", () => {
    progressBar.destroy();
    progressBox.destroy();
    this.loadingText.setText("¡Carga completa!");
  });
  }



  create() {
    
    //Pintamos un fondo
    var back = this.add.image(0, 0, 'imLoad').setOrigin(0, 0);

    //escalar el fondo
    var scaleX = this.cameras.main.width / back.width;
    var scaleY = this.cameras.main.height / back.height;
    
    var scale = Math.min(scaleX, scaleY);
    
    back.setScale(scale);
    
    back.setPosition(
        this.cameras.main.width / 2 - back.displayWidth / 2,
        this.cameras.main.height / 2 - back.displayHeight / 2
    );
    
    // Cambiar a la siguiente escena cuando todo esté listo
   this.scene.start("MainMenuScene"); // Cambia "MainMenuScene" por escena principal
  }

}