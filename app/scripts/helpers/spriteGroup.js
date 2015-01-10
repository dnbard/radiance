define([
    'lodash',
    'enums',
    'phaser'
], function(_, enums, phaser){
    var config = [{
            type: enums.Sprites.DOODAD,
            z: 10
        },{
            type: enums.Sprites.FLOOR,
            z: 1
        },{
            type: enums.Sprites.CREATURE,
            z: 50
        }],
        groups = {};

    /*groups[enums.Sprites.DOODAD] = _.first(phaser.GAMES).add.group(undefined, enums.Sprites.DOODAD);
    groups[enums.Sprites.FLOOR] = _.first(phaser.GAMES).add.group(undefined, enums.Sprites.FLOOR);*/

    function tryInitGroup(groupId){
        var groupConfig = _.find(config, function(gConfig){
            return gConfig.type === groupId;
        }), group;

        if (!groupConfig){
            return false;
        }

        group = _.first(phaser.GAMES).add.group(undefined, groupConfig.type);
        group.z = groupConfig.z;

        groups[groupId] = group;

        return group;
    }

    return {
        get: function(groupId){
            if (!groupId){
                throw new Error('Invalid argument: groupId');
            }

            if (!groups[groupId] && !tryInitGroup(groupId)){
                throw new Error('No predefined group for ' + groupId);
            }

            return groups[groupId];
        }
    }
});
