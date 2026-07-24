import React from "react";
import { FaHandPointer } from "react-icons/fa";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const IN_START = 100;
const IN_END = 132;
const CLICK_START = 140;
const CLICK_PEAK = 150;
const CLICK_END = 168;

export const CLICK_RIPPLE_START = CLICK_START;
export const CLICK_RIPPLE_END = CLICK_END + 20;

export const LocationPointer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - IN_START,
    fps,
    config: { damping: 14, mass: 0.6 },
    durationInFrames: IN_END - IN_START,
  });

  const opacity = interpolate(frame, [IN_START - 6, IN_START + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateX = interpolate(entrance, [0, 1], [70, 0]);
  const translateY = interpolate(entrance, [0, 1], [70, 0]);

  let pressScale = 1;
  if (frame >= CLICK_START && frame <= CLICK_END) {
    pressScale = interpolate(
      frame,
      [CLICK_START, CLICK_PEAK, CLICK_END],
      [1, 0.8, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
  }

  const idleBob =
    frame > IN_END && frame < CLICK_START
      ? Math.sin((frame - IN_END) / 6) * 3
      : 0;

  return (
    <div
      style={{
        position: "absolute",
        right: -18,
        bottom: -22,
        opacity,
        transform: `translate(${translateX}px, ${translateY + idleBob}px) scale(${pressScale}) rotate(-18deg)`,
        transformOrigin: "top left",
        filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.6))",
        pointerEvents: "none",
      }}
    >
      <FaHandPointer size={54} color="#eafcff" />
    </div>
  );
};
