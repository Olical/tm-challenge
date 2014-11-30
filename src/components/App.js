var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var compile = require('../utils/compile');

var App = React.createClass({
    mixins: [
        Router.State
    ],
    render: function () {
        var tree = ['div', [
            ['ul', {key: 'menu', className: 'pure-menu pure-menu-open pure-menu-horizontal'}, [
                ['li', {key: 'dashboard', className: this.getMenuClass('dashboard')}, [
                    [Link, {to: 'dashboard', key: 'link'}, 'Dashboard']
                ]],
                ['li', {key: 'manifest', className: this.getMenuClass('manifest')}, [
                    [Link, {to: 'manifest', key: 'link'}, 'Manifest']
                ]]
            ]],
            [RouteHandler, {key: 'handler'}]
        ]];
        return compile(tree);
    },
    getMenuClass: function (item) {
        if (this.isActive(item)) {
            return 'pure-menu-selected';
        }
    }
});

module.exports = App;
