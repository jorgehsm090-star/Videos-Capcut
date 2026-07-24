import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const Moon: React.FC<{ size: number }> = ({ size }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

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
      <Img
        src={staticFile("moon.png")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};
