import Player1 from "../Classes/Player1.js";
import Player2 from "../Classes/Player2.js";

export default class CreditsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CreditsScene' });
    }

    preload() {
        // Load any assets needed for the credits scene here
    }

    create() {
        // Add background color or image
        this.cameras.main.setBackgroundColor('#000000');

        // Add credits text
        const creditsText = `
            Game Development: Your Name
            Art: Artist Name
            Music: Musician Name
            Special Thanks: Toñete
        `;


        this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, creditsText, {
            fontSize: '32px',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0.5);

        // Add a button to go back to the main menu
        this.backButton = this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 1.2, 'Back to Main Menu', {
            fontSize: '24px',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5);

       this.Player1 = new Player1(this, 100, 100, 'player1');
       this.Player2 = new Player2(this, 100, 100, 'player2');       

    }

    update(t,dt){
        super.update(t,dt);

        if(this.Player1.select()|| this.Player2.select()){
            console.log("select");
            this.scene.start('MainMenuScene');
        }
    }
}