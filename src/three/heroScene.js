import * as THREE from "three";

/**
 * Mounts an ambient WebGL scene (drifting particle field + a layered
 * wireframe icosahedron) into the given canvas. Returns a cleanup
 * function that disposes every GPU resource it allocated.
 */
export function createHeroScene(canvas, { reduceMotion = false } = {}) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 8;

  const dotTexture = createDotTexture();

  const particleCount = window.innerWidth < 640 ? 400 : 850;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const colorA = new THREE.Color("#00ff88");
  const colorB = new THREE.Color("#7c3aed");

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 22;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    const mixed = colorA.clone().lerp(colorB, Math.random());
    colors[i * 3 + 0] = mixed.r;
    colors[i * 3 + 1] = mixed.g;
    colors[i * 3 + 2] = mixed.b;
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const particleMat = new THREE.PointsMaterial({
    size: 0.11,
    map: dotTexture,
    transparent: true,
    depthWrite: false,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  const group = new THREE.Group();
  const coreGeo = new THREE.IcosahedronGeometry(2.15, 1);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x00ff88,
    wireframe: true,
    transparent: true,
    opacity: 0.45,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  group.add(core);

  const glowGeo = new THREE.IcosahedronGeometry(2.32, 1);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x7c3aed,
    wireframe: true,
    transparent: true,
    opacity: 0.16,
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  group.add(glow);

  group.position.x = 2.4;
  scene.add(group);

  let pointerX = 0;
  let pointerY = 0;
  let easedPointerX = 0;
  let easedPointerY = 0;
  let scrollY = window.scrollY;

  const handlePointerMove = (e) => {
    pointerX = (e.clientX / window.innerWidth) * 2 - 1;
    pointerY = (e.clientY / window.innerHeight) * 2 - 1;
  };
  const handleScroll = () => {
    scrollY = window.scrollY;
  };
  const handleResize = () => resize();

  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleResize);

  function resize() {
    const { clientWidth, clientHeight } = canvas;
    if (!clientWidth || !clientHeight) return;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight, false);
  }
  resize();

  const clock = new THREE.Clock();
  let rafId = null;

  function tick() {
    rafId = requestAnimationFrame(tick);
    const delta = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.getElapsedTime();

    if (!reduceMotion) {
      group.rotation.y += delta * 0.14;
      group.rotation.x = Math.sin(elapsed * 0.2) * 0.18;
      particles.rotation.y -= delta * 0.018;

      easedPointerX += (pointerX - easedPointerX) * 0.04;
      easedPointerY += (pointerY - easedPointerY) * 0.04;

      camera.position.x += (easedPointerX * 0.8 - camera.position.x) * 0.05;
      camera.position.y += (-easedPointerY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      const parallax = -scrollY * 0.0016;
      group.position.y = parallax;
      particles.position.y = parallax * 0.5;
    }

    renderer.render(scene, camera);
  }
  tick();

  function handleVisibility() {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
      rafId = null;
    } else if (rafId === null) {
      tick();
    }
  }
  document.addEventListener("visibilitychange", handleVisibility);

  return function destroy() {
    if (rafId !== null) cancelAnimationFrame(rafId);
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleResize);
    document.removeEventListener("visibilitychange", handleVisibility);

    particleGeo.dispose();
    particleMat.dispose();
    coreGeo.dispose();
    coreMat.dispose();
    glowGeo.dispose();
    glowMat.dispose();
    dotTexture.dispose();
    renderer.dispose();
  };
}

function createDotTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.35)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}
