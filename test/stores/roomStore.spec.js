var roomStore = require('../../src/stores/roomStore');
var Reflux = require('reflux');

describe('roomStore', function () {
    describe('addRoom', function () {
        var description = 'room description';

        beforeEach(function () {
            roomStore.addRoom(description);
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

        describe('updateRoom', function () {
            var room;

            beforeEach(function () {
                room = roomStore.rooms[0];
                roomStore.updateRoom(room.id, description.toUpperCase());
            });

            it('should have updated the room description', function () {
                roomStore.should.have.propertyByPath('rooms', 0, 'description').and.equal(description.toUpperCase());
            });

            describe('removeRoom', function () {
                it('should remove the room', function () {
                    roomStore.getRoom(room.id).should.be.type('object');
                    roomStore.removeRoom(room.id);
                    (typeof roomStore.getRoom(room.id)).should.equal('undefined');
                });
            });
        });

        describe('addItem', function () {
            var description = 'a mysterious ring that you feel should be thrown into a volcano';
            var weight = '0.05kg';
            var isFragile = false; // Probably requires a volcano.
            var room;

            beforeEach(function () {
                room = roomStore.rooms[0];
                roomStore.addItem(room.id, description, weight, isFragile);
            });
        });
    });
});
