define([
    'jquery',
    'models/page',
    'pubsub',
    'enums'
], function($, Page, pubsub, enums){
    function MainMenuViewmodel(){

    }

    MainMenuViewmodel.prototype = new Page($('.page[data-id="mainmenu"]'));

    MainMenuViewmodel.prototype.startGame = function(){
        pubsub.publish(enums.events.GAME.START);
    }

    return MainMenuViewmodel;
});
