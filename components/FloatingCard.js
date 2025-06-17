"use client";

import { useRef, useEffect } from "react";

const FloatingCard = ({ children, className = "", sensitivity = 15 }) => {
  const cardRef = useRef(null);
  const requestRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const update = () => {
      const card = cardRef.current;
      if (!card) return;

      const x = (mouse.current.x / window.innerWidth - 0.5) * 2;
      const y = (mouse.current.y / window.innerHeight - 0.5) * 2;

      const rotateX = -y * sensitivity;
      const rotateY = x * sensitivity;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      requestRef.current = requestAnimationFrame(update);
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    requestRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, [sensitivity]);

  return (
    <div
      ref={cardRef}
      className={`transition-transform ease-out ${className}`}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

export default FloatingCard;
