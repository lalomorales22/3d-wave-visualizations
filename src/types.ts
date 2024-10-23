export interface VisualizationParams {
  frequency: number;
  amplitude: number;
  speed: number;
  waveShape: number;
  turbulence: number;
  rotation: number;
  hue: number;
  mouseInfluence: number;
  colorPreset: 'cosmic' | 'rainbow' | 'ocean' | 'sunset' | 'matrix';
  particleShape: 'circle' | 'square' | 'star' | 'diamond';
}