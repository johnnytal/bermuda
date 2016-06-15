var game_over = function(game){};

game_over.prototype = {

    preload: function(){},
    
    init: function(reason, score, best, total){
        loadMusic.play();
        
        var factor = 1;
        var message = '';
        //var best_message = '';
        
        if (total == 'undefined' || total == undefined || total == null || total == NaN) total = 0;
        
        /*if (best) {
            best_message = '\nNew Hige score!';
            factor = 1.1;
        }*/
        
        var messages = ['No shame in giving up...', '120M might be too much...', 'Crashing candies is easier...',
         'Martians always triumph!', 'That must have hurt!'];
        var rndMess = game.rnd.integerInRange(0, 4);
        
        if (reason == 'lost') {
            message = messages[rndMess] + '\nDistance: ' + score.toFixed(1) + ' M' +
            '\nNetworth: ' + total + " $";
        }
    
        else{ 
            message = "B E R M U D A \n I S \n B E A T E N ! ! ! \n Y O U   W I N !" + '\nNetworth: ' + total + " $"; 
            factor = 1.2;
        } 
              
        modal.createModal({
            type:"game_over",
            includeBackground: false,
            modalCloseOnInput: false,
            itemsArr: 
            [
                 {
                    type: "image",
                    content: "window",
                    offsetY: 0,
                    offsetX: 0,
                    contentScale: 1.65 * factor
                },
                {
                    type: "text",
                    content: message,
                    fontFamily: font,
                    fontSize: 32,
                    color: "0xf7f7f7",
                    offsetY: -70,
                    stroke: "0x000000",
                    strokeThickness: 5
                },
                {
                    type: "image",
                    content: "replay",
                    offsetY: 70,
                    offsetX: 50,
                    callback: function () { // start a new game
                        
                        try{
                            interstitial.show();
                        } catch(e){}
                        
                        loadMusic.stop();
                        clickSfx.play();
                        
                        game.state.start('Game');
                    }
                },
                {
                    type: "image",
                    content: "menu",
                    offsetY: 70,
                    offsetX: -50,
                    callback: function () { // return to main menu
                        try{
                            interstitial.show();
                        } catch(e){}
                        
                        loadMusic.stop();
                        clickSfx.play();
                        
                        game.state.start('Preloader');
                    }
                }
            ]
        });   
            
        modal.showModal("game_over");
        
        for (n=0; n<4; n++){
            game.add.tween(modal.getModalItem('game_over',n)).from( { y: - 800 }, 600, Phaser.Easing.Sinusoidal.InOut, true);
        }
    }
};
