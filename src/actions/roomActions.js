var Reflux = require('reflux');

/**
 * These are used to construct the actions. Actions are used within Reflux by the components to tell the stores what to do.
 *
 * @type {String[]}
 */
var requiredActions = [
    'addRoom',
    'updateRoom',
    'removeRoom',
    'addItem',
    'updateItem',
    'removeItem',
    'clear'
];

var roomActions = Reflux.createActions(requiredActions);

module.exports = roomActions;
