define([
    'lodash',
    'core/factory',
    'enums/extenders',

    'factory/extenders/visual',
    'factory/extenders/keyboard'
], function(_, factory){
    return factory.create({
        name: 'player',
        presets: ['player'],
        default: {
            x: 480,
            y: 480,
            texture: 'knight'
        }
    });
});
