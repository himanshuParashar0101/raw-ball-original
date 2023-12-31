import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import shipImg from './assets/thrust_ship2.png';
import bulletImg from './assets/bullet0.png';

var bullets;
var ship;
var speed;
var stats;
var cursors;
var lastFired = 0;

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }


    
    preload ()
    {
        this.load.image('logo', logoImg);

        this.load.image('ship', shipImg);
        this.load.image('bullet', bulletImg);
        
    }
      
    create (){
        

        /*var keys = scene.input.keyboard.addKeys('W,S,A,D');
        var moveLeftKey = this.input.keyboard.addKey('A');
            this.moveLeft = moveLeftKey.isDown;
        var moveRightKey = this.input.keyboard.addKey('D');
            this.moveRight = moveRightKey.isDown;
        var moveUpKey = this.input.keyboard.addKey("W");
        var moveDownKey = this.input.keyboard.addKey("S");*/

        // Box2D works with meters. We need to convert meters to pixels.
        // let's say 30 pixels = 1 meter.
        this.worldScale = 30;
 
        // world gravity, as a Vec2 object. It's just a x, y vector
        let gravity = planck.Vec2(0,1);
 
        // this is how we create a Box2D world
        this.world = planck.World(gravity);
 
        // createBox is a method I wrote to create a box, see how it works at line 55
        this.createBox(game.config.width / 2, game.config.height - 20, game.config.width, 40, false);

       
       
        this.createShip(game.config.width / 2, game.config.height - 20, game.config.width, 40,);



        // the rest of the script just creates a random box each 500ms, then restarts after 100 iterations
        this.tick = 0;
        this.time.addEvent({
            delay: 500,
            callbackScope: this,
            callback: function(){
                this.createBox(Phaser.Math.Between(100, game.config.width - 100), -100, Phaser.Math.Between(20, 80), Phaser.Math.Between(20, 80), true);
                this.tick ++;
                if(this.tick == 100){
                    this.scene.start("PlayGame");
                }
            },
            loop: true
        });



    }
 
    // here we go with some Box2D stuff
    // arguments: x, y coordinates of the center, with and height of the box, in pixels
    // we'll conver pixels to meters inside the method
    createBox(posX, posY, width, height, isDynamic){
 
        // this is how we create a generic Box2D body
        let box = this.world.createBody();
        if(isDynamic){
 
            // Box2D bodies born as static bodies, but we can make them dynamic
            box.setDynamic();
        }
 
        // a body can have one or more fixtures. This is how we create a box fixture inside a body
        box.createFixture(planck.Box(width / 2 / this.worldScale, height / 2 / this.worldScale));
 
        // now we place the body in the world
        box.setPosition(planck.Vec2(posX / this.worldScale, posY / this.worldScale));
 
        // time to set mass information
        box.setMassData({
            mass: 1,
            center: planck.Vec2(),
 
            // I have to say I do not know the meaning of this "I", but if you set it to zero, bodies won't rotate
            I: 1
        });
 
        // now we create a graphics object representing the body
        var color = new Phaser.Display.Color();
        color.random();
        color.brighten(50).saturate(100);
        let userData = this.add.graphics();
        userData.fillStyle(color.color, 1);
        userData.fillRect(- width / 2, - height / 2, width, height);
 
        // a body can have anything in its user data, normally it's used to store its sprite
        box.setUserData(userData);
      
    }
    createShip(posX, posY, width, height) {
        let playerShip = this.world.createBody();
        playerShip.setDynamic();
        playerShip.createFixture(planck.Box(width/2/this.worldScale, height/2/this.worldScale));
        playerShip.setPosition(planck.Vec2(posX/this.worldScale, posY/this.worldScale))
        playerShip.setMassData({
            mass: 1,
            center: planck.Vec2(),
            I: 1
        });
        playerShip.setUserData
            //this.add.sprite(playerShip.getPosition().x, playerShip.getPosition().y, 'ship')
    }
    update(){
 
        // advance the simulation by 1/20 seconds
        this.world.step(1 / 30);
 
        // crearForces  method should be added at the end on each step
        this.world.clearForces();
 
        // iterate through all bodies
        for (let b = this.world.getBodyList(); b; b = b.getNext()){
 
            // get body position
            let bodyPosition = b.getPosition();
 
            // get body angle, in radians
            let bodyAngle = b.getAngle();
 
            // get body user data, the graphics object
            let userData = b.getUserData();
 
            // adjust graphic object position and rotation
            userData.x = bodyPosition.x * this.worldScale;
            userData.y = bodyPosition.y * this.worldScale;
            userData.rotation = bodyAngle;
        }

    }
}

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "thegame",
        width: 600,
        height: 600
    },
    scene: MyGame
};

const game = new Phaser.Game(config);

