import stats from "./Stats"
export default Card;

class Card {
    constructor(scene, sprite,empatia,extorsion,estabilidadMental,creatividad,paciencia,inteligencia) {
        this.scene = scene;
        this.sprite = sprite;
        this.stats = new stats(empatia,extorsion,estabilidadMental,creatividad,paciencia,inteligencia);
    } 
    setSprite(posX,posY){
       this.scene.add.sprite(posX, posY, this.sprite); //Añade el sprite de la rama en pantalla en la posición x e y
    }

}
