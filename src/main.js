var React = require('react');
var Router = require('react-router');
var Route = React.createFactory(Router.Route);
var Dashboard = require('./components/Dashboard');
var compile = require('./utils/compile');

var container = document.getElementById('main');

var routes = compile(Route({
    name: 'dashboard',
    path: '/',
    handler: Dashboard
}));

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
