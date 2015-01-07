define([
    'lodash',
    'core/factory',
    'generators/level',
    'core/objects',
    'config/general'
], function(_, factory, generators, Objects, config){
    factory.registerMethod('addTile', function(data){
        if (!this.tiles){
            this.tiles = {};
        }

        this.tiles[this.getTileLocation(data.gridX, data.gridY)] = data.id;
    });

    factory.registerMethod('getTile', function(x, y){
        var tileId;

        if (!this.tiles){
            this.tiles = {};
        }

        tileId = this.tiles[this.getTileLocation(x, y)];

        if (!tileId){
            return null;
        }

        return Objects.get(tileId);
    });

    factory.registerMethod('getTileLocation', function(x, y){
        return x + ',' + y;
    });

    factory.registerMethod('generate', function(data){
        var generator = generators[this.generator];

        this.width = data.width;
        this.height = data.height;

        if (!generator){
            throw new Error('Generator ' + this.generator + ' not found');
        }

        _.bind(generator, this)(data);

        return this;
    });

    factory.registerMethod('getTilePosition', function(){
        var tile;

        if (arguments.length === 1 && typeof arguments[0] === 'object'){
            tile = arguments[0];

            return {
                x: tile.x,
                y: tile.y
            };
        } else if (arguments.length === 2){
            return {
                x: arguments[0] * config.tileWidth,
                y: arguments[1] * config.tileHeight
            }
        }
    });

    factory.registerMethod('setPlayer', function(player){
        if (typeof player !== 'object' || !player.id){
            throw new Error('Invalid argument: player');
        }

        this.playerId = player.id;
        player.levelId = this.id;
    });

    factory.registerMethod('getPassableTile', function(){
        var width = this.width,
            height = this.height,
            isTilePassable = false,
            tile = null,
            x, y;

        while(isTilePassable === false){
            x = Math.round(Math.random() * width);
            y = Math.round(Math.random() * height);

            tile = this.getTile(x, y);
            isTilePassable = tile ? tile.passable : false;
        }

        return {
            x: x,
            y: y
        };
    });
});
