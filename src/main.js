var React = require('react');
var Room = React.createFactory(require('./components/Room'));

/**
 * Entry point into the application, will load the root component and mount it onto the DOM.
 */
function main() {
    var container = document.getElementById('main');
    React.render(Room({
        description: 'SOME ROOM',
        id: 'rooooom',
        items: [
            {
                description: 'desc',
                weight: '10kg',
                isFragile: true,
                id: 'foo'
            }
        ]
    }), container);
}

// GO!
main();
