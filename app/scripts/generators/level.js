define([
    'lodash',
    'rot',
    'phaser',
    'factory/tile',
    'pubsub',
    'enums',

    'formaters/levelTiles'
], function(_, rot, phaser, Tiles, pubsub, enums){
    var generators = {};

    generators.basic = function(data){
        var w = data.width, h = data.height,
            map = new rot.Map.Digger(w, h, {
                dugPercentage: 0.4
            }),
            tilesCount = w * h,
            game = _.first(phaser.GAMES),
            level = this,
            tilesCreated = 0;

        if (data.isCurrent !== false){
            game.world.setBounds(0, 0, w * 32, h * 32);
        }

        map.create(function(x, y, value){
            if (x === 0 || y === 0 || x === w-1 || y === h-1){
                value = 1;
            };

            var tile = value ? Tiles.mountain() : Tiles.flagstone();
            tile.x = 32 * x;
            tile.y = 32 * y;

            level.addTile(tile);

            tilesCreated++;

            if (tilesCreated === tilesCount){
                pubsub.publish(enums.Events.LEVEL.CREATED, {
                    levelId: level.id,
                    tilesCount: tilesCount
                });
            }
        });
    }

    return generators;
});
