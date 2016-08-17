define(['threejs', 'scene', 'loaders'], function(THREE, scene, loaders) {
    // Anchor object for us to position
    var anchor = new THREE.Object3D();
    anchor.position.set(2800, -1200, 0);
    anchor.rotation.y = -Math.PI / 2;
    scene.add(anchor);

    var nameplate;
    loaders.font.load('node_modules/three/examples/fonts/droid/droid_sans_regular.typeface.json', function(font) {
        var geometry = new THREE.TextGeometry('Rock / CP 1000', {
            font: font,
            size: 160,
            height: 1
        });
        var material = new THREE.MeshBasicMaterial({ color: 0xffffff });

        nameplate = new THREE.Mesh(geometry, material);
        anchor.add(nameplate);
    });

    var body;
    loaders.mtl.load('rock.mtl', function(mtl) {
        mtl.preload();

        loaders.obj.setMaterials(mtl);
        loaders.obj.load('rock.obj', function(obj) {
            body = obj;

            body.scale.set(1000, 1000, 1000);
            anchor.add(body);

            var bodyBound = new THREE.Box3();
            bodyBound.setFromObject(body);
            var bodySize = bodyBound.size();

            nameplate.geometry.computeBoundingBox();
            var textBound = nameplate.geometry.boundingBox;
            var textSize = textBound.size();

            nameplate.position.x = (bodySize.z - textSize.x) * 0.5;
            nameplate.position.y = bodySize.y + 100;
        })
    });

    return anchor;
});
