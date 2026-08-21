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
  VENTA_NOCTURNA_STORY_HEIGHT,
  VENTA_NOCTURNA_STORY_WIDTH,
  VENTA_NOCTURNA_WIDTH,
} from "./VentaNocturna";
import {
  RealEstateFlyer,
  REAL_ESTATE_FLYER_DURATION,
  REAL_ESTATE_FLYER_FPS,
  REAL_ESTATE_FLYER_HEIGHT,
  REAL_ESTATE_FLYER_WIDTH,
} from "./RealEstateFlyer";

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
      <Composition
        id="VentaNocturnaStory"
        component={VentaNocturna}
        durationInFrames={VENTA_NOCTURNA_DURATION}
        fps={VENTA_NOCTURNA_FPS}
        width={VENTA_NOCTURNA_STORY_WIDTH}
        height={VENTA_NOCTURNA_STORY_HEIGHT}
        defaultProps={{
          width: VENTA_NOCTURNA_STORY_WIDTH,
          height: VENTA_NOCTURNA_STORY_HEIGHT,
          paddingTop: 230,
          paddingBottom: 220,
          showProfileCard: true,
          profileCardY: 240,
        }}
      />
      <Composition
        id="VentaNocturnaHoyStory"
        component={VentaNocturna}
        durationInFrames={VENTA_NOCTURNA_DURATION}
        fps={VENTA_NOCTURNA_FPS}
        width={VENTA_NOCTURNA_STORY_WIDTH}
        height={VENTA_NOCTURNA_STORY_HEIGHT}
        defaultProps={{
          width: VENTA_NOCTURNA_STORY_WIDTH,
          height: VENTA_NOCTURNA_STORY_HEIGHT,
          paddingTop: 230,
          paddingBottom: 220,
          showProfileCard: true,
          profileCardY: 240,
          showLocation: false,
          showFooter: false,
          showUrgency: true,
        }}
      />
      <Composition
        id="RealEstateFlyer"
        component={RealEstateFlyer}
        durationInFrames={REAL_ESTATE_FLYER_DURATION}
        fps={REAL_ESTATE_FLYER_FPS}
        width={REAL_ESTATE_FLYER_WIDTH}
        height={REAL_ESTATE_FLYER_HEIGHT}
      />
    </>
  );
};
