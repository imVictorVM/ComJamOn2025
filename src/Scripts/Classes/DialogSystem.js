
export default class DialogSystem {

    constructor(scene, affectionSystem, allDialogues, character) {
        this.scene = scene;
        this.Dialogues = allDialogues;

        this.affectionSystem = affectionSystem;

        this.character = character;

        this.centerX = this.scene.cameras.main.width / 2;
        this.centerY = this.scene.cameras.main.height / 1.1;

        //Índice de las 3 opciones
        this.actualOptionIndex = 0;

        //Actual Option
        this.actualOption;

        //Array de Botones
        this.button = [];
        // Elementos gráficos para el nombre y diálogo
        this.characterNameBox = this.scene.add.graphics();
        this.characterNameText = this.scene.add.text(0, 0, '', { 
            fontSize: '40px', 
            fill: '#fff', 
            fontFamily: 'Arial, sans-serif', 
            stroke: '#000', 
            strokeThickness: 4 
        }).setOrigin(0.5, 0.5);

        this.dialogueBox = this.scene.add.graphics();
        this.dialogueText = this.scene.add.text(0, 0, '', { 
            fontSize: '36px', 
            fill: '#fff', 
            fontFamily: 'Arial, sans-serif', 
            wordWrap: { width: this.scene.cameras.main.width - 200, useAdvancedWrap: true },
            stroke: '#000', 
            strokeThickness: 4
        }).setOrigin(0, 0).setShadow(2, 2, '#000000', 5, true, false);

        this.dialogues = [];
        this.dialogIndex = 0;
        this.optionButtons = [];
        this.hasOptions = false;
        this.end = false;

        
    }

    showEventDialogues(eventId, allDialogues) {

        const eventDialogues = allDialogues[eventId];
        if (!eventDialogues) return;

   //     console.log("Metodo showEventDialogues antes" + this.dialogIndex);

        this.end = false;
        this.dialogues = eventDialogues.dialogs;
        this.dialogIndex = 0;

//        console.log("Metodo showEventDialogues despues" + this.dialogIndex);

        // Muestra la capa oscura desde la escena principal
        this.scene.events.emit('showDialogueBackground');
        this.showNextDialogue();
        
    }

    showNextDialogue() {
    //    console.log("Indice Actual " + this.dialogIndex);
    //    console.log("Tamaño" + this.dialogues.length);
        if (this.dialogIndex < this.dialogues.length) {
            const { character, text, options = [] } = this.dialogues[this.dialogIndex];

            

            // Mostrar nombre del personaje y cuadro
            this.characterNameText.setText(character);
            const nameBoxWidth = 300;
            const nameXPosition = this.centerX - 910; 
            this.characterNameText.setPosition(nameXPosition + nameBoxWidth / 2, this.centerY - 170);

            this.characterNameBox.clear();
            this.characterNameBox.lineStyle(2, 0x000000, 1);
            this.characterNameBox.fillStyle(0x000000, 0.8);
            this.characterNameBox.fillRect(nameXPosition, this.centerY - 200, nameBoxWidth, 60);
            this.characterNameBox.strokeRect(nameXPosition, this.centerY - 200, nameBoxWidth, 60); 

            //Cambiar sprites (voy a diferenciar entre lo que son 2 personajes y los que son solo 1)
            /*if(this.character.num ==0)
            {
                if(character == "Tarik")
                {
                    this.character.changeSprite(2);
     
                }
               else if(character == "Eshe")
               {
                   this.character.changeSprite(3);
               }
               else
               {
                   this.character.changeSprite(1);
               }
            }
            else if(character != "Shai")
            {
                this.character.changeSprite(2);
            }
            else{
                this.character.changeSprite(1);
            }*/

            // Limpiar botones previos
            this.optionButtons.forEach(button => button.destroy());
            this.optionButtons = [];

            // Cuadro de diálogo
            const dialogueBoxHeight = this.scene.cameras.main.height / 5;
            const dialogueBoxYPosition = this.centerY - 130;

            this.dialogueBox.clear();
            this.dialogueBox.lineStyle(2, 0x000000, 1);
            this.dialogueBox.fillStyle(0x000000, 0.8);
            this.dialogueBox.fillRect(50, dialogueBoxYPosition, this.scene.cameras.main.width - 100, dialogueBoxHeight);
            this.dialogueBox.strokeRect(50, dialogueBoxYPosition, this.scene.cameras.main.width - 100, dialogueBoxHeight);

            // Mostrar texto
            const textMarginTop = 50;
            this.dialogueText.setText(text);
            this.dialogueText.setPosition(150, dialogueBoxYPosition + textMarginTop);

            // Crear opciones
            if (options.length > 0) {
                this.hasOptions = true;

                let baseYPosition = dialogueBoxYPosition -100; //Punto fijo en y

                options.reverse().forEach((option, index) => {
                    const buttonText = `→ ${option.response}`;
                    const initialXPosition = this.centerX + 910; // Punto fijo en X

                    // Posición temporal
                     this.button[index] = this.scene.add.text(initialXPosition, baseYPosition, buttonText, {
                        font: '30px Arial, sans-serif',
                        fill: '#fff',
                        stroke: '#000',
                        strokeThickness: 4,
                        backgroundColor: '#000000',
                        padding: { x: 30, y: 20 },
                        fontStyle: 'bold'
                    }).setOrigin(0.5)
                    this.button[index].setStyle({ fill: '#000000', backgroundColor: '#ffffff' });
                  
                   
                        this.scene.events.on('selectAnswer', () => {
                            this.actualOption = options[this.actualOptionIndex];
                        });
                    // Ajustar x
                    const adjustedXPosition = initialXPosition - this.button[index].width / 2;
                    this.button[index].setX(adjustedXPosition);

                    
                    // Siguente botón (hacia arriba)
                    baseYPosition -=  this.button[index].height+20; // + altura del botón anterior

                    
                    this.optionButtons.push( this.button[index]);
                    ++index;
                });

                // Revertir la lista de botones para mantener el orden original
                options.reverse();
            } else {
                this.hasOptions = false;
            }


            this.dialogIndex++;
            
        } else if (this.dialogIndex !=0) {
            // Fin del diálogo
            this.end = true;
            this.scene.events.emit('hideDialogueBackground'); 
            this.dialogueText.setText('');
            this.characterNameText.setText('');
            this.optionButtons.forEach(button => button.destroy());
            this.characterNameBox.clear();
            this.dialogueBox.clear();
            this.dialogIndex = 0;
        }
    }



    handleOptionSelection(gain, player,option) {

      
        this.affectionSystem.AddAffection(gain, player);
        
        if (option.next) {
          //  console.log("OPCION " + option.next);
            this.showEventDialogues(option.next, this.Dialogues);
        }
    }

    onPointerDown(optionIndex) {
       
        if (!this.hasOptions && !this.end) {
            this.showNextDialogue();
        }
    }
}
