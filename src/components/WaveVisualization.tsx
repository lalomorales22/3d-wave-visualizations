import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { VisualizationParams } from '../types';
import { useMousePosition } from '../hooks/useMousePosition';
import { COLOR_PRESETS } from '../utils/colorPresets';
import { createCustomShape } from '../utils/particleShapes';

interface WaveVisualizationProps {
  params: VisualizationParams;
}

export function WaveVisualization({ params }: WaveVisualizationProps) {
  const mousePos = useMousePosition();
  const pointsRef = useRef<THREE.Points>(null);
  const PARTICLE_COUNT = 15000;

  const { positions, colors, originalPositions } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
    const size = 4;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * size;
      positions[i3 + 1] = (Math.random() - 0.5) * size;
      positions[i3 + 2] = (Math.random() - 0.5) * size;

      originalPositions[i3] = positions[i3];
      originalPositions[i3 + 1] = positions[i3 + 1];
      originalPositions[i3 + 2] = positions[i3 + 2];

      const color = COLOR_PRESETS[params.colorPreset].getColor(i, PARTICLE_COUNT);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return { positions, colors, originalPositions };
  }, [params.colorPreset]);

  const particleTexture = useMemo(() => 
    createCustomShape(params.particleShape),
    [params.particleShape]
  );

  useFrame((state) => {
    if (!pointsRef.current) return;

    const currentPositions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime() * params.speed;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      
      currentPositions[i3] = originalPositions[i3];
      currentPositions[i3 + 1] = originalPositions[i3 + 1];
      currentPositions[i3 + 2] = originalPositions[i3 + 2];

      const x = currentPositions[i3];
      const y = currentPositions[i3 + 1];
      const z = currentPositions[i3 + 2];
      
      const basicWave = Math.sin(x * params.frequency + time);
      const complexWave = Math.sin(x * params.frequency + time) * Math.cos(y * params.frequency + time);
      const waveValue = THREE.MathUtils.lerp(basicWave, complexWave, params.waveShape);
      
      currentPositions[i3 + 1] += waveValue * params.amplitude * 0.2;
      currentPositions[i3 + 2] += Math.cos(y * params.frequency + time) * params.amplitude * 0.2;
      
      const turbulence = params.turbulence * 0.2;
      currentPositions[i3] += (Math.random() - 0.5) * turbulence;
      currentPositions[i3 + 1] += (Math.random() - 0.5) * turbulence;
      currentPositions[i3 + 2] += (Math.random() - 0.5) * turbulence;

      const angle = time * params.rotation;
      const cosAngle = Math.cos(angle);
      const sinAngle = Math.sin(angle);
      const newX = x * cosAngle - z * sinAngle;
      const newZ = x * sinAngle + z * cosAngle;
      currentPositions[i3] = newX;
      currentPositions[i3 + 2] = newZ;

      if (mousePos.x !== 0 || mousePos.y !== 0) {
        const dx = x - (mousePos.x * 10 - 5);
        const dy = y - (mousePos.y * 10 - 5);
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 2) {
          const force = (1 - dist / 2) * params.mouseInfluence * 0.1;
          currentPositions[i3] += (dx / dist) * force;
          currentPositions[i3 + 1] += (dy / dist) * force;
        }
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
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
        depthWrite={false}
        map={particleTexture}
      />
    </points>
  );
}