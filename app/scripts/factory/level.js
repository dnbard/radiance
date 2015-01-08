define([
    'core/factory',

    'factory/extenders/level'
], function(factory){
    return factory.create({
        name: 'level',
        methods: [
            'addTile', 'addNPC', 'getTile', 'getTileLocation', 'getTilePosition', 'generate', 'setPlayer',
                 'getPassableTile', 'isTilePassable'
        ],
        extend: ['events-level'],
        default: {},
        custom:{
            basic:{
                generator: 'basic'
            }
        }
    });
});
