// components/TiltCard.js
"use client";

import React, { useRef, useEffect } from "react";
import VanillaTilt from "vanilla-tilt";

const TiltCard = ({ children, options = {}, className = "" }) => {
  const tiltRef = useRef(null);

  useEffect(() => {
    if (!tiltRef.current) return;

    VanillaTilt.init(tiltRef.current, {
      max: 15,
      speed: 400,
      scale: 1.05,
      glare: true,
      "max-glare": 0.3,
      ...options,
    });

    return () => {
      if (tiltRef.current.vanillaTilt) {
        tiltRef.current.vanillaTilt.destroy();
      }
    };
  }, [options]);

  return (
    <div ref={tiltRef} className={`tilt-card ${className}`}>
      {children}
    </div>
  );
};

export default TiltCard;
