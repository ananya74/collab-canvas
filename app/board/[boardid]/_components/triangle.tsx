// triangle.tsx
"use client";

import { colorToCss } from "@/lib/utils";
import { TriangleLayer } from "@/types/canvas";

interface TriangleProps {
  id: string;
  layer: TriangleLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Triangle = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: TriangleProps) => {
  const { x, y, width, height, fill } = layer;

  // Coordinates for an upright triangle
  const points = `
    ${width / 2},0 
    ${width},${height} 
    0,${height}
  `;

  return (
    <polygon
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      points={points}
      fill={fill ? colorToCss(fill) : "#000"}
      stroke={selectionColor || "transparent"}
      strokeWidth={1}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    />
  );
};
