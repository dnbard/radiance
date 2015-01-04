define([
    'core/factory',
    'enums/extenders'
], function(factory, Extenders){
    factory.registerExtender('sprite_gridX', {
        get: function(){
            return Math.round(this.x / 32);
        },
        name: 'gridX',
        type: Extenders.GETSET
    });

    factory.registerExtender('sprite_gridY', {
        get: function(){
            return Math.round(this.y / 32);
        },
        name: 'gridY',
        type: Extenders.GETSET
    });

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

    factory.registerExtender('texture', {
        type: Extenders.GETSET,
        name: 'texture',
        set: function(val){
            if (this.sprite){
                /*if (typeof val === 'string'){
                    this.sprite.setTexture(PIXI.TextureCache[val]);
                } else if (typeof val === 'object'){
                    this.sprite.setTexture(val);
                }*/
                throw new Error('Texture swapping are not implemented yet');
            } else {
                var game = _.first(Phaser.GAMES);

                Object.defineProperty(this, 'sprite', {
                    value: game.add.sprite(this.x || 0, this.y || 0, val, this.frame || 0),
                    enumerable: false
                });
            }
        }
    });

    factory.registerPreset('sprite', {
        extend: [ 'phaser-sprite', 'sprite_x', 'sprite_y', 'sprite_gridX', 'sprite_gridY', 'texture' ]
    });
});
