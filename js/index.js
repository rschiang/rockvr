'use strict';

require('fullscreen-api-polyfill/fullscreen-api-polyfill');

var app = require('./app');

/*var App = (function() {
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

})();*/

require('./buttons');

app.animate();
