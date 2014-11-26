var React = require('react');
var compile = require('./compile');

/**
 * Entry point into the application, will load the root component and mount it onto the DOM.
 */
function main() {
    var container = document.getElementById('main');
    React.render(compile(['p', [
        ['strong', {key: 'bold'}, 'BOLD'],
        ['em', {key: 'slanty'}, 'SLANTY']
    ]]), container);
}

// GO!
main();
