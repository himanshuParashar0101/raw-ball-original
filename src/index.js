import Phaser from 'phaser';

import PreloadScene from './scenes/Preload';
import GameSelectScene from './scenes/GameSelect';

const GAME_HEIGHT = 860;
const GAME_WIDTH = 1280;
/*
class MyGameScene extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        debugger
        this.load.image('ship', shipImg);
    }

    create ()
    {
        const ship = this.physics.add.image(300, 200, 'ship')
        
        ship.setVelocity(10, 10)
        ship.setBounce(1, 1)
        ship.setCollideWorldBounds(true)
        
    }

}
*/

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
    scene: [PreloadScene, GameSelectScene],    
};

const game = new Phaser.Game(config);