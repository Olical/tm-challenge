var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var compile = require('../utils/compile');

var App = React.createClass({
    render: function () {
        var tree = ['div', [
            ['ul', {key: 'menu'}, [
                ['li', {key: 'dashboard'}, [
                    [Link, {to: 'dashboard', key: 'link'}, 'Dashboard']
                ]],
                ['li', {key: 'manifest'}, [
                    [Link, {to: 'manifest', key: 'link'}, 'Manifest']
                ]]
            ]],
            [RouteHandler, {key: 'handler'}]
        ]];
        return compile(tree);
    }
});

module.exports = App;
