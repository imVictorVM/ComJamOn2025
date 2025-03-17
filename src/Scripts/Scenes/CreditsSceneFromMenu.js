import Player1 from "../Classes/Player1.js";
import Player2 from "../Classes/Player2.js";

export default class CreditsSceneFromMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'CreditsSceneFromMenu' });
    }



    create() {
        const fx=this.cameras.main.fadeIn(1000, 0, 0, 0);
        // Add background color or image
        this.cameras.main.setBackgroundColor('#000000');

        this.add.image(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 2,
            'cerezo'
       )

        

       // Add a title text
       this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 8, 'CORTEJOS ENRAMADOS', {
        fontSize: '100px',
        fill: '#000000',
        fontStyle: 'bold',
        fontFamily: 'Georgia' 

       }).setOrigin(0.5, 0.5);

        // Add credits text
        const creditsText = `
            

            Juego realizado para la ComJamOn 2025
            por el equipo de desarrollo:
            David Benito
            Asher Carrero
            Andrea González
            Nerea Espinosa
            Víctor Valenzuela
            Seyam Acuba
            Nicole Vergara

            Agradecimientos a: Toñete
        `;


        const credits = this.add.text(this.sys.game.canvas.width / 2.1, this.sys.game.canvas.height, creditsText, {
            fontSize: '50px',
            fill: '#000000',
            align: 'center',
            fontFamily: 'Georgia'
        }).setOrigin(0.5, 0.5);

        // Tween to move the credits text from bottom to top
        this.tweens.add({
            targets: credits,
            y: this.sys.game.canvas.height / 2.3,
            ease: 'Linear',
            duration: 5000, // Duration of the tween in milliseconds
            onComplete: () => {
                // Optional: Add any additional actions to perform when the tween completes
                this.backButton.setVisible(true);
            }
        });

        // Add a button to go back to the main menu
        this.backButton = this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 1.2, 'Pulsa las teclas "S" o "K" para volver atrás.', {
            fontSize: '50px',
            fill: '#000000',
            fontFamily: 'Georgia'
        }).setOrigin(0.5, 0.5).setVisible(false);


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