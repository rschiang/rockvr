define(['threejs', 'camera', 'renderer'], function (THREE, camera, renderer) {
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.enableKeys = true;
    controls.enableDamping = true;
    controls.rotateSpeed = 0.25;
    return controls;
});
