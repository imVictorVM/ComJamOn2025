import Player1 from "../Classes/Player1.js";
import Player2 from "../Classes/Player2.js";
import card from "../Classes/CardClass.js"
import Ninfa from "../Classes/Ninfa.js"
import Stats from "../Classes/Stats.js"
export default class GameScene extends Phaser.Scene {
constructor(){
    super({key: "GameScene"})
    this.whichRama;
    //Array the sprites
    this.spriteArray;
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
    //Creación de la respectiva Ninfa en función de la rama seleccionada por el jugador
    console.log(this.whichRama);
    switch(this.whichRama){

        case(0):
            this.NinfaStats = new Stats(1,2,3,1,2,3);
            this.spriteArray = ['rama','ramaSonrojada','rama1.','rama2.','rama3.','NinfaCerezo1','NinfaCerezo1Feliz','NinfaCerezo1Triste','NinfaCerezo1Enfadado']; //Seteamos su array de sprites
            this.ninfa = new Ninfa(this, this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, this.spriteArray,this.whichRama,this.NinfaStats); //Creamos la ninfa
        break;

        case(1):
            this.NinfaStats = new stats(3,2,1,2,3,1);
            this.spriteArray = ['rama','ramaSonrojada','rama1.','rama2.','rama3.','NinfaCerezo2','NinfaCerezo2Feliz','NinfaCerezo2Triste','NinfaCerezo2Enfadado']; //Seteamos su array de sprites
            this.ninfa  = new Ninfa(this, this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, this.spriteArray,this.whichRama, this.NinfaStats); //Creamos la ninfa
        break;
        
        case(2):
            this.NinfaStats = new stats(2,1,1,3,2,3);
            this.spriteArray = ['rama','ramaSonrojada','rama1.','rama2.','rama3.','NinfaSauceLloron1','NinfaSauceLloron1Feliz','NinfaSauceLloron1Triste','NinfaSauceLloron1Enfadado']; //Seteamos su array de sprites
            this.ninfa  = new Ninfa(this, this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, this.spriteArray,this.whichRama, this.NinfaStats); //Creamos la ninfa
        break;

        case(3):
            this.NinfaStats = new stats(3,1,2,3,1,2);
            this.spriteArray = ['rama','ramaSonrojada','rama1.','rama2.','rama3.','NinfaSauceLloron2','NinfaSauceLloron2Feliz','NinfaSauceLloron2Triste','NinfaSauceLloron2Enfadado']; //Seteamos su array de sprites
            this.ninfa  = new Ninfa(this, this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, this.spriteArray,this.whichRama, this.NinfaStats); //Creamos la ninfa
        break;

        case(4):
            this.NinfaStats = new stats(2,3,3,2,1,1);
            this.spriteArray = ['rama','ramaSonrojada','rama1.','rama2.','rama3.','NinfaPalmera1','NinfaPalmera1Feliz','NinfaPalmera1Triste','NinfaPalmera1Enfadado']; //Seteamos su array de sprites
            this.ninfa  = new Ninfa(this, this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, this.spriteArray,this.whichRama, this.NinfaStats); //Creamos la ninfa
        break;

        case(5):
            this.NinfaStats = new stats(1,3,2,1,3,2);
            this.spriteArray = ['rama','ramaSonrojada','rama1.','rama2.','rama3.','NinfaPalmera2','NinfaPalmera2Feliz','NinfaPalmera2Triste','NinfaPalmera2Enfadado']; //Seteamos su array de sprites
            this.ninfa  = new Ninfa(this, this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, this.spriteArray,this.whichRama, this.NinfaStats); //Creamos la ninfa
        break;

    }

    /* Pruebas */
    console.log( this.ninfa );
    this.card = new card(this,'card',0,1,0,0,0,0); //Chuleta de stats: [empatia, extorsion, estabilidadMental, creatividad, paciencia, inteligencia]
    console.log(this.card);
    this.ninfa.ReadCardStats(this.card.stats)
        
}
changeScene(final){
    switch (final) {
        case 0: //Ninguno cumple los requisitos para pasar de ronda
            console.log("RamaKaboom");
        break;

        case 1: //Cumplen los requisitos para pasar de 1 ronda pero no para la segunda
            console.log("NosotrosKaboom");
        break;

        case 2: //Gana el player 1 pero no el player 2
            console.log("Win jaja player 2 kaboom");
        break;

        case 3: //Gana el player 2 pero no el player 1
            console.log("Win jaja player 1 kaboom");
        break;

        case 4: //Ganan ambos y se acepta poliamor
            console.log("2 pa 1 cada cual que interprete lo que quiera");
        break;

        case 5: //Ganan ambos pero uno rechaza el poliamor
            console.log("Todo hace kaboom");
        break;
    }
  }
}