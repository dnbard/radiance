define([
    'lodash',
    'core/factory',
    'generators/level',
    'core/objects',
    'config/general',
    'enums',
    'rot',
    'pubsub'
], function(_, factory, generators, Objects, config, enums, rot, pubsub){
    factory.registerMethod('isTilePassable', function(tile){
        if (!tile || !tile.passable){
            return enums.ActionResult.HALT;
        }

        return enums.ActionResult.MOVEMENT;
    });

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

    factory.registerMethod('addNPC', function(npc){
        if (typeof npc !== 'object' || !npc.id){
            throw new Error('Invalid argument: npc');
        }

        if (!this.npcs){
            this.npcs = [];
        }

        this.npcs.push(npc.id);
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

    factory.registerExtender('events-level', {
        type: enums.Extenders.FUNCTION,
        handler: function(level){
            var levelId = level.id;

            var lightPasses = function(x, y) {
                var level = Objects.get(levelId),
                    key = level.getTileLocation(x, y),
                    tile;

                if (key in level.tiles){
                    tile = Objects.get(level.tiles[key]);
                    return !!tile.passable;
                }

                return false;
            }

            var fov = new ROT.FOV.PreciseShadowcasting(lightPasses);
            var shadowcastingCallback = function(event, data){
                var level = Objects.get(levelId),
                    player = Objects.get(level.playerId);

                _.each(level._highTiles, function(tileId){
                    var tile = Objects.get(tileId);
                    tile.alpha = config.tileVisitedAlpha;
                });

                level._highTiles = [];

                fov.compute(data.x || player.gridX, data.y || player.gridY, 10, function(x, y, r, visibility) {
                    var level = Objects.get(levelId),
                        tile = level.getTile(x, y);
                    tile.alpha = visibility > config.tileUnseenAlpha ? config.tileSightAlpha : config.tileVisitedAlpha;

                    level._highTiles.push(tile.id);
                });
            }

            pubsub.subscribe(enums.Events.PLAYER.MOVED, shadowcastingCallback);
            pubsub.subscribe(enums.Events.LEVEL.CREATED, shadowcastingCallback);
        }
    });
});
