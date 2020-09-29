//import FullScreenEvent from "./FullScreenEvent";


var gameSettings = {
  playerSpeed: 200
}
  
  var config =    {
      width: 800,
      height: 600,
      //width: window.innerWidth,
      //height: window.innerHeight,
      type: Phaser.AUTO,
      parent: 'game-container', 
      //backgroundColor: white,
      scene: [LoadScene, Scene1, Scene2, Scene2Unarmed, Scene3, Scene3Unarmed, Scene3Shotgun],
      pixelArt: true,
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
          gravity: { y: 0 }
        }
      }
    }
    
    var game = new Phaser.Game(config);

   /* window.addEventListener('load', () => {

      var game = new Phaser.Game(config);
      FullScreenEvent( () => resizeBy(game)); 
      
    }) */