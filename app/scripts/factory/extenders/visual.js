define([
    'lodash',
    'core/factory',
    'enums/extenders',
    'enums/sprites',
    'config/general'
], function(_, factory, Extenders, Sprites, config){
    factory.registerExtender('sprite_gridX', {
        get: function(){
            return Math.round(this.x / config.tileWidth);
        },
        name: 'gridX',
        type: Extenders.GETSET
    });

    factory.registerExtender('sprite_gridY', {
        get: function(){
            return Math.round(this.y / config.tileHeight);
        },
        name: 'gridY',
        type: Extenders.GETSET
    });

    factory.registerExtender('sprite_x', {
        get: function(){
            if (!this.sprite){
                return this._x || null;
            }

            return _.isArray(this.sprite) ? this.sprite[0].position.x : this.sprite.position.x;
        },
        set: function(val){
            if (!this.sprite){
                this._x = val;
                return;
            }

            if (_.isArray(this.sprite)){
                _.each(this.sprite, function(sprite){
                    sprite.position.x = val;
                });
            } else {
                this.sprite.position.x = val;
            }
        },
        name: 'x',
        type: Extenders.GETSET
    });

    factory.registerExtender('sprite_y', {
        get: function(){
            if (!this.sprite){
                return this._y || null;
            }

            return _.isArray(this.sprite) ? this.sprite[0].position.y : this.sprite.position.y;
        },
        set: function(val){
            if (!this.sprite){
                this._y = val;
                return;
            }

            if (_.isArray(this.sprite)){
                _.each(this.sprite, function(sprite){
                    sprite.position.y = val;
                });
            } else {
                this.sprite.position.y = val;
            }
        },
        name: 'y',
        type: Extenders.GETSET
    });

    factory.registerExtender('texture', {
        type: Extenders.GETSET,
        name: 'texture',
        set: function(val){
            if (this.sprite){
                throw new Error('Texture swapping are not implemented yet');
            } else {
                var game = _.first(Phaser.GAMES),
                    sprite = game.add.sprite(this.x || 0, this.y || 0, val, this.frame || 0);
                sprite.__type = Sprites.FLOOR;
                sprite.anchor = {
                    x: 0.5,
                    y: 0.5
                };

                Object.defineProperty(this, 'sprite', {
                    value: [ sprite ],
                    enumerable: false
                });
            }
        }
    });

    factory.registerExtender('player-texture', {
        type: Extenders.GETSET,
        name: 'texture',
        set: function(val){
            if (this.sprite){
                throw new Error('Texture swapping are not implemented yet');
            } else {
                var game = _.first(Phaser.GAMES),
                    sprite = game.add.sprite(this.x || 0, this.y || 0, val, this.frame || 0);
                sprite.__type = Sprites.CREATURE;
                sprite.anchor = {
                    x: 0.5,
                    y: 1
                };
                sprite.position.z = 10;

                Object.defineProperty(this, 'sprite', {
                    value: [ sprite ],
                    enumerable: false
                });
            }
        }
    });

    factory.registerPreset('sprite', {
        extend: [ 'sprite_x', 'sprite_y', 'sprite_gridX', 'sprite_gridY', 'texture' ]
    });

    factory.registerPreset('player', {
        extend: [ 'sprite_x', 'sprite_y', 'sprite_gridX', 'sprite_gridY', 'player-texture' ]
    });
});
