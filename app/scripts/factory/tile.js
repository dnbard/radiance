define([
    'lodash',
    'core/factory',
    'enums/extenders',

    'factory/extenders/visual'
], function(_, factory){
    return factory.create({
        name: 'tile',
        extend: ['phaser-sprite', 'sprite_x', 'sprite_y', 'texture'],
        default: {
            x: 32,
            y: 32
        }
    });
});
