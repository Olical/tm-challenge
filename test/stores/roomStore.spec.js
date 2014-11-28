var roomStore = require('../../src/stores/roomStore');
var Reflux = require('reflux');

describe('roomStore', function () {
    describe('onAddRoom', function () {
        var description = 'room description';

        beforeEach(function () {
            roomStore.onAddRoom(description);
        });

        afterEach(function () {
            roomStore.clear();
        });

        it('should add the room to the data structure with the description', function () {
            roomStore.should.have.propertyByPath('rooms', 0, 'description').and.equal(description);
        });

        it('should be assigned a unique ID', function () {
            roomStore.should.have.propertyByPath('rooms', 0, 'id').and.match(/room_\d+/);
        });

        describe('onUpdateRoom', function () {
            var room;

            beforeEach(function () {
                room = roomStore.rooms[0];
                roomStore.onUpdateRoom(room.id, description.toUpperCase());
            });

            it('should have updated the room description', function () {
                roomStore.should.have.propertyByPath('rooms', 0, 'description').and.equal(description.toUpperCase());
            });

            describe('onRemoveRoom', function () {
                it('should remove the room', function () {
                    roomStore.getRoom(room.id).should.be.type('object');
                    roomStore.onRemoveRoom(room.id);
                    (typeof roomStore.getRoom(room.id)).should.equal('undefined');
                });
            });
        });
    });
});
