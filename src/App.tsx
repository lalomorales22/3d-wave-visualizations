import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { WaveVisualization } from './components/WaveVisualization';
import { Controls } from './components/Controls';
import { VisualizationParams } from './types';
import { COLOR_PRESETS } from './utils/colorPresets';

export function App() {
  const [params, setParams] = useState<VisualizationParams>({
    frequency: 1,
    amplitude: 1,
    speed: 1,
    waveShape: 0.5,
    turbulence: 0.5,
    rotation: 0.5,
    hue: 0.6,
    mouseInfluence: 1,
    colorPreset: 'cosmic',
    particleShape: 'circle'
  });

  return (
    <div className="w-full h-screen flex">
      <div className="absolute left-4 top-4 z-10 bg-black/20 p-4 rounded-lg backdrop-blur-sm">
        <Controls params={params} setParams={setParams} />
      </div>
      
      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={[COLOR_PRESETS[params.colorPreset].background]} />
        <WaveVisualization params={params} />
        <OrbitControls />
        <EffectComposer>
          <Bloom intensity={1.5} luminanceThreshold={0.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}