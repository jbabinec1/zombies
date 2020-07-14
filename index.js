var gameSettings = {
  playerSpeed: 200
}
  
  var config =    {
      width: 800,
      height: 600,
      parent: 'game-container', 
      //backgroundColor: white,
      scene: [LoadScene, Scene1],
      pixelArt: true,
      physics: {
        default: "arcade",
        arcade: {
          debug: true,
          gravity: { y: 0 }
        }
      }
    }
    
    var game = new Phaser.Game(config);