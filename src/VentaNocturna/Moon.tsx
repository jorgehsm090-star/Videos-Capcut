import React, { useMemo } from "react";
import { random, useCurrentFrame, useVideoConfig } from "remotion";

const CRATER_COUNT = 10;

export const Moon: React.FC<{ size: number }> = ({ size }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const craters = useMemo(() => {
    return new Array(CRATER_COUNT).fill(0).map((_, i) => ({
      x: 10 + random(`crater-x-${i}`) * 80,
      y: 10 + random(`crater-y-${i}`) * 80,
      size: 4 + random(`crater-size-${i}`) * 12,
      opacity: 0.08 + random(`crater-op-${i}`) * 0.12,
    }));
  }, []);

  const glowPulse = (Math.sin((2 * Math.PI * t) / 4) + 1) / 2;
  const glowSize = 25 + glowPulse * 45;
  const glowOpacity = 0.35 + glowPulse * 0.45;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        filter: `drop-shadow(0 0 ${glowSize}px rgba(255,255,255,${glowOpacity})) drop-shadow(0 0 ${
          glowSize * 1.8
        }px rgba(173,216,235,${glowOpacity * 0.55}))`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 30%, #ffffff 0%, #e4e4e4 30%, #bdbdbd 62%, #8f8f8f 100%)",
          overflow: "hidden",
        }}
      >
        {craters.map((c, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${c.x}%`,
              top: `${c.y}%`,
              width: c.size,
              height: c.size,
              borderRadius: "50%",
              background: "#5c5c5c",
              opacity: c.opacity,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 68% 72%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 55%)",
          }}
        />
      </div>
    </div>
  );
};
