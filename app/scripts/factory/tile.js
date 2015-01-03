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
            x: 0,
            y: 0
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
