import { Color, Scene } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

import * as THREE from 'https://unpkg.com/three@0.117.0/build/three.module.js';

import { CSS2DObject } from 'https://unpkg.com/three@0.117.0/examples/jsm/renderers/CSS2DRenderer.js';


function createScene() {
  const scene = new Scene();

  scene.background = new Color('rgb(21, 21, 21)');

  var geo = new THREE.PlaneBufferGeometry(2000, 2000, 8, 8);
  var mat = new THREE.MeshBasicMaterial({ color: "rgb(15, 15, 15)", side: THREE.SingleSide });
  var plane = new THREE.Mesh(geo, mat);
  plane.rotateX( - Math.PI / 2);

  //scene.add(plane);

  return scene;
}

export { createScene };
