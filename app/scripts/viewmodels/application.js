define([
    'ko',
    'lodash',
    'pubsub',
    'enums/pages',
    'enums/events',
    'viewmodels/pages/mainmenu',
    'viewmodels/pages/phaser'
], function(ko, _, pubsub, Pages, Events, MainMenu, Phaser){
    function ApplicationViewmodel(){
        this.pages = {};
        this.pages[Pages.MAINMENU] = new MainMenu();
        this.pages[Pages.PHASER] = new Phaser();

        pubsub.subscribe(Events.GAME.START, function(){
            pubsub.publish(Events.PAGE.CHANGED, Pages.PHASER);
        });

        pubsub.publish(Events.PAGE.CHANGED, Pages.MAINMENU);
    }

    ApplicationViewmodel.prototype.getPageById = function(element){
        var $el = $(element);

        return this.pages[$el.attr('data-id')];
    }

    return ApplicationViewmodel;
});
