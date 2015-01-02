define([
    'lodash',
    'core/objects',
    'enums/extenders'
], function(_, Objects, Extenders){
    /* OPTIONS MODEL
        props: [String],
        methods: [String],
        presets: [String],
        extend: [String],
        phaser: [String],
        customs: {
            'name': {
                'prop': String / Number
            }
        },
        default: {
            'prop': String / Number
        }
    */
    var methods = {},
        extenders = {};

    function Factory(options){
        this.blueprint = null;
        this.default = options.default || {};
        this.custom = options.custom || null;

        if (typeof options !== 'object'){
            throw new Error('Options should be an object');
        }

        this.blueprint = {
            props: options.props || {},
            extend: options.extend || null,
            methods: options.methods || null,
            presets: options.presets || null
        }

        this.create = function(options){
            var entity = {},
                assign = _.extend(this.default, options);

            _.each(this.blueprint.extend, function(extenderName){
                var extender = extenders[extenderName];

                if (!extender){
                    throw new Error('Extender ' + extenderName + ' not defined');
                }

                if (extender.type === Extenders.GETSET){
                    Object.defineProperty(entity, extender.name, {
                        get: extender.get,
                        set: extender.set
                    });
                } else if (extender.type === Extenders.FUNCTION) {
                    extender.handler(entity, extender);
                }
            });

            _.each(this.blueprint.props, function(propName){
                entity[propName] = this.default[propName] || null;
            }, this);

            _.each(this.blueprint.methods, function(methodName){
                if (typeof methods[methodName] !== 'function'){
                    throw new Error('Method ' + methodName + ' not found');
                }

                if (entity[methodName]){
                    throw new Error('Property ' + methodName + ' already existing');
                }

                entity.prototype[methodName] = methods[methodName];
            }, this);

            _.each(assign, function(a, prop){
                entity[prop] = a;
            });

            Objects.set(entity);

            return entity;
        }

        _.each(this.custom, function(defValue, defName){
            this[defName] = function(){
                return this.create(defValue);
            }
        }, this);
    }

    function createFactory(options){
        return new Factory(options);
    }

    function registerMethod(name, handler){
        if (methods[name] !== undefined){
            throw new Error('Method ' + name + ' is already initialized');
        }

        methods[name] = handler;
    }

    function registerExtender(name, extender){
        if (extenders[name] !== undefined){
            throw new Error('Extender ' + name + ' is already initialized');
        }

        extenders[name] = extender;
    }

    return {
        create: createFactory,
        registerMethod: registerMethod,
        registerPreset: undefined,
        registerExtender: registerExtender
    }
});
