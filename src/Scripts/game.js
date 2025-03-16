import LoadScene from "./Scenes/LoadScene.js";
import MainMenuScene from "./Scenes/MainMenuScene.js";
import TreeScene from "./Scenes/TreeScene.js";
import CreditsScene from "./Scenes/CreditsScene.js";
import GameScene from "./Scenes/GameScene.js"
import ProfileScene from "./Scenes/ProfileScene.js";

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
	scene: [LoadScene,MainMenuScene,TreeScene,ProfileScene,CreditsScene,GameScene],
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
	title: "Cortejos Enramados",
	version: "1.0.0",
	transparent: false
};

new Phaser.Game(config);