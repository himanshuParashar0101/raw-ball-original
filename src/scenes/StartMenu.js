import Phaser, { Scene } from 'phaser';
import StartMusic from '../assets/pong/sfx/StartMusic.mp3'
import StartVideo from '../assets/pong/vid/mars1_1.mp4'
// import background
// import leftpost
// import rightpost

//import roof
// import logo

// import play button
// import play text

// tween the images to snap into position quickly

// import sound icon
// import character 1
// import character 2
// import character 3
// import about

// import sound1
// import sound2
// import sound3



// import video file
// import start menu assets
//RAWBall - Remote Access Workforce Ball
// to do:


//basic match making for participants to be able to play

// quick intro animation
// menu screen
// video background:
//https://www.storyblocks.com/video/stock/rocket-flies-through-the-clouds-r_pv4cb5sk2bpjq3q
//https://www.storyblocks.com/video/stock/space-rocket-leaving-earth-and-heading-into-outer-space-rd85pptuuk88dwinj
//https://www.storyblocks.com/video/stock/approaching-mars-as-it-spins-into-view-346688670
//https://www.storyblocks.com/video/stock/mars-base-from-orbit-hssphvo-inx6nr3w
//https://www.storyblocks.com/video/stock/space-capsule-reentry-in-mars-atmosphere-hv2xotdookpzkmsb2
//https://www.storyblocks.com/video/stock/tracking-shot-of-anonymous-people-in-spacesuits-walking-on-arid-ground-together-during-colonization-of-mars-bis9pvgsukpttqw18
//https://www.storyblocks.com/video/stock/martian-landscape-one-with-hab-4o7zo4v9gikk6mzq9
//https://www.storyblocks.com/video/stock/futuristic-spaceship-leaving-a-planet-30-fps-346874197



class StartMenu extends Phaser.Scene {

    constructor() {
        super('StartMenu');
    }

    preload() {        
        this.load.audio('startMusic', StartMusic)     
        this.load.video('startVideo', StartVideo, 'videoReady', false, true)
    }

    create() {
        var videoIntro = this.add.video(0,0,'startVideo')
        
        videoIntro.setDisplayOrigin(0)
        videoIntro.setDisplaySize(1280, 860)
        this.sound.play('startMusic', {volume: 0.5});
        videoIntro.play(false)
    }
    
    update() {

    }



}

    export default StartMenu;