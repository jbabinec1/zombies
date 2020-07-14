class LoadScene extends Phaser.Scene {
    constructor() {
      super("bootGame");
    }
  
    preload() {

        this.load.image('player', 'assets/survivor.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('reticle', 'assets/reticle.png', {frameWidth: 3, frameHeight: 3});
     

      


    }



  
    create() {


      this.add.text(20, 20, "Loading game...");
      this.scene.start("playGame");

    


    }





  }