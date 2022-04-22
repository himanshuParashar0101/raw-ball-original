import Phaser, { Scene } from 'phaser';

import GafferGreeting from '../assets/pong/png/gafferGreeting.png'

import StartMusic from '../assets/pong/sfx/StartMusic.mp3'
import StartVideo from '../assets/pong/vid/mars1_1.mp4'
import CourtBg from '../assets/pong/png/courtMars.png'

import LeftGoalPost from '../assets/pong/png/goal_posts_leftMars.png'
import RightGoalPost from '../assets/pong/png/goal_posts_rightMars.png'
import Roof from '../assets/pong/png/roofMars.png'
import GameLogo from '../assets/pong/png/rawballLogo.png'

import StartButton from '../assets/pong/png/startButton.png'


import BallKickSound1 from '../assets/pong/sfx/ballKickSound.mp3';
import MediumCheer6 from '../assets/pong/sfx/medcheer6.mp3';


var courtBg;
var leftGoalPost;
var rightGoalPost;
var roof;
var gameLogo;
var startButton;

// tween the images to snap into position quickly

// import soundControl icon

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
        this.load.image('gafferGreeting', GafferGreeting)
        this.load.audio('startMusic', StartMusic)     
        this.load.video('startVideo', StartVideo, 'videoReady', false, true)

        this.load.audio('ballKickSound1', BallKickSound1)
        this.load.audio('mediumCheer6', MediumCheer6)

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

         courtBg =  this.add.image(0, 890, 'courtBg').setOrigin(0,0);
         leftGoalPost = this.add.image(0, -860, 'leftGoalPost').setOrigin(0)
         rightGoalPost = this.add.image(1280-138, -860, 'rightGoalPost').setOrigin(0,0)
         roof = this.add.image(1280/5+10, -300, 'roof').setOrigin(0,0)
         gameLogo = this.add.image(1280/4+55, -286, 'logo').setOrigin(0,0)
         startButton = this.add.image(1280/2, -376, 'startButton').setOrigin(0.5,.5).setInteractive();

            
        let aboutScreen = this.add.image(0, 0, 'gafferGreeting').setOrigin(0).setInteractive()

        aboutScreen.on('pointerdown', function(){
            aboutScreen.destroy()
            this.sound.play('startMusic', {volume: 0.25});
            videoIntro.play(false)
            this.tweenImages()
        }, this)

        startButton.on('pointerdown', function (){
            this.sound.play('ballKickSound1')
            this.sound.play('mediumCheer6')
            this.scene.start('PongGame')
        }, this)


    }
    tweenImages() {
        // tween testing
        this.tweens.add({
            targets: courtBg,
            y: 0,
            duration: 1400,
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
            y: -60,
            duration: 1000,
            ease: 'Linear',
            yoyo: false,
            delay: 7300
        });
        this.tweens.add({
            targets: gameLogo,
            y: 40,
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
    



}

    export default StartMenu;