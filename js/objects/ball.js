define(['threejs', 'scene', 'loaders'], function(THREE, scene, loaders) {
    loaders.loadTexturedOBJ('ball').then(function(ball) {
        ball.position.set(0, -500, 0);
        scene.add(ball);
    });
});
