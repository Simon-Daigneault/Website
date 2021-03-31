import { World } from '/3dpod/World.js';

async function main() {
    const container = document.getElementById("3dpod-container");

    const world = new World(container);

    await world.init();
}

main();