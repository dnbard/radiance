define([
    'enums/pages',
    'enums/events',
    'enums/extenders',
    'enums/gameState',
    'enums/sprites',
    'enums/keyboardActions',
    'enums/actionResult'
], function(Pages, Events, Extenders, GameState, Sprites, KeyboardActions, ActionResult){
    return {
        Pages: Pages,
        Events: Events,
        Extenders: Extenders,
        GameState: GameState,
        Sprites: Sprites,
        KeyboardActions: KeyboardActions,
        ActionResult: ActionResult
    };
});
