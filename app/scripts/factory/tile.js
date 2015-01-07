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
            y: 0
        },
        custom:{
            flagstone:{
                texture: 'flagstone',
                passable: true,
                alpha: config.tileUnseenAlpha
            },
            mountain:{
                texture: 'mountain',
                passable: false,
                alpha: config.tileUnseenAlpha
            }
        }
    });
});
