requirejs.config({
    baseUrl: 'scripts/',
    paths:{
        q: '../bower_components/q/q',
        pubsub: '../bower_components/pubsub-js/srs/pubsub'
    }
});

// Start the main app logic.
requirejs([
],
function() {
    console.log('Application Started');
});
