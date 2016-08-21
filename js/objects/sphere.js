define(['threejs', 'scene', 'loaders'], function(THREE, scene, loaders) {
    // Declare global photosphere
    var geometry = new THREE.SphereGeometry(4500, 16, 24);
    geometry.scale(-1, 1, 1); // Invert face

    var material = new THREE.MeshBasicMaterial({
        map: loaders.texture.load('assets/leaf.jpg')
    });

    var sphere = new THREE.Mesh(geometry, material);
    //sphere.rotation.y = -Math.PI * 0.56;

    scene.add(sphere);
    return sphere;
});
