var React = require('react');
var compile = require('../utils/compile');

var Manifest = React.createClass({
    render: function () {
        var tree = ['p', 'Hello, World!'];
        return compile(tree);
    }
});

module.exports = Manifest;
