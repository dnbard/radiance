define([
    'enums/pages',
    'enums/events',
    'enums/extenders',
    'enums/gameState',
    'enums/sprites'
], function(Pages, Events, Extenders, GameState, Sprites){
    return {
        Pages: Pages,
        Events: Events,
        Extenders: Extenders,
        GameState: GameState,
        Sprites: Sprites
    };
});
