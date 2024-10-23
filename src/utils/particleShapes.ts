import * as THREE from 'three';

export const createCustomShape = (type: string): THREE.Texture => {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#ffffff';

  switch (type) {
    case 'square':
      ctx.fillRect(8, 8, 16, 16);
      break;
    case 'star':
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const x = 16 + Math.cos(angle) * 12;
        const y = 16 + Math.sin(angle) * 12;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      break;
    case 'diamond':
      ctx.beginPath();
      ctx.moveTo(16, 4);
      ctx.lineTo(28, 16);
      ctx.lineTo(16, 28);
      ctx.lineTo(4, 16);
      ctx.closePath();
      ctx.fill();
      break;
    default: // circle
      ctx.beginPath();
      ctx.arc(16, 16, 8, 0, Math.PI * 2);
      ctx.fill();
  }

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
};