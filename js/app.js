'use strict';
require('three/build/three.min');
require('./OrbitControls');
require('three/examples/js/loaders/MTLLoader');
require('three/examples/js/loaders/OBJLoader');
require('fullscreen-api-polyfill/fullscreen-api-polyfill');

var App = (function() {

    // Initialize scene
    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Append canvas to DOM
    var canvas = renderer.domElement;
    document.body.appendChild(canvas);

    // Set up camera
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 1600);

    // Set up orbit controls
    var controls = new THREE.OrbitControls(camera, canvas);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableKeys = false;
    controls.enableDamping = true;
    controls.rotateSpeed = 0.33;

    // Declare global photosphere
    var sphere = (function() {
        var geometry = new THREE.SphereGeometry(4500, 16, 24);
        var material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('assets/ntu.jpg')
        });
        geometry.scale(-1, 1, 1);   // Invert face
        return new THREE.Mesh(geometry, material);
    })();
    //sphere.rotation.y = -Math.PI * 0.56;
    scene.add(sphere);

    // Create loaders and load objects
    var loaders = (function() {
        var mtlLoader = new THREE.MTLLoader();
        var objLoader = new THREE.OBJLoader();
        var fontLoader = new THREE.FontLoader();
        mtlLoader.setPath('assets/');
        objLoader.setPath('assets/');

        return {
            material: mtlLoader,
            object: objLoader,
            font: fontLoader
        }
    })();

    var rock = {
        base: new THREE.Object3D(),
        nameplate: null,
        body: null
    };
    rock.base.position.set(2800, -1200, 0);
    rock.base.rotation.y = -Math.PI / 2;
    scene.add(rock.base);

    loaders.font.load('node_modules/three/examples/fonts/droid/droid_sans_regular.typeface.json', function(font) {
        var geometry = new THREE.TextGeometry('Rock / CP 1000', {
            font: font,
            size: 160,
            height: 1
        });
        var material = new THREE.MeshBasicMaterial({ color: 0xffffff });

        rock.nameplate = new THREE.Mesh(geometry, material);
        rock.base.add(rock.nameplate);
    });

    loaders.material.load('rock.mtl', function(material) {
        material.preload();

        loaders.object.setMaterials(material);
        loaders.object.load('rock.obj', function(obj) {
            obj.scale.set(1000, 1000, 1000);
            rock.base.add(obj);

            var objBound = new THREE.Box3();
            objBound.setFromObject(obj);
            var objSize = objBound.size();

            rock.nameplate.geometry.computeBoundingBox();
            var textBound = rock.nameplate.geometry.boundingBox;
            var textSize = textBound.size();

            rock.nameplate.position.x = (objSize.z - textSize.x) * 0.5;
            rock.nameplate.position.y = objSize.y + 100;
        })
    });

    var lights = (function() {
        var environment = new THREE.HemisphereLight( 0xffffff, 0xffffff, .5);
        scene.add(environment);

        var sun = new THREE.DirectionalLight(0xffffff, 1);
        sun.position.set(0, 4500, 0);
        sun.position.applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 180 * 30); // Rotate the sun
        scene.add(sun);

        return {
            env: environment,
            sun: sun
        }
    })();


    //var helper = new THREE.AxisHelper(1000);
    //scene.add(helper);

    // Finally, declare event handlers
    return {
        scene: scene,
        controls: controls,
        render: function onRender() {
            window.requestAnimationFrame(onRender);
            controls.update();
            renderer.render(scene, camera);
        },
        resize: function onResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    };
})();

require('./index');

// Party!
window.addEventListener('resize', App.resize);
App.render();
