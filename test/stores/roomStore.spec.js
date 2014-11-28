var roomStore = require('../../src/stores/roomStore');
var roomActions = require('../../src/actions/roomActions');
var Reflux = require('reflux');

describe('roomStore', function () {
    describe('when addRoom is dispatched', function () {
        var description = 'room description';
        roomStore.rooms = []; // TODO
        roomActions.addRoom(description); // TODO cleanup too

        it('should add the room to the data structure with the description', function () {
            roomStore.should.have.propertyByPath('rooms', 0, 'description').and.equal(description);
        });

        it('should be assigned a unique ID', function () {
            roomStore.should.have.propertyByPath('rooms', 0, 'id').and.match(/room_\d+/);
        });
    });
});
