define(['threejs', 'cannon', 'scene', 'loaders', 'physics'], function(THREE, CANNON, scene, loaders, physics) {
    var shape = new CANNON.Sphere(150);
    var material = new CANNON.Material();
    physics.world.addContactMaterial(new CANNON.ContactMaterial(physics.ground.material, material, { friction: 0.2, restitution: 0.2 }));

    var body = new CANNON.Body({ mass: 1, shape: shape, material: material });
    body.velocity.set(1300, 9200, 0);

    loaders.loadTexturedOBJ('ball').then(function(ball) {
        //ball.position.set(0, -500, 0);
        physics.bind(ball, body);
        scene.add(ball);
    });
});
