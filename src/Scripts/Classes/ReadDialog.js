export default class ReadDialog {
    
    constructor(scene, dialogData = null) {
        this.scene = scene;  
        this.dialogData = dialogData || {};  
    }

    // Lector
    loadJSON(path) {
        return new Promise((resolve, reject) => {
           
            this.scene.load.json('dialogsData', path); // Cargar el archivo JSON con Phaser
            this.scene.load.once('complete', () => {
                this.dialogData = this.scene.cache.json.get('dialogsData'); // Obtener datos cargados
                resolve(this.dialogData);  
            });
            this.scene.load.start(); 
        });
    }

    // Obtener los diálogos de un evento específico
    getDialogues(eventoId) {
        const evento = this.dialogData[eventoId];
        if (evento) {
            return evento.dialogs;
        } else {
            console.warn(`Evento con ID "${eventoId}" no encontrado.`);
            return [];
        }
    }

    // Obtener el diálogo específico dentro de un evento
    getDialogue(eventoId, dialogIndex) {
        const dialogues = this.getDialogues(eventoId);
        if (dialogues.length > dialogIndex) {
            return dialogues[dialogIndex];
        } else {
            console.warn(`Diálogo en índice ${dialogIndex} no encontrado para el evento "${eventoId}".`);
            return null;
        }
    }


}
