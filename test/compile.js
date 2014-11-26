var compile = require('../src/compile');

describe('basic text node', function () {
    var type = 'p';
    var content = 'testing';
    var compiled = compile([type, content]);

    it('should have built the correct React-ish DOM', function () {
        compiled.type.should.be(type);
    });
});
