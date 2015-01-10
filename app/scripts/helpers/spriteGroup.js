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
        },{
            type: enums.Sprites.SHADOW,
            z: 100
        }],
        groups = {},
        initialized = false;

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
                    if (!tryInitGroup(configEntity.type)){
                        throw new Error('Sprite Layer ' + configEntity.type + ' not created');
                    };
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
