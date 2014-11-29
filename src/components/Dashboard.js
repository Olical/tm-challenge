var _ = require('lodash');
var React = require('react');
var Reflux = require('reflux');
var compile = require('../utils/compile');
var roomStore = require('../stores/roomStore');
var Room = React.createFactory(require('./Room'));

/**
 * Constructs the list of rooms to display.
 */
function buildRoomList(rooms) {
    return _.map(rooms, function (room) {
        return ['li', Room(room), {key: room.id}];
    });
}

/**
 * Renders all rooms and items in an editable state.
 *
 * @type {Function}
 */
var Dashboard = React.createClass({
    mixins: [
        Reflux.connect(roomStore, 'rooms')
    ],
    render: function () {
        var tree = ['ul', buildRoomList(this.state.rooms)];
        return compile(tree);
    }
});

module.exports = Dashboard;
