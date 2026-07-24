import "./index.css";
import { Composition, staticFile } from "remotion";
import {
  CaptionedVideo,
  calculateCaptionedVideoMetadata,
  captionedVideoSchema,
} from "./CaptionedVideo";
import {
  VentaNocturna,
  VENTA_NOCTURNA_DURATION,
  VENTA_NOCTURNA_FPS,
  VENTA_NOCTURNA_HEIGHT,
  VENTA_NOCTURNA_WIDTH,
} from "./VentaNocturna";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CaptionedVideo"
        component={CaptionedVideo}
        calculateMetadata={calculateCaptionedVideoMetadata}
        schema={captionedVideoSchema}
        width={1080}
        height={1920}
        defaultProps={{
          src: staticFile("sample-video.mp4"),
        }}
      />
      <Composition
        id="VentaNocturna"
        component={VentaNocturna}
        durationInFrames={VENTA_NOCTURNA_DURATION}
        fps={VENTA_NOCTURNA_FPS}
        width={VENTA_NOCTURNA_WIDTH}
        height={VENTA_NOCTURNA_HEIGHT}
      />
    </>
  );
};
