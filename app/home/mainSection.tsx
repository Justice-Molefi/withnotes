"use client";

import Notes from "../components/notes/Notes";
import { useRef, useState, useEffect } from "react";
import Chat from "../models/Chat";

export default function MainSection({ selectedChat }: { selectedChat: Chat }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [leftWidth, setLeftWidth] = useState(500);
  const isDragging = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;

      const containerLeft = containerRef.current.getBoundingClientRect().left;
      const newWidth = e.clientX - containerLeft;

      const min = 400;
      const max = containerRef.current.offsetWidth - 250;
      if (newWidth > min && newWidth < max) {
        setLeftWidth(newWidth);
      }
    };

    const stopDragging = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDragging);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
    };
  });

  return (
    <div
      ref={containerRef}
      className="font-[family-name:var(--font-geist-mono)] w-full h-full flex"
    >
      <div
        style={{ width: leftWidth }}
        className="chat-container text-gray-300 flex flex-col px-14 overflow-y-auto w-full h-full"
      >
        {selectedChat?.messages.map((message, index) => (
          <div key={index} className="chat text-gray-300 px-2 flex flex-col">
            <div className="user text-xs p-3 my-3 self-end bg-black rounded-sm">
              <p>{message.content}</p>
            </div>
            <div className="llm text-xs my-3">
              <p>{message.role}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{ background: "#444" }}
        onMouseDown={() => (isDragging.current = true)}
        className="w-1 cursor-col-resize"
      />
      <div className="notes flex-1">
        <Notes />
      </div>
    </div>
  );
}
