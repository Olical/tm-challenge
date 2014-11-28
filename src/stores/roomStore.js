var _ = require('lodash');
var Reflux = require('reflux');
var roomActions = require('../actions/roomActions');

/**
 * Essentially the model for the entire application. Controlled through roomActions.
 *
 * @type {Object}
 */
var roomStore = Reflux.createStore({
    listenables: roomActions,

    /**
     * Sets the new rooms array and triggers an update.
     *
     * @param {Object[]} rooms Collection of room objects.
     */
    setRooms: function (rooms) {
        this.rooms = rooms;
        this.trigger(rooms);
    },

    /**
     * Wipes the current storage.
     */
    clear: function () {
        this.setRooms([]);
    },

    /**
     * Fetches a room by id.
     *
     * @param {String} roomId
     * @return {Object}
     */
    getRoom: function (roomId) {
        return _.find(this.rooms, function (room) {
            return room.id === roomId;
        });
    },

    /**
     * Creates a new room with a description.
     *
     * @param {String} description
     */
    onAddRoom: function (description) {
        var room = {
            description: description,
            id: _.uniqueId('room_')
        };
        this.setRooms(_.union(this.rooms, [room]));
    },

    /**
     * Updates a room with a new description.
     *
     * @param {String} roomId
     * @param {String} description
     */
    onUpdateRoom: function (roomId, description) {
        var room = this.getRoom(roomId);
        room.description = description;
        this.setRooms(this.rooms);
    },

    /**
     * Removes a room by id.
     *
     * @param {String} roomId
     */
    onRemoveRoom: function (roomId) {
        this.setRooms(_.filter(this.rooms, function (room) {
            return room.id !== roomId;
        }));
    },

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
