define(['cannon'], function(CANNON) {
    // Constants
    var timestep = 1 / 60;

    // Create world
    var world = new CANNON.World();
    world.gravity.set(0, -4900, 0); // Half gravity
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

    return {
        world: world,
        update: function() {
            world.step(timestep);
        }
    }
});
