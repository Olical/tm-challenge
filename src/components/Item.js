var _ = require('lodash');
var React = require('react');
var compile = require('../utils/compile');
var roomActions = require('../actions/roomActions');

/**
 * Converts a boolean into human readable form (yes and no).
 *
 * @param {Boolean} flag
 * @return {String} yes or no for true and false respectively
 */
function humanBoolean(flag) {
    return flag ? 'yes' : 'no';
}

/**
 * Item view, allows display, edit and deletion of items.
 *
 * @type {Function}
 */
var Item = React.createClass({
    render: function () {
        var tree = ['ul', this.state.isEditing ? this.buildEdit() : this.buildView()];
        return compile(tree);
    },
    buildProp: function (key, value) {
        return ['li', [key, value].join(': '), {
            key: key
        }];
    },
    buildEditableProp: function (placeholder, value, onChange) {
        var input;

        if (_.isBoolean(value)) {
            var id = this.props.id + placeholder;

            input = [
                ['label', placeholder, {
                    key: placeholder,
                    htmlFor: id
                }],
                ['input', {
                    key: 'checkbox',
                    type: 'checkbox',
                    checked: value,
                    onChange: onChange,
                    id: id
                }]
            ];
        }
        else {
            input = [['input', {
                key: placeholder,
                placeholder: placeholder,
                value: value,
                onChange: onChange
            }]];
        }

        return ['li', {key: placeholder}, input];
    },
    buildEdit: function () {
        var edit = [
            this.buildEditableProp('Description', this.state.description, this.onDescriptionChange),
            this.buildEditableProp('Weight', this.state.weight, this.onWeightChange),
            this.buildEditableProp('Fragile?', this.state.isFragile || false, this.onFragileChange),
            ['li', {key: 'manager'}, [
                ['a', 'Save', {
                    key: 'save',
                    href: '#',
                    onClick: this.update
                }],
                ['a', 'Cancel', {
                    key: 'cancel',
                    href: '#',
                    onClick: this.cancelEdit
                }]
            ]]
        ];

        return edit;
    },
    buildView: function () {
        var view = [
            this.buildProp('Description', this.props.description),
            this.buildProp('Weight', this.props.weight),
            this.buildProp('Fragile', humanBoolean(this.props.isFragile))
        ];

        if (this.props.isEditable) {
            view = _.union(view, [
                ['a', 'Edit', {
                    key: 'edit',
                    href: '#',
                    onClick: this.edit
                }],
                ['a', 'Remove', {
                    key: 'remove',
                    href: '#',
                    onClick: this.remove
                }]
            ]);
        }

        return view;
    },
    getInitialState: function () {
        return {
            description: this.props.description,
            weight: this.props.weight,
            isFragile: this.props.isFragile,
            isEditing: this.props.isEditable && _.some([
                this.props.description,
                this.props.weight
            ], _.isUndefined)
        };
    },
    update: function () {
        if (this.state.description && this.state.weight) {
            roomActions.updateItem(
                this.props.roomId,
                this.props.id,
                this.state.description,
                this.state.weight,
                this.state.isFragile
            );
            this.setState({
                isEditing: false
            });
        }
    },
    edit: function () {
        this.setState({
            isEditing: true,
            description: this.props.description,
            weight: this.props.weight,
            isFragile: this.props.isFragile
        });
    },
    cancelEdit: function () {
        if (!this.state.description && !this.state.weight) {
            this.remove();
        }
        this.setState({
            isEditing: false
        });
    },
    remove: function () {
        roomActions.removeItem(this.props.roomId, this.props.id);
    },
    onDescriptionChange: function (event) {
        this.setState({
            description: event.target.value
        });
    },
    onWeightChange: function (event) {
        this.setState({
            weight: event.target.value
        });
    },
    onFragileChange: function (event) {
        this.setState({
            isFragile: event.target.checked
        });
    }
});

module.exports = Item;
