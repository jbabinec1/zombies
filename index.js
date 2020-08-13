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
      scene: [LoadScene, Scene1],
      pixelArt: true,
      physics: {
        default: "arcade",
        arcade: {
          //debug: true,
          gravity: { y: 0 }
        }
      }
    }
    
    var game = new Phaser.Game(config);

   /* window.addEventListener('load', () => {

      var game = new Phaser.Game(config);
      FullScreenEvent( () => resizeBy(game)); 
      
    }) */