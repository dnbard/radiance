define([
    'phaser',
    'lodash'
], function(phaser, _){
    var instance = null;

    function CameraService(){
        this.offset = {
            x: Math.round(window.screen.availWidth * 0.5),
            y: Math.round(window.screen.availHeight * 0.5)
        };
    }

    CameraService.prototype.set = function(obj){
        var game = _.first(phaser.GAMES);

        if (typeof obj !== 'object' || !obj.x || !obj.y){
            throw new Error('Invalid argument: obj');
        }

        game.camera.x = obj.x - this.offset.x;
        game.camera.y = obj.y - this.offset.y;
    }

    CameraService.prototype.follow = function(obj){
        var game = _.first(phaser.GAMES);

        game.camera.follow(_.first(obj.sprite));
    }

    return {
        create: function(){
            if (instance === null){
                instance = new CameraService();
            }
            return instance;
        }
    }
});
