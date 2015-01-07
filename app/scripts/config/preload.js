define([
    'config/general'
], function(config){
    return {
        images:[{
            name: 'flagstone',
            path: 'images/tiles/flagstone.png'
        },{
            name: 'knight',
            path: 'images/knight.png'
        }],
        spritesheets:[{
            name: 'mountain',
            path: 'images/tiles/mountain.png',
            width: config.tileWidth,
            height: config.tileHeight
        }]
    }
});
