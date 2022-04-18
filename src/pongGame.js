import Phaser from 'phaser';
//import logoImg from './assets/logo.png';
//import shipImg from './assets/thrust_ship2.png';
//import bulletImg from './assets/bullet0.png';

//ball
// paddle 1
// paddle 2
// score


class PongGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {

    }

    create ()
    {

    }

}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 900,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
          debug: true,
        }
    },
    scene: PongGame,    
};

const game = new Phaser.Game(config);