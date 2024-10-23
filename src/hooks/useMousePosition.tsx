import { useState, useEffect } from 'react';

export function useMousePosition() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const updateMousePos = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: 1 - (e.clientY / window.innerHeight), // Invert Y for Three.js coordinate system
      });
    };

    window.addEventListener('mousemove', updateMousePos);
    return () => window.removeEventListener('mousemove', updateMousePos);
  }, []);

  return mousePos;
}