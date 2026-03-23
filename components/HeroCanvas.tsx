"use client";

import type { RefObject } from "react";

type HeroCanvasProps = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
};

export default function HeroCanvas({ canvasRef }: HeroCanvasProps) {
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
