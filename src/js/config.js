
require.config({

    paths: {
        'jquery': 'http://code.jquery.com/jquery-2.1.0.min',
        'underscore':'http://underscorejs.org/underscore-min',
        'd3': 'http://d3js.org/d3.v3.min'
    },

    shim: {
        'underscore': {
            exports: '_'
        },
        'jquery': {
            exports: '$'
        }
    }
});

require(['app']);