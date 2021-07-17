import { Color, Scene } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

import * as THREE from 'https://unpkg.com/three@0.117.0/build/three.module.js';

import { CSS2DObject } from 'https://unpkg.com/three@0.117.0/examples/jsm/renderers/CSS2DRenderer.js';


function createScene() {
  const scene = new Scene();

  scene.background = new Color('rgb(27, 27, 27)');

  var geo = new THREE.PlaneBufferGeometry(2000, 2000, 8, 8);
  var mat = new THREE.MeshBasicMaterial({ color: "rgb(18, 18, 18)", side: THREE.SingleSide });
  var plane = new THREE.Mesh(geo, mat);
  plane.rotateX( - Math.PI / 2);

  //scene.add(plane);


  var cubeGeom = new THREE.CubeGeometry( 0.5, 0.5, 0.5 );
  var cubeMat = new THREE.MeshBasicMaterial({color: 0xff0000});

  var cube = new THREE.Mesh(cubeGeom, cubeMat);
  cube.name = "mainCube";

  scene.add( cube );

  // ===== LABELS ====
  const labelDiv = document.createElement( 'div' );
  labelDiv.className = 'label';
  labelDiv.textContent = 'A Cube!';
  labelDiv.style.marginTop = '-1em';
  const label = new CSS2DObject( labelDiv );
  label.position.set( 0, 0.25, 0 );
  cube.add( label );

  cube.position.set(-1, 0.25,0);

  return scene;
}

export { createScene };
