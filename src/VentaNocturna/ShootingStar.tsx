import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type ShootingStarProps = {
  width: number;
  height: number;
  startFrame: number;
  endFrame: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
};

export const ShootingStar: React.FC<ShootingStarProps> = ({
  width,
  height,
  startFrame,
  endFrame,
  fromX,
  fromY,
  toX,
  toY,
}) => {
  const frame = useCurrentFrame();

  if (frame < startFrame - 12 || frame > endFrame + 12) {
    return null;
  }

  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const envelope = interpolate(
    progress,
    [0, 0.12, 0.82, 1],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const x = interpolate(progress, [0, 1], [fromX, toX]) * width;
  const y = interpolate(progress, [0, 1], [fromY, toY]) * height;
  const dx = (toX - fromX) * width;
  const dy = (toY - fromY) * height;
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  const trailLength = Math.hypot(dx, dy) * 0.34;

  const twinkle = 0.7 + Math.sin(frame * 1.6) * 0.3;

  const flashBurst = interpolate(
    frame,
    [startFrame - 8, startFrame, startFrame + 10],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {/* trail */}
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: trailLength,
          height: 3,
          opacity: envelope,
          background:
            "linear-gradient(to left, rgba(255,255,255,0.95), rgba(255,255,255,0))",
          transform: `translate(-100%, -50%) rotate(${angle}deg)`,
          transformOrigin: "right center",
          borderRadius: 2,
        }}
      />
      {/* head */}
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "#ffffff",
          opacity: envelope,
          transform: `translate(-50%, -50%) scale(${twinkle})`,
          boxShadow: `0 0 ${10 * twinkle}px 3px rgba(255,255,255,0.9), 0 0 ${
            22 * twinkle
          }px 8px rgba(200,225,255,0.55)`,
        }}
      />
      {/* appearance sparkle burst */}
      {flashBurst > 0 ? (
        <div
          style={{
            position: "absolute",
            left: fromX * width,
            top: fromY * height,
            width: 0,
            height: 0,
            opacity: flashBurst,
            transform: `translate(-50%, -50%) scale(${0.4 + flashBurst * 1.1})`,
          }}
        >
          {[0, 45, 90, 135].map((rot) => (
            <div
              key={rot}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 34,
                height: 2,
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.95), transparent)",
                transform: `translate(-50%, -50%) rotate(${rot}deg)`,
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
