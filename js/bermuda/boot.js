//document.addEventListener("deviceready", start, false);
window.onload = start;

function start(){
    WIDTH = 640; 
    HEIGHT = 480;
    
    w = window.innerWidth * window.devicePixelRatio;
    h = window.innerHeight * window.devicePixelRatio;

    game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, "game");    
      
    game.state.add("Boot", boot);
    game.state.add("Preloader", preloader);
    game.state.add("Info", info);
    game.state.add("Game", game_main);
    game.state.add("Game_over", game_over);
    
    game.state.start("Boot");  
    
    //googleLogindone = false;
};

var boot = function(game){};
  
boot.prototype = {
    preload: function(){
          this.game.load.spritesheet("plane","assets/bermuda/images/plane2.png", 75, 63);
          this.game.load.image("1024x1024","assets/bermuda/images/1024x1024.png");
    },
    
    create: function(){        
        game.stage.backgroundColor = '#002745';
        font = 'Creepster';
        //bannerNotCraeted = true;
        
        if (this.game.device.desktop){
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            
            var factor = 1.1;
            
            this.scale.maxWidth = w / factor; 
            this.scale.maxHeight = h / factor; 
            
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.setScreenSize(true);
        } 
        
        else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.scale.maxWidth = w;
            this.scale.maxHeight = h;
            
            this.scale.forceOrientation(false, true);

            this.scale.setScreenSize(true);
        }

        game.state.start('Preloader');
    }
};

