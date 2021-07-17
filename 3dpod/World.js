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

import { EffectComposer } from 'https://unpkg.com/three@0.117.0/examples/jsm/postprocessing/EffectComposer.js';
import { SSAARenderPass } from 'https://unpkg.com/three@0.117.0/examples/jsm/postprocessing/SSAARenderPass.js';
import { SAOPass } from 'https://unpkg.com/three@0.117.0/examples/jsm/postprocessing/SAOPass.js';

let composer, renderPass, saoPass;

import { CSS2DRenderer, CSS2DObject } from 'https://unpkg.com/three@0.117.0/examples/jsm/renderers/CSS2DRenderer.js';
let labelRenderer;

class World {
    constructor(container){
        console.log("Creating world...");

        // Make the camera, renderer and scene
        camera = createCamera();
        renderer = createRenderer();
        scene = createScene();

        // Add the render to the html element
        container.append(renderer.domElement);

        // Create and add the lights
        const { ambientLight, mainLight } = createLights();
        scene.add(ambientLight, mainLight);

        // Set up effect composer (for SAO) 
        composer = new EffectComposer( renderer );
        renderPass = new SSAARenderPass( scene, camera );
        composer.addPass( renderPass );
        saoPass = new SAOPass( scene, camera, false, true );

        // Set up sao params
        saoPass.params["saoBias"] = 0.45;
        saoPass.params["saoIntensity"] = 0.15;
        saoPass.params["saoScale"] = 15;
        saoPass.params["saoKernelRadius"] = 40;
        saoPass.params['saoMinResolution'] = 0;

        saoPass.params["saoBlur"] = true;

        //saoPass.params['output'] = SAOPass.OUTPUT.SAO;
        composer.addPass( saoPass );

        // Create label renderer
        labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize( 1000, 400 );
        labelRenderer.domElement.style.position = 'absolute';
        labelRenderer.domElement.style.top = '0px';
        document.getElementById("pod-container").appendChild( labelRenderer.domElement );

        // Create the render loop
        loop = new Loop(camera, scene, renderer, labelRenderer, composer);

        // Add the orbit controls
        controls = createControls(camera, labelRenderer.domElement);
        loop.updatables.push(controls);

        // Add resolution resizer
        const resizer = new Resizer(container, camera, renderer, labelRenderer, composer);
    }

    async init() {
        const pod = await loadPod();
        pod.name = "PodShell";
        
        // ===== LABELS ====
        const labelDiv = document.createElement( 'div' );
        labelDiv.className = 'label';
        labelDiv.textContent = 'The pod.';
        labelDiv.style.marginTop = '-1em';
        const label = new CSS2DObject( labelDiv );
        label.position.set( 0, 0.4, 0 );
        pod.add( label );

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