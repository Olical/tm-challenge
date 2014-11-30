var _ = require('lodash');
var React = require('react');
var Reflux = require('reflux');
var compile = require('../utils/compile');
var roomStore = require('../stores/roomStore');
var roomActions = require('../actions/roomActions');
var Room = React.createFactory(require('./Room'));

/**
 * Constructs the list of rooms to display.
 */
function buildRoomList(rooms) {
    var editable = {
        isEditable: true
    };

    return _.map(rooms, function (room) {
        return ['li', Room(_.assign({}, editable, room)), {
            key: room.id,
            className: 'pure-u-1-5'
        }];
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
        var tree = ['div', [
            ['ul', {className: 'pure-menu pure-menu-open pure-menu-horizontal'}, [
                ['li', {key: 'add'}, [['a', 'Add new room', {
                    key: 'button',
                    onClick: roomActions.addRoom,
                    href: '#'
                }]]],
                ['li', {key: 'clear'}, [['a', 'Clear all', {
                        key: 'button',
                        onClick: roomActions.clear,
                        href: '#'
                    }]]
                ]
            ]],
            ['ul', buildRoomList(this.state.rooms), {
                key: 'rooms',
                className: 'pure-g'
            }]
        ]];
        return compile(tree);
    }
});

module.exports = Dashboard;
