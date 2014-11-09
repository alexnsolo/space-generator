var darmok = require('darmok');
var Generator = require('./generator');

var shipnames = darmok.util.splitFile("starnames.txt"); // TODO need a better seed file for these
var darmokGenerator = darmok.markov(shipnames, 2);

var generator = new Generator(darmokGenerator);

generator.addPattern('sublight', {
    name: {type: 'darmok'},
    thrust: {type: 'number', min: 20, max: 55},
    mass: {type: 'number', min: 1, max: 2},
});

generator.addPattern('dreadnaught', {
    sublights: {type: 'repeat', min: 2, max: 4, itemPattern: 'sublight'}
});

generator.addPattern('fighter', {
    sublight: 'sublight',
});

generator.addPattern('ship', {
    type: 'select',
    options: ['dreadnaught', 'fighter'],
});

module.exports = generator;