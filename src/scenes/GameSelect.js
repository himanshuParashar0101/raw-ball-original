import Phaser from 'phaser';

class GameSelect extends Phaser.Scene {

    constructor() {
        super();
    }

    preload() {
        
    }

    create() {
       this.add.text(10, 10, "Pong")
    }

}

    export default GameSelect;