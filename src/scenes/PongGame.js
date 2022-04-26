import Phaser, { Scene } from 'phaser';
import Court2 from '../assets/pong/png/courtMars.png'
import CourtLines from '../assets/pong/png/court_center_btn_pause.png'
import LeftGoalPost from '../assets/pong/png/goal_posts_leftMars.png'
import RightGoalPost from '../assets/pong/png/goal_posts_rightMars.png'
import Baw from '../assets/pong/png/ball_frames.png'
import BawShadow from '../assets/pong/png/ball_shadow.png'
import PudA from '../assets/pong/png/pud_left.png'
import PudB from '../assets/pong/png/pud_right.png'
import ScoreNumbers from '../assets/pong/png/numbers_score.png'
import BlankPixel from '../assets/pong/png/blankPixel.png'

import BallKickSound1 from '../assets/pong/sfx/ballKickSound.mp3';
import GoalCheerSound from '../assets/pong/sfx/crowdGoalcheer.mp3';
//RAWBall - Remote Access Workforce Ball
// to do:



// 2 minute timer - highest score triggers win/lose image
// 

// when score is 9, you win
// when enemy score is 9 you lose

//reset ball and puds

// add back button


// shift slow speed + curve hit
// space fast dash + strong hit
// directional control based on Y movement

//basic match making for participants to be able to play


// sound effects
//https://www.videvo.net/royalty-free-sound-effects/tennis/
//https://www.zapsplat.com/?s=ball+kick&post_type=music&sound-effect-category-id=

// particle effects

//spotlight - ball color effects
//https://labs.phaser.io/edit.html?src=src/display/blend%20modes/graphics%20blend%20mode.js&v=3.55.2
// ball trail effect
//https://labs.phaser.io/view-iframe.html?src=src/game%20objects/graphics/Trail.js&v=3.55.2

// powerups (bullets etc) motion
//https://phaser.io/examples/v3/view/physics/arcade/tween-velocity

// camera shake
//https://labs.phaser.io/edit.html?src=src/game%20objects/particle%20emitter/camera%20test.js&v=3.55.2

// authentication
// user avatar & name
// wallet connect
// nft scan
// nft selection

// websockets or gunjs sockets
// player0 left player1 right

let staticWalls;

let puda;
let pudaStartingX = 1280*.15;
let pudaStartingY = 860/2;

let pudb;
let pudbStartingX = 1280*.80;
let pudbStartingY = 860/2;

//initilize score keys
let PUDA_SCORE = 0;
let PUDB_SCORE = 0;

let W_KEY, A_KEY, S_KEY, D_KEY, SPACE_KEY, SHIFT_KEY;

let baseMovementSpeed = 250;
let fastMovementSpeed = 500;
let currentSpeed;
let bawShadow, baw;

let ballY;
let ballX;

let pudbX;
let pudbY;

let pudaScoreNumber;
let pudbScoreNumber

let bounce1;
let goalCheer;

// timer
var text;
var timedEvent;

class PongGame extends Phaser.Scene {

    constructor() {
        super('PongGame');
    }

    preload() {             
        // invisible barriers
        this.load.image('blankPixel', BlankPixel);
        //court
        this.load.image('court2', Court2);

        // court designs
        this.load.image('courtLines', CourtLines)

        // left goal post
        this.load.image('leftGoalPost', LeftGoalPost)

        // right goal post
        this.load.image('rightGoalPost', RightGoalPost)

        // ball 6 frames 48x48
        this.load.spritesheet('baw', Baw, {
            frameWidth: 48,
            frameHeight: 48
        });
        // balls shadow
        this.load.image('bawShadow', BawShadow)

        // paddleA
        this.load.spritesheet('puda', PudA, {
            frameWidth: 100,
            frameHeight: 200
        });
        // paddleB
        this.load.spritesheet('pudb', PudB, {
            frameWidth: 100,
            frameHeight: 200
        });

        // end zone a
        // end zone b

        //scoreNumbers
        this.load.spritesheet('scoreNumbers', ScoreNumbers, {
            frameWidth: 64,
            frameHeight: 64
        })

        // SFX
        this.load.audio('ballKickSound1', BallKickSound1)
        this.load.audio('goalCheer', GoalCheerSound)
    }

    create() {
        let court2 = this.add.image(0, 0, 'court2').setOrigin(0,0);
        let courtLines = this.add.image(1280/2, 150, 'courtLines')
        courtLines.setOrigin(0.5,0)

        // 2:30 in seconds
        this.initialTime = 120;
        text = this.add.text(1280/2-60, 32, 'Countdown: ' + this.formatTime(this.initialTime));
        // Each 1000 ms call onEvent
        timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });

        

        // shadow
        //bawShadow = this.physics.add.sprite(1280/2, 860/2, 'bawShadow')
        //bawShadow.setOrigin(0.5,0.5)

        // ball
        baw = this.physics.add.sprite(1280/2, 860/2, 'baw', 0)
        baw.setCircle(23)
        baw.setOrigin(0.5,0.5)
        baw.setVelocity(0,0)
        baw.setBounce(1,1)
        baw.setCollideWorldBounds(true);     

        // ball sounds
        bounce1 = this.sound.add('ballKickSound1', {loop: false})
        // goal sound        
        goalCheer = this.sound.add('goalCheer', {loop: false})
        
        let paddleDefaultWidth = 46;
        let paddleDefaultHeight = 150;

       //this.scene.start('GameSelectScene')
        // paddle Adddd
     
       
        //paddle A
       puda = this.physics.add.sprite(pudaStartingX, pudaStartingY, 'puda')
       puda.setScale(.5)
       puda.setOrigin(0,.5)
       puda.setBounce(1,1)
       puda.setCollideWorldBounds(true)


        //paddle B
       pudb = this.physics.add.sprite(pudbStartingX, pudbStartingY, 'pudb')
       pudb.setScale(.5)
       pudb.setOrigin(0,.5)
       pudb.setBounce(1,1)
       pudb.setCollideWorldBounds(true)


    // set walls as static group
        staticWalls = this.physics.add.staticGroup()

       // invisible boundaries
      let topWall = staticWalls.create(1280/2, 45, 'blankPixel').setOrigin(0,0).setSize(1280, 200).setBounce(1,1)
      let bottomWall = staticWalls.create(1280/2, 860-50, 'blankPixel').setOrigin(0,0).setSize(1280, 200).setBounce(1,1)

      // puda goal posts
      let pudaGoalPostTop = staticWalls.create(1280/9-30, 195, 'blankPixel').setOrigin(0,0).setSize(80, 80).setBounce(1,1)
      let pudaGoalPostBottom = staticWalls.create(1280/9-30, 860-200, 'blankPixel').setOrigin(0,0).setSize(80, 80).setBounce(1,1)

      // pudb goal posts
      let pudbGoalPostTop = staticWalls.create(1280-114, 195, 'blankPixel').setOrigin(0,0).setSize(80, 80).setBounce(1,1)
      let pudbGoalPostBottom = staticWalls.create(1280-114, 860-200, 'blankPixel').setOrigin(0,0).setSize(80, 80).setBounce(1,1)

      // colliders ball with paddles

      this.physics.add.collider(baw, puda, function(){
        
        //bounce1.on('complete', listener);
        bounce1.play()
      });
      this.physics.add.collider(baw, pudb, function(){
        bounce1.play()
      });



                
      let leftGoalPost = this.add.image(3,120, 'leftGoalPost').setOrigin(0,0)
      let rightGoalPost = this.add.image(1280-138, 120, 'rightGoalPost').setOrigin(0,0)

        // score boards
        pudaScoreNumber = this.add.sprite(20, 860/2-35, 'scoreNumbers', PUDA_SCORE)
        pudaScoreNumber.setOrigin(0,0)
            
        pudbScoreNumber = this.add.sprite(1280-80, 860/2-35, 'scoreNumbers', PUDB_SCORE)
        pudbScoreNumber.setOrigin(0,0)

      // create overlap zone behind goal posts
      // puda end zone
      const pudaEndZone = this.physics.add.staticSprite(34, 410, 'blank')
      pudaEndZone.setOrigin(0,0)
      pudaEndZone.setSize(20, 500)

     const endZoneAOverlap = this.physics.add.overlap(baw, pudaEndZone, () =>{
        console.log("Pud B Scored!");
        PUDB_SCORE++
        pudbScoreNumber.setFrame(PUDB_SCORE)
        endZoneAOverlap.active = false;
        goalCheer.play()
        this.physics.world.timeScale = 4;
          this.resetCourt()
      })

      //pudb end zone
      const pudbEndZone = this.physics.add.staticSprite(1280-64+30, 860-410, 'blank')
      pudbEndZone.setOrigin(0,0)
      pudbEndZone.setSize(20, 500)

      const endZoneBOverlap = this.physics.add.overlap(baw, pudbEndZone, () => {
        console.log("Pud A Scored!");
        PUDA_SCORE++
        pudaScoreNumber.setFrame(PUDA_SCORE)
        endZoneBOverlap.active = false;
        goalCheer.play()
        this.physics.world.timeScale = 6;
        this.resetCourt()
      })


      // controls
    W_KEY = this.input.keyboard.addKey('W');  // Get key object
    S_KEY = this.input.keyboard.addKey('S');  // Get key object
    A_KEY = this.input.keyboard.addKey('A');  // Get key object
    D_KEY = this.input.keyboard.addKey('D');  // Get key object
    SPACE_KEY = this.input.keyboard.addKey('SPACE')
  

    }
    
    update() {


        // colliders grouped
        this.physics.world.collide(baw, staticWalls);
        this.physics.world.collide(puda, staticWalls);
        this.physics.world.collide(pudb, staticWalls);
        this.physics.world.collide(puda, pudb);
    currentSpeed = baseMovementSpeed
    // controls
    if (SPACE_KEY.isDown) {
        currentSpeed = fastMovementSpeed
    }    
    if (Phaser.Input.Keyboard.JustUp(SPACE_KEY)) {
        currentSpeed = baseMovementSpeed
    }

    // PudA UP
    if (W_KEY.isDown) {
        puda.setVelocityY(-currentSpeed)
    }
    if (Phaser.Input.Keyboard.JustUp(W_KEY)) {
        puda.setVelocityY(0)
    }

    // PudA DOWN
    if (S_KEY.isDown) {
        puda.setVelocityY(currentSpeed)
    } 
    if (Phaser.Input.Keyboard.JustUp(S_KEY)) {
        puda.setVelocityY(0)
    }   
    // PudA Left
    if (A_KEY.isDown) {
        puda.setVelocityX(-currentSpeed)
    }
    if (Phaser.Input.Keyboard.JustUp(A_KEY)) {
        puda.setVelocityX(0)
    }

    // PudA Right
    if (D_KEY.isDown) {
        puda.setVelocityX(currentSpeed)
    } 
    if (Phaser.Input.Keyboard.JustUp(D_KEY)) {
        puda.setVelocityX(0)
    }

    // ball shadow follow ball
    //bawShadow.x = baw.x; bawShadow.y = baw.y

    // if ball goes into endzone A
    
    
    //  enemy AI
    // get ball position
    // move pudb toward position + with additional Y to aim toward puda goal
    
    ballX = baw.x;
    ballY = baw.y

    pudbX = pudb.x;
    pudbY = pudb.y;


    }

    createCourt() {
                            //paddle A
       puda = this.physics.add.sprite(pudaStartingX, pudaStartingY, 'puda')
       puda.setScale(.5)
       puda.setOrigin(0,.5)
       puda.setBounce(1,1)
       puda.setCollideWorldBounds(true)


        //paddle B
       pudb = this.physics.add.sprite(pudbStartingX, pudbStartingY, 'pudb')
       pudb.setScale(.5)
       pudb.setOrigin(0,.5)
       pudb.setBounce(1,1)
       pudb.setCollideWorldBounds(true)

               // ball
               baw = this.physics.add.sprite(1280/2, 860/2, 'baw', 0)
               baw.setCircle(23)
               baw.setOrigin(0.5,0.5)
               baw.setVelocity(0,0)
               baw.setBounce(1,1)
               baw.setCollideWorldBounds(true); 

                    // colliders ball with paddles

      this.physics.add.collider(baw, puda, function(){
        
        //bounce1.on('complete', listener);
        bounce1.play()
      });
      this.physics.add.collider(baw, pudb, function(){
        bounce1.play()
      });
          // create overlap zone behind goal posts
      // puda end zone
      const pudaEndZone = this.physics.add.staticSprite(34, 410, 'blank')
      pudaEndZone.setOrigin(0,0)
      pudaEndZone.setSize(20, 500)

     const endZoneAOverlap = this.physics.add.overlap(baw, pudaEndZone, () =>{
        console.log("Pud B Scored!");
        PUDB_SCORE++
        pudbScoreNumber.setFrame(PUDB_SCORE)
        endZoneAOverlap.active = false;
        goalCheer.play()
        this.physics.world.timeScale = 3;
          this.resetCourt()
      })

      //pudb end zone
      const pudbEndZone = this.physics.add.staticSprite(1280-64+30, 860-410, 'blank')
      pudbEndZone.setOrigin(0,0)
      pudbEndZone.setSize(20, 500)

      const endZoneBOverlap = this.physics.add.overlap(baw, pudbEndZone, () => {
        console.log("Pud A Scored!");
        PUDA_SCORE++
        pudaScoreNumber.setFrame(PUDA_SCORE)
        endZoneBOverlap.active = false;
        goalCheer.play()
        this.physics.world.timeScale = 3;
        this.resetCourt()
      })
    }
    resetCourt() {
        //this.physics.pause()
        this.time.delayedCall(1000, ()=> {
            puda.destroy()
            pudb.destroy()
            baw.destroy()

            this.createCourt()

        this.physics.world.timeScale = 1;

        }, [], this)
        
        //var timer = this.time.delayedCall(20*1000, this.physics.pause());  // delay in ms

        // reset pud a
        //puda.set
        // pud b
        // baw
    }
    formatTime(seconds){
        // Minutes
        var minutes = Math.floor(seconds/60);
        // Seconds
        var partInSeconds = seconds%60;
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2,'0');
        // Returns formated time
        return `${minutes}:${partInSeconds}`;
    }
    
    // timer end event
    onEvent ()
    {
        this.initialTime -= 1; // One second
        text.setText('Countdown: ' + this.formatTime(this.initialTime));
        console.log("End");
    }


}

    export default PongGame;