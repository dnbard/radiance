define([
    'lodash',
    'pubsub',
    'enums',
    'core/objects'
], function(_, pubsub, enums, Objects){
    var tilesMapTransform = {
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
    }, tilesMapMorph = [
        { x: 0, y: -1, mult: 1 },
        { x: -1, y: 0, mult: 10 },
        { x: 1, y: 0, mult: 100 },
        { x: 0, y: 1, mult: 1000 }
    ];

    pubsub.subscribe(enums.Events.LEVEL.CREATED, function(event, data){
        var level = Objects.get(data.levelId),
            result, tileId, tile, tileType;

        _.each(level.tiles, function(tileId){
            tile = Objects.get(tileId);
            tileType = tile.type;
            result = 0;

            if (tile.passable){
                //dont transform passable tiles
                //only walls are affected
                return true;
            }

            _.each(tilesMapMorph, function(morph){
                var mX = tile.gridX + morph.x,
                    mY = tile.gridY + morph.y,
                    mTile = level.getTile(mX, mY);

                if (!mTile || mTile.type === tileType){
                    result += morph.mult;
                }
            });

            if (tilesMapTransform[result] !== undefined){
                _.find(tile.sprite, function(sprite){
                    return sprite.__type === enums.Sprites.FLOOR;
                }).frame = tilesMapTransform[result];
            } else {
                //for debug purposes
                console.log('x: %s, y: %s [%s]', tile.gridX, tile.gridY, result);
            }
        });
    });
});
