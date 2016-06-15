 var info = function(game){

};  

var info = function(game){};
 
info.prototype = {
    preload: function(){ 
        this.game.load.image("background01", "assets/bermuda/images/background01.png");
    },
    
    create: function(){
        bg = this.add.tileSprite(0, 0, 640, 480, 'background01');
        bg.alpha = 0.7;
        
        upEvade = this.add.image(220, 20, 'upEvade').scale.set(0.5, 0.5); 
        upPhantom = this.add.image(220, 100, 'upPhantom').scale.set(0.5, 0.5); 
        upShoot = this.add.image(220, 180, 'upShoot').scale.set(0.5, 0.5);
        upSmall = this.add.image(220, 260, 'upSmall').scale.set(0.5, 0.5); 
        upSpeed = this.add.image(220, 340, 'upSpeed').scale.set(0.5, 0.5); 
        upFlip = this.add.image(220, 420, 'upFlip').scale.set(0.5, 0.5);
        
        this.add.text(280, 20, 'Evade - Swipe up & down\nto evade enemies (900$)', {
            font: '17px ' + font, fill: '#fff1dd', fontWeight: 'normal', align: 'left', stroke: "0x000000", strokeThickness: 2
        }).alpha = 0.7;
        this.add.text(280, 100, 'Stealth - Swipe right to \navoid detection (4,300$)', {
            font: '17px ' + font, fill: '#fff1dd', fontWeight: 'normal', align: 'left', stroke: "0x000000", strokeThickness: 2
        }).alpha = 0.7;
        this.add.text(280, 180, "Browning M1919 - \nJust shoot 'em all (5,100$)", {
            font: '17px ' + font, fill: '#fff1dd', fontWeight: 'normal', align: 'left', stroke: "0x000000", strokeThickness: 2
        }).alpha = 0.7;
        this.add.text(280, 260, 'Micrify - Switch to \nmini plane (3,200$)', {
            font: '17px ' + font, fill: '#fff1dd', fontWeight: 'normal', align: 'left', stroke: "0x000000", strokeThickness: 2
        }).alpha = 0.7;
        this.add.text(280, 340, 'Turboprop - \nFly faster (2,000$)', {
            font: '17px ' + font, fill: '#fff1dd', fontWeight: 'normal', align: 'left', stroke: "0x000000", strokeThickness: 2
        }).alpha = 0.7;
        this.add.text(280, 420, 'Thurst - Pan right & left\nto evade enemies (1,800$)', {
            font: '17px ' + font, fill: '#fff1dd', fontWeight: 'normal', align: 'left', stroke: "0x000000", strokeThickness: 2
        }).alpha = 0.7;
        
        enemy1 = this.add.image(465, 70, 'enemy1').scale.set(0.75, 0.75); 
        enemy2 = this.add.image(470, 154, 'enemy2').scale.set(0.75, 0.75); 
        enemy3 = this.add.image(470, 238, 'enemy3').scale.set(0.75, 0.75); 
        enemy4 = this.add.image(470, 322, 'enemy4').scale.set(0.75, 0.75); 
        enemy5 = this.add.image(475, 406, 'enemy5').scale.set(0.75, 0.75); 
        
        this.add.text(520, 60, 'Trecirclus\n950$', {
            font: '17px ' + font, fill: '#e2f2e1', fontWeight: 'normal', align: 'left', stroke: "0x000000", strokeThickness: 2
        }).alpha = 0.7;
        this.add.text(520, 144, 'Splotch\n350$', {
            font: '17px ' + font, fill: '#e2f2e1', fontWeight: 'normal', align: 'left', stroke: "0x000000", strokeThickness: 2
        }).alpha = 0.7;
        this.add.text(520, 228, 'Spindrus\n600$', {
            font: '17px ' + font, fill: '#e2f2e1', fontWeight: 'normal', align: 'left', stroke: "0x000000", strokeThickness: 2
        }).alpha = 0.7;
        this.add.text(520, 312, 'Medusoza\n1,100$', {
            font: '17px ' + font, fill: '#e2f2e1', fontWeight: 'normal', align: 'left', stroke: "0x000000", strokeThickness: 2
        }).alpha = 0.7;
        this.add.text(520, 396, 'Deminutus\n800$', {
            font: '17px ' + font, fill: '#e2f2e1', fontWeight: 'normal', align: 'left', stroke: "0x000000", strokeThickness: 2
        }).alpha = 0.7;

        plane = game.add.sprite(20, 20, 'plane').scale.set(0.75, 0.75);        
        camera = game.add.sprite(20, 250, 'cameraBtn').scale.set(0.75, 0.75);
        
        this.add.text(20, 90, "Fly your plane above\nthe Bermuda triangle.\nTake photos of martians,\nbuy upgrades every 20 miles, \n& pass 120 miles to escape!  ", {
            font: '17px ' + font, fill: '#e1ffdd', fontWeight: 'normal', align: 'left', stroke: "0x000000", strokeThickness: 2
        }).alpha = 0.7;
        this.add.text(20, 320, "Use the camera to take\nphotos of martians,\nClose-up photos of\ndangerous martians are\nworth more money.", {
            font: '17px ' + font, fill: '#e1dde1', fontWeight: 'normal', align: 'left', stroke: "0x000000", strokeThickness: 2
        }).alpha = 0.7;
        
        this.add.text(100, 20, "(Tap anywhere\nto go back)", {
            font: '15px ' + font, fill: '#e1dde1', fontWeight: 'normal', align: 'center', stroke: "0xff0000", strokeThickness: 2
        }).alpha = 0.6;
    }, 
    
    update: function(){
        bg.tilePosition.x -= 0.5;
        
        if(game.input.activePointer.isDown){ 
            try{
                interstitial.show();
            } catch(e){}
                        
            this.game.state.start("Preloader"); 
        }
    }, 
};
