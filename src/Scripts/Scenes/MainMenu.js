export default class MainMenuScene extends Phaser.Scene {
    constructor(){
        super({key: "MainMenuScene"})
    }
 

    preload() {

    }

    create(){

        var Title =  this.add.text(
            this.sys.game.canvas.width / 5,
            this.sys.game.canvas.height / 5,
            'JuegoDeLigar_buildbuena(1)', { 
            fontSize: '20px', 
            color: 'blue',         
        });

        var PlayButton = this.add.text(
            this.sys.game.canvas.width / 3,
            this.sys.game.canvas.height / 1.8,
            'Start', { 
            fontSize: '40px', 
            color: 'white',      
        }).setInteractive().on('pointerdown', ()=>this.changeScene());
        
    }


    changeScene(){
        this.scene.start('PruebaDialog');
    }
}