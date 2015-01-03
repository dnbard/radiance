define([
    'core/factory',
    'enums/extenders'
], function(factory, Extenders){
    factory.registerExtender('sprite_x', {
        get: function(){
            return this.sprite ? this.sprite.position.x : null
        },
        set: function(val){
            if (this.sprite){
                this.sprite.position.x = val;
            }
        },
        name: 'x',
        type: Extenders.GETSET
    });

    factory.registerExtender('sprite_y', {
        get: function(){
            return this.sprite ? this.sprite.position.y : null
        },
        set: function(val){
            if (this.sprite){
                this.sprite.position.y = val;
            }
        },
        name: 'y',
        type: Extenders.GETSET
    });

    factory.registerExtender('phaser-sprite', {
        type: Extenders.FUNCTION,
        handler: function(entity, extender){
            var game = _.first(Phaser.GAMES);

            Object.defineProperty(entity, extender.name, {
                value: game.add.sprite(0, 0),
                enumerable: false
            });
        },
        name: 'sprite'
    });

    factory.registerExtender('texture', {
        type: Extenders.GETSET,
        name: 'texture',
        set: function(val){
            if (this.sprite){
                if (typeof val === 'string'){
                    this.sprite.setTexture(PIXI.TextureCache[val]);
                } else if (typeof val === 'object'){
                    this.sprite.setTexture(val);
                }
            }
        }
    });

    factory.registerPreset('sprite', {
        extend: [ 'phaser-sprite', 'sprite_x', 'sprite_y', 'texture' ]
    });
});
