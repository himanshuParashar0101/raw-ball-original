import Phaser from 'phaser';
import PongGame from './scenes/PongGame';
import GameSelectScene from './scenes/GameSelect';

const GAME_HEIGHT = 860;
const GAME_WIDTH = 1280;

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
          debug: true,
        }
    },
    scene: [PongGame, GameSelectScene]
};

const game = new Phaser.Game(config);