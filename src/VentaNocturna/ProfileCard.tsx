import React from "react";
import { Img } from "remotion";
import { montserratFontFamily } from "./fonts";

type ProfileCardProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  photoSrc: string;
  name: string;
  title?: string;
  frameColor?: string;
};

export const ProfileCard: React.FC<ProfileCardProps> = ({
  x,
  y,
  width,
  height,
  photoSrc,
  name,
  title = "MASTER BROKER",
  frameColor = "#4DD0E1",
}) => {
  const borderWidth = 8;
  const photoSize = 200;
  const frameSize = photoSize + borderWidth * 2;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: frameSize,
          height: frameSize,
          borderRadius: "50%",
          border: `${borderWidth}px solid ${frameColor}`,
          boxShadow: `0 0 20px 4px ${frameColor}73`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Img
          src={photoSrc}
          style={{
            width: photoSize,
            height: photoSize,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>

      <div
        style={{
          fontFamily: montserratFontFamily,
          fontSize: 24,
          fontWeight: 700,
          color: "#FFFFFF",
          textAlign: "center",
          marginTop: 18,
          maxWidth: width,
          lineHeight: 1.15,
        }}
      >
        {name}
      </div>

      <div
        style={{
          fontFamily: montserratFontFamily,
          fontSize: 20,
          fontWeight: 800,
          color: "#111111",
          background: frameColor,
          padding: "8px 18px",
          borderRadius: 12,
          marginTop: 12,
          maxWidth: width,
          textAlign: "center",
        }}
      >
        {title}
      </div>
    </div>
  );
};
