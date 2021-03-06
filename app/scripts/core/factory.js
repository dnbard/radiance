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
        extenders = {},
        presets = {};

    function Factory(options){
        this.blueprint = null;
        this.default = options.default || {};
        this.custom = options.custom || null;
        this.name = options.name;

        if (typeof options !== 'object'){
            throw new Error('Options should be an object');
        }

        this.blueprint = {
            props: options.props || {},
            extend: options.extend || null,
            methods: options.methods || null,
            presets: options.presets || null
        };

        this.create = function(options, customName){
            function applyExtender(extenderName){
                var extender = extenders[extenderName];

                if (!extender){
                    throw new Error('Extender ' + extenderName + ' not defined');
                }

                if (extender.type === Extenders.GETSET){
                    var props = {
                        enumerable: true
                    };

                    if (extender.get){
                        props.get = extender.get;
                    }

                    if (extender.set){
                        props.set = extender.set;
                    }

                    Object.defineProperty(entity, extender.name, props);
                } else if (extender.type === Extenders.FUNCTION) {
                    extender.handler(entity, extender);
                }
            }

            function applyProp(propName){
                entity[propName] = this.default[propName] || null;
            }

            function applyMethod(methodName){
                if (typeof methods[methodName] !== 'function'){
                    throw new Error('Method ' + methodName + ' not found');
                }

                if (entity[methodName]){
                    throw new Error('Property ' + methodName + ' already existing');
                }

                entity[methodName] = methods[methodName];
            }

            var entity = {
                    type: this.name + (customName ? ('.' + customName) : '')
                },
                assign = _.extend(this.default, options);

            Objects.set(entity);

            _.each(this.blueprint.presets, function(presetName){
                var preset = presets[presetName];

                if (!preset){
                    throw new Error('Preset ' + presetName + ' not found');
                }

                if (typeof preset.props === 'object'){
                    _.each(preset.props, applyProp, this);
                }

                if (typeof preset.methods === 'object'){
                    _.each(preset.methods, applyMethod, this);
                }

                if (typeof preset.extend === 'object'){
                    _.each(preset.extend, applyExtender, this);
                }
            });

            _.each(this.blueprint.extend, applyExtender, this);
            _.each(this.blueprint.props, applyProp, this);
            _.each(this.blueprint.methods, applyMethod, this);

            _.each(assign, function(a, prop){
                entity[prop] = a;
            });

            return entity;
        }

        _.each(this.custom, function(defValue, defName){
            this[defName] = function(){
                return this.create(defValue, defName);
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

    function registerPreset(name, preset){
        if (presets[name] !== undefined){
            throw new Error('Preset ' + name + ' is already defined');
        }

        presets[name] = preset;
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
        registerPreset: registerPreset,
        registerExtender: registerExtender
    }
});
