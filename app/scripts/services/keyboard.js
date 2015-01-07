define([
    'lodash',
    'phaser',
    'enums'
], function(_, Phaser, enums){
    var instance = null;

    function KeyboardController(){
        this.registeredKeys = {};
        this.handlers = [];
        this.lastKeyPress = new Date().getTime();
    }

    KeyboardController.prototype.update = function(){
        var now = new Date();

        if (now - this.lastKeyPress < 400){
            return;
        }

        _.each(this.handlers, function(handler){
            if (handler.type === enums.KeyboardActions.DOWN && handler.key.entity.isDown){
                handler.action();
                this.lastKeyPress = new Date().getTime();
            } else if (handler.type === enums.KeyboardActions.PRESS && handler.key.entity.isUp && handler.key.isPreviousDown){
                handler.action();
                this.lastKeyPress = new Date().getTime();
            }

            handler.key.isPreviousDown = handler.key.entity.isDown;
        }, this);
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
