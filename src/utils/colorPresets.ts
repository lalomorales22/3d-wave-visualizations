import * as THREE from 'three';

export type ColorPreset = {
  getColor: (index: number, total: number) => THREE.Color;
  background: string;
};

export const COLOR_PRESETS: Record<string, ColorPreset> = {
  cosmic: {
    getColor: (_, __) => {
      const color = new THREE.Color();
      color.setHSL(0.75 + Math.random() * 0.1, 0.8, 0.6);
      return color;
    },
    background: '#000816'
  },
  rainbow: {
    getColor: (index, total) => {
      const color = new THREE.Color();
      color.setHSL(index / total, 0.8, 0.6);
      return color;
    },
    background: '#000000'
  },
  ocean: {
    getColor: (_, __) => {
      const color = new THREE.Color();
      color.setHSL(0.5 + Math.random() * 0.1, 0.8, 0.5 + Math.random() * 0.2);
      return color;
    },
    background: '#001624'
  },
  sunset: {
    getColor: (_, __) => {
      const color = new THREE.Color();
      const hue = 0.05 + Math.random() * 0.1;
      color.setHSL(hue, 0.8, 0.5 + Math.random() * 0.3);
      return color;
    },
    background: '#1a0010'
  },
  matrix: {
    getColor: (_, __) => {
      const color = new THREE.Color();
      color.setHSL(0.35, 0.9, 0.4 + Math.random() * 0.3);
      return color;
    },
    background: '#000503'
  }
};