import * as THREE from "three";

/**
 * Mounts an ambient WebGL scene (drifting particle field + a drifting
 * node graph that draws connecting lines between nearby nodes) into the
 * given canvas. Returns a cleanup function that disposes every GPU
 * resource it allocated.
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

  const graphGroup = new THREE.Group();
  graphGroup.position.set(4.6, 0, -2);

  const NODE_COUNT = window.innerWidth < 640 ? 24 : 46;
  const CONNECT_DISTANCE = 1.5;
  const BOUNDS = new THREE.Vector3(1.7, 1.9, 1.4);

  const nodePositions = [];
  const nodeVelocities = [];
  const nodeColors = [];
  const nodeColorA = new THREE.Color("#00ff88");
  const nodeColorB = new THREE.Color("#7c3aed");

  for (let i = 0; i < NODE_COUNT; i++) {
    nodePositions.push(
      new THREE.Vector3(
        (Math.random() * 2 - 1) * BOUNDS.x,
        (Math.random() * 2 - 1) * BOUNDS.y,
        (Math.random() * 2 - 1) * BOUNDS.z
      )
    );
    nodeVelocities.push(
      new THREE.Vector3(
        (Math.random() * 2 - 1) * 0.18,
        (Math.random() * 2 - 1) * 0.18,
        (Math.random() * 2 - 1) * 0.18
      )
    );
    nodeColors.push(nodeColorA.clone().lerp(nodeColorB, Math.random()));
  }

  const nodePosArray = new Float32Array(NODE_COUNT * 3);
  const nodeColorArray = new Float32Array(NODE_COUNT * 3);
  nodeColors.forEach((c, i) => {
    nodeColorArray[i * 3 + 0] = c.r;
    nodeColorArray[i * 3 + 1] = c.g;
    nodeColorArray[i * 3 + 2] = c.b;
  });

  const nodeGeo = new THREE.BufferGeometry();
  nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePosArray, 3));
  nodeGeo.setAttribute("color", new THREE.BufferAttribute(nodeColorArray, 3));
  const nodeMat = new THREE.PointsMaterial({
    size: 0.16,
    map: dotTexture,
    transparent: true,
    depthWrite: false,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
  });
  const nodePoints = new THREE.Points(nodeGeo, nodeMat);
  graphGroup.add(nodePoints);

  const MAX_EDGES = NODE_COUNT * 8;
  const edgePositions = new Float32Array(MAX_EDGES * 2 * 3);
  const edgeColors = new Float32Array(MAX_EDGES * 2 * 3);
  const edgeGeo = new THREE.BufferGeometry();
  edgeGeo.setAttribute("position", new THREE.BufferAttribute(edgePositions, 3));
  edgeGeo.setAttribute("color", new THREE.BufferAttribute(edgeColors, 3));
  edgeGeo.setDrawRange(0, 0);
  const edgeMat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
  graphGroup.add(edgeLines);

  scene.add(graphGroup);

  function updateGraph(delta) {
    for (let i = 0; i < NODE_COUNT; i++) {
      const p = nodePositions[i];
      const v = nodeVelocities[i];
      p.addScaledVector(v, delta);
      if (p.x > BOUNDS.x || p.x < -BOUNDS.x) v.x *= -1;
      if (p.y > BOUNDS.y || p.y < -BOUNDS.y) v.y *= -1;
      if (p.z > BOUNDS.z || p.z < -BOUNDS.z) v.z *= -1;
      nodePosArray[i * 3 + 0] = p.x;
      nodePosArray[i * 3 + 1] = p.y;
      nodePosArray[i * 3 + 2] = p.z;
    }
    nodeGeo.attributes.position.needsUpdate = true;

    let edgeCount = 0;
    for (let i = 0; i < NODE_COUNT && edgeCount < MAX_EDGES; i++) {
      for (let j = i + 1; j < NODE_COUNT && edgeCount < MAX_EDGES; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist >= CONNECT_DISTANCE) continue;

        const alpha = 1 - dist / CONNECT_DISTANCE;
        const pIdx = edgeCount * 6;
        edgePositions[pIdx + 0] = nodePositions[i].x;
        edgePositions[pIdx + 1] = nodePositions[i].y;
        edgePositions[pIdx + 2] = nodePositions[i].z;
        edgePositions[pIdx + 3] = nodePositions[j].x;
        edgePositions[pIdx + 4] = nodePositions[j].y;
        edgePositions[pIdx + 5] = nodePositions[j].z;

        const r = ((nodeColors[i].r + nodeColors[j].r) / 2) * alpha;
        const g = ((nodeColors[i].g + nodeColors[j].g) / 2) * alpha;
        const b = ((nodeColors[i].b + nodeColors[j].b) / 2) * alpha;
        edgeColors[pIdx + 0] = r;
        edgeColors[pIdx + 1] = g;
        edgeColors[pIdx + 2] = b;
        edgeColors[pIdx + 3] = r;
        edgeColors[pIdx + 4] = g;
        edgeColors[pIdx + 5] = b;

        edgeCount++;
      }
    }
    edgeGeo.setDrawRange(0, edgeCount * 2);
    edgeGeo.attributes.position.needsUpdate = true;
    edgeGeo.attributes.color.needsUpdate = true;
  }

  updateGraph(0);

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
      updateGraph(delta);
      graphGroup.rotation.y += delta * 0.06;
      graphGroup.rotation.x = Math.sin(elapsed * 0.15) * 0.1;
      particles.rotation.y -= delta * 0.018;

      easedPointerX += (pointerX - easedPointerX) * 0.04;
      easedPointerY += (pointerY - easedPointerY) * 0.04;

      camera.position.x += (easedPointerX * 0.8 - camera.position.x) * 0.05;
      camera.position.y += (-easedPointerY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      const parallax = -scrollY * 0.0016;
      graphGroup.position.y = parallax;
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
    nodeGeo.dispose();
    nodeMat.dispose();
    edgeGeo.dispose();
    edgeMat.dispose();
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
