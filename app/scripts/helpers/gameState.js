define([
    'lodash',
    'pubsub',
    'enums'
], function(_, pubsub, enums){
    var state = null,
        gameStateModule = {};

    Object.defineProperty(gameStateModule, 'value', {
        get: function(){
            return state;
        },
        set: function(gameState){
            pubsub.publish(enums.Events.GAME.STATE_CHANGED, gameState);
        },
        enumerable: true
    });

    pubsub.subscribe(enums.Events.GAME.STATE_CHANGED, function(event, newState){
        var isValidState = _(enums.GameState)
            .values()
            .contains(newState);

        if (!isValidState){
            throw new Error(newState + ' isn\'t valid game state');
        }

        state = newState;

        console.log('GAME :: STATE ' + newState);
    });

    setTimeout(function(){
        pubsub.publish(enums.Events.GAME.STATE_CHANGED, enums.GameState.NOT_INITIALIZED);
    }, 0);

    return gameStateModule;
});
