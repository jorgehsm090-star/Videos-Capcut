import React, { useMemo } from "react";
import { random, useCurrentFrame, useVideoConfig } from "remotion";

type Star = {
  x: number;
  y0: number;
  size: number;
  fallSpeed: number;
  twinkles: boolean;
  twinkleSpeed: number;
  twinklePhase: number;
  baseOpacity: number;
};

const STAR_COUNT = 140;

export const Starfield: React.FC<{ width: number; height: number }> = ({
  width,
  height,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const stars = useMemo<Star[]>(() => {
    return new Array(STAR_COUNT).fill(0).map((_, i) => ({
      x: random(`star-x-${i}`) * width,
      y0: random(`star-y-${i}`) * height,
      size: 1 + random(`star-size-${i}`) * 2.4,
      fallSpeed: 6 + random(`star-fall-${i}`) * 14,
      twinkles: random(`star-tw-${i}`) < 0.4,
      twinkleSpeed: 0.4 + random(`star-tws-${i}`) * 1.4,
      twinklePhase: random(`star-twp-${i}`) * Math.PI * 2,
      baseOpacity: 0.35 + random(`star-op-${i}`) * 0.45,
    }));
  }, [width, height]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
    >
      {stars.map((star, i) => {
        const y =
          ((star.y0 + star.fallSpeed * t) % (height + 20)) - 10;

        const twinkle = star.twinkles
          ? Math.sin(2 * Math.PI * star.twinkleSpeed * t + star.twinklePhase)
          : 0;
        const opacity = Math.min(
          1,
          Math.max(0.12, star.baseOpacity + twinkle * 0.45),
        );
        const glow = star.twinkles
          ? Math.max(0, twinkle) * star.size * 5
          : star.size * 1.5;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: star.x,
              top: y,
              width: star.size,
              height: star.size,
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              opacity,
              boxShadow: `0 0 ${glow}px ${glow * 0.6}px rgba(255,255,255,${
                star.twinkles ? 0.55 : 0.25
              })`,
            }}
          />
        );
      })}
    </div>
  );
};
