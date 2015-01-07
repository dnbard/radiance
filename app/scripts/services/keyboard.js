define([
    'lodash',
    'phaser',
    'enums'
], function(_, Phaser, enums){
    var instance = null;

    function KeyboardController(){
        this.registeredKeys = {};
        this.handlers = [];
    }

    KeyboardController.prototype.update = function(){
        _.each(this.handlers, function(handler){
            if (handler.type === enums.KeyboardActions.DOWN && handler.key.entity.isDown){
                handler.action();
            } else if (handler.type === enums.KeyboardActions.PRESS && handler.key.entity.isUp && handler.key.isPreviousDown){
                handler.action();
            }

            handler.key.isPreviousDown = handler.key.entity.isDown;
        });
    }

    KeyboardController.prototype.subscribe = function(key, handler, type, context){
        var registeredKey = this.registerKey(key);
        this.handlers.push({
            action: context ? _.bind(handler, context) : handler,
            type: type,
            key: registeredKey
        });
    }

    KeyboardController.prototype.registerKey = function(key){
        var registeredKey = this.registeredKeys[key],
            game = _.first(Phaser.GAMES),
            phaserKey;

        if (!registeredKey){
            phaserKey = game.input.keyboard.addKey(key);

            registeredKey = {
                entity: phaserKey
            };
        }

        return registeredKey;
    }

    return {
        create: function(){
            if (instance === null){
                instance = new KeyboardController();
            }
            return instance;
        }
    };
});
