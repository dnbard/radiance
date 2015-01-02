define([
    'lodash'
], function(_){
    var container = {},
        nextId = 0;

    return {
        set: function(obj){
            obj.id = nextId++;
            container[obj.id];

            return obj;
        },
        get: function(id){
            return container[id];
        },
        remove: function(id){
            delete container[id];
        },
        size: function(){
            return _.size(container);
        }
    }
});
