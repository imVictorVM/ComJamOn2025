import MainMenuScene from "./MainMenu.js";

let config = {
	type: Phaser.AUTO,
	parent: 'juego',
	pixelArt: false,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,

		mode: Phaser.Scale.FIT,
		width: 1920,
		height: 1080,
		zoom: 1
	},
	scene: [MainMenuScene],
	physics: { 
		default: 'arcade', 
		arcade: { 

			debug: true 
		},
		checkCollision: {
			up: true,
			down: true,
			left: true,
			right: true
		}
	},
	title: "JuegoDeLigar_buildbena(1)",
	version: "1.0.0",
	transparent: false
};

new Phaser.Game(config);