class LoadScene extends Phaser.Scene {
    constructor() {
      super("bootGame");
    }
  
    preload() {

        //this.load.image('player', 'assets/survivor.png', {frameWidth: 16, frameHeight: 16});

        this.load.image('player', 'assets/player2.png', {frameWidth: 16, frameHeight: 16});

        this.load.image('armed_pistol_player', 'assets/armed_player_pistol.png', {frameWidth: 16, frameHeight: 16});

        this.load.image('zombie1', 'assets/zombie.png', {frameWidth: 16, frameHeight: 16});

        this.load.image('pistol', 'assets/pistol.png', {frameWidth: 3, frameHeight: 3});


        this.load.image('reticle', 'assets/reticle.png', {frameWidth: 2, frameHeight: 2});

        //this.load.spritesheet("bullet", "assets/bullet.png", { frameWidth: 3, frameHeight: 3  }); 

        this.load.image('bullet', 'assets/bullet.png', {frameWidth: 2, frameHeight: 2});

     
        this.load.image("woodsMap", "assets/woods.png");
      
        this.load.tilemapTiledJSON('map', 'assets/zombie_woods.json');


        this.load.atlas({
          key: 'player_sprite',
          textureURL: 'assets/main_player.png',
          atlasURL: 'assets/main_player.json'
        })



    }



  
    create() {


      this.add.text(20, 20, "Loading game...");
      this.scene.start("playGame");

    


    }





  }