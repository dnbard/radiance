define([
    'factory/tile',
    'factory/level',
    'rot',
    'helpers/gameState',
    'enums',
    'pubsub'
], function(Tiles, Levels, rot, gameState, enums, pubsub){
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

            var knight = game.add.sprite(480,480, 'knight');
            knight.anchor = {
                x: 0.5,
                y: 1.0
            }
        });
    }

    return PhaserInit;
});
