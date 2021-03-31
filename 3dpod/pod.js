import { STLLoader } from "/three/examples/jsm/loaders/STLLoader.js";

import { setupModel } from './setupModel.js';

async function loadPod() {
    const loader = new STLLoader();

    const podData = await loader.loadAsync('/media/pod.stl');

    console.log("Zooom", podData);

    const pod = setupModel(podData);

    return { pod };
}

export { loadPod };