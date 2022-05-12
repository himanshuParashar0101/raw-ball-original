import Phaser from 'phaser';
import PongGame from './scenes/PongGame';
import StartMenu from './scenes/StartMenu';


const GAME_HEIGHT = 860;
const GAME_WIDTH = 1280;

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.FIT,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    parent: 'gameContainer',
    dom: {
      createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        }
    },
    scene: [StartMenu, PongGame]
};

const game = new Phaser.Game(config);