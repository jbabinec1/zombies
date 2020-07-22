class Scene1 extends Phaser.Scene {
    constructor() {
      super("playGame");
    }
  
    create() {

        

        this.map = this.make.tilemap({
            key: 'map',
            tileWidth: 16,
            tileHeight: 16
          });


      this.tileset = this.map.addTilesetImage('zombies', 'woodsMap'); 
      
      this.grass = this.map.createStaticLayer('grass', this.tileset, 0, 0);  
      this.trees = this.map.createStaticLayer('trees', this.tileset, 0, 0); 

      

    

      
    //this.player = this.physics.add.sprite(32.3799, 291.419, 'player', 'survivor.png');
    this.player = new Player(this, 32.3799, 291.419, 'player').setScale(1.5);
    this.reticle = this.physics.add.sprite(32.3799, 320.00, 'reticle', 'reticle.png');

    this.zombie = this.physics.add.sprite(400, 100, 'zombie1', 'zombie.png').setScale(1.5);

    this.trees.setCollisionBetween(1, 4.5);
    this.physics.add.collider(this.player, this.trees);
    

    //this.player.body.setAllowGravity(false);
    this.reticle.body.setAllowGravity(false);

    this.physics.world.setBoundsCollision();

     // Locks pointer on mousedown
     game.canvas.addEventListener('mousedown', function () {
        game.input.mouse.requestPointerLock();
    });


        // Move reticle upon locked pointer move
        this.input.on('pointermove', function (pointer) {
            if (this.input.mouse.locked)
            {
                this.reticle.x += pointer.movementX;
                this.reticle.y += pointer.movementY;
            }
        }, this);
    
    
      


    //this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
   
    this.cursorKeys = this.input.keyboard.addKeys('W,S,A,D');

    //this.cameras.main.startFollow(this.player);

  /* this.cursorKeys = this.input.keyboard.addKeys({
      'W': Phaser.Input.Keyboard.KeyCodes.W,
      'S': Phaser.Input.Keyboard.KeyCodes.S,
      'A': Phaser.Input.Keyboard.KeyCodes.A,
      'D': Phaser.Input.Keyboard.KeyCodes.D
  }); */



    }  // End of create function


  

   update() {

    this.player.update(this.player);  //this.W, this.S, this.A, this.D, 

    
     // Makes reticle move with player
     this.reticle.body.velocity.x = this.player.body.velocity.x;
     this.reticle.body.velocity.y = this.player.body.velocity.y;


    // Rotates player to face towards reticle
    this.player.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.reticle.x, this.reticle.y); 



   


      




   

   } //End update area












 









  }   // End of class 