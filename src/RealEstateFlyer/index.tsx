import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  CAMERA_PATH,
  FLYER_NATIVE_HEIGHT,
  FLYER_NATIVE_WIDTH,
} from "./cameraPath";

export const REAL_ESTATE_FLYER_DURATION = 360;
export const REAL_ESTATE_FLYER_FPS = 30;
export const REAL_ESTATE_FLYER_WIDTH = 1080;
export const REAL_ESTATE_FLYER_HEIGHT = 1920;

const CREAM = "#f3e8e2";
const GOLD = "rgba(214,178,110,0.35)";

const FRAMES = CAMERA_PATH.map((k) => k.frame);
const FXS = CAMERA_PATH.map((k) => k.fx);
const FYS = CAMERA_PATH.map((k) => k.fy);
const SCALES = CAMERA_PATH.map((k) => k.scale);

const EASE = Easing.inOut(Easing.ease);

const track = (frame: number, values: number[]) =>
  interpolate(frame, FRAMES, values, {
    easing: EASE,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const RealEstateFlyer: React.FC = () => {
  const frame = useCurrentFrame();

  const fx = track(frame, FXS);
  const fy = track(frame, FYS);
  const scale = track(frame, SCALES);

  const displayWidth = FLYER_NATIVE_WIDTH * scale;
  const displayHeight = FLYER_NATIVE_HEIGHT * scale;
  // Center the focus point, but clamp so the image always fully covers the
  // canvas -- otherwise focusing near an edge of the source flyer would
  // leave a gap where the blurred backdrop shows through.
  const left = clamp(
    REAL_ESTATE_FLYER_WIDTH / 2 - fx * scale,
    REAL_ESTATE_FLYER_WIDTH - displayWidth,
    0,
  );
  const top = clamp(
    REAL_ESTATE_FLYER_HEIGHT / 2 - fy * scale,
    REAL_ESTATE_FLYER_HEIGHT - displayHeight,
    0,
  );

  const introOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // gentle continuous daylight sweep, once during the intro
  const introSweep = interpolate(frame, [0, 70], [-40, 140], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const introSweepOpacity = interpolate(
    frame,
    [0, 15, 55, 70],
    [0, 0.5, 0.5, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // discreet gold sweep while the title is in focus
  const titleSweep = interpolate(frame, [70, 120], [-40, 140], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleSweepOpacity = interpolate(
    frame,
    [70, 80, 110, 120],
    [0, 0.4, 0.4, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // soft warm glow while the price / zone are emphasized
  const emphasisGlow = interpolate(
    frame,
    [205, 220, 240, 258, 268],
    [0, 0.28, 0.28, 0.28, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, overflow: "hidden" }}>
      {/* soft blurred backdrop so camera moves never reveal a hard edge */}
      <AbsoluteFill style={{ opacity: introOpacity }}>
        <Img
          src={staticFile("flyer-renta.png")}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: FLYER_NATIVE_WIDTH * 1.25,
            height: FLYER_NATIVE_HEIGHT * 1.25,
            maxWidth: "none",
            maxHeight: "none",
            transform: "translate(-50%, -50%)",
            filter: "blur(46px) brightness(0.85) saturate(1.05)",
          }}
        />
        <AbsoluteFill style={{ backgroundColor: "rgba(10,14,20,0.28)" }} />
      </AbsoluteFill>

      {/* sharp foreground: the untouched flyer, panned & zoomed */}
      <Img
        src={staticFile("flyer-renta.png")}
        style={{
          position: "absolute",
          left,
          top,
          width: displayWidth,
          height: displayHeight,
          maxWidth: "none",
          maxHeight: "none",
          opacity: introOpacity,
        }}
      />

      {/* daylight sweep on entrance */}
      <AbsoluteFill
        style={{
          opacity: introSweepOpacity,
          mixBlendMode: "screen",
          backgroundImage:
            "linear-gradient(75deg, transparent 0%, transparent 42%, rgba(255,250,240,0.9) 50%, transparent 58%, transparent 100%)",
          backgroundSize: "260% 260%",
          backgroundPosition: `${introSweep}% 50%`,
          pointerEvents: "none",
        }}
      />

      {/* gold sweep while the title is on screen */}
      <AbsoluteFill
        style={{
          opacity: titleSweepOpacity,
          mixBlendMode: "screen",
          backgroundImage: `linear-gradient(75deg, transparent 0%, transparent 42%, ${GOLD} 50%, transparent 58%, transparent 100%)`,
          backgroundSize: "260% 260%",
          backgroundPosition: `${titleSweep}% 50%`,
          pointerEvents: "none",
        }}
      />

      {/* warm glow to draw the eye to price / zone */}
      <AbsoluteFill
        style={{
          opacity: emphasisGlow,
          mixBlendMode: "screen",
          background:
            "radial-gradient(circle at 50% 50%, rgba(214,178,110,0.55) 0%, rgba(214,178,110,0) 62%)",
          pointerEvents: "none",
        }}
      />

      {/* permanent, very subtle cinematic vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(120% 85% at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.22) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

