export default class AffectionSystem{
    Player1;
    Player2;
   

    constructor(){
        this.Player1 = 0;
        this.Player2 = 0;
    }

    AddRep(val, player){

        if (player == 1){
            this.AddPlayer1(val);
        }
        else if(player){
            this.AddPlayer2(val);
        }
        

    }

    //aumentos o disminuciones de los valores de afinidad
    AddAffection(valor,player) {

        if(player == 1){

            this.Player1 += valor;
        }
        else if (player == 2){
            this.Player2 += valor;
        }

        
        
    }

   

    GetPlayer1(){
        return this.Player1;
    }

    GetPlayer2(){
        return this.Player2;
    }



  

    
}