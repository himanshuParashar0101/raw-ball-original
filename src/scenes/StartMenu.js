import Phaser, { Scene } from 'phaser';
import StartMusic from '../assets/pong/sfx/StartMusic.mp3'
import StartVideo from '../assets/pong/vid/mars1_1.mp4'
import CourtBg from '../assets/pong/png/courtMars.png'

import LeftGoalPost from '../assets/pong/png/goal_posts_leftMars.png'
import RightGoalPost from '../assets/pong/png/goal_posts_rightMars.png'
import Roof from '../assets/pong/png/roofMars.png'
import GameLogo from '../assets/pong/png/logo.png'

import StartButton from '../assets/pong/png/startButton.png'


import ballKickSound1 from '../assets/pong/sfx/ballKickSound.mp3';




// tween the images to snap into position quickly

// import sound icon
// import character 1
// import character 2
// import character 3
// import about


// import sound2
// import sound3


//RAWBall - Remote Access Workforce Ball
// to do:


//basic match making for participants to be able to play



class StartMenu extends Phaser.Scene {

    constructor() {
        super('StartMenu');
    }

    preload() {        
        this.load.audio('startMusic', StartMusic)     
        this.load.video('startVideo', StartVideo, 'videoReady', false, true)

        this.load.image('courtBg', CourtBg)
        
        this.load.image('leftGoalPost', LeftGoalPost)
        this.load.image('rightGoalPost', RightGoalPost)
        this.load.image('roof', Roof)
        this.load.image('logo', GameLogo)
        this.load.image('startButton', StartButton)
    }

    create() {
        var videoIntro = this.add.video(0,0,'startVideo')
        
        videoIntro.setDisplayOrigin(0)
        videoIntro.setDisplaySize(1280, 860)
        this.sound.play('startMusic', {volume: 0.25});
        videoIntro.play(false)
        // at video end do tweens 
        //this.tweenImages()
        var courtBg =  this.add.image(0, 890, 'courtBg').setOrigin(0,0);
        var leftGoalPost = this.add.image(0, -860, 'leftGoalPost').setOrigin(0)
        let rightGoalPost = this.add.image(1280-138, -860, 'rightGoalPost').setOrigin(0,0)
        let roof = this.add.image(1280/5+10, -276, 'roof').setOrigin(0,0)
        let gameLogo = this.add.image(1280/5+90, -276, 'logo').setOrigin(0,0)
        let startButton = this.add.image(1280/2, -376, 'startButton').setOrigin(0.5,.5).setInteractive();
        startButton.on('pointerdown', function (){
            this.scene.start('PongGame')
        }, this)
        // tween testing
        this.tweens.add({
            targets: courtBg,
            y: 0,
            duration: 1800,
            ease: 'Bounce',
            yoyo: false,
            delay: 7000
        });
        this.tweens.add({
            targets: leftGoalPost,
            y: 120,
            duration: 2000,
            ease: 'Bounce',
            yoyo: false,
            delay: 7100
        });
        this.tweens.add({
            targets: rightGoalPost,
            y: 120,
            duration: 2000,
            ease: 'Bounce',
            yoyo: false,
            delay: 7200
        });
        this.tweens.add({
            targets: roof,
            y: 0,
            duration: 1000,
            ease: 'Linear',
            yoyo: false,
            delay: 7300
        });
        this.tweens.add({
            targets: gameLogo,
            y: 20,
            duration: 1000,
            ease: 'Linear',
            yoyo: false,
            delay: 7300
        });
        this.tweens.add({
            targets: startButton,
            y: 860/2,
            duration: 1000,
            ease: 'Bounce',
            yoyo: false,
            delay: 7500
        });
    }
    
    update() {

    }
    tweenImages() {
        //var courtBg =  this.add.image(0, 890, 'courtBg').setOrigin(0,0);
        
    }



}

    export default StartMenu;