define([
    'lodash',
    'core/objects',
    'factory/tile',
    'formaters/levelTiles',
    'phaser',
    'helpers/spriteGroup',
    'enums'
], function(_, Objects, Tiles, levelTiles, phaser, spriteGroup, enums){
    var checkBorderDatas = [
        { x: -1, y: -1 },
        { x: 0, y: -1 },
        { x: 1, y: -1 },
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: -1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 1 }
    ],
        freeSprites = [],
        sprites = [];

    function set(tiles, levelId){
        var shadowedTiles = [],
            level = Objects.get(levelId),
            shadow;

        _.each(tiles, function(tileId){
            var tile = Objects.get(tileId),
                x = tile.gridX, y = tile.gridY,
                checkResult = false,
                tileResult = 0;

            _.each(checkBorderDatas, function(checkBorderData){
                var checkTile = level.getTile(x + checkBorderData.x, y + checkBorderData.y);

                if (!checkTile){
                    return true;
                }

                if (!checkTile.renderable){
                    checkResult = true;
                    return false;
                }
            });

            if (checkResult){
                shadowedTiles.push(tileId);
                shadow = getNewSprite(tile.x, tile.y);

                _.each(levelTiles.tilesMapMorph, function(morph){
                    var mX = tile.gridX + morph.x,
                        mY = tile.gridY + morph.y,
                        mTile = level.getTile(mX, mY);

                    if (!mTile || mTile.renderable){
                        tileResult += morph.mult;
                    }
                });

                if (levelTiles.tilesMapTransform[tileResult] !== undefined){
                    shadow.frame = levelTiles.tilesMapTransform[tileResult];
                } else {
                    //for debug purposes
                    console.log('x: %s, y: %s [%s]', tile.gridX, tile.gridY, tileResult);
                }
            }
        });
    }

    function remove(){
        _.chain(sprites).remove(function(){
            return true;
        }).each(function(sprite){
            _.first(phaser.GAMES).add.tween(sprite).to( { alpha: 0 }, 250, Phaser.Easing.Quadratic.In, true);
            setTimeout(function(){
                freeSprites.push(sprite);
            }, 250);
        });
    }

    function getNewSprite(x, y){
        var game = _.first(phaser.GAMES),
            sprite;

        if (_.size(freeSprites) > 0){
            sprite = freeSprites.pop();
            _.first(phaser.GAMES).add.tween(sprite).to( { alpha: 1 }, 250, Phaser.Easing.Quadratic.In, true);
            sprite.x = x;
            sprite.y = y;
        } else {
            sprite = spriteGroup.get(enums.Sprites.SHADOW)
                    .add(new phaser.Sprite(game, x, y, 'fog', 16));
            sprite.anchor = {
                x: 0.5,
                y: 0.5
            };
            sprite.__type = enums.Sprites.SHADOW;
        }

        sprites.push(sprite);
        return sprite;
    }

    setInterval(function(){
        console.log('SHADOW SPRITES >> Used: %s, Free: %s', sprites.length, freeSprites.length);
    }, 1000);

    return {
        set: set,
        remove: remove
    }
});
