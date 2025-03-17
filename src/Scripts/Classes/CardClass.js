import Stats from "./Stats.js";

export default class Card extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, width, height, extroversion,confianza,creatividad,paciencia,inteligencia,empatia) {
        super(scene, x, y, sprite);

        this.scene = scene;
        this.stats = new Stats(extroversion,confianza,creatividad,paciencia,inteligencia,empatia);
        this.selected = false;

        // Añadir el sprite a la escena
        this.scene.add.existing(this);

        // Establecer el tamaño en píxeles
        this.setDisplaySize(width, height);
    }
}
