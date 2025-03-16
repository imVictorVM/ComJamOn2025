export default class Explosion{
    constructor(scene, x, y, sprites) {
        //super(scene, x, y, sprite); 
        this.scene = scene; //Referencia a la escena
        this.x = x; //Posición en X
        this.y = y; //Posición en Y


        //Todos los sprites (la rama y la ninfa en cuestión)

        this.spriteList = sprites;

        //Seteo del sprite de la rama en escena
        this.baseSprite = this.spriteList[0]; //Setea inicialmente el sprite de la rama

        this.sprite = this.scene.add.sprite(this.x, this.y, this.baseSprite).setScale(0.4,0.4); //Añade el sprite de la rama en pantalla en la posición x e y
        //this.sprite.setVisible(false);

    }

    changeSprite(n)
    {
        this.sprite.setTexture(this.spriteList[n]);
    }

  
}
