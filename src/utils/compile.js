var React = require('react');
var _ = require('lodash');

/**
 * Compiles an array into a React DOM structure recursively. All segments of the node array are optional.
 *
 * The array segments can be in any order apart from the node type, that always needs to be first.
 *
 * Actually works really well, I'd quite like to open source this with CSS selector parsing in the nodeName.
 *
 * @param {*[]} node Comprised of a string DOM node name, params object and string content or child node(s). The nodes can be more arrays or compiled React elements.
 * @return {Object} A react DOM tree built from your data structure recursively.
 */
function compile(node) {
    if (_.isArray(node)) {
        var nodeName = _.first(node);
        var findProp = _.partial(_.find, _.rest(node));
        var props = _.mapValues({
            attrs: _.isPlainObject,
            children: _.isArray,
            compiled: React.isValidElement,
            text: _.isString
        }, findProp);

        var child = props.text || props.compiled || _.map(props.children, compile);

        return React.createElement(nodeName, props.attrs, child);
    }
    else {
        return node;
    }
}

module.exports = compile;
