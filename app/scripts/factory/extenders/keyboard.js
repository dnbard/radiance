define([
    'lodash',
    'core/factory',
    'core/objects',
    'services/keyboard',
    'services/camera',
    'enums',
    'phaser',
    'config/general',
    'pubsub'
], function(_, factory, Objects, KeyboardService, CameraService, enums, Phaser, config, pubsub){

    factory.registerExtender('player-keyboard', {
        handler: function(player){
            function createMoveHandler(x, y){
                return function(){
                    var player = Objects.get(this.id),
                        level = Objects.get(player.levelId),
                        tile = level.getTile(player.gridX + x, player.gridY + y),
                        camera = CameraService.create();

                    if (tile && tile.passable){
                        player.x = (player.gridX + x) * config.tileWidth;
                        player.y = (player.gridY + y) * config.tileHeight;
                        pubsub.publish(enums.Events.PLAYER.MOVED,{
                            playerId: player.id,
                            x: player.gridX + x,
                            y: player.gridY + y
                        });
                    }
                }
            }

            var keyboardService = KeyboardService.create(),
                context = { id: player.id };

            keyboardService.subscribe(Phaser.Keyboard.UP, createMoveHandler(0, -1), enums.KeyboardActions.DOWN, context);
            keyboardService.subscribe(Phaser.Keyboard.NUMPAD_8, createMoveHandler(0, -1), enums.KeyboardActions.DOWN, context);

            keyboardService.subscribe(Phaser.Keyboard.DOWN, createMoveHandler(0, 1), enums.KeyboardActions.DOWN, context);
            keyboardService.subscribe(Phaser.Keyboard.NUMPAD_2, createMoveHandler(0, 1), enums.KeyboardActions.DOWN, context);

            keyboardService.subscribe(Phaser.Keyboard.LEFT, createMoveHandler(-1, 0), enums.KeyboardActions.DOWN, context);
            keyboardService.subscribe(Phaser.Keyboard.NUMPAD_4, createMoveHandler(-1, 0), enums.KeyboardActions.DOWN, context);

            keyboardService.subscribe(Phaser.Keyboard.RIGHT, createMoveHandler(1, 0), enums.KeyboardActions.DOWN, context);
            keyboardService.subscribe(Phaser.Keyboard.NUMPAD_6, createMoveHandler(1, 0), enums.KeyboardActions.DOWN, context);

            keyboardService.subscribe(Phaser.Keyboard.NUMPAD_7, createMoveHandler(-1, -1), enums.KeyboardActions.DOWN, context);
            keyboardService.subscribe(Phaser.Keyboard.NUMPAD_9, createMoveHandler(1, -1), enums.KeyboardActions.DOWN, context);
            keyboardService.subscribe(Phaser.Keyboard.NUMPAD_1, createMoveHandler(-1, 1), enums.KeyboardActions.DOWN, context);
            keyboardService.subscribe(Phaser.Keyboard.NUMPAD_3, createMoveHandler(1, 1), enums.KeyboardActions.DOWN, context);
        },
        type: enums.Extenders.FUNCTION
    });
});
