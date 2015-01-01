define([
    'jquery',
    'lodash'
], function(jquery, _){
    var pages = {};

    _.each($('.page'), function(page){
        var $page = $(page),
            id = $page.attr('data-id');

        pages[id.toUpperCase()] = id.toLowerCase();
    });

    return pages;
});
