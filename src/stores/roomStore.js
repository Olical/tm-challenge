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
    set: function (rooms) {
        this.rooms = rooms;
        this.trigger(rooms);
    },

    /**
     * Wipes the current storage.
     */
    clear: function () {
        this.set([]);
    },

    /**
     * Returns the default data set for use in classes when listening to the store.
     *
     * @return {Object[]}
     */
    getInitialState: function () {
        return [];
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
     * Fetches an item by room and item id.
     *
     * @param {String} roomId
     * @param {String} itemId
     * @return {Object}
     */
    getItem: function (roomId, itemId) {
        var room = this.getRoom(roomId);
        return _.find(room.items, function (item) {
            return item.id === itemId;
        });
    },

    /**
     * Creates a blank room in edit mode.
     */
    addRoom: function () {
        var room = {
            isEditing: true,
            isEditable: true,
            id: _.uniqueId('room_')
        };

        this.set(_.union(this.rooms, [room]));
    },

    /**
     * Updates a room with a new description.
     *
     * @param {String} roomId
     * @param {String} description
     */
    updateRoom: function (roomId, description) {
        var room = this.getRoom(roomId);
        room.description = description;
        this.set(this.rooms);
    },

    /**
     * Removes a room by id.
     *
     * @param {String} roomId
     */
    removeRoom: function (roomId) {
        this.set(_.filter(this.rooms, function (room) {
            return room.id !== roomId;
        }));
    },

    /**
     * Creates a blank item against a room in edit mode.
     *
     * @param {String} roomId
     */
    addItem: function (roomId) {
        var room = this.getRoom(roomId);
        var item = {
            isEditing: true,
            isEditable: true,
            id: _.uniqueId('item_'),
            roomId: room.id
        };

        room.items = _.union(room.items, [item]);
        this.set(this.rooms);
    },

    /**
     * Update an item.
     *
     * @param {String} roomId
     * @param {String} itemId
     * @param {String} description
     * @param {String} weight
     * @param {Boolean} isFragile
     */
    updateItem: function (roomId, itemId, description, weight, isFragile) {
        var item = this.getItem(roomId, itemId);
        _.assign(item, {
            description: description,
            weight: weight,
            isFragile: isFragile
        });

        this.set(this.rooms);
    },

    /**
     * Removes an item by room and item id.
     *
     * @param {String} roomId
     * @param {String} itemId
     */
    removeItem: function (roomId, itemId) {
        var room = this.getRoom(roomId);
        room.items = _.filter(room.items, function (item) {
            return item.id !== itemId;
        });

        this.set(this.rooms);
    }
});

module.exports = roomStore;
