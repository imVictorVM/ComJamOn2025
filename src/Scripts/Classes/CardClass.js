import Stats from "./Stats.js"
export default class Card extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, sprite,empatia,extorsion,estabilidadMental,creatividad,paciencia,inteligencia) {
        super(scene, x, y, sprite);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.stats = new Stats(empatia,extorsion,estabilidadMental,creatividad,paciencia,inteligencia);
    } 
    setSprite(posX,posY){
       this.scene.add.sprite(posX, posY, this.sprite); //Añade el sprite de la rama en pantalla en la posición x e y
    }

}
