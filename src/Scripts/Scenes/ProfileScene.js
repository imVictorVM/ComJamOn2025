import Player1 from "../Classes/Player1.js";
import Player2 from "../Classes/Player2.js";

export default class ProfileScene extends Phaser.Scene {
    constructor(){
        super({key: "ProfileScene"})
        this.whichProfile;
        this.whatSelection = 1;
    }

init(profileSelected){
    
        this.whichProfile = profileSelected.selection;
        //console.log( this.whichProfile);
        
}

preload(){

}

    create(){
        this.whatSelection = 1;
        //JUGADORES
        this.Player1 = new Player1(this, 100, 100, 'player1');
        this.Player2 = new Player2(this, 100, 100, 'player2');       
   
        const fx=this.cameras.main.fadeIn(1000, 0, 0, 0);
        
        //FONDO 

        this.fondo=this.add.image(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 2,
            'ficha'+this.whichProfile
       )
       //.setScale(0.5);
    
        
        //CONFIRMAR
        this.confirmar=this.add.image(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 2,
            'confirmar'+  this.whichProfile
       )
   

        //VOLVER
        this.volver=this.add.image(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 2,
            'volver'+this.whichProfile
       )


       //this.confirmar.setTint(0x000000)
       ///this.confirmar.setTint=true;
      // this.confirmar.setTint=false;
      // this.volver.setTint(0x000000)

        

    
       this.pulsado1=false;
      
    }

    update(t,dt){
        super.update(t,dt);
        if( this.Player1.moveleft()|| this.Player2.moveleft()){
            if(this.whatSelection != 0){
                this.whatSelection -=1;

                this.pulsado1= true;
               
            }
            
            
        }
      

        if(this.Player1.moveright()|| this.Player2.moveright()){
            if(this.whatSelection != 1){
                this.whatSelection += 1;
                this.pulsado1=false;
               

            }
            
            
           
        }
        if (this.whatSelection == 0) {
            this.volver.setTint(0xFFFFFF);  // Blanco brillante
            this.confirmar.setTint(0xBBBBBB); // Gris más oscuro para diferenciar
        }
        
        if (this.whatSelection == 1) {    
            this.confirmar.setTint(0xFFFFFF);
            this.volver.setTint(0xBBBBBB);
        }

        if((this.Player1.select()|| this.Player2.select())){

            if(this.pulsado1)
            {
                this.scene.start('TreeScene');
            }
            else
            {
                this.scene.start('GameScene',{selection: this.whichProfile});

            }
            
        }
       

    }

   
}   