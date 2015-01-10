define([
    'lodash',
    'enums'
], function(_, enums){
    function create(tile){
        var doodadSprite;

        if (tile.passable && Math.random() * 100 < 10){
            tile.texture = 'doodads-mountain';
        } else {
            return null;
        }

        doodadSprite = _.find(tile.sprite, function(sprite){
            return sprite.__type === enums.Sprites.DOODAD;
        });

        //init state of doodad alpha must be 0
        doodadSprite.alpha = 0;

        //select random doodad from the list
        doodadSprite.frame = Math.round(Math.random() * 13);

        //reposition doodad randomly around the tile position
        //default anchor is 0.5, 0.5
        doodadSprite.anchor.x -= (Math.random() - 0.5) * 0.5;
        doodadSprite.anchor.y -= (Math.random() - 0.5) * 0.5;

        doodadSprite.pivot = {
            x: 0.5,
            y: 0.5
        };

        doodadSprite.angle = Math.random() * 360 - 180;

        return doodadSprite;
    }

    return {
        create: create
    }
});
