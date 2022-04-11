import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import shipImg from './assets/thrust_ship2.png';
import bulletImg from './assets/bullet0.png';

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

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
          debug: true,
        }
    },
    scene: MyGameScene,    
};

const game = new Phaser.Game(config);