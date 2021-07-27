import { Clock } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

const clock = new Clock();

import * as THREE from 'https://unpkg.com/three@0.117.0/build/three.module.js';

const pointer = new THREE.Vector2();
let prevIntersect;

import { PointLight } from 'https://unpkg.com/three@0.117.0/build/three.module.js';


class Loop {
  constructor(camera, scene, renderer, labelRenderer, composer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.composer = composer;
    this.updatables = [];
    this.labelRenderer = labelRenderer;

    this.raycaster = new THREE.Raycaster();
    //this.pointer = new THREE.Vector2();

    //this.pointer.x = 0;
    //this.pointer.y = 1;

    document.getElementById("3d-pod").addEventListener( 'mousemove', this.onPointerMove);

    console.log(this.pointer)
  }

  onPointerMove(e){
    // console.log(pointer.x);
    // console.log(pointer.y);
    pointer.x = ( e.offsetX / 1000 ) * 2 - 1;
    pointer.y = - ( e.offsetY / 400 ) * 2 + 1;
  }

  start() {
    
    const pointLight1 = new PointLight("rgb(20,20,255)", 50, 0);
    pointLight1.position.set(3, 3, 10);
    this.scene.add(pointLight1);

    const pointLight2 = new PointLight("rgb(20,20,255)", 80, 0);
    pointLight2.position.set(3, 3, 100);
    this.scene.add(pointLight2);

    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();


      // Find any intersections


      this.raycaster.setFromCamera( pointer, this.camera );

      const intersects = this.raycaster.intersectObjects(this.scene.children);

      if (intersects.length > 0){
        //console.log("Hello?");
        //intersects[0].object.material.color.setHex(0xff0000);
        let object = intersects[0].object;
        let name = object.name;

        // New intersect
        if(object != prevIntersect){

          // Clear previous visibility
          setLabelVisibility(prevIntersect, false);
          
          // Set previous intersect
          prevIntersect = object;

          // If the object has a name, log it and set the label to be visible
          if(name != ""){
            console.log(name);
            //console.log(object)
  
            setLabelVisibility(object, true);
          }
        }
      } else {
        // Clear previous visibility
        setLabelVisibility(prevIntersect, false);

        // Clear previous intersect
        prevIntersect = null;
      }

      pointLight1.position.z -= 2;

      if(pointLight1.position.z < -100){
        pointLight1.position.z = 100;
      }

      pointLight2.position.z -= 2;

      if(pointLight2.position.z < -100){
        pointLight2.position.z = 100;
      }

      // render a frame
      this.labelRenderer.render( this.scene, this.camera);
      this.composer.render();

    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    // only call the getDelta function once per frame!
    const delta = clock.getDelta();

    // console.log(
    //   `The last frame rendered in ${delta * 1000} milliseconds`,
    // );

    for (const object of this.updatables) {
      object.tick(delta);
    }
  }
}

function setLabelVisibility(object, visible){
  if(object != null){
    if(object.children[0] != null){
      object.children[0].visible = visible;
    }
  }
}

export { Loop };
