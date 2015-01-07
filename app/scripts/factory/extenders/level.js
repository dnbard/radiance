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

        if (!generator){
            throw new Error('Generator ' + this.generator + ' not found');
        }

        _.bind(generator, this)(data);
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
});
