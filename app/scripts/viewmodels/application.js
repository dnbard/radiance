define([
    'ko',
    'lodash',
    'pubsub',
    'enums/pages',
    'enums/events',
    'viewmodels/pages/mainmenu'
], function(ko, _, pubsub, Pages, Events, MainMenu){
    function ApplicationViewmodel(){
        this.pages = {};
        this.pages[Pages.MAINMENU] = new MainMenu();

        pubsub.subscribe(Events.GAME.START, function(){
            pubsub.publish(Events.PAGE.CHANGED, null);
        });

        pubsub.publish(Events.PAGE.CHANGED, Pages.MAINMENU);
    }

    ApplicationViewmodel.prototype.getPageById = function(element){
        var $el = $(element);

        return this.pages[$el.attr('data-id')];
    }

    return ApplicationViewmodel;
});
