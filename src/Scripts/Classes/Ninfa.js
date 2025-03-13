import Stats from "./Stats"
export default Ninfa;

class Ninfa {
    constructor(scene, x, y, sprites, NinfaElegida) {
       
        this.scene = scene; //Referencia a la escena
        this.x = x; //Posición en X
        this.y = y; //Posición en Y

        //Creación y asignación de estadísticas

        //Ninfa elegida 
        this.Ninfa = NinfaElegida;

        //Seteo de las estadísticas en función de la NinfaElegida

        switch(this.Ninfa){
            case(0):
            this.NinfaStats = Stats(1,2,3,1,2,3);
            break;
            case(1):
            this.NinfaStats = Stats(3,2,1,2,3,1);
            break;
            case(2):
            this.NinfaStats = Stats(2,1,1,3,2,3);
            break;
            case(3):
            this.NinfaStats = Stats(3,1,2,3,1,2);
            break;
            case(4):
            this.NinfaStats = Stats(2,3,3,2,1,1);
            break;
            case(5):
            this.NinfaStats = Stats(1,3,2,1,3,2);
            break;
        }

        //Todos los sprites (la rama y la ninfa en cuestión)

        this.spriteList = sprites;

        //Seteo del sprite de la rama en escena
        this.baseSprite = this.spriteList[0]; //Setea inicialmente el sprite de la rama

        this.sprite = this.scene.add.sprite(this.x, this.y, this.baseSprite); //Añade el sprite de la rama en pantalla en la posición x e y

    }


    // Cambiar Sprite (De rama a Ninfa,expresiones,sonroje...)
    // Chuleta de sprites: (rama,ramaSonrojada,rama1punto,rama2puntos,rama3puntos,Ninfa,NinfaFeliz,NinfaTriste,NinfaEnfadada)
    changeSprite(n)
    {
        this.sprite.setTexture(this.spriteList[n]);
    }

    //Recibe las estadísticas de la carta y comprueba sus estadísticas en función de las de la ninfa
    ReadCardStats(cardStats){
        if(cardStats.empatia == 1) this.NinfaStats.compareEmpatia();
        if(cardStats.extorsion == 1) this.NinfaStats.compareExtorsion();
        if(cardStats.estabilidadMental == 1) this.NinfaStats.compareEstabilidadMental();
        if(cardStats.creatividad == 1) this.NinfaStats.compareCreatividad();
        if(cardStats.paciencia == 1) this.NinfaStats.comparePaciencia();
        if(cardStats.inteligencia == 1) this.NinfaStats.compareInteligencia();
    }
}
