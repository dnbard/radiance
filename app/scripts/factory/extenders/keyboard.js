define([
    'core/factory',
    'core/objects',
    'services/keyboard',
    'enums',
    'phaser',
    'config/general'
], function(factory, Objects, KeyboardService, enums, Phaser, config){
    factory.registerExtender('player-keyboard', {
        handler: function(player){
            var keyboardService = KeyboardService.create(),
                context = { id: player.id };

            keyboardService.subscribe(Phaser.Keyboard.UP, function(){
                var player = Objects.get(this.id),
                    level = Objects.get(player.levelId),
                    tile = level.getTile(player.gridX, player.gridY - 1);

                if (tile && tile.passable){
                    player.y -= config.tileHeight;
                }
            }, enums.KeyboardActions.PRESS, context);

            keyboardService.subscribe(Phaser.Keyboard.DOWN, function(){
                var player = Objects.get(this.id),
                    level = Objects.get(player.levelId),
                    tile = level.getTile(player.gridX, player.gridY + 1);

                if (tile && tile.passable){
                    player.y += config.tileHeight;
                }
            }, enums.KeyboardActions.PRESS, context);

            keyboardService.subscribe(Phaser.Keyboard.LEFT, function(){
                var player = Objects.get(this.id),
                    level = Objects.get(player.levelId),
                    tile = level.getTile(player.gridX - 1, player.gridY);

                if (tile && tile.passable){
                    player.x -= config.tileWidth;
                }
            }, enums.KeyboardActions.PRESS, context);

            keyboardService.subscribe(Phaser.Keyboard.RIGHT, function(){
                var player = Objects.get(this.id),
                    level = Objects.get(player.levelId),
                    tile = level.getTile(player.gridX + 1, player.gridY);

                if (tile && tile.passable){
                    player.x += config.tileWidth;
                }
            }, enums.KeyboardActions.PRESS, context);

        },
        type: enums.Extenders.FUNCTION
    });
});
