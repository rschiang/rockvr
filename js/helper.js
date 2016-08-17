define(['threejs', 'scene'], function(THREE, scene) {
    var helper = new THREE.AxisHelper(1000);
    scene.add(helper);
    return helper;
});
