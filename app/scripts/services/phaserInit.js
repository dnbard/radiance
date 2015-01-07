define([
    'factory/level',
    'factory/player',
    'helpers/gameState',
    'enums',
    'pubsub'
], function(Levels, Player, gameState, enums, pubsub){
    function PhaserInit(game){
        game.world.setBounds(0, 0, 1920, 1200);
        gameState.value = enums.GameState.INITIALIZED;

        //cursors = game.input.keyboard.createCursorKeys();

        pubsub.subscribe(enums.Events.GAME.STATE_CHANGED, function(event, state){
            if (state !== enums.GameState.STARTED){
                return;
            }

            Levels.basic()
                .generate({
                    width: 100,
                    height: 100
                });

            var knight = Player.create();
        });
    }

    return PhaserInit;
});
