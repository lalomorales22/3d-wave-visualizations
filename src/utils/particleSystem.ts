import * as THREE from 'three';

export function createParticleSystem(count: number, hue: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const originalPositions = new Float32Array(count * 3);

  const color = new THREE.Color();
  const size = 4;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Position particles in a cube
    positions[i3] = (Math.random() - 0.5) * size;
    positions[i3 + 1] = (Math.random() - 0.5) * size;
    positions[i3 + 2] = (Math.random() - 0.5) * size;

    // Store original positions for animation reference
    originalPositions[i3] = positions[i3];
    originalPositions[i3 + 1] = positions[i3 + 1];
    originalPositions[i3 + 2] = positions[i3 + 2];

    // Create colors with slight variations
    color.setHSL(hue + Math.random() * 0.1 - 0.05, 0.8, 0.6);
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }

  return { positions, colors, originalPositions };
}