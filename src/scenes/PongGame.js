import Phaser, { Scene } from 'phaser';
import Court2 from '../assets/pong/png/court_02.png'
import CourtLines from '../assets/pong/png/court_center_btn_pause.png'
import LeftGoalPost from '../assets/pong/png/goal_posts_left.png'
import RightGoalPost from '../assets/pong/png/goal_posts_right.png'
import Baw from '../assets/pong/png/ball_frames.png'
import BawShadow from '../assets/pong/png/ball_shadow.png'
import PudA from '../assets/pong/png/pud_left.png'
import PudB from '../assets/pong/png/pud_right.png'
import ScoreNumbers from '../assets/pong/png/numbers_score.png'

// to do:

// rounded paddles
// either need to use blank sprites/images + graphics that matches the sprite/image position
// or I could just create each piece circle rectangle circle to form paddle group
// also could draw the path and export the shape - but have to switch to matter physics

// put all boundaries into static group

// 2 minute timer - highest score triggers win/lose image
// 

// when score is 9, you win
// when enemy score is 9 you lose
//reset ball and puds

//corner collisions

//basic match making for participants to be able to play

// quick intro animation
// menu screen


// music for each scene
//https://www.epidemicsound.com/my-music/playlists/10975289/
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

let puda;

//initilize score keys
let PUDA_SCORE = 0;
let PUDB_SCORE = 0;

let W_KEY, A_KEY, S_KEY, D_KEY;

let baseMovementSpeed = 250;
let bawShadow, baw;

class PongGame extends Phaser.Scene {

    constructor() {
        super('PongGame');
    }

    preload() {             
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


    }

    create() {
        let court2 = this.add.image(0, 0, 'court2').setOrigin(0,0);
        let courtLines = this.add.image(1280/2, 150, 'courtLines')
        courtLines.setOrigin(0.5,0)


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
        
        let paddleDefaultWidth = 46;
        let paddleDefaultHeight = 150;

       //this.scene.start('GameSelectScene')
        // paddle Adddd
        let pudaStartingX = 1280*.15;
        let pudaStartingY = 860/2;
       
       
        //paddle A
       puda = this.physics.add.sprite(pudaStartingX, pudaStartingY, 'puda')
       puda.setScale(.5)
       puda.setOrigin(0,.5)
       puda.setBounce(0.05,0.05)
       puda.setCollideWorldBounds(true)

        //paddle B
       let pudb = this.physics.add.sprite(1280*.80, 860/2, 'pudb')
       pudb.setScale(.5)
       pudb.setOrigin(0,.5)
       pudb.setBounce(1,1)
       pudb.setCollideWorldBounds(true)




       // invisible boundaries
      let topWall = this.physics.add.staticSprite(1280/2, 45, 'none').setOrigin(0,0).setSize(1280, 200)
      let bottomWall = this.physics.add.staticSprite(1280/2, 860-50, 'none').setOrigin(0,0).setSize(1280, 200)

      // puda goal posts
      let pudaGoalPostTop = this.physics.add.staticSprite(1280/9-30, 195, 'none').setOrigin(0,0).setSize(80, 80)
      let pudaGoalPostBottom = this.physics.add.staticSprite(1280/9-30, 860-200, 'none').setOrigin(0,0).setSize(80, 80)

      // pudb goal posts
      let pudbGoalPostTop = this.physics.add.staticSprite(1280-114, 195, 'none').setOrigin(0,0).setSize(80, 80)
      let pudbGoalPostBottom = this.physics.add.staticSprite(1280-114, 860-200, 'none').setOrigin(0,0).setSize(80, 80)

      // colliders
      this.physics.add.collider(baw, topWall);
      this.physics.add.collider(baw, bottomWall);
      this.physics.add.collider(baw, puda);
      this.physics.add.collider(baw, pudb);

      this.physics.add.collider(puda, topWall);
      this.physics.add.collider(puda, bottomWall);
      
      this.physics.add.collider(pudb, topWall);
      this.physics.add.collider(pudb, bottomWall);

                
      let leftGoalPost = this.add.image(3,120, 'leftGoalPost').setOrigin(0,0)
      let rightGoalPost = this.add.image(1280-138, 120, 'rightGoalPost').setOrigin(0,0)

        // score boards
        let pudaScoreNumber = this.add.sprite(20, 860/2-35, 'scoreNumbers', PUDA_SCORE)
        pudaScoreNumber.setOrigin(0,0)
            
        let pudbScoreNumber = this.add.sprite(1280-80, 860/2-35, 'scoreNumbers', PUDB_SCORE)
        pudbScoreNumber.setOrigin(0,0)

      // create overlap zone behind goal posts
      // puda end zone
      const pudaEndZone = this.physics.add.staticSprite(64, 410, 'blank')
      pudaEndZone.setOrigin(0,0)
      pudaEndZone.setSize(100, 500)

     const endZoneAOverlap = this.physics.add.overlap(baw, pudaEndZone, () =>{
        console.log("Pud B Scored!");
        PUDB_SCORE++
        pudbScoreNumber.setFrame(PUDB_SCORE)
        endZoneAOverlap.active = false;
          
      })

      //pudb end zone
      const pudbEndZone = this.physics.add.staticSprite(1280-64, 860-410, 'blank')
      pudbEndZone.setOrigin(0,0)
      pudbEndZone.setSize(100, 500)

      const endZoneBOverlap = this.physics.add.overlap(baw, pudbEndZone, () => {
        console.log("Pud A Scored!");
        PUDA_SCORE++
        pudaScoreNumber.setFrame(PUDA_SCORE)
        endZoneBOverlap.active = false;
      })






      // controls
    W_KEY = this.input.keyboard.addKey('W');  // Get key object
    S_KEY = this.input.keyboard.addKey('S');  // Get key object
    A_KEY = this.input.keyboard.addKey('A');  // Get key object
    D_KEY = this.input.keyboard.addKey('D');  // Get key object
    
    

    }
    
    update() {

    // controls
    // PudA UP
    if (W_KEY.isDown) {
        puda.setVelocityY(-baseMovementSpeed)
    }
    if (Phaser.Input.Keyboard.JustUp(W_KEY)) {
        puda.setVelocityY(0)
    }

    // PudA DOWN
    if (S_KEY.isDown) {
        puda.setVelocityY(baseMovementSpeed)
    } 
    if (Phaser.Input.Keyboard.JustUp(S_KEY)) {
        puda.setVelocityY(0)
    }   
    // PudA Left
    if (A_KEY.isDown) {
        puda.setVelocityX(-baseMovementSpeed)
    }
    if (Phaser.Input.Keyboard.JustUp(A_KEY)) {
        puda.setVelocityX(0)
    }

    // PudA Right
    if (D_KEY.isDown) {
        puda.setVelocityX(baseMovementSpeed)
    } 
    if (Phaser.Input.Keyboard.JustUp(D_KEY)) {
        puda.setVelocityX(0)
    }

    // ball shadow follow ball
    //bawShadow.x = baw.x; bawShadow.y = baw.y

    // if ball goes into endzone A
  

    }

    pudAScored() {

    }

    pudBScored() {

    }
    
    resetCourt() {
        // reset pud a
        // pud b
        // baw
    }


}

    export default PongGame;