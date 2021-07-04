import { World } from '/3dpod/World.js';

async function main() {
    const container = document.getElementById("pod-container");

    const world = new World(container);

    await world.init();

    world.start();
}

main();

console.clear();



