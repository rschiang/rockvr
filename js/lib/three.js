// Everything in THREE namespace
var THREE = require('expose?THREE!three');
require('three/examples/js/loaders/MTLLoader');
require('three/examples/js/loaders/OBJLoader');

// Our own implementation
require('./OrbitControls');

module.exports = THREE;
