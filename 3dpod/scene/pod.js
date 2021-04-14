import { STLLoader } from "/three/examples/jsm/loaders/STLLoader.js";
import { Mesh, 
    MeshNormalMaterial,
    MeshStandardMaterial } from 'https://unpkg.com/three@0.117.0/build/three.module.js'

import { setupModel } from './setupModel.js';

var material = new MeshStandardMaterial({metalness: 0, 
    roughness: 0.5,
    color: 0xFFA500});


async function loadPod() {
    const loader = new STLLoader();

    const podData = await loader.loadAsync('/media/pod.stl');

    console.log("Zooom", podData);

    const pod_mesh = new Mesh(podData, material);

    return pod_mesh;
}

export { loadPod };