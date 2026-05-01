// =============================================
// THREE.JS 3D BACKGROUND
// This creates the animated 3D hero background
// =============================================

// Only run on pages that have the hero canvas
const heroCanvas = document.getElementById('hero-canvas');

if (heroCanvas && typeof THREE !== 'undefined') {
  
  // Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  
  const renderer = new THREE.WebGLRenderer({
    canvas: heroCanvas,
    antialias: true,
    alpha: true  // Transparent background
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // --- Create Particle Field ---
  const particleCount = 3000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    
    // Random sphere distribution
    positions[i3]     = (Math.random() - 0.5) * 30;  // x
    positions[i3 + 1] = (Math.random() - 0.5) * 30;  // y
    positions[i3 + 2] = (Math.random() - 0.5) * 30;  // z
    
    // Colors: mix of red, white, and cyan
    const colorChoice = Math.random();
    if (colorChoice < 0.3) {
      colors[i3]     = 0.9;  // R
      colors[i3 + 1] = 0.05; // G
      colors[i3 + 2] = 0.05; // B (red particle)
    } else if (colorChoice < 0.6) {
      colors[i3]     = 0.0;  // R
      colors[i3 + 1] = 0.8;  // G
      colors[i3 + 2] = 0.9;  // B (cyan particle)
    } else {
      colors[i3]     = 1.0;  // White particle
      colors[i3 + 1] = 1.0;
      colors[i3 + 2] = 1.0;
    }
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,       // Use the colors we set above
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true     // Particles closer = bigger
  });
  
  const particles = new THREE.Points(geometry, material);
  scene.add(particles);
  
  // --- Floating 3D Objects ---
  
  // Create several glowing rings
  const rings = [];
  const ringData = [
    { radius: 3, tube: 0.05, color: 0xe50914, speed: 0.003 },
    { radius: 5, tube: 0.03, color: 0x00d4ff, speed: -0.002 },
    { radius: 7, tube: 0.02, color: 0xffd700, speed: 0.001 }
  ];
  
  ringData.forEach(function(data) {
    const geo = new THREE.TorusGeometry(data.radius, data.tube, 8, 100);
    const mat = new THREE.MeshStandardMaterial({
      color: data.color,
      emissive: data.color,
      emissiveIntensity: 0.5
    });
    const ring = new THREE.Mesh(geo, mat);
    ring.userData.speed = data.speed;
    
    // Random initial rotation
    ring.rotation.x = Math.random() * Math.PI;
    ring.rotation.y = Math.random() * Math.PI;
    
    scene.add(ring);
    rings.push(ring);
  });
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);
  
  const redLight = new THREE.PointLight(0xe50914, 3, 20);
  redLight.position.set(3, 3, 3);
  scene.add(redLight);
  
  const blueLight = new THREE.PointLight(0x0044ff, 2, 20);
  blueLight.position.set(-3, -3, 3);
  scene.add(blueLight);
  
  // --- Mouse Tracking ---
  const mouse = { x: 0, y: 0 };
  
  document.addEventListener('mousemove', function(e) {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  });
  
  // --- Animation Loop ---
  let frameCount = 0;
  
  function animate() {
    requestAnimationFrame(animate);
    frameCount++;
    
    const time = frameCount * 0.01;
    
    // Rotate particle field slowly
    particles.rotation.y = time * 0.05;
    particles.rotation.x = time * 0.02;
    
    // Animate each ring
    rings.forEach(function(ring, index) {
      ring.rotation.x += ring.userData.speed;
      ring.rotation.y += ring.userData.speed * 0.7;
      ring.position.y = Math.sin(time + index) * 0.3; // Float up/down
    });
    
    // Animate lights
    redLight.position.x = Math.sin(time) * 4;
    redLight.position.y = Math.cos(time * 0.5) * 4;
    
    blueLight.position.x = -Math.sin(time * 0.7) * 4;
    blueLight.position.z = Math.cos(time) * 4;
    
    // Subtle camera movement following mouse
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;
    camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  // Handle window resize
  window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  console.log('✨ 3D Background initialized!');
}
