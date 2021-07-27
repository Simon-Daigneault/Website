import { PerspectiveCamera } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

function createCamera(){
    const camera = new PerspectiveCamera(35, 1, 0.1, 100);

    camera.position.set(-15.0, 3.5, 4.0);

    return camera;
}

export { createCamera };