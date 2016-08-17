define(['threejs'], function(THREE) {
    // Create renderer
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Append canvas to DOM
    var canvas = renderer.domElement;
    document.body.appendChild(canvas);

    return renderer;
});
