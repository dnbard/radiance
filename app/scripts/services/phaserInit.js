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

            var level = Levels.create(),
                w = 39, h = 25,
                dm = new rot.Map.DividedMaze(w, h),
                elementsNumber = w * h;

            game.world.setBounds(0, 0, w * 32, h * 32);
            dm.create(function(x, y, value){
                var tile = value ? Tiles.mountain() : Tiles.flagstone();
                tile.x = 32 * x;
                tile.y = 32 * y;

                level.addTile(tile);
            });
        });
    }

    return PhaserInit;
});
