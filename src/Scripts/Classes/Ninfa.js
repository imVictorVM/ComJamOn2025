export default class Ninfa{
    constructor(scene, x, y, sprites, NinfaElegida,stats) {
        //super(scene, x, y, sprite); 
        this.scene = scene; //Referencia a la escena
        this.x = x; //Posición en X
        this.y = y; //Posición en Y

        //Creación y asignación de estadísticas

        //Ninfa elegida 
        this.Ninfa = NinfaElegida;

        //Seteo de las estadísticas en función de la NinfaElegida
        this.NinfaStats = stats;

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
        if(cardStats.extroversion == 1) this.NinfaStats.compareExtroversion();
        if(cardStats.estabilidadMental == 1) this.NinfaStats.compareEstabilidadMental();
        if(cardStats.creatividad == 1) this.NinfaStats.compareCreatividad();
        if(cardStats.paciencia == 1) this.NinfaStats.comparePaciencia();
        if(cardStats.inteligencia == 1) this.NinfaStats.compareInteligencia();
    }
}
