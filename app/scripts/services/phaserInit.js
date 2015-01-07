define([
    'factory/level',
    'factory/player',
    'helpers/gameState',
    'enums',
    'pubsub',
    'services/camera'
], function(Levels, Player, gameState, enums, pubsub, CameraService){
    function PhaserInit(game){
        game.world.setBounds(0, 0, 1920, 1200);
        gameState.value = enums.GameState.INITIALIZED;

        pubsub.subscribe(enums.Events.GAME.STATE_CHANGED, function(event, state){
            if (state !== enums.GameState.STARTED){
                return;
            }

            var level = Levels.basic()
                .generate({
                    width: 100,
                    height: 100
                }),
                playerPosition = level.getPassableTile(),
                camera = CameraService.create();;

            player = Player.create({
                x: playerPosition.x * 48,
                y: playerPosition.y * 48
            });

            camera.follow(player);
            level.setPlayer(player);
        });
    }

    return PhaserInit;
});
