var darmok = require('darmok');
var Generator = require('./generator');

var starnames = darmok.util.splitFile("starnames.txt");
var darmokGenerator = darmok.markov(starnames, 2);

var generator = new Generator(darmokGenerator);

generator.addPattern('planet', {
    name: {type: 'darmok'},
    mass: {type: 'number', min: 50, max: 100},
    material: 'mineral',
    atmosphere: 'gas',
    rings: {type: 'array', min: 0, max: 12, itemPattern: 'mineral'},
    body: {type: 'select', options: [
        'gas',
        {crust: 'mineral', mantle: 'mineral', core: 'mineral'}]
    },
    moons: {type: 'array', min: 0, max: 4, itemPattern: 'moon'},
});

generator.addPattern('moon', {
    mass: {type: 'number', min: 1, max: 10},
    material: 'mineral'
});

generator.addPattern('star', {
    name: {type: 'darmok'},
    mass: {type: 'number', min: 1000, max: 10000},
    gas: 'gas'
});

generator.addPattern('system', {
    center: {type: 'select', options: ['star', 'blackHole', 'binaryStar']},
    bodies: {type: 'array', min: 0, max: 20, itemPattern: 'planet'},
});

generator.addPattern('blackHole', {
    mass: {type: 'number', min: 10000, max: 50000}
});

generator.addPattern('binaryStar', {
    starA: 'star',
    starB: 'star',
});

generator.addPattern('mineral',
    {type: 'select', options: ['iron', 'silicone']}
);

generator.addPattern('gas',
    {type: 'select', options: ['argon', 'oxygen', 'carbon', 'nitrogen']}
);

module.exports = generator;
