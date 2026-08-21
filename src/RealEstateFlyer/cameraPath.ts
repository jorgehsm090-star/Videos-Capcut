// Camera keyframes: fx/fy are the focus point in the flyer's native pixel
// space (977x1610); scale is the zoom level. Frame 0 = start, 30fps.
export type CameraKeyframe = {
  frame: number;
  fx: number;
  fy: number;
  scale: number;
};

export const FLYER_NATIVE_WIDTH = 977;
export const FLYER_NATIVE_HEIGHT = 1610;

// scale that fits the flyer's full width into the 1080-wide canvas
export const FULL_VIEW_SCALE = 1080 / FLYER_NATIVE_WIDTH;

export const CAMERA_PATH: CameraKeyframe[] = [
  // 0-2s: slow push-in on the apartment photo
  { frame: 0, fx: 740, fy: 220, scale: 1.3 },
  { frame: 55, fx: 740, fy: 220, scale: 1.36 },
  // 2-4s: settle on the "SE BUSCA RENTA" title
  { frame: 75, fx: 320, fy: 195, scale: 1.3 },
  { frame: 115, fx: 280, fy: 195, scale: 1.34 },
  // 4-7s: slow pan down through the property detail rows
  // fx=490 keeps both the row icons (x~155) and the widest row text
  // (the "urgente" line, out to x~825) inside frame at these scales.
  { frame: 120, fx: 490, fy: 529, scale: 1.28 },
  { frame: 195, fx: 490, fy: 872, scale: 1.28 },
  // 7-9s: emphasize the price, then the zone (glow does the highlighting;
  // scale is kept modest so no row text at this zoom gets cropped)
  { frame: 210, fx: 490, fy: 786, scale: 1.4 },
  { frame: 248, fx: 490, fy: 958, scale: 1.4 },
  // pull back out and resume the pan toward the footer
  { frame: 268, fx: 490, fy: 1150, scale: 1.22 },
  { frame: 300, fx: 410, fy: 1470, scale: 1.22 },
  // 11-12s: pull back to reveal the complete flyer and hold
  {
    frame: 330,
    fx: FLYER_NATIVE_WIDTH / 2,
    fy: FLYER_NATIVE_HEIGHT / 2,
    scale: FULL_VIEW_SCALE,
  },
  {
    frame: 360,
    fx: FLYER_NATIVE_WIDTH / 2,
    fy: FLYER_NATIVE_HEIGHT / 2,
    scale: FULL_VIEW_SCALE,
  },
];
