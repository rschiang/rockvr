define(['threejs', 'scene'], function(THREE, scene) {
    var environment = new THREE.HemisphereLight( 0xffffff, 0xffffff, .5);
    scene.add(environment);

    var sun = new THREE.DirectionalLight(0xffffff, 1);
    sun.position.set(0, 4500, 0);
    sun.position.applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 180 * 30); // Rotate the sun
    scene.add(sun);

    return {
        env: environment,
        sun: sun
    }
});
