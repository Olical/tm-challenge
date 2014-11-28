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

            it('should have added an item to the room', function () {
                room.should.have.propertyByPath('items', 0).and.have.properties({
                    description: description,
                    weight: weight,
                    isFragile: isFragile
                }).and.have.property('id').and.match(/item_\d+/);
            });

            describe('updateItem', function () {
                var item;

                beforeEach(function () {
                    item = room.items[0];
                    roomStore.updateItem(room.id, item.id, description.toUpperCase(), weight.toUpperCase(), !isFragile);
                });

                it('should have updated the item', function () {
                    roomStore.should.have.propertyByPath('rooms', 0, 'items', 0).and.have.properties({
                        description: description.toUpperCase(),
                        weight: weight.toUpperCase(),
                        isFragile: !isFragile
                    });
                });

                describe('removeItem', function () {
                    it('should remove the item', function () {
                        roomStore.getItem(room.id, item.id).should.be.type('object');
                        roomStore.removeItem(room.id, item.id);
                        (typeof roomStore.getItem(room.id, item.id)).should.equal('undefined');
                    });
                });
            });
        });
    });
});
