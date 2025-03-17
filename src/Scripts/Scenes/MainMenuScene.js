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

        
         // Crear la instancia de la música si no existe
         if (!this.sound.get('musicaMenu')) {
            this.menuMusic = this.sound.add('musicaMenu', { loop: true });
            this.menuMusic.play();
        }

        this.Player1 = new Player1(this, 100, 100, 'player1');
        this.Player2 = new Player2(this, 100, 100, 'player2');      
        this.whatSelection = 0;

        this.sfxCambiarBoton = this.sound.add("cambiarBoton");

        this.add.image(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 2,
            'fondoMenuInicial'
       )
       .setScale(0.5);

        
       this.add.image(
        this.sys.game.canvas.width / 1.45,
        this.sys.game.canvas.height / 4,
        'titulo'
        )
        .setScale(0.5);
  
       this.creditos= this.add.image(
            this.sys.game.canvas.width / 1.20,
            this.sys.game.canvas.height / 2,
            'creditos'
            )
            .setScale(0.75);
            
        this.empezar=this.add.image(
            this.sys.game.canvas.width / 1.8,
            this.sys.game.canvas.height / 2,
            'empezar'
            )
    
           .setScale(0.75);

        this.instrucciones=this.add.image(
        this.sys.game.canvas.width / 1.42,
        this.sys.game.canvas.height / 1.28,
        'instrucciones'
        )
        .setScale(0.5);

        
    }



    update(t,dt){
        super.update(t,dt);
        if( this.Player1.moveleft()|| this.Player2.moveleft()){
            if(this.whatSelection == 1){
                this.whatSelection = 0;
                this.sfxCambiarBoton.detune += Phaser.Math.Between(-70, 70);
                this.sfxCambiarBoton.play();
            }
        }

        if(this.Player1.moveright()|| this.Player2.moveright()){
            if(this.whatSelection == 0){
                this.whatSelection = 1;
                this.sfxCambiarBoton.detune += Phaser.Math.Between(-70, 70);
                this.sfxCambiarBoton.play();
            }
        }

        if(this.Player1.select()|| this.Player2.select()){
            this.changeScene(this.whatSelection);
        }


        if (this.whatSelection == 0) {
            this.creditos.setTint(0xBBBBBB);
            this.empezar.setTint(0xFFFFFF);
        }
        
        if (this.whatSelection == 1) {    
            this.empezar.setTint(0xBBBBBB);  // Blanco brillante
            this.creditos.setTint(0xFFFFFF); // Gris más oscuro para diferenciar
        }
    }


    changeScene(whatSelection){

        //SHAKE DE CAMARA PARA LA EXPLOSION
        //const fx= this.cameras.main.shake(500);
        //let aux;
        const fx=this.cameras.main.fadeOut(10000, 0, 0, 0);
        if(whatSelection == 0){
            // aux= 'TreeScene';
             this.scene.start('TreeScene');
        }
        else if(whatSelection == 1){
            //aux= 'CreditsScene';
            this.scene.start('CreditsSceneFromMenu');
        }
     
    }

}