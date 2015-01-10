define([
    'lodash',
    'core/factory',
    'enums/extenders',
    'enums/sprites',
    'config/general',
    'phaser',
    'helpers/spriteGroup'
], function(_, factory, Extenders, Sprites, config, phaser, spriteGroup){
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

    factory.registerExtender('player_x', {
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
                    _.first(phaser.GAMES).add.tween(sprite).to( { x: val }, 250, Phaser.Easing.Quadratic.In, true);
                });
            } else {
                _.first(phaser.GAMES).add.tween(this.sprite).to( { x: val }, 250, Phaser.Easing.Quadratic.In, true);
            }
        },
        name: 'x',
        type: Extenders.GETSET
    });

    factory.registerExtender('player_y', {
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
                    _.first(phaser.GAMES).add.tween(sprite).to( { y: val }, 250, Phaser.Easing.Quadratic.In, true);
                });
            } else {
                _.first(phaser.GAMES).add.tween(this.sprite).to( { y: val }, 250, Phaser.Easing.Quadratic.In, true);
            }
        },
        name: 'y',
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
            var game = _.first(Phaser.GAMES),
                sprite;

            if (_.isArray(this.sprite)){
                sprite = spriteGroup.get(Sprites.DOODAD)
                    .add(new Phaser.Sprite(game, this.x || 0, this.y || 0, val, this.frame || 0));
                sprite.__type = Sprites.DOODAD;
                sprite.anchor = {
                    x: 0.5,
                    y: 0.5
                };

                this.sprite.push(sprite);
            } else {
                sprite = spriteGroup.get(Sprites.FLOOR)
                    .add(new Phaser.Sprite(game, this.x || 0, this.y || 0, val, this.frame || 0));
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
                    sprite = sprite = spriteGroup.get(Sprites.CREATURE)
                    .add(new Phaser.Sprite(game, this.x || 0, this.y || 0, val, this.frame || 0));
                sprite.__type = Sprites.CREATURE;
                sprite.anchor = {
                    x: 0.5,
                    y: 0.75
                };
                sprite.position.z = 10;

                Object.defineProperty(this, 'sprite', {
                    value: [ sprite ],
                    enumerable: false
                });
            }
        }
    });

    factory.registerExtender('player-frame', {
        type: Extenders.GETSET,
        name: 'frame',
        set: function(val){
            var sprite;

            if (!this.sprite){
                throw new Error('Player sprite not found');
            }

            sprite = _.find(this.sprite, function(sp){
                return sp.__type === Sprites.CREATURE;
            });

            if (!sprite){
                throw new Error('Player sprite not found');
            }

            sprite.frame = val;
        }
    });

    factory.registerExtender('sprite-alpha', {
        type: Extenders.GETSET,
        name: 'alpha',
        get: function(){
            if (!this.sprite){
                return this._alpha || null;
            }

            return _.isArray(this.sprite) ? this.sprite[0].alpha : this.sprite.alpha;
        },
        set: function(val){
            if (!this.sprite){
                this._alpha = val;
                return;
            }

            if (_.isArray(this.sprite)){
                _.each(this.sprite, function(sprite){
                    if (val === 0){
                        sprite.alpha = val;
                    } else {
                        _.first(phaser.GAMES).add.tween(sprite).to( { alpha: val }, 250, Phaser.Easing.Quadratic.In, true);
                    }
                });
            } else {
                if (val === 0){
                    this.sprite.alpha = val;
                } else {
                    _.first(phaser.GAMES).add.tween(this.sprite).to( { alpha: val }, 250, Phaser.Easing.Quadratic.In, true);
                }
            }
        },
    });

    factory.registerPreset('sprite', {
        extend: [ 'sprite_x', 'sprite_y', 'sprite_gridX', 'sprite_gridY', 'texture', 'sprite-alpha' ]
    });

    factory.registerPreset('player', {
        extend: [ 'player_x', 'player_y', 'sprite_gridX', 'sprite_gridY', 'player-texture', 'player-keyboard', 'player-frame']
    });
});
