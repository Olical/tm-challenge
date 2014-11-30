var _ = require('lodash');
var React = require('react');
var compile = require('../utils/compile');
var roomActions = require('../actions/roomActions');
var Item = React.createFactory(require('./Item'));

/**
 * Constructs a list of items. Each item is also a list. We have to go deeper.
 *
 * @param {Object[]} items
 * @param {Boolean} isEditable
 * @return {*[]}
 */
function buildItemList(items, isEditable) {
    var editable = {
        isEditable: isEditable
    };

    return _.map(items, function (item) {
        return ['div', Item(_.assign({}, editable, item)), {
            key: item.id,
            className: 'pure-u-1-2'
        }];
    });
}

/**
 * Shows a room with a description and it's items. Also allows edit and removal of rooms.
 *
 * @type {Function}
 */
var Room = React.createClass({
    buildView: function () {
        var view = [
            ['h3', this.props.description, {
                key: 'description',
                className: 'form-room-description'
            }]
        ];

        if (this.props.isEditable) {
            view.push(
                ['button', 'Edit', {
                    key: 'edit',
                    onClick: this.edit,
                    className: 'pure-button'
                }],
                ['button', 'Remove', {
                    key: 'remove',
                    onClick: this.remove,
                    className: 'pure-button'
                }]
            );
        }

        view.push(this.buildItems());
        return view;
    },
    buildEdit: function () {
        var edit = [
            ['input', {
                key: 'description',
                placeholder: 'Description',
                value: this.state.description,
                onChange: this.onDescriptionChange
            }],
            ['button', 'Save', {
                key: 'update',
                onClick: this.update,
                className: 'pure-button'
            }],
            ['button', 'Cancel', {
                key: 'remove',
                onClick: this.cancelEdit,
                className: 'pure-button'
            }],
            this.buildItems()
        ];

        return edit;
    },
    buildItems: function () {
        var items = [];

        if (this.props.isEditable) {
            items.push(['button', 'Add new item', {
                key: 'addItem',
                onClick: roomActions.addItem.bind(null, this.props.id),
                className: 'pure-button pure-button-primary'
            }]);
        }

        items.push(['div', buildItemList(this.props.items, this.props.isEditable), {
            key: 'items',
            className: 'pure-g'
        }]);

        return ['div', {key: 'items'}, items];
    },
    render: function () {
        var tree = ['div', {
            className: 'pure-form form-room',
        },
            this.state.isEditing ? this.buildEdit() : this.buildView()
        ];

        return compile(tree);
    },
    getInitialState: function () {
        return {
            isEditing: !this.props.description && this.props.isEditable
        };
    },
    onDescriptionChange: function (event) {
        this.setState({
            description: event.target.value
        });
    },
    update: function () {
        if (this.state.description) {
            roomActions.updateRoom(this.props.id, this.state.description);
            this.setState({
                isEditing: false
            });
        }
    },
    edit: function () {
        this.setState({
            isEditing: true,
            description: this.props.description
        });
    },
    cancelEdit: function () {
        if (!this.state.description) {
            this.remove();
        }
        else {
            this.setState({
                isEditing: false
            });
        }
    },
    remove: function () {
        roomActions.removeRoom(this.props.id);
    }
});

module.exports = Room;
