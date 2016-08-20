define(['threejs', 'three-text2d', 'cannon', 'scene', 'loaders', 'physics'],
function(THREE, Text2D, CANNON, scene, loaders, physics) {
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
    nameplate.geometry.computeBoundingBox();
    anchor.add(nameplate);

    var body;
    loaders.loadTexturedOBJ('rock').then(function(obj) {
        body = obj;

        // Add rock to scene
        body.scale.set(1000, 1000, 1000);
        anchor.add(body);

        // Calculate object bounds
        var bodyBound = new THREE.Box3().setFromObject(body);
        var bodySize = bodyBound.size();

        // Set up nameplate position
        var textSize = nameplate.geometry.boundingBox.size();
        nameplate.position.x = bodySize.z * 0.5;
        nameplate.position.z = bodySize.x * 0.5;
        nameplate.position.y = bodySize.y + textSize.y + 160;

        var halfExtent = new CANNON.Vec3(bodySize.z / 2, bodySize.y / 2, bodySize.x / 2);
        var physicalBody = new CANNON.Body({ mass: 100,
            position: new CANNON.Vec3(anchor.position.x + halfExtent.z, anchor.position.y + halfExtent.y, anchor.position.z + halfExtent.x),
            shape: new CANNON.Box(halfExtent),
            material: physics.createMaterial('rock')
        });
        physicalBody.quaternion.copy(anchor.quaternion);
        console.log(physicalBody.position, physicalBody.quaternion);
        physics.createContactMaterial('ball', 'rock', { friction: 0.1, restitution: 0.6 });
        physics.world.add(physicalBody);    // Manually add to overcome delta
    });

    return anchor;
});
