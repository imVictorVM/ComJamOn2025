import Player1 from "../Classes/Player1.js";
import Player2 from "../Classes/Player2.js";

export default class TreeScene extends Phaser.Scene {
    constructor(){
        super({key: "TreeScene"})

        this.whatSelection = 0;
        this.menuMusic;
    }

preload(){

}

    create(){

                 // Crear la instancia de la música si no existe
                 if (!this.sound.get('musicaMenu')) {
                    this.menuMusic = this.sound.add('musicaMenu', { loop: true });
                    this.menuMusic.play();
                }

        //JUGADORES
        this.Player1 = new Player1(this, 100, 100, 'player1');
        this.Player2 = new Player2(this, 100, 100, 'player2');

        
        this.sfxCambiarRama = this.sound.add("cambiarRama");

        const fx=this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.whatSelection = 0;

        //FONDO 

        this.fondo0=this.add.image(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 2,
            'fondo0'
        );
        this.fondo1=this.add.image(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 2,
            'fondo1'
        ).setVisible(false);
        this.fondo2=this.add.image(
        this.sys.game.canvas.width / 2,
        this.sys.game.canvas.height / 2,
        'fondo2'
        ).setVisible(false);
        this.fondo3=this.add.image(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 2,
            'fondo3'
        ).setVisible(false);
        this.fondo4=this.add.image(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 2,
            'fondo4'
        ).setVisible(false);
        this.fondo5=this.add.image(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 2,
            'fondo5'
        ).setVisible(false);

               


    }

    update(t,dt){
        super.update(t,dt);
        if( this.Player1.moveleft()|| this.Player2.moveleft()){
            if(this.whatSelection != 0){
                this.whatSelection -=1;
              
                console.log(this.whatSelection);
                this.changeFondo(this.whatSelection);
                this.sfxCambiarRama.detune += Phaser.Math.Between(-70, 70);
                this.sfxCambiarRama.play();
            }
        }

        if(this.Player1.moveright()|| this.Player2.moveright()){
            if(this.whatSelection != 5){
                this.whatSelection += 1;
                console.log(this.whatSelection);
                this.changeFondo(this.whatSelection);
                this.sfxCambiarRama.detune += Phaser.Math.Between(-70, 70);
                this.sfxCambiarRama.play();
            }
        }

        if(this.Player1.select()|| this.Player2.select()){


            this.changeScene(this.whatSelection);

        }
    }

    changeScene(whatSelection){
        this.scene.start('ProfileScene',{selection:whatSelection});
        
    }

    changeFondo(whatSelection) {
        switch(whatSelection){
            case 0:
                this.fondo0.setVisible(true);
                this.fondo1.setVisible(false);
                this.fondo2.setVisible(false);
                this.fondo3.setVisible(false);
                this.fondo4.setVisible(false);
                this.fondo5.setVisible(false);
                break;
            case 1:
                this.fondo0.setVisible(false);
                this.fondo1.setVisible(true);
                this.fondo2.setVisible(false);
                this.fondo3.setVisible(false);
                this.fondo4.setVisible(false);
                this.fondo5.setVisible(false);
                break;
            case 2:
                this.fondo0.setVisible(false);
                this.fondo1.setVisible(false);
                this.fondo2.setVisible(true);
                this.fondo3.setVisible(false);
                this.fondo4.setVisible(false);
                this.fondo5.setVisible(false);
                break;
            case 3:
                this.fondo0.setVisible(false);
                this.fondo1.setVisible(false);
                this.fondo2.setVisible(false);
                this.fondo3.setVisible(true);
                this.fondo4.setVisible(false);
                this.fondo5.setVisible(false);
                break;
            case 4:
                this.fondo0.setVisible(false);
                this.fondo1.setVisible(false);
                this.fondo2.setVisible(false);
                this.fondo3.setVisible(false);
                this.fondo4.setVisible(true);
                this.fondo5.setVisible(false);
                break;
            case 5:
                this.fondo0.setVisible(false);
                this.fondo1.setVisible(false);
                this.fondo2.setVisible(false);
                this.fondo3.setVisible(false);
                this.fondo4.setVisible(false);
                this.fondo5.setVisible(true);
                break;
        }
    }
}   