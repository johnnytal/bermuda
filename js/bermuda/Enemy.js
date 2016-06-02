Enemy = function (game, index, locationX, locationY, type, gravityY, velocityX) { // our enemy class
    this.game = game;
    this.type = type;
    this.isAlive = true;
    this.alienName = '';
    this.price = 0;
    
    this.enemy = enemy_group.create(locationX, locationY, type);
    this.enemy.index = index;
    
    this.enemy.body.gravity.y = gravityY;
        
    this.enemy.body.angularVelocity = -5;
    this.enemy.anchor.set(0.5, 0.5);  
    this.enemy.body.velocity.x = velocityX;
    
    if (type != 'enemy1'){
        this.enemy.alpha = 0.2;
        game.add.tween(this.enemy).to( { alpha: 0.9 }, 1200, Phaser.Easing.Linear.None, true, 0, 1000, true);
    }
    
    if (type == 'enemy1'){
        this.enemy.body.velocity.x = velocityX * 3.5;
        this.enemy.anchor.set(0.3, 0.4);
        this.enemy.body.angularVelocity = -75;
        this.enemy.alienName = 'Trecirclus';
        this.enemy.price = 950;
        this.enemy.alpha = 0.9;
    }

    if (type == 'enemy2'){
        this.enemy.body.velocity.x = velocityX / 1.2;
        this.enemy.body.gravity.y = gravityY / 3;
        this.enemy.alienName = 'Splotch';
        this.enemy.price = 350;
    }

    if (type == 'enemy3'){
        this.enemy.alpha = 0.3;
        game.add.tween(this.enemy).to( { alpha: 0.8 }, 1600, Phaser.Easing.Linear.None, true, 0, 1000, true);   
        this.enemy.alienName = 'Spindrus'; 
        this.enemy.price = 600;
    }
    
    if (type == 'enemy4'){
        this.enemy.body.velocity.x = velocityX / 1.15;
        game.add.tween(this.enemy.scale).to({ x: 1.65, y: 1.65}, 2600, Phaser.Easing.Circular.None, true, 0, 1000, true);
        this.enemy.alienName = 'Medusoza';
        this.enemy.price = 1100; 
    }
    
    if (type == 'enemy5'){
        this.enemy.body.angularVelocity = 90;
        this.enemy.alienName = 'Deminutus'; 
        this.enemy.price = 800;
    }
};

Enemy.prototype.update = function() { // make the enemy follow the plane

    if (this.enemy.type != 'enemy1' && this.enemy.type != 'enemy4'){
        if (this.enemy.body.y < plane.body.y){
            this.enemy.body.gravity.y = Math.abs(this.enemy.body.gravity.y);    
        }
        else{ 
            this.enemy.body.gravity.y = -(Math.abs(this.enemy.body.gravity.y));
        }
    }
    
};
