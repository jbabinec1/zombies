class LoadScene extends Phaser.Scene {
    constructor() {
      super("bootGame");
    }
  
    preload() {

        //this.load.image('player', 'assets/survivor.png', {frameWidth: 16, frameHeight: 16});

        this.load.image('player', 'assets/player2.png', {frameWidth: 16, frameHeight: 16});

        this.load.image('zombie1', 'assets/zombie.png', {frameWidth: 16, frameHeight: 16});


        this.load.image('reticle', 'assets/reticle.png', {frameWidth: 2, frameHeight: 2});


     
        this.load.image("woodsMap", "assets/woods.png");
      
        this.load.tilemapTiledJSON('map', 'assets/zombie_woods.json');

    }



  
    create() {


      this.add.text(20, 20, "Loading game...");
      this.scene.start("playGame");

    


    }





  }