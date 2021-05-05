import { DirectionalLight, HemisphereLight } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

function createLights() {
  const ambientLight = new HemisphereLight(
    'lightblue',
    'white',
    1.5,
  );

  const mainLight = new DirectionalLight('white', 2);
  mainLight.position.set(10, 15, 10);

  return { ambientLight, mainLight };
}

export { createLights };
