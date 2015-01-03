define([
    'lodash',
    'core/factory',
    'enums/extenders',

    'factory/extenders/visual'
], function(_, factory){
    return factory.create({
        name: 'tile',
        presets: ['sprite'],
        default: {
            x: 32,
            y: 32
        },
        custom:{
            lava:{
                texture: 'lava'
            },
            flagstone:{
                texture: 'flagstone'
            }
        }
    });
});
