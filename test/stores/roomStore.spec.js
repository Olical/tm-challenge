var sinon = require('sinon');
var roomStore = require('../../src/stores/roomStore');
var persistence = require('../../src/utils/persistence');
var Reflux = require('reflux');

describe('roomStore', function () {
    afterEach(function () {
        roomStore.clear();
    });

    describe('clear', function () {
        it('should set the storage to an empty array', function () {
            roomStore.rooms = {fail:true};
            roomStore.clear();
            roomStore.rooms.should.be.instanceOf(Array);
            roomStore.rooms.length.should.equal(0);
        });
    });

    describe('set', function () {
        var persistenceWriteSpy;

        beforeEach(function () {
            persistenceWriteSpy = sinon.spy(persistence, 'write');
        });

        afterEach(function () {
            roomStore.clear();
            persistenceWriteSpy.restore();
        });

        it('should allow me to set values', function () {
            roomStore.set(['test']);
            roomStore.rooms[0].should.equal('test');
        });

        it('should try to write to persistence', function () {
            roomStore.set(['test']);
            sinon.assert.calledOnce(persistenceWriteSpy);
        });
    });

    describe('getInitialState', function () {
        it('should be an empty array', function () {
            roomStore.getInitialState().should.eql([]);
        });

        describe('with storage set', function () {
            var stored = [{id:'foo'}];

            beforeEach(function () {
                sinon.stub(persistence, 'read').returns(stored);
            });

            afterEach(function () {
                persistence.read.restore();
            });

            it('should return the stored item', function () {
                roomStore.getInitialState().should.eql(stored);
            });
        });
    });

    describe('addRoom', function () {
        var description = 'room description';

        beforeEach(function () {
            roomStore.addRoom();
        });

        it('should be assigned a unique ID', function () {
            roomStore.should.have.propertyByPath('rooms', 0, 'id').and.match(/room_\d+/);
        });

        describe('updateRoom', function () {
            var room;

            beforeEach(function () {
                room = roomStore.rooms[0];
                roomStore.updateRoom(room.id, description);
            });

            it('should have updated the room description', function () {
                roomStore.should.have.propertyByPath('rooms', 0, 'description').and.equal(description);
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
                roomStore.addItem(room.id);
            });

            it('should have added an item to the room', function () {
                room.should.have.propertyByPath('items', 0, 'id').and.match(/item_\d+/);
                room.should.have.propertyByPath('items', 0, 'roomId').and.match(/room_\d+/);
            });

            describe('updateItem', function () {
                var item;

                beforeEach(function () {
                    item = room.items[0];
                    roomStore.updateItem(room.id, item.id, description, weight, isFragile);
                });

                it('should have updated the item', function () {
                    roomStore.should.have.propertyByPath('rooms', 0, 'items', 0).and.have.properties({
                        description: description,
                        weight: weight,
                        isFragile: isFragile
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
