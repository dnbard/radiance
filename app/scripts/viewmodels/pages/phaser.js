define([
    'jquery',
    'models/page',
    'pubsub',
    'enums',
    'phaser',
    'services/preloader',
    'services/phaserInit'
], function($, Page, pubsub, enums, Phaser, Preloader, PhaserInit){
    function PhaserViewmodel(){
        var game = new Phaser.Game(window.screen.availWidth, window.screen.availHeight, Phaser.CANVAS, 'pagePhaser-wrapper', {
            preload: Preloader,
            create: PhaserInit,
            update: update
        });

        function create() {

        }

        function update() {
//
//            if (cursors.up.isDown)
//            {
//                game.camera.y -= 4;
//            }
//            else if (cursors.down.isDown)
//            {
//                game.camera.y += 4;
//            }
//
//            if (cursors.left.isDown)
//            {
//                game.camera.x -= 4;
//            }
//            else if (cursors.right.isDown)
//            {
//                game.camera.x += 4;
//            }

        }
    }

    PhaserViewmodel.prototype = new Page($('.page[data-id="phaser"]'));

    return PhaserViewmodel;
});
