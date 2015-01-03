requirejs.config({
    baseUrl: 'scripts/',
    paths:{
        q: '../bower_components/q/q',
        pubsub: '../bower_components/pubsub-js/src/pubsub',
        ko: '../bower_components/knockout/dist/knockout',
        jquery: '../bower_components/jquery/dist/jquery',
        lodash: '../bower_components/lodash/dist/lodash',
        phaser: '../bower_components/phaser/build/phaser',
        rot: '../bower_components/rot.js/rot'
    },
    shim:{
        phaser:{
            exports: 'Phaser'
        },
        rot:{
            exports: 'ROT'
        }
    }
});

// Start the main app logic.
requirejs([
    'ko',
    'viewmodels/application'
],
function(ko, ApplicationViewmodel) {
    ko.applyBindings(new ApplicationViewmodel());
});
