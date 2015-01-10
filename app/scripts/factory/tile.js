define([
    'core/factory',
    'config/general',

    'factory/extenders/visual'
], function(factory, config){
    return factory.create({
        name: 'tile',
        presets: ['sprite'],
        default: {
            x: 0,
            y: 0,
            renderable: false
        },
        custom:{
            flagstone:{
                texture: 'flagstone',
                passable: true,
                alpha: config.tileUnseenAlpha,
                renderable: false
            },
            mountain:{
                texture: 'mountain',
                passable: false,
                alpha: config.tileUnseenAlpha,
                renderable: false
            }
        }
    });
});
