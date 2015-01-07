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
            game.load.spritesheet(spritesheet.name, spritesheet.path, spritesheet.width, spritesheet.height);
        });
    }

    return Preloader;
});
