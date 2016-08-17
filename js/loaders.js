define(['threejs'], function(THREE) {
    var manager = new THREE.LoadingManager();

    var texture = new THREE.TextureLoader(manager);

    var mtl = new THREE.MTLLoader();
    mtl.setPath('assets/');

    var obj = new THREE.OBJLoader();
    obj.setPath('assets/');

    return {
        texture: texture,
        mtl: mtl,
        obj: obj
    }
});
