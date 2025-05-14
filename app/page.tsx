'use client';
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Notes from "./components/notes/Notes";
import { useRef, useState, useEffect } from 'react';

//font-[family-name:var(--font-geist-mono)]
//font-[family-name:var(--font-geist-sans)]
//   <PanelLeftOpen />

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
    const [leftWidth, setLeftWidth] = useState(500);
    const isDragging = useRef(false);
  
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current || !containerRef.current) return;
  
        const containerLeft = containerRef.current.getBoundingClientRect().left;
        const newWidth = e.clientX - containerLeft;
  
        const min = 400;
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
    <div ref={containerRef} className="font-[family-name:var(--font-geist-mono)] w-full h-full flex border-2 border-red-500">
       <div style={{ width: leftWidth }} className="chat text-gray-300 px-2 flex flex-col h-full">
        <div className="user text-sm p-3 self-end bg-black rounded-sm">
          <p>Some bullshit</p>
        </div>
        <div className="llm">
          <p>Some llm bullshit more grabage</p>
        </div>
       </div>
        <div
        style={{background: '#444'}}
        onMouseDown={() => (isDragging.current = true)}
        className="w-1 cursor-col-resize"
      />
       <div className="notes flex-1">
        <Notes />
       </div>
    </div>
  );
}
