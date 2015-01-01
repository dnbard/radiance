define([
    'ko',
    'lodash',
    'pubsub',
    'enums/pages',
    'enums/events',
    'models/page'
], function(ko, _, pubsub, Pages, Events, Page){
    function ApplicationViewmodel(){
        this.pages = {};

        _.each(Pages, function(pageId){
            var pageEntity = new Page($('.page[data-id="' + pageId +'"]'));
            this.pages[pageId] = pageEntity;
        }, this);

        setTimeout(function(){
            pubsub.publish(Events.PAGE.CHANGED, Pages.MAINMENU);
        }, 1000);
    }

    ApplicationViewmodel.prototype.getPageById = function(element){
        var $el = $(element);

        return this.pages[$el.attr('data-id')];
    }

    return ApplicationViewmodel;
});
