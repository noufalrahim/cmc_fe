import React from "react";

interface PulsatingDotProps {
  color: string;
  size?: number;
}

export default function PulsatingDot({ color, size = 12 }: PulsatingDotProps) {
  return (
    <span
      className={`relative flex items-center justify-center rounded-full ${color} animate-pulseDot`}
      style={{ width: size, height: size }}
    >
      <span
        className={`absolute rounded-full ${color} opacity-30 animate-pulseRing`}
        style={{ width: size * 3, height: size * 3 }}
      />
    </span>
  );
}
