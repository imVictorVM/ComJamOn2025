export default class Timer extends Phaser.GameObjects.Graphics
 {
    constructor(scene,x,y) {
        super(scene, x, y);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.bar = new Phaser.GameObjects.Graphics(this.scene);
        this.value = 2000; //Valor del timer, siempre el mismo
        this.p = 76 / 100 //Puntos del value
        this.draw(); //Dibuja el slider
        this.scene.add.existing(this.bar); //Importante: Agregar el objeto a la escena
    } 

    decreaseValue(value){

        this.value -= value;
        console.log(this.value);
        if (this.value < 0)
            {
                this.value = 0;
            }
    
            this.draw();
    
            return (this.value === 0);
    }

    draw(){

        //  Reset the bar
        this.bar.clear();

        this.bar.fillStyle(0xff0000); // Color de la barra

        //Checks the actual value of the time
        var d = Math.floor(this.p * this.value / 4);

        //Draw the slider
        this.bar.fillRect(this.x + 2, this.y + 2, d, 12);

    }

    restartTimer(){
        this.value = 2000;
    }
}
