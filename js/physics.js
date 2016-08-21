define(['cannon'], function(CANNON) {
    // Constants
    var timestep = 1 / 60;

    // Create world
    var world = new CANNON.World();
    world.gravity.set(0, -9800, 0); // Half gravity
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

    var ground = new CANNON.Body({ mass: 0, material: new THREE.Material() });
    ground.addShape(new CANNON.Plane());
    ground.position.y = -1200;
    ground.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2); // Rotate from Z-up to Y-up
    world.add(ground);

    var bodies = [];    // Pair of three.js - cannon.js objects to keep track of
    var materials = {};
    materials['ground'] = ground.material;

    return {
        world: world,
        ground: ground,
        materials: materials,
        bind: function(obj, body) {
            body.position.copy(obj.position);
            body.quaternion.copy(obj.quaternion);
            bodies.push({ object: obj, body: body });
            world.add(body);
        },
        update: function() {
            world.step(timestep);
            for (var i in bodies) {
                bodies[i].object.position.copy(bodies[i].body.position);
                bodies[i].object.quaternion.copy(bodies[i].body.quaternion);
            }
        },
        createMaterial: function(name) {
            var material = new CANNON.Material();
            materials[name] = material;
            return material;
        },
        createContactMaterial: function(name1, name2, options) {
            var contactMaterial = new CANNON.ContactMaterial(materials[name1], materials[name2], options);
            world.addContactMaterial(contactMaterial);
            return contactMaterial;
        }
    }
});
