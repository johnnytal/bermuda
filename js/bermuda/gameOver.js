var game_over = function(game){};

game_over.prototype = {

    preload: function(){},
    
    init: function(reason, score, best, total){
        loadMusic.play();

        try{
            banner.show();
        } catch(e){}
        
        var message = '';
        var best_message = '';
        
        if (total == 'undefined' || total == undefined || total == null || total == NaN) total = 0;
        
        if (best) best_message = '\nNew Hige score!';
        
        if (reason == 'lost') message = 'No one can escape!\nDistance passed: ' + score/1000 + 'M' + best_message + 
        '\nNetworth: ' + total + "$";
    
        else{ message = "B E R M U D A \n I S \n B E A T E N ! ! ! \n Y O U   W I N !"; } 
              
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
                    contentScale: 1.5
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
                        clickSfx.play();
                        try{
                            banner.hide();
                        } catch(e){}
                        game.state.start('Game');
                    }
                },
                {
                    type: "image",
                    content: "menu",
                    offsetY: 70,
                    offsetX: -50,
                    callback: function () { // return to main menu
                        clickSfx.play();
                        game.state.start('Preloader');
                    }
                }
            ]
        });   
            
        modal.showModal("game_over");
        
        for (n=0; n<4; n++){
            game.add.tween(modal.getModalItem('game_over',n)).from( { y: - 800 }, 500, Phaser.Easing.Linear.In, true);
        }
        
        homeImg = modal.getModalItem('game_over',2);
        replayImg = modal.getModalItem('game_over',3);
        
        homeImg.input.useHandCursor = true;
        replayImg.input.useHandCursor = true;
    }
};
