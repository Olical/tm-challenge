var compile = require('../src/compile');
var React = require('react');

var render = function (tree) {
    return React.renderToStaticMarkup(compile(tree));
};

/**
 * Possible forms...
 *
 * ['p', 'text']
 * ['p', {id: 'f'}, 'text']
 * ['p', ['text', ['p', 'text'], preCompiled()]]
 */

describe('content', function () {
    describe('simple text', function () {
        it('should handle a type and content', function () {
            render(['p', 'text']).should.equal('<p>text</p>');
        });

        it('should handle a type and nested content', function () {
            render(['p', ['text']]).should.equal('<p>text</p>');
        });
    });
});
