var _ = require('lodash');
var Reflux = require('reflux');
var roomActions = require('../actions/roomActions');

var roomStore = Reflux.createStore({
    listenables: roomActions,

    /**
     * Creates a new room with a description.
     *
     * @param {String} description
     */
    onAddRoom: function (description) {
        this.rooms.push({
            description: description,
            id: _.uniqueId('room_')
        });
    },

    /**
     * Updates a room with a new description.
     *
     * @param {String} roomId
     * @param {String} description
     */
    onUpdateRoom: _.noop,

    /**
     * Removes a room by id.
     *
     * @param {String} roomId
     */
    onRemoveRoom: _.noop,

    /**
     * Creates a new item against a room.
     *
     * @param {String} roomId
     * @param {String} description
     * @param {String} weight
     * @param {Boolean} isFragile
     */
    onAddItem: _.noop,

    /**
     * Update an item.
     *
     * @param {String} itemId
     * @param {String} roomId
     * @param {String} description
     * @param {String} weight
     * @param {Boolean} isFragile
     */
    onUpdateItem: _.noop,

    /**
     * Removes an item by id.
     *
     * @param {String} itemId
     */
    onRemoveItem: _.noop
});

module.exports = roomStore;
