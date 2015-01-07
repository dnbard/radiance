define([
    'enums/pages',
    'enums/events',
    'enums/extenders',
    'enums/gameState',
    'enums/sprites',
    'enums/keyboardActions'
], function(Pages, Events, Extenders, GameState, Sprites, KeyboardActions){
    return {
        Pages: Pages,
        Events: Events,
        Extenders: Extenders,
        GameState: GameState,
        Sprites: Sprites,
        KeyboardActions: KeyboardActions
    };
});
