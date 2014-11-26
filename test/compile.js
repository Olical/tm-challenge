var compile = require('../src/compile');

describe('basic text node', function () {
    var type = 'p';
    var content = 'testing';
    var compiled = compile([type, content]);

    it('should build the correct type of node with text content', function () {
        compiled.type.should.equal(type);
        compiled._store.props.children.should.equal(content);
    });
});

describe('nested nodes with unique keys', function () {
    var tree = ['p', [
        ['strong', 'BIG', {key:'s'}],
        ['em', 'SLANTED', {key:'b'}]
    ]];
    var compiled = compile(tree);

    it('should contain both children of the correct types', function () {
        var children = compiled._store.props.children;
        children[0].type.should.equal(tree[1][0][0]);
        children[1].type.should.equal(tree[1][1][0]);
    });
});
