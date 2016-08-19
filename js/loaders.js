define(['threejs', 'promise'], function(THREE, Promise) {
    // Create loaders
    var texture = new THREE.TextureLoader();

    var mtl = new THREE.MTLLoader();
    mtl.setPath('assets/');

    var loadCallback = undefined;

    var loadTexturedOBJ = function(name) {
        return new Promise(function(resolve, reject) {
            mtl.load(name + '.mtl', function(m) {
                m.preload();

                var obj = new THREE.OBJLoader();
                obj.setPath('assets/');
                obj.setMaterials(m);
                obj.load(name + '.obj', resolve, loadCallback, reject);
            }, loadCallback, reject);
        });
    };

    return {
        texture: texture,
        loadTexturedOBJ: loadTexturedOBJ
    }
});
