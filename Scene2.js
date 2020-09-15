

class Scene2 extends Phaser.Scene {
    constructor() {
      super("secondScene");
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
      this.bushes = this.map.createStaticLayer('bushes', this.tileset, 0,0);
      this.rocks = this.map.createStaticLayer('rocks', this.tileset, 0,0);

     
   

      
      this.reticle = this.physics.add.sprite(32.3799, 320.00, 'reticle', 'reticle.png');
      this.reticle.width = 11;
      this.reticle.height = 10
      this.reticle.depth = 100;
    

    this.player = new Player(this, 90.3799, 291.419, 'player_sprite', 'player2.png').setScale(1.5);

    this.player.setTexture('armed_pistol_player', 1);
    this.player.setDepth(100);

    //Changing boundary physics box size
    //this.player.body.setSize( 10, 10, 50, 25);

   this.zombie = this.physics.add.sprite(700, 300, 'zombie1', 'zombie.png').setScale(1.5);
   this.zombie.visible = false;

    
    this.zombies = this.physics.add.group();

    this.deadnpc = this.physics.add.sprite(600, 220, 'dead_npc', 'dead_npc.png').setScale(1.5);
    this.tent = this.physics.add.sprite(600, 130, 'tent', 'tent.png').setScale(2);

    
    this.pistol = this.physics.add.sprite(300, 300, 'player_sprite', 'pistol.png');

    this.rifle = this.physics.add.sprite(300, 300, 'player_sprite_rifle', 'rifle.png');
    this.rifle.setScale(2);

    this.pistol.visible = false;

    this.playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
   
    this.pistolSound = this.sound.add("pistol_shot");
    this.rifleSound = this.sound.add("rifle_shot");

    this.trees.setCollisionBetween(1, 4.5);
    this.physics.add.collider(this.player, this.trees);

    this.physics.add.collider(this.player, this.bushes);
    //this.physics.add.collider(this.player, this.rocks);

    this.rocks.setCollisionBetween(1, 1000, true, 'rocks');
    this.physics.add.collider(this.player, this.rocks);

    



    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // When player walks over sword, overlap and trigger pickUpSword function
    this.physics.add.overlap(this.player, this.pistol, this.pickUpPistol, null, this);


    this.physics.add.overlap(this.player, this.rifle, this.pickUpRifle, null, this);

  
    this.gameOver = false;
    this.hasRifle = false;
    this.hasPistol = false;
  
      var zombie;  
  

       //Spawn zombies and add zombie offense and zombie death logic. Also add death logic for player
       var maxZombies = 15;
       for(var i = 0; i <= maxZombies; i++) {
         zombie = this.physics.add.sprite(16,16, "zombie1", "zombie.png").setScale(1.5);
         zombie.body.setSize( 10, 15, 0, 0);
         this.zombies.add(zombie);
         
         zombie.setRandomPosition(370, 300, game.config.width, game.config.height);
         zombie.health = 3;
        
         zombie.setCollideWorldBounds(false);

        this.physics.add.overlap(this.playerBullets, zombie, enemyHitCallback, null, this); 

        this.physics.add.collider(this.player, zombie, playerHit, null, this);




        //logic when bullet hits zombie .. and when zombie dies .. 
       function enemyHitCallback(enemyHit, bulletHit, zombie)
        {
            // Reduce health of enemy
      
            if (bulletHit.active === true && enemyHit.active === true)
            {
              
                //enemyHit.health = enemyHit.health - 1;
                //console.log("Enemy hp: ", enemyHit.health);

                if (this.player.texture.key === 'armed_pistol_player'){
                    enemyHit.health = enemyHit.health - 1;
                     console.log("Enemy hp: ", enemyHit.health);
                   }
           
                     if (this.player.texture.key === 'armed_player_rifle'){
                       enemyHit.health = enemyHit.health - 2;
                       //console.log("Enemy hp: ", enemyHit.health);
                     }
        
                // Kill enemy if health <= 0
                if (enemyHit.health <= 0)
                {
                 
                  this.zombie.setTexture("zombie_dead");
                  //zombie[zombie.length - 1].setTexture("zombie_dead");
                  this.zombie.setSize(this.zombie.width, this.zombie.height, false);
                  enemyHit.setVelocity(0);
                  this.zombie.body.setVelocity(0);
                  this.zombie.body.setVelocityX(0);
                  this.zombie.body.setVelocityY(0); 
                  this.zombie.body.enable = false;    
      
                } 
        
                // Destroy bullet
                bulletHit.setActive(false).setVisible(false);
               
            }
      
         
        } 
    

        // If zombie collides with player .. end the game and show 'Game Over text' .. restart the scene 
        function playerHit(enemyHit, bulletHit) 
        {


        this.Text = this.add.text(410, 50, this.DisplayText, {fontSize: '20px', fill: 'red', backgroundColor: 'black', boundsAlignH: "center", boundsAlignV:"middle" }); 


          if(zombie.texture.key === 'zombie1'); 
          {
    
          this.physics.pause();
          this.gameOver = true;
          this.player.body.enable = false;
          this.DisplayText = 'Wasted. Press F to restart';
          this.Text.setText(this.DisplayText);
          this.Text.x = this.player.body.position.x;
          this.Text.y = this.player.body.position.y - 25; 


      
          } 
    
       } 


       

    } // End of giant for loop


     


    

    this.reticle.body.setAllowGravity(false);
    this.reticle.displayWidth = 30;
    this.reticle.displayHeight = 27;

    
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


  

        //|| this.player.texture.key === 'armed_player_rifle'


        // Fires bullet from player on left click of mouse
       this.input.on('pointerdown', function (pointer, time, lastFired, gameObject, zombie) {
            if (this.player.active === false)
                return;
    
            // Get bullet from bullets group
            var bullet = this.playerBullets.get().setActive(true).setVisible(true);
              
            if (bullet && this.player.texture.key === 'armed_pistol_player' || this.player.texture.key === 'armed_player_rifle'  && this.gameOver === false)
            {
                bullet.fire(this.player, this.reticle);
                if(this.player.texture.key === 'armed_pistol_player'){
                this.player.anims.play('pistol-fire');
                //if(this.player.texture.key === 'armed_pistol_player') {
                //this.pistolSound.play();
                
                }
                
                this.physics.add.collider(this.zombies, bullet, this.enemyHitCallback);
 

                //}
            }
        }, this);





        this.input.on('pointerdown', function (pointer, time, lastFired, gameObject, zombie) {
            
            if (this.player.active === false)
                return;

                if (this.player.texture.key === 'armed_player_rifle'  && this.gameOver === false)
                {

                    //this.rifleSound.play(); 
                    this.player.anims.play('rifle-gunfire');

                }

            }, this);

        


            //Make sure sprite leaves the animation state
           this.player.on('animationcomplete', this.pistolFinish, this);
           this.player.on('animationcomplete', this.rifleFinish, this);




         //After shooting animation plays, resets back to original armed Pistol texture
    /*     this.player.on('animationcomplete', function(animation){
            if(animation.key === 'pistol-fire') {
            this.player.setTexture('armed_pistol_player', 1);
            }
        }, this);  */


      
    
    
       
      
    
  
    
    this.cursorKeys = this.input.keyboard.addKeys('W,S,A,D');


    // Add F key to allow player to restart game 
    this.F = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);


    this.G = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);


     // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.cameraDolly = new Phaser.Geom.Point(this.player.x, this.player.y);
    this.cameras.main.startFollow(this.cameraDolly, true);

   



    }  // End of create function


  

   update() {


    this.player.update(this.player); 

    this.cameraDolly.x = Math.floor(this.player.x);
    this.cameraDolly.y = Math.floor(this.player.y);
    
     // Makes reticle move with player
     this.reticle.body.velocity.x = this.player.body.velocity.x;
     this.reticle.body.velocity.y = this.player.body.velocity.y;


    // Rotates player to face towards reticle
    this.player.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.reticle.x, this.reticle.y); 

    
    
    

       ///Trying to add group think to these freakin zombies
       this.zombies.getChildren().forEach(function(zombie) {

    
        zombie.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, zombie.x,zombie.y); 

        var distance = Phaser.Math.Distance.Between(zombie.x, zombie.y, this.player.x, this.player.y);

        //this.physics.add.collider(this.player, zombie, playerHit, null, this);
       

        if(distance < 700 || this.player.body.position.x > 800) {      
            this.physics.moveToObject(zombie, this.player, 25);
      
           if (distance < 25)  // the lower the number the closer enemy is to player .. stop enemy sprite velocity    //25
            { //49
        
                zombie.body.setVelocity(0);
                zombie.body.setVelocityX(0);
                zombie.body.setVelocityY(0);   
                //this.enemy.body.stop();
              
            }
          }


          
          if (zombie.health <= 0 || null)
          {
           
           // this.zombies.getChildren().forEachDead(function(zombie) {
            zombie.setTexture("zombie_dead");
            //zombie[zombie.length - 1].setTexture("zombie_dead");
            zombie.setSize(zombie.width, zombie.height, false);
            //this.enemyHitCallback.setVelocity(0);
            zombie.body.setVelocity(0);
            zombie.body.setVelocityX(0);
            zombie.body.setVelocityY(0);  
            zombie.rotation = 0;
             //enemyHit.setActive(false).setVisible(false);     
      
           // }, this); 
      
          } 




   if(zombie.texture.key === 'zombie_dead') {

          zombie.body.setVelocity(0);
          zombie.body.setVelocityX(0);
          zombie.body.setVelocityY(0);  
          this.rotation = 0;
          zombie.body.enable = false;
          

      }



   



      


      }, this);




      //var scene1 = this.scene.get('playGame');

      // Press F to restart scene

      if(Phaser.Input.Keyboard.JustDown(this.F) && this.gameOver == true ) {
        //Reset player position
        this.scene.resume('Scene1');
        this.scene.restart();

        } 


     //this.player.texture.key == 'armed_pistol_player'

     //this.player.texture.key !== 'player_sprite'

        if(Phaser.Input.Keyboard.JustDown(this.G) && this.player.texture.key !== 'player_sprite' ) {

            if(this.player.texture.key == 'armed_pistol_player') {     
            this.player.setTexture('player_sprite', 'player2.png');
            this.resetPistolPos(this.pistol);
            } 
            if(this.player.texture.key == 'armed_player_rifle') {
            this.player.setTexture('player_sprite', 'player2.png');
            this.resetRiflePos(this.rifle);  
            } 
            
          } 

         


          

    

         


   

   } //End update area









   pickUpPistol(pistol) {
       //this.pistol.destroy();
       this.pistol.setVisible(false);
       this.player.setTexture('armed_pistol_player').setScale(1.5);
       this.player.body.setSize(this.player.width, this.player.height, true);
       this.hasPistol = true;
   }


   pickUpRifle(rifle) {
    this.pistol.destroy();
    this.rifle.setVisible(false);
    this.player.setTexture('armed_player_rifle').setScale(1.5);
    this.player.body.setSize(this.player.width, this.player.height, true);
    this.hasRifle = true;
}



   moveZombie(zombie, speed) {
    zombie.x -= speed; 
    this.zombie.body = this.player.body;   
  } 





  enemyHitCallback(enemyHit, bulletHit, zombie)
  {
      // Reduce health of enemy
      if (bulletHit.active === true && enemyHit.active === true)
      {
        if (this.player.texture.key === 'armed_pistol_player'){
         enemyHit.health = enemyHit.health - 1;
          console.log("Enemy hp: ", enemyHit.health);
        }

          if (this.player.texture.key === 'armed_player_rifle'){
            enemyHit.health = enemyHit.health - 3;
            //console.log("Enemy hp: ", enemyHit.health);
          }
  
          // Kill enemy if health <= 0
          if (enemyHit.health <= 0)
          {
           
            this.zombie.setTexture("zombie_dead");
            //zombie[zombie.length - 1].setTexture("zombie_dead");
            this.zombie.setSize(this.zombie.width, this.zombie.height, false);
            enemyHit.setVelocity(0);
            this.zombie.body.setVelocity(0);
            this.zombie.body.setVelocityX(0);
            this.zombie.body.setVelocityY(0);  
          } 
  
          // Destroy bullet
          bulletHit.setActive(false).setVisible(false);
         
      }

   
  }  





  resetPistolPos(pistol, player) {
   
    pistol.setVisible(true);
    this.pistol.y = this.player.body.position.y;
    this.pistol.x = this.player.body.position.x;    
  }


  resetRiflePos(rifle, player) {
    rifle.setVisible(true);
    this.rifle.y = this.player.body.position.y;
    this.rifle.x = this.player.body.position.x;  

  }


/* stopPistolAnimation(player){
  player.on('animationcomplete', function(){
    this.player.setTexture('armed_pistol_player', 1);
}, this);

} */





pistolFinish(animation, player) {
    if(animation.key === 'pistol-fire') {
    this.player.setTexture('armed_pistol_player', 1);
    }
 }


 rifleFinish(animation, player) {
    if(animation.key === 'rifle-gunfire') {
    this.player.setTexture('armed_player_rifle', 1);
    }
 }
    


  }   // End of class 