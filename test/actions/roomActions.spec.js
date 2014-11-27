var roomActions = require('../../src/actions/roomActions');

describe('roomActions', function () {
    it('should contain all required actions, there is nothing to test here really', function () {
        var requiredProperties = [
            'addRoom',
            'removeRoom',
            'addItem',
            'removeItem'
        ];

        roomActions.should.have.properties(requiredProperties);
    });
});
