define(['threejs', 'promise'], function(THREE, Promise) {
    // Create loaders
    var texture = new THREE.TextureLoader();
    var mtl = new THREE.MTLLoader();
    var obj = new THREE.OBJLoader();

    // Initialize base paths
    mtl.setPath('assets/');
    obj.setPath('assets/');

    var loadCallback = undefined;

    var loadTexturedOBJ = function(name) {
        return new Promise(function(resolve, reject) {
            mtl.load(name + '.mtl', function(m) {
                m.preload();
                obj.setMaterials(m);
                obj.load(name + '.obj', resolve, loadCallback, reject);
            }, loadCallback, reject);
        });
    };

    return {
        texture: texture,
        mtl: mtl,
        obj: obj,
        loadTexturedOBJ: loadTexturedOBJ
    }
});
