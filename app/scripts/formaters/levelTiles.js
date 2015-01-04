define([
    'lodash',
    'pubsub',
    'enums',
    'core/objects'
], function(_, pubsub, enums, Objects){
    pubsub.subscribe(enums.Events.LEVEL.CREATED, function(event, data){
        var level = Objects.get(data.levelId),
            tileId,
            tile,
            tileType,
            morphs = [
                { x: 0, y: -1, mult: 1 },
                { x: -1, y: 0, mult: 10 },
                { x: 1, y: 0, mult: 100 },
                { x: 0, y: 1, mult: 1000 }
            ],
            transform = {
                1111: 0,
                1110: 15,
                1101: 2,
                1010: 11,
                1100: 10,
                1001: 9,
                1011: 1,
                1000: 12,
                 111: 5,
                 110: 8,
                 101: 7,
                 100: 3,
                  11: 6,
                  10: 4,
                   1: 17,
                   0: 13
            }, result = 0;

        _.each(level.tiles, function(tileId){
            tile = Objects.get(tileId);
            tileType = tile.type;
            result = 0;

            if (tile.passable){
                return true;
            }

            _.each(morphs, function(morph){
                var mX = tile.gridX + morph.x,
                    mY = tile.gridY + morph.y,
                    mTile = level.getTile(mX, mY);

                if (!mTile || mTile.type === tileType){
                    result += morph.mult;
                }
            });

            if (transform[result] !== undefined){
                tile.sprite.frame = transform[result];
            } else {
                console.log('x: %s, y: %s [%s]', tile.gridX, tile.gridY, result);
            }
        });
    });
});
