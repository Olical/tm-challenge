var _ = require('lodash');
var Reflux = require('reflux');
var roomActions = require('../actions/roomActions');

var roomStore = Reflux.createStore({
    listenables: [
        roomActions
    ],
    onAddRoom: _.noop,
    onRemoveRoom: _.noop,
    onAddItem: _.noop,
    onRemoveItem: _.noop
});

module.exports = roomStore;
