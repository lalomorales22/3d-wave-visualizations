import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '../hooks/useMousePosition';

interface WaveSceneProps {
  params: {
    frequency: number;
    amplitude: number;
    speed: number;
    particles: number;
    hue: number;
    mouseInfluence: number;
  };
}

export function WaveScene({ params }: WaveSceneProps) {
  const points = useRef<THREE.Points>(null);
  const mousePos = useMousePosition();
  
  // Create geometry data
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(params.particles * 3);
    const colors = new Float32Array(params.particles * 3);

    for (let i = 0; i < params.particles; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      const color = new THREE.Color();
      color.setHSL(params.hue + Math.random() * 0.2, 0.8, 0.5);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return { positions, colors };
  }, [params.particles, params.hue]); // Recreate when particles count or hue changes

  // Store original positions for wave animation
  const originalPositions = useMemo(() => new Float32Array(positions), [positions]);

  useFrame((state) => {
    if (!points.current) return;

    const positions = points.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime() * params.speed;

    for (let i = 0; i < params.particles; i++) {
      const i3 = i * 3;
      
      // Reset to original position first
      positions[i3] = originalPositions[i3];
      positions[i3 + 1] = originalPositions[i3 + 1];
      positions[i3 + 2] = originalPositions[i3 + 2];

      const x = positions[i3];
      const y = positions[i3 + 1];

      // Wave motion
      positions[i3 + 1] += Math.sin(x * params.frequency + time) * params.amplitude * 0.1;

      // Mouse influence
      const dx = x - (mousePos.x * 10 - 5);
      const dy = y - (mousePos.y * 10 - 5);
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 2) {
        positions[i3] += (dx / dist) * params.mouseInfluence * 0.01;
        positions[i3 + 1] += (dy / dist) * params.mouseInfluence * 0.01;
      }

      // Spiral motion
      positions[i3] += Math.sin(time * 0.1 + y) * 0.01;
      positions[i3 + 2] += Math.cos(time * 0.1 + x) * 0.01;
    }

    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}