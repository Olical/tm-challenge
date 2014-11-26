var React = require('react');
var compile = require('./compile');

var container = document.getElementById('main');
React.render(compile(['p', [
    ['strong', {key: 'bold'}, 'BOLD'],
    ['em', {key: 'slanty'}, 'SLANTY']
]]), container);
