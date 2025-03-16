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
      
    
      this.add.image(0, 0, 'imLoad').setOrigin(0, 0);
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
    this.load.image('ficha1', 'src/Assets/fichaTecnica.png');
    this.load.image('ficha2', 'src/Assets/fichaTecnica.png');
    this.load.image('ficha3', 'src/Assets/fichaTecnica.png');
    this.load.image('ficha4', 'src/Assets/fichaTecnica.png');
    this.load.image('ficha5', 'src/Assets/fichaTecnica.png');
    
    this.load.image('fondo0', 'src/Assets/cerezoIzquierda.png');
    this.load.image('fondo1', 'src/Assets/cerezoDerecha.png');
    this.load.image('fondo4', 'src/Assets/palmeraIzquierda.png');
    this.load.image('fondo5', 'src/Assets/palmeraDerecha.png');
    this.load.image('fondo2', 'src/Assets/sauceIzquierda.png');
    this.load.image('fondo3', 'src/Assets/sauceDerecha.png');

    this.load.image('confirmar0', 'src/Assets/confirmar0.png');
    this.load.image('volver0', 'src/Assets/volver0.png');
    this.load.image('confirmar1', 'src/Assets/confirmar1.png');
    this.load.image('volver1', 'src/Assets/volver1.png');
    this.load.image('titulo', 'src/Assets/titulo.png');

    this.load.image('cerezo', 'src/Assets/cerezo.jpg');
    this.load.image('sauce', 'src/Assets/sauce.jpg');
    this.load.image('palmera', 'src/Assets/palmera.jpg');
    ///////////////////////////

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