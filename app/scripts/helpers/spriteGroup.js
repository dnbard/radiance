define([
    'lodash',
    'enums',
    'phaser'
], function(_, enums, phaser){
    var config = [{
            type: enums.Sprites.DOODAD,
            z: 5
        },{
            type: enums.Sprites.FLOOR,
            z: 1
        },{
            type: enums.Sprites.CREATURE,
            z: 10
        }],
        groups = {},
        initialized = false;

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
            if (!initialized){
                _.chain(config).sortBy(function(configEntity){
                    return configEntity.z;
                }).each(function(configEntity){
                    console.log(configEntity.type);
                    tryInitGroup(configEntity.type);
                });
                initialized = true;
            }

            if (!groupId){
                throw new Error('Invalid argument: groupId');
            }

            if (!groups[groupId]){
                throw new Error('No predefined group for ' + groupId);
            }

            return groups[groupId];
        }
    }
});
