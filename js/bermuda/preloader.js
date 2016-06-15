var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
        // create progress % text
        bootImg = this.add.image(0, 0, '1024x1024');
        
        font = 'Creepster';

        progressTxt = this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '0%',{
             font: '25px ' + font, fill: 'white', fontWeight: 'normal', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);
    
        // create progress bar
        loadingBar = this.add.sprite(this.game.world.centerX - 37,  this.game.world.centerY + 30, "plane");
        
        loadingTxt = this.add.text(this.game.world.centerX - 37,  this.game.world.centerY - 150, "Loading...", {
            font: '18px ' + font, fill: 'lightgrey', fontWeight: 'normal', align: 'center'
        });
        
        loadingBar.anchor.setTo(0, 0.5);
        this.load.setPreloadSprite(loadingBar);

        // load assets

        this.game.load.image("background01", "assets/bermuda/images/background01.png");
        this.game.load.image("replay", "assets/bermuda/images/replay.png");
        this.game.load.image("menu", "assets/bermuda/images/menu.png");
        this.game.load.image("window", "assets/bermuda/images/panel.png");
        this.game.load.image("panelStore", "assets/bermuda/images/panelStore.png");
        this.game.load.image("bg","assets/bermuda/images/background.png");
        this.game.load.image("rain","assets/bermuda/images/rain.png");
        this.game.load.image("rain2","assets/bermuda/images/rain2.png");
        this.game.load.image("rain3","assets/bermuda/images/rain3.png");
        this.game.load.image("fog1","assets/bermuda/images/fog.png");
        this.game.load.image("fog2","assets/bermuda/images/fog2.png");
        this.game.load.image("fog3","assets/bermuda/images/fog3.png");
        this.game.load.image("fog4","assets/bermuda/images/fog4.png");
        this.game.load.image("white","assets/bermuda/images/white.png");
        this.game.load.image("blood","assets/bermuda/images/divider.png");
        
        this.game.load.image("ground_13","assets/bermuda/images/ground_13.png");
        this.game.load.image("ground_14","assets/bermuda/images/ground_14.png");
        this.game.load.image("cave_lake_2","assets/bermuda/images/cave_lake_2.png");
        this.game.load.image("cave_large_rock_1","assets/bermuda/images/cave_large_rock_1.png");
        this.game.load.image("cave_stalactite_1","assets/bermuda/images/cave_stalactite_1.png");
        this.game.load.image("cave_stalactite_4","assets/bermuda/images/cave_stalactite_4.png");
        this.game.load.image("cave_platform_2","assets/bermuda/images/cave_platform_2.png");
        this.game.load.image("cave_platform_3","assets/bermuda/images/cave_platform_3.png");
        this.game.load.image("cave_platform_4","assets/bermuda/images/cave_platform_4.png");

        this.game.load.image("deco11","assets/bermuda/images/deco11.png");
        this.game.load.image("deco10","assets/bermuda/images/deco10.png");
        this.game.load.image("deco9","assets/bermuda/images/deco9.png");
        this.game.load.image("deco8","assets/bermuda/images/deco8.png");
        this.game.load.image("deco7","assets/bermuda/images/deco7.png");
        this.game.load.image("deco6","assets/bermuda/images/deco6.png");
        this.game.load.image("deco5","assets/bermuda/images/deco5.png");
        this.game.load.image("deco4","assets/bermuda/images/deco4.png");
        this.game.load.image("deco3","assets/bermuda/images/deco3.png");
        this.game.load.spritesheet("deco2","assets/bermuda/images/deco2.png", 37, 78);
        this.game.load.image("deco1","assets/bermuda/images/deco1.png");
        
        this.game.load.image("medal1","assets/bermuda/images/medal1.png");
        this.game.load.image("medal2","assets/bermuda/images/medal2.png");
        this.game.load.image("small_bg","assets/bermuda/images/small_bg.png");
        this.game.load.image("playBtn","assets/bermuda/images/playBtn.png");
        
        this.game.load.image("logo", "assets/bermuda/images/logo.png");
        this.game.load.image("question", "assets/bermuda/images/question.png");
        this.game.load.image("play", "assets/bermuda/images/play.png");
        this.game.load.image("ranks", "assets/bermuda/images/ranks.png");
        
        this.game.load.image("cannonBtn", "assets/bermuda/images/cannon.png");
        this.game.load.image("cameraBtn","assets/bermuda/images/cameraBtn.png");
        this.game.load.image("upCamera","assets/bermuda/images/upCamera.png");
        this.game.load.image("bullet","assets/bermuda/images/bullet.png");
        
        this.game.load.image("enemy1", "assets/bermuda/images/alien1.png");
        this.game.load.image("enemy2", "assets/bermuda/images/alien2.png");
        this.game.load.image("enemy3", "assets/bermuda/images/alien3.png");
        this.game.load.image("enemy4", "assets/bermuda/images/alien4.png");
        this.game.load.image("enemy5", "assets/bermuda/images/alien5.png");
        
        this.game.load.image("upEvade", "assets/bermuda/images/upEvade.png");
        this.game.load.image("upFlip", "assets/bermuda/images/upFlip.png");
        this.game.load.image("upPhantom", "assets/bermuda/images/upPhantom.png");
        this.game.load.image("upShoot", "assets/bermuda/images/upShoot.png");
        this.game.load.image("upSmall", "assets/bermuda/images/upSmall.png");
        this.game.load.image("upSpeed", "assets/bermuda/images/upSpeed.png");

        this.game.load.spritesheet("explosion","assets/bermuda/images/explosion.png", 88, 75);

        this.game.load.audio('loadMusic', 'assets/bermuda/audio/loadMusic.mp3'); 
        this.game.load.audio('music', 'assets/bermuda/audio/music.mp3'); 
        this.game.load.audio('sfxClick1', 'assets/bermuda/audio/switch1.mp3'); 
        this.game.load.audio('sfxClick2', 'assets/bermuda/audio/switch2.mp3'); 
        this.game.load.audio('explosion', 'assets/bermuda/audio/explosion.mp3'); 
        this.game.load.audio('thunder1', 'assets/bermuda/audio/thunder1.mp3'); 
        this.game.load.audio('thunder2', 'assets/bermuda/audio/thunder2.mp3'); 
        this.game.load.audio('thunder3', 'assets/bermuda/audio/thunder3.mp3'); 
        this.game.load.audio('thunder4', 'assets/bermuda/audio/thunder4.mp3'); 
        this.game.load.audio('cameraSfx', 'assets/bermuda/audio/camera.mp3'); 
        this.game.load.audio('gunSfx', 'assets/bermuda/audio/gun.mp3'); 
    },
    
    create: function(){

        loadMusic = game.add.audio('loadMusic').play();
        clickSfx = game.add.audio('sfxClick1');
        
        bootImg.destroy();
        loadingTxt.destroy();
        loadingBar.destroy();
        progressTxt.destroy();
        
        bg = this.add.tileSprite(0, 0, 640, 480, 'background01');
        bg.alpha = 0.7;
        
        plane = this.add.sprite(110, 145, 'plane');
        anim = plane.animations.add('walk');
        anim.play(10, true);
        game.add.tween(plane).from( { x: - 7500 }, 3500, Phaser.Easing.Sinusoidal.InOut, true);

        playBtn = this.add.button(250, 150, 'play');
        playBtn.inputEnabled = true;
        playBtn.input.useHandCursor = true;
        playBtn.events.onInputDown.add(function(){
            loadMusic.stop();
            clickSfx.play();

            this.game.state.start("Game"); 
            
           /* try{
                banner.hide();
            }catch(e){}*/
        }, this);
        playBtn.alpha = 0.8;
        game.add.tween(playBtn).from( { alpha: 0}, 1500, Phaser.Easing.Sinusoidal.InOut, true);

        infoBtn = this.add.button(475, 300, 'question');
        infoBtn.inputEnabled = true;
        infoBtn.input.useHandCursor = true;
        infoBtn.events.onInputDown.add(function(){
            loadMusic.stop();
            clickSfx.play();
            this.game.state.start("Info"); 
        }, this);
        infoBtn.alpha = 0.8;
        infoBtn.scale.set(0.85, 0.85);
        game.add.tween(infoBtn).from( { alpha: 0}, 3000, Phaser.Easing.Sinusoidal.InOut, true);
        
       /* ranksBtn = this.add.button(435, 250, 'ranks');
        ranksBtn.inputEnabled = true;
        ranksBtn.input.useHandCursor = true;
        ranksBtn.events.onInputDown.add(function(){

        }, this);
        ranksBtn.alpha = 0.8;
        ranksBtn.scale.set(0.85, 0.85);*/

        logo = game.add.sprite(320, 80, 'logo');
        logo.anchor.set(0.5,0.5);
        logo.scale.set(0.85, 0.85);
        
        game.add.tween(logo).from( { alpha: 0}, 3200, Phaser.Easing.Sinusoidal.InOut, true);
        game.add.tween(logo.scale).from( { x: 2, y: 2}, 3000, Phaser.Easing.Sinusoidal.InOut, true);
       
        text1 = this.add.text(20, 240, " ~ Press to fly down ~ ", {
            font: '21px ' + font, fill: '#e1dde1', fontWeight: 'normal', align: 'left', stroke: "0x000000", strokeThickness: 2
        });
        
        text2 = this.add.text(20, 290, " ~ Release to fly up ~ ", {
            font: '21px ' + font, fill: '#e1dde1', fontWeight: 'normal', align: 'left', stroke: "0x000000", strokeThickness: 2
        });
        
        text3 = this.add.text(20, 340, " ~ Evade enemies & Obstacles, Don't drift off! ~ ", {
            font: '21px ' + font, fill: '#e1dde1', fontWeight: 'normal', align: 'left', stroke: "0x000000", strokeThickness: 2
        });
        
        text4 = this.add.text(20, 390, " ~ Pass 120 Miles to escape Bermuda ~ ", {
            font: '21px ' + font, fill: '#e1dde1', fontWeight: 'normal', align: 'left', stroke: "0x000000", strokeThickness: 2
        });
        
        text5 = this.add.text(20, 440, " ~ Don't forget to take pictures! ~ ", {
            font: '21px ' + font, fill: '#e1dde1', fontWeight: 'normal', align: 'left', stroke: "0x000000", strokeThickness: 2
        });
        
        didYouKnows = 
        [
        'Upgrade stores are located\nevery 20 miles' , 'Trecirclus - from Latin,\nmeaning "Three circles"' ,
        'Medusoza is a kind\nof Jellyfish', 'M1919 Browning machine gun\nwas widely used on aircrafts\nduring WWII',
        "The Bermuda Triangle's\nalternate name is\nDevil's Triangle", '"Lockheed Have Blue"\nwas the first\nstealth aircraft (1977)\n',
         "Splotch - \na large spot or mark \nof dirt, paint, etc", "120 Miles =~ 193 Km",
         "Turboprop - \na turbine engine that\ndrives an aircraft propeller",
         '"Life on Mars" is a song \nby David Bowie,\nreleased in 1971 ', '"Gorillas in the Mist"\nis a 1988 American drama film',
         "You can't take\nphots of Martians\nif they're behind you",
         "You can't take\nphots of Martians\nin stealth mode",
         "You can't take\nphots of Martians\nin stealth mode",
         "Stalactites hang from\nthe ceiling of a cave,\nstalagmites grow from\nthe cave floor."
         ];
        rndDidYou = game.rnd.integerInRange(0, didYouKnows.length-1);
        
        didYouKnowLabel = this.add.text(430, 175, "Did you know...\n" + didYouKnows[rndDidYou] , {
            font: '16px ' + font, fill: '#e1dde1', fontWeight: 'normal', align: 'left', stroke: "0x000000", strokeThickness: 2
        });
        didYouKnowLabel.alpha = 0.6;
        
        text1.alpha = 0.7;
        text2.alpha = 0.7;
        text3.alpha = 0.8;
        text4.alpha = 0.9;
        text5.alpha = 0.95;
        text1.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        text2.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        text3.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        text4.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        text5.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        
        game.add.tween(text1).from( { alpha: 0}, 1000, Phaser.Easing.Sinusoidal.InOut, true);
        game.add.tween(text2).from( { alpha: 0}, 2500, Phaser.Easing.Sinusoidal.InOut, true);
        game.add.tween(text3).from( { alpha: 0}, 4000, Phaser.Easing.Sinusoidal.InOut, true);
        game.add.tween(text4).from( { alpha: 0}, 5500, Phaser.Easing.Sinusoidal.InOut, true);
        game.add.tween(text5).from( { alpha: 0}, 7000, Phaser.Easing.Sinusoidal.InOut, true);
        game.add.tween(didYouKnowLabel).from( { alpha: 0}, 6000, Phaser.Easing.Sinusoidal.InOut, true);
        game.add.tween(didYouKnowLabel).from( { y: -300}, 2500, Phaser.Easing.Sinusoidal.InOut, true);
    }, 
    
    update: function(){
        bg.tilePosition.x -= 0.5;
    }, 
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text = progress+"%";
};