class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, reticle) {
        super(scene, x, y, key, reticle);
        this.scene = scene; 

        this.reticle = reticle;
        

        this.scene.physics.world.enable(this);
        
        this.setImmovable(false);


        this.setCollideWorldBounds(true);

        //Add player to existing scene
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this)
        this.scene.physics.world.enableBody(this);
       

        this.cursorKeys = this.scene.input.keyboard.addKeys('W,S,A,D');

     
        
  
         

    }





    update(player, A, D, W, S) {

   
        
    // Rotates player to face towards reticle
    //player.rotation = Phaser.Math.Angle.Between(player.x, player.y, reticle.x, reticle.y);

    // Makes reticle move with player
    //reticle.body.velocity.x = player.body.velocity.x;
    //reticle.body.velocity.y = player.body.velocity.y;

    player.setVelocity(0);


    if(this.cursorKeys.A.isDown){
        player.setVelocityX(-100);
        //this.player.flipX = true;
        
        
      }else if(this.cursorKeys.D.isDown){
        player.setVelocityX(100);
        //this.player.flipX = false;
      }
     
      if(this.cursorKeys.W.isDown){
        player.setVelocityY(-100);
        player.flipY = true;
        
      }else if(this.cursorKeys.S.isDown) {
        player.setVelocityY(100);
        
      }

        

    
     //this.movePlayerManager(cursorKeys);
       
       
      } //End update area
       
       
      pickUpPistol(pistol, player) {
        //pistol.destroy();
        //pistol.setVisible(false);
        player.setTexture('armed_pistol_player');
        //this.player.setScale(2);
    }
         
       
       
         


} // End of Player class 