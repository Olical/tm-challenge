var React = require('react');
var Dashboard = React.createFactory(require('./components/Dashboard'));

var roomActions = require('./actions/roomActions');

/**
 * Entry point into the application, will load the root component and mount it onto the DOM.
 */
function main() {
    var container = document.getElementById('main');
    React.render(Dashboard(), container);
}

// GO!
main();
