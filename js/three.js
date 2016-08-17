// Everything in THREE namespace
require('three/build/three.min');
require('three/examples/js/loaders/MTLLoader');
require('three/examples/js/loaders/OBJLoader');

// Our own implementation
require('./controls/OrbitControls');

module.exports = THREE;
