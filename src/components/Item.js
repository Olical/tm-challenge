var React = require('react');
var compile = require('../utils/compile');

/**
 * Turn a key and value into a property list item.
 *
 * @param {String} key
 * @param {String} value
 * @return {*[]} ['li', 'Key: value', {key: key}]
 */
function prop(key, value) {
    return ['li', [key, value].join(': '), {
        key: key
    }];
}

/**
 * Converts a boolean into human readable form (yes and no).
 *
 * @param {Boolean} flag
 * @return {String} yes or no for true and false respectively
 */
function humanBoolean(flag) {
    return flag ? 'yes' : 'no';
}

/**
 * Item view, allows display, edit and deletion of items.
 *
 * @type {Function}
 */
var Item = React.createClass({
    render: function () {
        var tree = ['ul', [
            prop('Description', this.props.description),
            prop('Weight', this.props.weight),
            prop('Fragile', humanBoolean(this.props.isFragile))
        ], {
            key: this.props.id
        }];

        return compile(tree);
    }
});

module.exports = Item;
