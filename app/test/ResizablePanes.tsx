'use client';
import { useRef, useState, useEffect } from 'react';

export default function ResizablePanels() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [leftWidth, setLeftWidth] = useState(300); // initial width in px
  const isDragging = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;

      const containerLeft = containerRef.current.getBoundingClientRect().left;
      const newWidth = e.clientX - containerLeft;

      // Optional: Set min/max width
      const min = 100;
      const max = containerRef.current.offsetWidth - 100;
      if (newWidth > min && newWidth < max) {
        setLeftWidth(newWidth);
      }
    };

    const stopDragging = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopDragging);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopDragging);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex w-full h-screen">
      <div style={{ width: leftWidth }} className="bg-gray-200 p-4">
        Left Panel
      </div>

      <div
        onMouseDown={() => (isDragging.current = true)}
        className="w-2 cursor-col-resize bg-gray-500"
      />

      <div className="flex-1 bg-gray-100 p-4">
        Right Panel
      </div>
    </div>
  );
}
