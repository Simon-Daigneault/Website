import { STLLoader } from "/three/examples/jsm/loaders/STLLoader.js";
import { GLTFLoader } from 'https://unpkg.com/three@0.117.0/examples/jsm/loaders/GLTFLoader.js';
import { Mesh, 
    MeshNormalMaterial,
    MeshStandardMaterial } from 'https://unpkg.com/three@0.117.0/build/three.module.js'

import { setupModel } from './setupModel.js';

var material = new MeshStandardMaterial({metalness: 0, 
    roughness: 0.5,
    color: 0xFFA500});


async function loadPod() {
    const loader = new GLTFLoader();

    const podData = await loader.loadAsync('/media/3dpodsource/3dpod.glb');

    console.log("Zooom", podData);

    //const pod_mesh = new Mesh(podData.scene.children[1], material);

    return podData;
}

export { loadPod };