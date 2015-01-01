define([], function(){
    function PhaserInit(game){
        game.world.setBounds(0, 0, 1920, 1200);

        /*var w = 39, h = 25;
        var dm = new ROT.Map.DividedMaze(w, h);
        dm.create(function(x, y, value){
            game.add.sprite( 32 * x, 32 * y, value ? 'lava' : 'flagstone');
        });*/


        //cursors = game.input.keyboard.createCursorKeys();
    }

    return PhaserInit;
});
