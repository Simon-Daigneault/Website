import { loadPod } from "./pod.js";
import { createCamera } from './camera.js';
import { createLights } from './lights.js';
import { createScene } from './scene.js';

import { createRenderer } from './'

let camera;
let controls;
let renderer;
let scene;

class World {
    constructor(container){
        console.log("Creating world...");

        camera = createCamera();
        renderer = createRenderer();
        scene = createScene();
        container.append(renderer.domElement);
        controls = createControls(camera, renderer.domElement);

        const { ambientLight, mainLight } = createLights();

        scene.add(ambientLight, mainLight);
    }

    async init() {
        const { pod } = await loadPod();
        
        scene.add(pod);
    }
}

export { World };