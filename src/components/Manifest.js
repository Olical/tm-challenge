var React = require('react');
var Reflux = require('reflux');
var roomStore = require('../stores/roomStore');
var compile = require('../utils/compile');
var generateManifest = require('../utils/generateManifest');

var Manifest = React.createClass({
    mixins: [
        Reflux.connect(roomStore, 'rooms')
    ],
    render: function () {
        var tree = ['div', generateManifest(this.state.rooms)];
        return compile(tree);
    }
});

module.exports = Manifest;
