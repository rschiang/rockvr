define(['threejs', 'cannon', 'scene', 'camera', 'renderer', 'loaders', 'physics'],
function(THREE, CANNON, scene, camera, renderer, loaders, physics) {
    var shape = new CANNON.Sphere(150);
    var material = new CANNON.Material();
    physics.world.addContactMaterial(new CANNON.ContactMaterial(physics.ground.material, material, { friction: 0.2, restitution: 0.2 }));

    var body = new CANNON.Body({ mass: 1, shape: shape, material: material });
    //body.velocity.set(1300, 9200, 0);

    var velocity = 9300;
    var direction = new THREE.Vector3();
    var angle = new THREE.Quaternion();
    angle.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 6);

    var canvas = renderer.domElement;
    function shootBall(e) {
        body.position.set(0, 0, 0);

        direction.set(0, 0, 1).unproject(camera).applyQuaternion(angle).normalize();
        body.velocity.set(direction.x * velocity, direction.y * velocity, direction.z * velocity);
    }

    canvas.addEventListener('mouseup', shootBall);
    canvas.addEventListener('touchend', shootBall);

    loaders.loadTexturedOBJ('ball').then(function(ball) {
        physics.bind(ball, body);
        scene.add(ball);
    });
});
