define(['threejs'], function(THREE) {
    var manager = new THREE.LoadingManager();

    var texture = new THREE.TextureLoader(manager);
    var font = new THREE.FontLoader(manager);

    var mtl = new THREE.MTLLoader();
    mtl.setPath('assets/');

    var obj = new THREE.OBJLoader();
    obj.setPath('assets/');

    return {
        texture: texture,
        font: font,
        mtl: mtl,
        obj: obj
    }
});
