define([
    'config/general'
], function(config){
    return {
        images:[{
            name: 'flagstone',
            path: 'images/tiles/flagstone.png'
        }],
        spritesheets:[{
            name: 'mountain',
            path: 'images/tiles/mountain.png',
            width: config.tileWidth,
            height: config.tileHeight
        },{
            name: 'doodads-mountain',
            path: 'images/tiles/doodads-mountain.png',
            width: config.tileWidth,
            height: config.tileHeight
        },{
            name: 'player',
            path: 'images/players.png',
            width: 64,
            height: 64
        }]
    }
});
