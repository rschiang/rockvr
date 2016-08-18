define(['threejs', 'three-text2d', 'scene', 'loaders'], function(THREE, Text2D, scene, loaders) {
    // Anchor object for us to position
    var anchor = new THREE.Object3D();
    anchor.position.set(2800, -1200, 0);
    anchor.rotation.y = -Math.PI / 2;
    scene.add(anchor);

    var nameplate = new Text2D.MeshText2D('小石 / CP 1000', {
        font: '40px Trebuchet MS',
        fillStyle: 'white',
        antialias: true
    });
    nameplate.scale.set(4, 4, 4);
    anchor.add(nameplate);

    var body;
    loaders.loadTexturedOBJ('rock').then(function(obj) {
        body = obj;

        body.scale.set(1000, 1000, 1000);
        anchor.add(body);

        var bodyBound = new THREE.Box3();
        bodyBound.setFromObject(body);

        var bodySize = bodyBound.size();
        nameplate.position.x = bodySize.z * 0.5;

        nameplate.geometry.computeBoundingBox();
        var textSize = nameplate.geometry.boundingBox.size();

        nameplate.position.z = bodySize.x * 0.5;
        nameplate.position.y = bodySize.y + textSize.y + 160;
    });

    return anchor;
});
