

class Scene1 extends Phaser.Scene {
    constructor() {
      super("playGame");
      var bullet;
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

      

    

    this.player = new Player(this, 32.3799, 291.419, 'player_sprite', 'player2.png').setScale(1.5);
    this.reticle = this.physics.add.sprite(32.3799, 320.00, 'reticle', 'reticle.png');

    this.zombie = this.physics.add.sprite(700, 300, 'zombie1', 'zombie.png').setScale(1.5);
    this.zombie.health = 3;

    //this.pistol = this.physics.add.sprite(300, 300, 'pistol', 'pistol.png');
    this.pistol = this.physics.add.sprite(300, 300, 'player_sprite', 'pistol.png');

    this.playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
   
    this.pistolSound = this.sound.add("pistol_shot");


    this.trees.setCollisionBetween(1, 4.5);
    this.physics.add.collider(this.player, this.trees);


    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // When player walks over sword, overlap and trigger pickUpSword function
    this.physics.add.overlap(this.player, this.pistol, this.pickUpPistol, null, this);
    

    //this.player.body.setAllowGravity(false);
    this.reticle.body.setAllowGravity(false);

    //this.physics.world.setBoundsCollision(false);
    this.player.setCollideWorldBounds(false); 

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



        // Fires bullet from player on left click of mouse
        this.input.on('pointerdown', function (pointer, time, lastFired, gameObject) {
            if (this.player.active === false)
                return;
    
            // Get bullet from bullets group
            var bullet = this.playerBullets.get().setActive(true).setVisible(true);
            
            if (bullet && this.player.texture.key === 'armed_pistol_player')
            {
                bullet.fire(this.player, this.reticle);
                this.player.anims.play('pistol-fire');
                this.pistolSound.play();
                this.physics.add.collider(this.zombie, bullet, this.enemyHitCallback);
            }
        }, this);


         //After shooting animation plays, resets back to original armed Pistol texture
        this.player.on('animationcomplete', function(){
            this.player.setTexture('armed_pistol_player', 1);
        }, this);
    
    
      
    
    this.projectiles = this.add.group();

    //this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.cursorKeys = this.input.keyboard.addKeys('W,S,A,D');



     //Camera
     //this.cameras.main.zoom = 1.3;


     // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.cameraDolly = new Phaser.Geom.Point(this.player.x, this.player.y);
    this.cameras.main.startFollow(this.cameraDolly, true);

   //this.cameras.main.roundPixels = true;
   



    }  // End of create function


  

   update() {


    this.player.update(this.player);  //this.W, this.S, this.A, this.D, 

    this.cameraDolly.x = Math.floor(this.player.x);
    this.cameraDolly.y = Math.floor(this.player.y);
    
     // Makes reticle move with player
     this.reticle.body.velocity.x = this.player.body.velocity.x;
     this.reticle.body.velocity.y = this.player.body.velocity.y;


    // Rotates player to face towards reticle
    this.player.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.reticle.x, this.reticle.y); 


   //Zombie rotates towards player 
    this.zombie.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.zombie.x, this.zombie.y); 

   

  
    // Zombie follow player
      
    var distance = Phaser.Math.Distance.Between(this.zombie.x, this.zombie.y, this.player.x, this.player.y);

    //WIP .. checking if players position is greater than 600 .. will trigger function to follow player
    if(distance < 160 || this.player.body.position.x > 800) {     
      
      this.physics.moveToObject(this.zombie, this.player, 16);

     if (distance < 49)  // the lower the number the closer enemy is to player .. stop enemy sprite velocity
      {
  
          this.zombie.body.setVelocity(0);
          this.zombie.body.setVelocityX(0);
          this.zombie.body.setVelocityY(0);   
          //this.enemy.body.stop();
        
      }

    }


/*
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        if(this.player.active){

      //this.bullet.rotation = this.player.rotation;
        this.shootBullet();

        this.bullet.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.reticle.x, this.reticle.y); 
        

        }
      }  */




   

/*
    this.input.on('pointerup', function (pointer) {

      
        let angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.reticle.x, this.reticle.y);            

        this.shootBullet(angle);
    }, this);  */



   

   } //End update area






   pickUpPistol(pistol, player) {
       this.pistol.destroy();
       //pistol.setVisible(false);
       this.player.setTexture('armed_pistol_player').setScale(1.5);
       //this.player.setScale(2);
       this.player.body.setSize(this.player.width, this.player.height, true);
   }



   moveZombie(zombie, speed) {
    zombie.x -= speed; 
    this.zombie.body = this.player.body;   
  } 





  enemyHitCallback(enemyHit, bulletHit)
  {
      // Reduce health of enemy
      if (bulletHit.active === true && enemyHit.active === true)
      {
          enemyHit.health = enemyHit.health - 1;
          console.log("Enemy hp: ", enemyHit.health);
  
          // Kill enemy if health <= 0
          if (enemyHit.health <= 0)
          {
             enemyHit.setActive(false).setVisible(false);
          }
  
          // Destroy bullet
          bulletHit.setActive(false).setVisible(false);
      }
  }
  









  }   // End of class 