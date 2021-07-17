const setSize = (container, camera, renderer, labelRenderer, composer) => {

  const width = 1000 || 1;
	const height = 400 || 1;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  labelRenderer.setSize(width, height);

  composer.setSize(width, height);
};

class Resizer {
  constructor(container, camera, renderer, labelRenderer, composer) {
    // set initial size
    setSize(container, camera, renderer, labelRenderer, composer);

    window.addEventListener('resize', () => {
      // set the size again if a resize occurs
      setSize(container, camera, renderer, labelRenderer, composer);
      // perform any custom actions
      this.onResize();
    });
  }

  onResize() {}
}

export { Resizer };
