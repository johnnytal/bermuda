var game_main = function(game){
    PLANE_VELOCITY = -190; // change to make plane slower or faster
    PLANE_ANGLE = -11.5;

    enemies = [];
    
    score = 0;
    netWorth = 0;
    totalNetWorth = 0;
    
    timeFactor = 1;
    
    manuverFactor = 1;
    manuverFactorUp = 1;
    
    photosToTake = 10;
    
    var inter;
    var scoreInterval;
    
    storeEntered = false;
    shootUp = false;
    phantomUp = false;
    flipUp = false;
    evadeUp = false;
    speedUp = false;
    miniUp = false;
};

game_main.prototype = {
    preload: function(){
        this.game.load.image("bg","assets/bermuda/images/background.png");
    },
    
    create: function(){
        
        score = 0;
        netWorth = 0;
        totalNetWorth = 0;
        timeFactor = 1;
        manuverFactorUp = 1;
        photosToTake = 10;
        
        this.world.setBounds(0, 0, WIDTH, HEIGHT + 10);
        bg = this.add.tileSprite(0, 0, 640, 480, 'bg');
        bg.alpha = 0.7;
        bg.inputEnabled = true;
        bg.events.onInputDown.add(flyPlane, this);

        deco_group = this.add.group();
        
        white = this.add.sprite(0, 0, 'white');
        white.alpha = 0;
 
        terrain_group = this.add.group();
        terrain_group.enableBody = true;
        terrain_group.physicsBodyType = Phaser.Physics.ARCADE;
        
        var lightningX = this.rnd.integerInRange(100, 500); // create lightnings
        this.lightningBitmap = this.game.add.bitmapData(200, 338);
        this.lightning = this.game.add.image(lightningX, 50, this.lightningBitmap);
        this.lightning.filters = [ this.game.add.filter('Glow') ];
        this.lightning.anchor.setTo(0.5, 0);

        blood = this.add.image(0,-17, 'blood');
        blood.alpha = 0.3;
  
        camera_btn = this.add.button(568, 0, 'cameraBtn');
        camera_btn.inputEnabled = true;
        camera_btn.input.useHandCursor = true;
        camera_btn.events.onInputDown.add(takePhoto, this);
        camera_btn.alpha = 0.7;
       
        /*window.onkeydown = function(event) { 
            if (event.keyCode == 65){
                turnPlane('right');
            }
            else if (event.keyCode == 83){
                turnPlane('left');
            } 
            else if (event.keyCode == 68){
                turnPlane('up');
            }
             else if (event.keyCode == 70){
                turnPlane('down');
            }
        };*/

        plane = this.add.sprite(150, 350, 'plane');
        this.physics.enable(plane, Phaser.Physics.ARCADE);
        plane.enableBody = true;
        plane.anchor.setTo(0.2, 0.8);
         
        anim = plane.animations.add('walk');
        anim.play(10, true);
        
        plane.body.velocity.y = PLANE_VELOCITY;
        plane.body.velocity.x = PLANE_VELOCITY / 10;
        plane.angle = PLANE_ANGLE;
        plane.checkWorldBounds = true;
        plane.outOfBoundsKill = true; // kills the plane when he goes off screen   
        plane.tint = 0xcccccc; // make the plane darker

        enemy_group = this.add.group();
        enemy_group.enableBody = true;
        enemy_group.physicsBodyType = Phaser.Physics.ARCADE;

        modal = new gameModal(game);

        scoreLabel = this.add.text(75, 35, (score / 1000).toFixed(1) + ' M' , {
            font: '21px ' + font, fill: 'white', fontWeight: 'normal', align: 'center', 
            stroke: "0x000000", strokeThickness: 3
        });
        scoreLabel.alpha = 0.8; 
        scoreLabel.padding.set(10, 5);
        scoreLabel.anchor.set(1, 0.5);
        
        bestScore = localStorage.getItem("bermuda-bestScore");
        if (bestScore == null) bestScore = 0;
        
        bestScoreLebal = this.add.text(17, 44, 'Best: ' + bestScore + ' M', {
            font: '15px ' + font, fill: '#e2f2e1', fontWeight: 'normal', align: 'center'
        });
        bestScoreLebal.alpha = 0.7;
        
        evadeUpgradeLebal = game.add.text(120, 8, 'Evade: N/A', {
            font: '15px ' + font, fill: '#e2f2e1', fontWeight: 'normal', align: 'center'
        });
        evadeUpgradeLebal.alpha = 0.3;

        flipUpgradeLebal = game.add.text(120, 29, 'Thurst: N/A', {
            font: '15px ' + font, fill: '#e2f2e1', fontWeight: 'normal', align: 'center'
        });
        flipUpgradeLebal.alpha = 0.3;
        
        phantomUpgradeLebal = game.add.text(120, 50, 'Phantom: N/A', {
            font: '15px ' + font, fill: '#e2f2e1', fontWeight: 'normal', align: 'center'
        });
        phantomUpgradeLebal.alpha = 0.3;

        netWorthLabel = this.add.text(320, 35, netWorth + "$", {
            font: '22px ' + font, fill: '#e2f1f2', fontWeight: 'normal', align: 'center',
            stroke: "0x0f0000", strokeThickness: 2
        });
        netWorthLabel.anchor.set(0.5, 0.5);
        netWorthLabel.alpha = 0.9; 
        
        photosLeftLabel = this.add.text(608, 39, photosToTake, {
            font: '21px ' + font, fill: '#f4e4f7', fontWeight: 'normal', align: 'center', 
            stroke: "0x000000", strokeThickness: 3
        });
        photosLeftLabel.anchor.set(0.5, 0.5);
        photosLeftLabel.padding.set(5, 5);
        
        scoreInt();

        thunders = [
            game.add.audio('thunder1'), game.add.audio('thunder2'),
            game.add.audio('thunder3'), game.add.audio('thunder4')
        ];
        explosionSfx = game.add.audio('explosion');
        clickSfx = game.add.audio('sfxClick1');
        
        loadMusic.stop();
        music = game.add.audio('music', 0.7, true).play();
        
        create_enemy();
        
        fogs = this.add.group();
        fogs.enableBody = true;
        fogs.physicsBodyType = Phaser.Physics.ARCADE;
        
        bullets = game.add.group();
        
        create_fog();
        create_rain();
        
        this.create_thunder();
        this.createTerrain();
        this.createDeco();
        
        clickClock();
        
        if (!this.game.device.desktop){
            try{ mc.destroy(); }catch(e){}
            
            screen = document.getElementById('game');
            mc = new Hammer(screen);
            mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL, threshold: 20 });
        }
       
        try{banner.hide();} catch(e){}
        
        if (bannerNotCraeted){
            try{
                Cocoon.Ad.AdMob.configure({
                    android: { 
                          banner:"ca-app-pub-9795366520625065/8387859836"
                    }
                });
                
                banner = Cocoon.Ad.AdMob.createBanner();
                banner.load();
                
                banner.on("load", function(){
                    banner.setLayout( Cocoon.Ad.BannerLayout.BOTTOM_CENTER );
                });
                
                bannerNotCraeted = false;
            } catch(e){}
        }
    },
    
    update: function(){ 
        if (!storeEntered){  
            if (!plane.alive) gameOver(); 
            if (score/1000 == 10) game.state.start('Game_over', false, false, 'won', score, save_score(), totalNetWorth);
    
            rndShake = game.rnd.integerInRange(1, 5);
            shakey_time = game.rnd.integerInRange(20, 100);
            shakesy = game.rnd.integerInRange(4, 10);
            game.add.tween(game.camera).to({ y: rndShake }, shakey_time, Phaser.Easing.Sinusoidal.InOut, false, 0, shakesy, true).start();
            
            bg.tilePosition.x -= 3 + (timeFactor / 8); // roll the backgground image, increase to roll faster
            
            terrain_group.forEach(function(terr) {
                terr.x -= 3 + (timeFactor / 8);
            }, this);
            
            deco_group.forEach(function(deco) {
                deco.x -= 3 + (timeFactor / 8);
            }, this);
                
            if(game.input.activePointer.isDown){ // when user press the mouse / taps
    
            }
            else{ // when user release mouse
                plane.body.velocity.y = ( PLANE_VELOCITY + 40 - (timeFactor * 2) ) * manuverFactorUp;
                plane.body.velocity.x = PLANE_VELOCITY / 10 * manuverFactor * manuverFactorUp;
                
                if (plane.angle > PLANE_ANGLE){
                    plane.angle -= 0.3;
                }
            }
            
            for (var i = 0; i < enemies.length; i++){
                if (enemies[i].isAlive && !storeEntered){
                    enemies[i].update();
                    
                    if (plane.alpha == 1){
                        this.physics.arcade.collide(plane, enemies[i].enemy, gameOver, null, this); // when plane collides with enemy
                    }
                    
                    this.physics.arcade.collide(enemy_group, enemy_group, collide_enemies, null, this); // when enemies collide
                }
            }
           
            if (plane.alpha == 1){   
                this.physics.arcade.overlap(plane, terrain_group, collide_terrain, null, this); // when plane collides with terrain
            }
            
            this.physics.arcade.overlap(enemy_group, terrain_group, collide_enemies_ground, null, this); 
            this.physics.arcade.overlap(enemy_group, bullets, collide_enemies, null, this); 
        }
        
        else{
            plane.body.velocity.y = 0;
            plane.body.velocity.x = 0;
        }
    }, 
    
    create_thunder: function(){ // responsible for thunders and lightnings
        var time_to_next_thunder = game.rnd.integerInRange(7000, 18000) - (timeFactor * 100);
        var shake_str = game.rnd.integerInRange(3, 9);
        var shake_time = game.rnd.integerInRange(20, 80);
        var shakes = game.rnd.integerInRange(4, 8);
        var light_to_sound_interval = game.rnd.integerInRange(1200, 5000); // light before thunder. chnage value to 0 to get them together
        
        thunder_timer = game.time.events.add(time_to_next_thunder, function(){
            
            this.create_lightning(this);
            this.create_thunder();
        
            setTimeout(function(){
                game.camera.y = 0; // shake the camera with thunder sound
                game.add.tween(game.camera)
                .to({ y: shake_str }, shake_time, Phaser.Easing.Sinusoidal.InOut, false, 0, shakes, true).start();
                
                thunders[game.rnd.integerInRange(0, 3)].play();
                
            }, light_to_sound_interval);
            
        }, this, []);      
    },
    
    createTerrain: function(){
        var time_to_next_terrain = game.rnd.integerInRange(8250, 17000) - (timeFactor * 35);

        var terrains = ['ground_13', 'ground_14', 'cave_lake_2', 'cave_large_rock_1', 
        'cave_stalactite_1', 'cave_stalactite_4', 'cave_platform_3', 'cave_platform_2', 'cave_platform_4'];
        
        var terrain_type = game.rnd.integerInRange(0, terrains.length - 1);
        
        var spriteHeight = this.game.cache.getImage(terrains[terrain_type]).height;
        var height_factor = 0;
        
        if (terrain_type == 2 ) height_factor = 55;
        if (terrain_type == 3) height_factor = 100;
        if (terrain_type == 4 || terrain_type == 5) height_factor = -(HEIGHT - spriteHeight);
        if (terrain_type == 6 || terrain_type == 7 || terrain_type == 8) height_factor = game.rnd.integerInRange(-400, -150);
      
        terrain_timer = game.time.events.add(time_to_next_terrain, function(){
            this.createTerrain();
            
            terrain = terrain_group.create(750, HEIGHT - spriteHeight + height_factor, terrains[terrain_type]);
            terrain.body.immovable = true;   
            
            if (terrain_type == 2){
                tweenTint(terrain, 0xffff00, 0x0000ff, 3500); // tween the tint of sprite from red to blue over 2 seconds (2000ms)
            } 
            
            if (storeEntered) terrain.destroy();
            
        }, this, []); 
            
            
    }, 
    
    createDeco: function(){
        var time_to_next_deco = game.rnd.integerInRange(2000, 6000);
        
        var decos = ['deco1','deco2','deco3','deco4','deco5','deco6','deco7','deco8','deco9','deco10','deco11'];
        var deco_type = game.rnd.integerInRange(0, decos.length - 1);
        var height = game.rnd.integerInRange(70, 400);
        
        deco_timer = game.time.events.add(time_to_next_deco, function(){
            this.createDeco();
                
            deco = deco_group.create(750, height, decos[deco_type]);
                if (deco_type == 1){
                    deco.frame = 1;
                    setTimeout(function(){
                       deco.frame = 0; 
                    },1500);
                }
                
                if (storeEntered) deco.destroy();
            }, 
        this, []); 
    }
};

function flyPlane(){
    plane.body.velocity.y = -(PLANE_VELOCITY * manuverFactorUp) * 2 - 40 + (timeFactor * 2) ;
    plane.body.velocity.x = -(PLANE_VELOCITY * manuverFactor * manuverFactorUp) / 5;

    
                
    if (plane.angle < -PLANE_ANGLE * 1.5){
        plane.angle += 0.5;
    }   
}

function collide_enemies(enemy1, enemy2){ // kill enemies when they collide with each other
    enemy1.kill();
    enemy2.kill();
    
    explode(enemy1);
}

function collide_enemies_ground(_enemy1){
    _enemy1.kill();
    explode(_enemy1);
}

function gameOver(_plane, _enemy){ // kill player
    enemies = [];
    music.stop();
    
    enemy_group.forEach(function(e) {
        e.kill();
    }, this);
        
    try{
        explode(_plane);
        _plane.kill();
        _enemy.kill();
    }catch(e){}

    clearInterval(scoreInterval);
    clearInterval(clickInterval);
    
    game.state.start('Game_over', false, false, 'lost', score, save_score(), totalNetWorth);
}

function collide_terrain(_plane){
    enemies = [];
    music.stop();
    
    enemy_group.forEach(function(e) {
        e.kill();
    }, this);
        
    try{
        explode(_plane);
        _plane.kill();
    }catch(e){}

    clearInterval(scoreInterval);
    clearInterval(clickInterval);
    
    game.state.start('Game_over', false, false, 'lost', score, save_score());    
}

function save_score(){ // if it's the best score ever, save it to local storage
    if ((score/1000) > bestScore || bestScore > 49){
        localStorage.setItem( "bermuda-bestScore", score/1000);
        return true;
    }
    else{
        return false;
    }
}

function create_enemy(){ // make a new enemy
    var index =  enemies.length;
    
    var type;
    if (score < 550) type = 2;
    else if (score >= 550 && score < 850) type = game.rnd.integerInRange(1, 2);
    else if (score >= 850 && score < 1700) type = game.rnd.integerInRange(1, 3);
    else if (score >= 1700 && score < 2850) type = game.rnd.integerInRange(1, 4);
    else { type = game.rnd.integerInRange(1, 5); }

    var locationX = game.rnd.integerInRange(WIDTH + 50, WIDTH + 100); // starting enemy's x location
    var locationY = game.rnd.integerInRange(-35, HEIGHT + 35); // starting enemy's y location

    var velocityX = game.rnd.integerInRange(-70, -140); // enemy's horizontal speed
    var gravityY = game.rnd.integerInRange(20, 60) + (timeFactor * 7); // enemy's vertical gravity. increase values to make game more difficult
    
    var time_to_next_enemy = game.rnd.integerInRange(3750 , 7100) - (timeFactor * 100); // how long it takes for new enemies to appear
    
    enemy_timer = game.time.events.add(time_to_next_enemy, function(){
        if (!storeEntered){
            enemies.push(new Enemy(
                game, 
                index,
                locationX,
                locationY,
                'enemy'+type,
                gravityY,
                velocityX 
            ));
        }
        
        create_enemy();
        
    }, this, []);
}

function explode(element){ // the explosion effect
    explosionSfx.play();
    
    explosion = game.add.sprite(element.body.x, element.body.y, "explosion");
    explosion.scale.set(1.2, 1.2);
    explosion.animations.add('run');
    explosion.animations.play('run', 10, false, true);
}

function takePhoto(){
    
    if (photosToTake > 0 && plane.alpha == 1){
        
        camera_btn.input.enabled = false;
        camera_btn.tint = '0x636463';
        setTimeout(function(){
            camera_btn.input.enabled = true; 
            camera_btn.tint = '0xffffff';
        }, 1000);
        
        photosToTake--;
        photosLeftLabel.text = photosToTake;
        
    
        tweenWhite = this.game.add.tween(white).to({ alpha: '0.2' }, 300, Phaser.Easing.Bounce.Out).start();
        tweenWhite.onComplete.add(function(){ 

            white.alpha = 0; 
            
            for (i = 0; i < enemies.length; i++) {
                xPos = enemies[i].enemy.body.x;
                yPos = enemies[i].enemy.body.y; 
                
                xDistance = Math.abs(xPos - plane.x);
                yDistance = Math.abs(yPos - plane.y);

                distance = Math.round( (xDistance + yDistance) );
                name = enemies[i].enemy.alienName;
                price = enemies[i].enemy.price - distance;  
                if (price < 0 ) price = 0;
                
                if (enemies[i].enemy.alive && xPos > 110 && xPos < 600 && yPos < 440 && yPos > 20){
                    alienTextTweeing(i, distance, price, name, xPos, yPos);
                } 
            }
        }, this); 
    }
}

function alienTextTweeing(_i, _distance, _price, _name, _xPos, _yPos){                          
    var alienText =   
    '' + _name + 
    "\n" + _distance + " yd" +
    "\n" + _price +  "$";
      
    var photoLabel = game.add.text(_xPos, _yPos,
       alienText, {font: '22px ' + font, fill: 'white', fontWeight: 'normal', align: 'center',
       stroke: "0x0f0000", strokeThickness: 2
       }
    );
    photoLabel.alpha = 0.8;
    
    netWorth += _price;
    
    setTimeout(function(){
         tweenAlienText = this.game.add.tween(photoLabel)
            .to( {x: netWorthLabel.x, y: netWorthLabel.y}, 800, Phaser.Easing.Sinusoidal.InOut)
        .start();   
        
        tweenAlienText.onComplete.add(function(){ 
            photoLabel.text = "";
            totalNetWorth += _price;
            netWorthLabel.text = netWorth + "$";
            tween = this.game.add.tween(netWorthLabel.scale)
            .to({ x: 1.35, y: 1.35 }, 400, Phaser.Easing.Linear.InOut)
        .start();   
         tween.yoyo(true, 250);
        }); 
    },500);
}

function create_rain(){ // make it rain
    emitter = game.add.emitter(game.world.centerX, -100, 500);

    emitter.width = game.world.width;
    emitter.angle = this.game.rnd.integerInRange(-20, 20);

    emitter.makeParticles(['rain', 'rain2', 'rain3']);

    emitter.minParticleScale = 0.1;
    emitter.maxParticleScale = 0.4;

    emitter.setYSpeed(450, 750);
    emitter.setXSpeed(-5, 5);

    emitter.minRotation = 0;
    emitter.maxRotation = 0;

    emitter.start(false, 1600, 7, 0);
}

game_main.prototype.create_lightning = function() { // the lightning effect

    this.createLightningTexture(this.lightningBitmap.width/2, 0, 20, 3, true);
    this.lightning.alpha = 1;

    this.game.add.tween(this.lightning)
        .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
        .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
        .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
        .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
        .to({ alpha: 0 }, 250, Phaser.Easing.Cubic.In)
    .start();
    
    alpha = this.game.rnd.integerInRange(1, 3);
    tweenWhite = this.game.add.tween(white).to({ alpha: '0.' + alpha }, 500, Phaser.Easing.Bounce.Out).start();
    tweenWhite.onComplete.add(function(){ white.alpha = 0; }, this);
};

game_main.prototype.createLightningTexture = function(x, y, segments, boltWidth, branch) {
    var ctx = this.lightningBitmap.context;
    var width = this.lightningBitmap.width;
    var height = this.lightningBitmap.height;

    if (!branch) ctx.clearRect(0, 0, width, height);

    for(var i = 0; i < segments; i++) {
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = boltWidth;

        ctx.beginPath();
        ctx.moveTo(x, y);

        if (branch) x += this.game.rnd.integerInRange(-10, 10); 
        else { x += this.game.rnd.integerInRange(-30, 30); }
        
        if (x <= 10) x = 10;
        if (x >= width-10) x = width-10;

        if (branch) y += this.game.rnd.integerInRange(10, 20);
        else {
            y += this.game.rnd.integerInRange(20, height/segments);
        }
        
        if ((!branch && i == segments - 1) || y > height) y = height;

        ctx.lineTo(x, y);
        ctx.stroke();

        if (y >= height) break;

        if (!branch) {
            if (this.game.math.chanceRoll(20)) this.createLightningTexture(x, y, 10, 1, true);
        }
    }
    this.lightningBitmap.dirty = true;
};

Phaser.Filter.Glow = function(game) {
    Phaser.Filter.call(this, game);

    this.fragmentSrc = [
        "precision lowp float;",
        "varying vec2 vTextureCoord;",
        "varying vec4 vColor;",
        'uniform sampler2D uSampler;',

        'void main() {',
            'vec4 sum = vec4(0);',
            'vec2 texcoord = vTextureCoord;',
            'for(int xx = -4; xx <= 4; xx++) {',
                'for(int yy = -3; yy <= 3; yy++) {',
                    'float dist = sqrt(float(xx*xx) + float(yy*yy));',
                    'float factor = 0.0;',
                    'if (dist == 0.0) {',
                        'factor = 2.0;',
                    '} else {',
                        'factor = 2.0/abs(float(dist));',
                    '}',
                    'sum += texture2D(uSampler, texcoord + vec2(xx, yy) * 0.002) * factor;',
                '}',
            '}',
            'gl_FragColor = sum * 0.025 + texture2D(uSampler, texcoord);',
        '}'
    ];
};

Phaser.Filter.Glow.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.Glow.prototype.constructor = Phaser.Filter.Glow;

function clickClock(){
    clickInterval = setInterval(function(){
        if (timeFactor < 45){
            timeFactor++;
        }
    }, 4000);
}

function create_fog(){
    var fog_to_create = game.rnd.integerInRange(1, 4);
    var time_to_next = game.rnd.integerInRange(5000, 14000);
    var start_y = game.rnd.integerInRange(0, 500);
    var velocity_x = game.rnd.integerInRange(-50, -100);
    var gravity_y = game.rnd.integerInRange(-3, 3);
    var scalingX = game.rnd.integerInRange(40, 95);
    var scalingY = game.rnd.integerInRange(70, 95);

    fog = fogs.create(850 ,start_y, 'fog'+fog_to_create);
    fog.body.velocity.x = velocity_x;
    fog.body.gravity.y = gravity_y;
    fog.scale.set(scalingX / 100, scalingY / 100);
    
    fog.alpha = 0;
    game.add.tween(fog).to( { alpha: 0.3 }, 8000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    game.add.tween(fog.scale).to({ x: 2, y: 2}, 12000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        
    if (fog.body.x < -300) fog.kill();

    fog_timer = game.time.events.add(time_to_next, function(){
        create_fog(); 
    }, this, []);
}

function turnPlane(direction){
    if (direction == 'right'){      
        manuverFactor = -20;  
    }
    else if (direction == 'left'){
        if (plane.body.x > 150){
            manuverFactor = 20; 
        }
    }

    else if (direction == 'up'){
        manuverFactorUp = -2.5;
    }
    
    else if (direction == 'down'){
        manuverFactorUp = 2.5;
    }
    
    setTimeout(function(){
        manuverFactor = 1;
        manuverFactorUp = 1;
    }, 300);
}

function tweenTint(obj, startColor, endColor, time) {    
    var colorBlend = {step: 0};    
    var colorTween = game.add.tween(colorBlend).to({step: 100}, time);        

    colorTween.onUpdateCallback(function() {      
        obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);       
    });        
 
    obj.tint = startColor;            
    colorTween.start();
}

function scoreInt(){
    BASIC_SCORE = 100;
    scoreInterval = setInterval(function(){ // adds score (or 'distance') every 1000 ms
        if (!game.paused){
            score += BASIC_SCORE;
            scoreLabel.text = (score / 1000).toFixed(1) + ' M';
            
            var realScore = score / 1000;
            if (realScore == 0.1 || realScore == 3 || realScore == 4.5 || realScore == 6 || realScore == 7.5 || realScore == 9){
                enterStore();
            }
        }
    }, 2000);
}

function enterStore(){    
    clearInterval(scoreInterval);
    clearInterval(clickInterval);
    storeEntered = true;
    camera_btn.inputEnabled = false;
    
    modal.createModal({
        type:"store",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: 
        [
             {
                type: "image",
                content: "panelStore",
                offsetY: 0,
                offsetX: 0,
                contentScale: 1
            },
            {
                type: "text",
                content: "Bermuda Upgrade Store",
                fontFamily: font,
                fontSize: 30,
                color: "0xf7f7f7",
                offsetY: -200,
                offsetX: -80,
                stroke: "0x000000",
                strokeThickness: 5
            },
            {
                type: "text",
                content: netWorth + "$" + "\n(Photos: " + photosToTake + ")",
                fontFamily: font,
                fontSize: 24,
                color: "0xf7f7f7",
                offsetY: -190,
                offsetX: 150,
                stroke: "0x000000",
                strokeThickness: 5
            },

             {
                    type: "image",
                    content: "upEvade",
                    offsetY: -100,
                    offsetX: -180,
                    callback: function () { 
                        purchaseItem(this, 900);
                    }
                },
                
                {
                    type: "image",
                    content: "upPhantom",
                    offsetY: 40,
                    offsetX: -180,
                    callback: function () { 
                        purchaseItem(this, 4300);
                    }
                },
                
                {
                    type: "image",
                    content: "upFlip",
                    offsetY: 180,
                    offsetX: -180,
                    callback: function () { 
                        purchaseItem(this, 1800);
                    }
                },
                
               {
                    type: "image",
                    content: "upSpeed",
                    offsetY: -100,
                    offsetX: 0,
                    callback: function () { 
                        purchaseItem(this, 2000);
                    }
                },
                
                {
                    type: "image",
                    content: "upSmall",
                    offsetY: 40,
                    offsetX: 0,
                    callback: function () { 
                        purchaseItem(this, 3200);
                    }
                },
                
                {
                    type: "image",
                    content: "upShoot",
                    offsetY: 180,
                    offsetX: 0,
                    callback: function () { 
                        purchaseItem(this, 5100);
                    }
                },
                
                {
                    type: "image",
                    content: "cameraBtn2",
                    offsetY: -100,
                    offsetX: 150,
                    callback: function () { 
                        purchaseItem(this, 400);
                    }
                },
                
                {
                    type: "text",
                    content: "Evade - 900$",
                    offsetY: -130,
                    offsetX: -160,       
                    fontFamily: font,
                    fontSize: 19,
                    color: "0xf7f7f7",
                    stroke: "0x000000",
                    strokeThickness: 4
                },
                
                {
                    type: "text",
                    content: "Phantom - 4,300$",
                    offsetY: 10,
                    offsetX: -160,       
                    fontFamily: font,
                    fontSize: 19,
                    color: "0xf7f7f7",
                    stroke: "0x000000",
                    strokeThickness: 4
                },
                
                {
                    type: "text",
                    content: "Thurst - 1,800$",
                    offsetY: 150,
                    offsetX: -160,
                    fontFamily: font,
                    fontSize: 19,
                    color: "0xf7f7f7",
                    stroke: "0x000000",
                    strokeThickness: 4
                },
                
               {
                    type: "text",
                    content: "Speed - 2,000$",
                    offsetY: -130,
                    offsetX: 20,
                    fontFamily: font,
                    fontSize: 19,
                    color: "0xf7f7f7",
                    stroke: "0x000000",
                    strokeThickness: 4
                },
                
                {
                    type: "text",
                    content: "Minfy - 3,200$",
                    offsetY: 10,
                    offsetX: 20,
                    fontFamily: font,
                    fontSize: 19,
                    color: "0xf7f7f7",
                    stroke: "0x000000",
                    strokeThickness: 4
                },
                
                {
                    type: "text",
                    content: "Cannon - 5,100$",
                    offsetY: 150,
                    offsetX: 19,
                    fontFamily: font,
                    fontSize: 20,
                    color: "0xf7f7f7",
                    stroke: "0x000000",
                    strokeThickness: 4
                },
                
                {
                    type: "text",
                    content: "5 photos - 400$",
                    offsetY: -130,
                    offsetX: 170,
                    fontFamily: font,
                    fontSize: 19,
                    color: "0xf7f7f7",
                    stroke: "0x000000",
                    strokeThickness: 4
                },
                
                
            {
                type: "image",
                content: "replay",
                offsetY: 180,
                offsetX: 150,
                callback: function () { 
                    clickSfx.play();
                    scoreInt();
                    clickClock();
                    storeEntered = false;
                    camera_btn.inputEnabled = true;
                    
                    try{
                        banner.hide();
                    } catch(e){}
                    
                    modal.hideModal("store");
                }
            },
        ]
    });   
        
    modal.showModal("store");
    
    for (n = 0; n < 19; n++){
        game.add.tween(modal.getModalItem('store',n)).from( { x: 750 }, 650, Phaser.Easing.Linear.In, true);
    }
    
    if (evadeUp) modal.getModalItem('store', 4).tint = '0xf75432';
    if (phantomUp) modal.getModalItem('store', 5).tint = '0xf75432';
    if (flipUp) modal.getModalItem('store', 6).tint = '0xf75432';
    if (speedUp) modal.getModalItem('store', 7).tint = '0xf75432';
    if (miniUp) modal.getModalItem('store', 8).tint = '0xf75432';
    if (shootUp) modal.getModalItem('store', 9).tint = '0xf75432';  
}

function purchaseItem(item, price){
    if (netWorth >= price){
        if (item.key == 'cameraBtn2'){
            photosToTake += 5;
            photosLeftLabel.text = photosToTake;
        }
        
        if (!(item.tint == '0xf75432')){
            
            if (item.key == 'upEvade'){
                item.tint = '0xf75432';
                evadeUp = true;
                enableUpgrade('evade');
                
                evadeUpgradeLebal.alpha = 0.8;
                evadeUpgradeLebal.text = "Evade: Swipe up/down";
            }
    
            else if (item.key == 'upFlip'){
                item.tint = '0xf75432';
                flipUp = true;
                enableUpgrade('flip');
                
                flipUpgradeLebal.alpha = 0.8;
                flipUpgradeLebal.text = "Thurst: Swipe left/right";
            }
            
            else if (item.key == 'upPhantom'){
                item.tint = '0xf75432';
                phantomUp = true;
                enableUpgrade('phantom');
                
                phantomUpgradeLebal.alpha = 0.8;
                phantomUpgradeLebal.text = "Phantom: Pan right";
            }
            
            else if (item.key == 'upShoot'){
                item.tint = '0xf75432';
                shootUp = true;

                cannon_btn = game.add.button(0, 410, 'cannonBtn');
                cannon_btn.inputEnabled = true;
                camera_btn.input.useHandCursor = true;
                cannon_btn.events.onInputDown.add(shoot, this);
                cannon_btn.alpha = 0.9;
            }
            
            else if (item.key == 'upSmall'){
                item.tint = '0xf75432';
                miniUp = true;
                plane.scale.set(0.7, 0.7);
            }
            
            else if (item.key == 'upSpeed'){
                item.tint = '0xf75432';
                speedUp = true;
                manuverFactorUp = 1.6;
            }
            
            netWorth -= price;
            netWorthLabel.text = netWorth + "$";
            modal.getModalItem('store', 3).text = netWorthLabel.text + "\n(Photos: " + photosToTake + ")";
        }
    }
}

function enableUpgrade(which){
    if (which == "evade"){
        
        if (!this.game.device.desktop){
            mc.on("swipedown", function(ev) {
                 if(!ev.handled){
                     turnPlane('up');
                 };
            });
            
            mc.on("swipeup", function(ev) {
                 if(!ev.handled){
                     turnPlane('down');
                 };
            });
        }
        
        else{
            window.onkeydown = function(event) {
                if (event.keyCode == 68){
                    turnPlane('up');
                }
                 else if (event.keyCode == 70){
                    turnPlane('down');
                }
            };
        }
        
    }
    
    else if (which == "flip"){

        if (!this.game.device.desktop){        
            mc.on("swiperight", function(ev) {
                if (!ev.handled){
                    turnPlane('right');
                };   
            });
            
            mc.on("swipeleft", function(ev) {
                 if(!ev.handled){
                     turnPlane('left');
                 };
            });
         }
         
         else{
            window.onkeydown = function(event) { 
                if (event.keyCode == 65){
                    turnPlane('right');
                }
                else if (event.keyCode == 83){
                    turnPlane('left');
                } 
            };
         }
         
     }
     
     else if (which == "phantom"){
         if (!this.game.device.desktop){        
            mc.on("panright", function(ev) {
                if (!ev.handled){
                    phantomize();   
                };   
            });
         }
         
         else{
            window.onkeydown = function(event) { 
                if (event.keyCode == 81){
                    phantomize(); 
                }
            };
         }    
     }
     
}

function phantomize(){
    tweenPhantom = game.add.tween(plane).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.In).start();
    
    setTimeout(function(){
        tweenOut = game.add.tween(plane).to({ alpha: 1 }, 500, Phaser.Easing.Linear.In).start();
    },4000);
}

function shoot(){
    bullet = bullets.create(plane.x, plane.y, 'bullet');
    
    game.physics.enable(bullet, Phaser.Physics.ARCADE);
    bullet.enableBody = true;
    bullet.body.velocity.x = 600;
    bullet.body.gravity.y = 85;

}
