var React = require('react');
var _ = require('lodash');

/**
 * Compiles an array into a React DOM structure recursively. All segments of the node array are optional.
 *
 * The array segments can be in any order apart from the node type, that always needs to be first.
 *
 * Actually works really well, I'd quite like to open source this with CSS selector parsing in the nodeName.
 *
 * @param {*[]} node Comprised of a string DOM node name, params object and string content or child node(s).
 * @return {Object} A react DOM tree built from your data structure recursively.
 */
function compile(node) {
    if (_.isArray(_.first(node))) {
        return _.map(node, compile);
    }
    else {
        var nodeName = _.first(node);
        var props = _.rest(node);

        var attrs = _.find(props, _.isPlainObject) || {};
        var children = _.find(props, _.isArray);
        var content = children ? compile(children) : _.find(props, _.isString);

        return React.createElement(nodeName, attrs, content);
    }
}

module.exports = compile;
