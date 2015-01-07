define([
    'jquery',
    'models/page',
    'phaser',
    'services/preloader',
    'services/phaserInit',
    'services/keyboard'
], function($, Page, Phaser, PhaserPreloader, PhaserInit, KeyboardService){
    function PhaserViewmodel(){
        var game = new Phaser.Game(window.screen.availWidth, window.screen.availHeight, Phaser.CANVAS, 'pagePhaser-wrapper', {
            preload: PhaserPreloader,
            create: PhaserInit,
            update: onUpdate
        }),
            keyboardService = KeyboardService.create();

        function onUpdate(){
            keyboardService.update();
        }
    }

    PhaserViewmodel.prototype = new Page($('.page[data-id="phaser"]'));

    return PhaserViewmodel;
});
