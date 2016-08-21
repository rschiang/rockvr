define(['threejs', 'three-text2d', 'cannon', 'scene', 'loaders', 'physics', 'users'],
function(THREE, Text2D, CANNON, scene, loaders, physics, users) {
    // Anchor object for us to position
    var anchor = new THREE.Object3D();
    anchor.position.set(2250, -1200, 0);
    anchor.rotation.y = -Math.PI / 2;
    scene.add(anchor);

    var nameplate = new Text2D.MeshText2D('小石 (Rock)', {
        font: '96px Source Han Sans TC',
        fillStyle: 'white',
        antialias: true
    });
    nameplate.scale.set(4, 4, 4);
    nameplate.geometry.computeBoundingBox();
    anchor.add(nameplate);


    var titleplate = new Text2D.MeshText2D('錯棚吉祥物', {
        font: '60px Source Han Sans TC',
        fillStyle: 'white',
        antialias: true
    });
    titleplate.scale.set(4, 4, 4);
    titleplate.geometry.computeBoundingBox();
    anchor.add(titleplate);

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
        nameplate.position.y = bodySize.y + textSize.y + 240;

        var titleSize = titleplate.geometry.boundingBox.size();
        titleplate.position.copy(nameplate.position);
        titleplate.position.y += titleSize.y + 160;

        var halfExtent = new CANNON.Vec3(bodySize.z / 2, bodySize.y / 2, bodySize.x / 2);
        var physicalBody = new CANNON.Body({ mass: 100,
            position: new CANNON.Vec3(anchor.position.x + halfExtent.z, anchor.position.y + halfExtent.y, anchor.position.z + halfExtent.x),
            shape: new CANNON.Box(halfExtent),
            material: physics.createMaterial('rock')
        });
        physicalBody.quaternion.copy(anchor.quaternion);
        physicalBody.addEventListener('collide', function(e) {
            if (e.body !== physics.ground) {
                var index = Math.floor(Math.random() * users.length);
                var user = users[index];
                nameplate.text = user.name;
                titleplate.text = user.title;
                nameplate.updateText();
                titleplate.updateText();
            }
        });

        physics.createContactMaterial('ball', 'rock', { friction: 0.1, restitution: 0.6 });
        physics.world.add(physicalBody);    // Manually add to overcome delta
    });

    return anchor;
});
