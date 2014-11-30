var _ = require('lodash');
var React = require('react');
var Reflux = require('reflux');
var roomStore = require('../stores/roomStore');
var compile = require('../utils/compile');
var Room = React.createFactory(require('../components/Room'));

/**
 * Returns rooms with only their two heaviest items remaining.
 *
 * @param {Object[]} rooms
 * @return {Object[]} Less rooms
 */
function getHeavy(rooms) {
    return _.map(_.cloneDeep(rooms), function (room) {
        var sortedByWeight = _.sortBy(room.items, function (item) {
            var weight = parseFloat(item.weight);
            return -weight;
        });

        room.items = _.first(sortedByWeight, 2);
        return room;
    });
}

/**
 * Returns rooms with only their fragile items remaining.
 *
 * @param {Object[]} rooms
 * @return {Object[]} Less rooms
 */
function getFragile(rooms) {
    return _.map(_.cloneDeep(rooms), function (room) {
        var fragile = _.filter(room.items, 'isFragile');
        room.items = fragile;
        return room;
    });
}

/**
 * Return rooms with only items that are not mentioned in the provided collections of rooms.
 *
 * This is essentially the delta room/item set compared to the provided set of rooms.
 *
 * @param {Object[]} rooms
 * @param {Object[][]} roomsCollection
 * @return {Object[]} Less rooms
 */
function getRest(rooms, roomsCollection) {
    var items = _.unique(_.reduce(roomsCollection, function (acc, rooms) {
        var items = _.union.apply(_, _.map(rooms, 'items'));
        return _.union(acc, items);
    }, []), 'id');

    return _.map(rooms, function (room) {
        var rest = _.filter(room.items, function (item) {
            return !_.find(items, function (usedItem) {
                return usedItem.id === item.id;
            });
        });
        room.items = rest;
        return room;
    });
}

/**
 * Maps an array of rooms into an array of React room components.
 *
 * @param {Object[]} rooms
 * @return {Object[]}
 */
function renderRooms(title, rooms) {
    var base = [['h2', title, {key: 'title'}]];

    var content = _.map(rooms, function (room) {
        return Room(_.assign({key: room.id}, room));
    });

    return _.union(base, content);
}

var Manifest = React.createClass({
    mixins: [
        Reflux.connect(roomStore, 'rooms')
    ],
    render: function () {
        var heavy = getHeavy(this.state.rooms);
        var fragile = getFragile(this.state.rooms);
        var rest = getRest(this.state.rooms, [heavy, fragile]);

        return compile(['ul', {
            key: 'manifest',
            className: 'pure-g'
        }, [
            ['li', renderRooms('Heaviest', heavy), {
                key: 'heaviest',
                className: 'pure-u-1-3'
            }],
            ['li', renderRooms('Fragile', fragile), {
                key: 'fragile',
                className: 'pure-u-1-3'
            }],
            ['li', renderRooms('Rest', rest), {
                key: 'rest',
                className: 'pure-u-1-3'
            }]
        ]]);
    }
});

module.exports = Manifest;
