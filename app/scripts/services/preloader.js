define([
    'lodash',
    'config/preload',
    'phaser'
], function(_, preloadConfig, Phaser){
    function Preloader(game){
        _.each(preloadConfig.images, function(image){
            game.load.image(image.name, image.path);
        });

        _.each(preloadConfig.spritesheets, function(spritesheet){
            /*game.load.atlas(spritesheet.name, spritesheet.path, undefined, {
                frames: [{
                    filename: '0',
                    frame: {x: 0, y: 0, w: 32, h: 32},
                    h: 32,
                    w: 32,
                    x: 0,
                    y: 0,
                    rotated: false,
                    sourceSize: {w: 32, h: 32},
                    spriteSourceSize: {x: 0, y: 0, w: 32, h: 32},
                    trimmed: false
                }]
            });*/

            game.load.spritesheet(spritesheet.name, spritesheet.path, 32, 32);
        });
    }

    return Preloader;
});
