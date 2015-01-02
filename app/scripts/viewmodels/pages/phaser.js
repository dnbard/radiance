define([
    'jquery',
    'models/page',
    'pubsub',
    'enums',
    'phaser',
    'services/preloader',
    'services/phaserInit'
], function($, Page, pubsub, enums, Phaser, PhaserPreloader, PhaserInit){
    function PhaserViewmodel(){
        var game = new Phaser.Game(window.screen.availWidth, window.screen.availHeight, Phaser.CANVAS, 'pagePhaser-wrapper', {
            preload: PhaserPreloader,
            create: PhaserInit
        });
    }

    PhaserViewmodel.prototype = new Page($('.page[data-id="phaser"]'));

    return PhaserViewmodel;
});
