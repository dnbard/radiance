define([
    'core/factory',

    'factory/extenders/level'
], function(factory){
    return factory.create({
        name: 'level',
        methods: ['addTile', 'getTile', 'getTileLocation', 'getTilePosition', 'generate'],
        presets: [],
        default: {},
        custom:{
            basic:{
                generator: 'basic'
            }
        }
    });
});
