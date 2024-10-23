import { useEffect, useState } from 'react';

export function useMousePosition() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePos = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: 1 - e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', updateMousePos);
    return () => window.removeEventListener('mousemove', updateMousePos);
  }, []);

  return mousePos;
}