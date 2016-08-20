define(['threejs', 'cannon', 'scene', 'loaders', 'physics'], function(THREE, CANNON, scene, loaders, physics) {
    var shape = new CANNON.Sphere(150);
    var body = new CANNON.Body({ mass: 1, shape: shape });

    loaders.loadTexturedOBJ('ball').then(function(ball) {
        //ball.position.set(0, -500, 0);
        physics.bind(ball, body);
        scene.add(ball);
    });
});
