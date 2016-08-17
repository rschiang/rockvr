define(['threejs', 'utils', 'scene', 'camera', 'renderer', 'controls', 'light', 'objects'],
function(THREE, utils, scene, camera, renderer, controls, light, objects) {
    var app = {
        scene: scene,
        camera: camera,
        canvas: renderer.domElement,
        controls: controls,
        objects: objects,
        init: function() {
            // pass
        },
        animate: function() {
            window.requestAnimationFrame( app.animate );
            controls.update();
            renderer.render(scene, camera);
        },
        resize: function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    };

    utils.on(window, 'resize', app.resize);
    return app;
});
