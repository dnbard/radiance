define([
    'lodash',
    'core/factory',
    'enums/extenders'
], function(_, factory){
    factory.registerMethod('addTile', function(data){
        if (!this.tiles){
            this.tiles = {};
        }

        this.tiles[this.getTileLocation(data.gridX, data.gridY)] = data.id;
    });

    factory.registerMethod('getTile', function(x, y){
        var tile;

        if (!this.tiles){
            this.tiles = {};
        }

        tile = this.tiles[this.getTileLocation(x, y)];

        if (!tile){
            throw new Error('Tile x:' + x + ' y:' + y + ' not found');
        }

        return tile;
    });

    factory.registerMethod('getTileLocation', function(x, y){
        return x + ',' + y;
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
                x: arguments[0] * 32,
                y: arguments[1] * 32
            }
        }
    });

    return factory.create({
        name: 'level',
        methods: ['addTile', 'getTile', 'getTileLocation', 'getTilePosition'],
        presets: [],
        default: {}
    });
});
