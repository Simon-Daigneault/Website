import { Clock } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

const clock = new Clock();

import * as THREE from 'https://unpkg.com/three@0.117.0/build/three.module.js';

const pointer = new THREE.Vector2();
let prevIntersect;

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

    document.addEventListener( 'mousemove', this.onPointerMove);

    console.log(this.pointer)
  }

  onPointerMove(e){
    //console.log(pointer.x);
    pointer.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
  }

  start() {
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
