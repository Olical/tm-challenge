var compile = require('../src/compile');
var React = require('react');

var render = function (tree) {
    return React.renderToStaticMarkup(compile(tree));
};

describe('compile', function () {
    describe('simple text', function () {
        it('should handle a type and content', function () {
            render(['p', 'text']).should.equal('<p>text</p>');
        });

        it('should handle a type and nested content', function () {
            render(['p', ['text']]).should.equal('<p>text</p>');
        });
    });

    describe('with an attribute', function () {
        it('should handle an id attribute', function () {
            render(['p', {id: 'f'}, 'text']).should.equal('<p id="f">text</p>');
        });
    });

    describe('nested', function () {
        it('should handle nested arrays', function () {
            render(['p', [['span', 'text', {key:0}]]]).should.equal('<p><span>text</span></p>');
        });

        it('should handle pre-compiled values', function () {
            var pre = compile(['span', 'text', {key:0}]);
            render(['p', [pre]]).should.equal('<p><span>text</span></p>');
        });
    });
});
