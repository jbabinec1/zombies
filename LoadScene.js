class LoadScene extends Phaser.Scene {
    constructor() {
      super("bootGame");
    }
  
    preload() {

        //this.load.image('player', 'assets/survivor.png', {frameWidth: 16, frameHeight: 16});

        this.load.image('reticle', 'assets/crosshair.png', {frameWidth: 2, frameHeight: 2});

        this.load.image('player', 'assets/player2.png', {frameWidth: 16, frameHeight: 16});

        this.load.image('armed_pistol_player', 'assets/armed_player_pistol.png', {frameWidth: 16, frameHeight: 16});

        this.load.image('zombie1', 'assets/zombie.png', {frameWidth: 16, frameHeight: 16});

        this.load.image('pistol', 'assets/pistol.png', {frameWidth: 3, frameHeight: 3});


        this.load.image('bullet', 'assets/bullet.png', {frameWidth: 2, frameHeight: 2});

     
        this.load.image("woodsMap", "assets/woods.png");
      
        this.load.tilemapTiledJSON('map', 'assets/zombie_woods.json');


        this.load.spritesheet("pistol-fire", "assets/gunFire.png", { frameWidth: 16, frameHeight: 16  }); 

        //this.load.spritesheet("pistol-gunfire", "assets/pistolFire.png", { frameWidth: 16, frameHeight: 16  }); 

        this.load.image("zombie_dead", "assets/zombie-dead.png", { frameWidth: 16, frameHeight: 16  }); 



        this.load.atlas({
          key: 'pistol_gunfire',
          textureURL: 'assets/pistolFire.png',
          atlasURL: 'assets/pistolFire.json'
        })

       


        this.load.atlas({
          key: 'player_sprite',
          textureURL: 'assets/main_player.png',
          atlasURL: 'assets/main_player.json'
        })


        
        this.load.audio("pistol_shot", ["assets/sounds/pistol.mp3"]);



    }



  
    create() {


      this.add.text(20, 20, "Loading game...");
      this.scene.start("playGame");


  

      let pistolFireFrames = [
        {key: 'pistol_gunfire', frame: 'gunFire2.png'},
        {key: 'pistol_gunfire', frame: 'gunFire3.png'},
      ]

       
      this.anims.create({
        key:"pistol-fire",
        frames: pistolFireFrames,
        frameRate: 10,
        repeat: 0,
        loop: false
        //hideOnComplete: true
      }) 

       
  

    


    }





  }