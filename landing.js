const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const landingPage = document.getElementsByClassName("landingPage")[0];


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
landingPage.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry();

const loader = new STLLoader();
loader.load( './media/Pod.stl', function ( geometry ) {
    const material = new THREE.MeshPhongMaterial( { color: 0xAAAAAA, specular: 0x111111, shininess: 200 } );
    const mesh = new THREE.Mesh( geometry, material );

    mesh.position.set( 0, - 0.37, - 0.6 );
    mesh.rotation.set( - Math.PI / 2, 0, 0 );
    mesh.scale.set( 2, 2, 2 );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add( mesh );

} );


// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

camera.position.z = 5;

const animate = function () {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
})
