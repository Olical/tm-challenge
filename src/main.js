var React = require('react');

var Router = require('react-router');
var Route = React.createFactory(Router.Route);
var DefaultRoute = React.createFactory(Router.DefaultRoute);

var compile = require('./utils/compile');

var Dashboard = require('./components/Dashboard');
var Manifest = require('./components/Manifest');
var App = require('./components/App');

var container = document.getElementById('main');

var routes = compile(
    Route({path: '/', handler: App, name: 'dashboard'},
        DefaultRoute({handler: Dashboard}),
        Route({name: 'manifest', handler: Manifest})
    )
);

/**
 * Entry point into the application, will load the root component and mount it onto the DOM.
 */
function main() {
    Router.run(routes, function (Handler) {
        var handler = React.createFactory(Handler);
        React.render(handler(), container);
    });
}

// GO!
main();
