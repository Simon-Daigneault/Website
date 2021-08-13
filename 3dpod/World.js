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

import { DirectionalLight, HemisphereLight, PointLight, Fog } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

class World {
    constructor(container) {
        console.log("Creating world...");

        // Make the camera, renderer and scene
        camera = createCamera();
        renderer = createRenderer();
        scene = createScene();

        // Add the render to the html element
        container.append(renderer.domElement);

        // Create and add the lights
        const ambientLight = new HemisphereLight(
            'lightblue',
            'white',
            0.5,
        );

        // const mainLight = new DirectionalLight('white', 2);
        // mainLight.position.set(0, 5, 10);

        // const pointLight1 = new PointLight("lightblue", 20, 0);
        // pointLight1.position.set(5, 5, -10);
        // scene.add(pointLight1);

        // const pointLight2 = new PointLight("lightblue", 20, 0);
        // pointLight2.position.set(-5, 5, 10);
        // scene.add(pointLight2);

        scene.add(ambientLight);

        // Set up effect composer (for SAO) 
        composer = new EffectComposer(renderer);
        renderPass = new SSAARenderPass(scene, camera);
        composer.addPass(renderPass);
        saoPass = new SAOPass(scene, camera, false, true);

        // Set up sao params
        saoPass.params["saoBias"] = 0.45;
        saoPass.params["saoIntensity"] = 0.15;
        saoPass.params["saoScale"] = 25;
        saoPass.params["saoKernelRadius"] = 40;
        saoPass.params['saoMinResolution'] = 0.0001;

        saoPass.params["saoBlur"] = true;

        //saoPass.params['output'] = SAOPass.OUTPUT.SAO;
        //composer.addPass( saoPass );

        // Create label renderer
        labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize(1000, 400);
        labelRenderer.domElement.style.position = 'absolute';
        labelRenderer.domElement.style.top = '0px';
        document.getElementById("pod-container").appendChild(labelRenderer.domElement);

        // Create the render loop
        loop = new Loop(camera, scene, renderer, labelRenderer, composer);

        // Add the orbit controls
        controls = createControls(camera, labelRenderer.domElement);
        loop.updatables.push(controls);

        // Add resolution resizer
        const resizer = new Resizer(container, camera, renderer, labelRenderer, composer);
    }

    async init() {
        let podScene = await loadPod();
        scene.add(podScene.scene);

        scene.fog = new Fog("rgb(21, 21, 21)", 0.05, 80);

        // podMeshes[0].name = "Track";
        // podMeshes[0].add( createLabel("", 0, 0, 0) );
        // scene.add( podMeshes[0] );

        // podMeshes[0].name = "shell";
        // podMeshes[0].add( createLabel("Carbon Fiber Shell", 0, 0.3, 0.4) );
        // scene.add( podMeshes[0] );

        // podMeshes[0].name = "LIM";
        // podMeshes[0].add( createLabel("Linear Induction Motor", 0, 0, 0.5) );
        // scene.add( podMeshes[0] );

        // podMeshes[0].name = "Hall";
        // podMeshes[0].add( createLabel("Hallbach Arrays", 0, 0, 0) );
        // scene.add( podMeshes[0] );

        // podMeshes[0].name = "electronics";
        // podMeshes[0].add( createLabel("Electronics", 0, 0.25, 0.1) );
        // scene.add( podMeshes[0] );

        // podMeshes[0].name = "bat";
        // podMeshes[0].add( createLabel("Battery Packs", -0.15, 0.1, 0.3) );
        // scene.add( podMeshes[0] );

        // podMeshes[0].name = "frame";
        // podMeshes[0].add( createLabel("Frame", -0.15, 0.1, 0.3) );
        // scene.add( podMeshes[0] );
    }

    render() {
        renderer.render(scene, camera);
    }

    start() {
        loop.start();
    }

    stop() {
        loop.stop();
    }
}

function createLabel(name, offsetX, offsetY, offsetZ) {
    let div = document.createElement('div');
    div.className = 'label';
    div.textContent = name;
    let label = new CSS2DObject(div);

    label.position.set(offsetX, offsetY, offsetZ);

    return label;
}

export { World };