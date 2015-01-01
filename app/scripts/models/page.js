define([
    'jquery',
    'ko',
    'pubsub',
    'enums/events'
], function($, ko, pubsub, events){
    function Page(element){
        var $el = $(element),
            self = this;

        this.id = $el.attr('data-id');
        this.visible = ko.observable(false);

        pubsub.subscribe(events.PAGE.CHANGED, function(event, pageId){
            self.visible(pageId === self.id);
        });
    }

    return Page;
});
