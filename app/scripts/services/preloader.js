define([
    'lodash',
    'config/preload'
], function(_, preloadConfig){
    function Preloader(game){
        _.each(preloadConfig.images, function(image){
            game.load.image(image.name, image.path);
        });
    }

    return Preloader;
});
