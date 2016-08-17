define(['threejs'], function (THREE) {
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 1600);
    return camera;
});
