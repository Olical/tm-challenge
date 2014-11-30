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
        var tree = ['div', [
            ['p', 'Below you will find a plain text representation of your rooms and items that you can simply share with your moving company.', {key: 'description'}],
            ['div', generateManifest(this.state.rooms), {key: 'manifest'}]
        ]];
        return compile(tree);
    }
});

module.exports = Manifest;
