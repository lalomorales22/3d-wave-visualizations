import React from 'react';
import { VisualizationParams } from '../types';
import { COLOR_PRESETS } from '../utils/colorPresets';

interface ControlsProps {
  params: VisualizationParams;
  setParams: React.Dispatch<React.SetStateAction<VisualizationParams>>;
}

const CONTROL_LABELS: Partial<Record<keyof VisualizationParams, string>> = {
  frequency: 'Wave Frequency',
  amplitude: 'Wave Height',
  speed: 'Animation Speed',
  waveShape: 'Wave Complexity',
  turbulence: 'Chaos Factor',
  rotation: 'Rotation Speed',
  mouseInfluence: 'Mouse Force'
};

const PARTICLE_SHAPES = ['circle', 'square', 'star', 'diamond'];

export function Controls({ params, setParams }: ControlsProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-4 text-white min-w-[240px]">
      <h2 className="text-xl font-bold mb-4">Wave Controls</h2>
      
      <div className="space-y-2">
        <label className="block text-sm">Color Theme</label>
        <select
          name="colorPreset"
          value={params.colorPreset}
          onChange={handleSelectChange}
          className="w-full bg-black/30 text-white rounded p-1 border border-white/20"
        >
          {Object.keys(COLOR_PRESETS).map(preset => (
            <option key={preset} value={preset}>
              {preset.charAt(0).toUpperCase() + preset.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm">Particle Shape</label>
        <select
          name="particleShape"
          value={params.particleShape}
          onChange={handleSelectChange}
          className="w-full bg-black/30 text-white rounded p-1 border border-white/20"
        >
          {PARTICLE_SHAPES.map(shape => (
            <option key={shape} value={shape}>
              {shape.charAt(0).toUpperCase() + shape.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="h-px bg-white/20 my-4" />

      {Object.entries(CONTROL_LABELS).map(([key, label]) => (
        <div key={key} className="space-y-2">
          <label className="block text-sm">
            {label}
            <span className="ml-2 text-xs">
              ({params[key as keyof VisualizationParams].toFixed(2)})
            </span>
          </label>
          <input
            type="range"
            name={key}
            value={params[key as keyof VisualizationParams]}
            onChange={handleChange}
            min="0"
            max="2"
            step="0.01"
            className="w-full"
          />
        </div>
      ))}
    </div>
  );
}