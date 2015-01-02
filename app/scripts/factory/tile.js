define([
    'lodash',
    'core/factory',
    'enums/extenders'
], function(_, factory, Extenders){
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
            entity[extender.name] = game.add.sprite(0, 0, null);
        },
        name: 'sprite'
    });

    factory.registerExtender('texture', {
        type: Extenders.GETSET,
        name: 'texture',
        get: function(){
            return this.sprite? this.sprite.texture : null;
        },
        set: function(val){
            if (this.sprite){
                if (typeof val === 'string'){
                    this.sprite = PIXI.TextureCache[val];
                } else if (typeof val === 'object'){
                    this.sprite = val;
                }
            }
        }
    });

    return factory.create({
        extend: ['phaser-sprite', 'sprite_x', 'sprite_y', 'texture'],
        default: {
            x: 32,
            y: 32
        }
    });
});
