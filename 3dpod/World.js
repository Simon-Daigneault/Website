import { loadPod } from "./scene/pod.js";
import { createCamera } from './scene/camera.js';
import { createLights } from './scene/lights.js';
import { createScene } from './scene/scene.js';

import { createRenderer } from './scene/renderer.js';
import { createControls } from './utils/controls.js';
import { Loop } from './utils/loop.js';
import { Resizer } from "./utils/resizer.js";

let camera;
let controls;
let renderer;
let scene;
let loop;

class World {
    constructor(container){
        console.log("Creating world...");

        camera = createCamera();
        renderer = createRenderer();
        scene = createScene();
        loop = new Loop(camera, scene, renderer);
        container.append(renderer.domElement);
        controls = createControls(camera, renderer.domElement);

        const { ambientLight, mainLight } = createLights();

        loop.updatables.push(controls);
        scene.add(ambientLight, mainLight);

        const resizer = new Resizer(container, camera, renderer);
    }

    async init() {
        const pod = await loadPod();

        console.log(pod);

        scene.add( pod );
    }

    render() {
        renderer.render(scene, camera);
    }

    start() {
        loop.start();
    }

    stop () {
        loop.stop();
    }
}

export { World };