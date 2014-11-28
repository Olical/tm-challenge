var _ = require('lodash');
var React = require('react');
var compile = require('../utils/compile');
var Item = React.createFactory(require('./Item'));

/**
 * Constructs a list of items. Each item is also a list. We have to go deeper.
 *
 * @param {Object[]} items
 * @return {*[]}
 */
function buildItemList(items) {
    return _.map(items, function (item) {
        return ['li', Item(item), {key: item.id}];
    });
}

/**
 * Shows a room with a description and it's items. Also allows edit and removal of rooms.
 *
 * @type {Function}
 */
var Room = React.createClass({
    render: function () {
        var tree = ['div', [
            ['h3', this.props.description, {key: 'description'}],
            ['ul', buildItemList(this.props.items), {key: 'item'}]
        ], {
            key: this.props.id
        }];

        return compile(tree);
    }
});

module.exports = Room;
