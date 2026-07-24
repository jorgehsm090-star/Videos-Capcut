import React from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaRegClock,
  FaWhatsapp,
} from "react-icons/fa";
import { GiDinosaurRex, GiPalmTree } from "react-icons/gi";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { bodyFontFamily, titleFontFamily } from "./fonts";
import { Starfield } from "./Starfield";
import { Moon } from "./Moon";
import { BowRibbon } from "./BowRibbon";
import { ShootingStar } from "./ShootingStar";
import { CLICK_RIPPLE_END, CLICK_RIPPLE_START, LocationPointer } from "./LocationPointer";

export const VENTA_NOCTURNA_DURATION = 300;
export const VENTA_NOCTURNA_FPS = 30;
export const VENTA_NOCTURNA_WIDTH = 1080;
export const VENTA_NOCTURNA_HEIGHT = 1480;

const SHIMMER_START = 254;
const SHIMMER_END = 296;

const TEAL = "#5fd8e6";
const MOON_YELLOW = "#e8d9a3";

const Divider: React.FC = () => (
  <div
    style={{
      width: "62%",
      height: 1,
      background: "rgba(255,255,255,0.35)",
      margin: "18px 0",
    }}
  />
);

export const VentaNocturna: React.FC = () => {
  const frame = useCurrentFrame();

  const rippleProgress = interpolate(
    frame,
    [CLICK_RIPPLE_START, CLICK_RIPPLE_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const rippleOpacity = interpolate(rippleProgress, [0, 0.15, 1], [0, 0.9, 0]);
  const rippleScale = interpolate(rippleProgress, [0, 1], [1, 1.5]);

  const shimmerX = interpolate(
    frame,
    [SHIMMER_START, SHIMMER_END],
    [220, -120],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const shimmerActive = frame >= SHIMMER_START - 4 && frame <= SHIMMER_END + 4;
  const shimmerScale = interpolate(
    frame,
    [SHIMMER_START, (SHIMMER_START + SHIMMER_END) / 2, SHIMMER_END],
    [1, 1.035, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const shimmerGlow = interpolate(
    frame,
    [SHIMMER_START, (SHIMMER_START + SHIMMER_END) / 2, SHIMMER_END],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        width: VENTA_NOCTURNA_WIDTH,
        height: VENTA_NOCTURNA_HEIGHT,
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(120% 70% at 50% 8%, #10303d 0%, #071824 42%, #030a12 78%, #01050a 100%)",
        fontFamily: bodyFontFamily,
        color: "#ffffff",
      }}
    >
      {/* ambient moonlight glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 480,
          width: 900,
          height: 900,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(180,215,230,0.16) 0%, rgba(180,215,230,0) 60%)",
        }}
      />

      <Starfield width={VENTA_NOCTURNA_WIDTH} height={VENTA_NOCTURNA_HEIGHT} />

      <ShootingStar
        width={VENTA_NOCTURNA_WIDTH}
        height={VENTA_NOCTURNA_HEIGHT}
        startFrame={45}
        endFrame={85}
        fromX={0.86}
        fromY={0.06}
        toX={0.08}
        toY={0.34}
      />
      <ShootingStar
        width={VENTA_NOCTURNA_WIDTH}
        height={VENTA_NOCTURNA_HEIGHT}
        startFrame={200}
        endFrame={236}
        fromX={0.1}
        fromY={0.1}
        toX={0.78}
        toY={0.3}
      />

      {/* decorative skyline / palms */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 150,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          opacity: 0.32,
          pointerEvents: "none",
        }}
      >
        <GiPalmTree size={130} color="#04141d" style={{ marginLeft: -10 }} />
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
          {[70, 100, 80, 120, 90].map((h, i) => (
            <div
              key={i}
              style={{
                width: 46,
                height: h,
                background: "#04141d",
                position: "relative",
              }}
            >
              {new Array(Math.floor(h / 24))
                .fill(0)
                .map((_, wi) => (
                  <div
                    key={wi}
                    style={{
                      position: "absolute",
                      left: 8,
                      top: 10 + wi * 24,
                      width: 8,
                      height: 8,
                      background:
                        (i + wi) % 3 === 0
                          ? "rgba(255,214,120,0.7)"
                          : "transparent",
                    }}
                  />
                ))}
            </div>
          ))}
        </div>
        <GiPalmTree size={130} color="#04141d" style={{ marginRight: -10 }} />
      </div>

      {/* content */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100%",
          padding: "48px 64px 56px",
          boxSizing: "border-box",
        }}
      >
        {/* logos */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 26,
            marginBottom: 26,
          }}
        >
          <Img
            src={staticFile("logo-aldea-hortus.png")}
            style={{ height: 54, width: "auto" }}
          />
          <div
            style={{
              width: 1,
              height: 40,
              background: "rgba(255,255,255,0.3)",
            }}
          />
          <Img
            src={staticFile("logo-ingenieria-mexicana.png")}
            style={{ height: 48, width: "auto" }}
          />
        </div>

        <div
          style={{
            fontSize: 28,
            letterSpacing: 7,
            fontWeight: 500,
            opacity: 0.92,
            marginBottom: 6,
          }}
        >
          TE INVITAN A LA
        </div>

        {/* moon + title */}
        <div
          style={{
            position: "relative",
            width: 480,
            height: 480,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "6px 0 10px",
          }}
        >
          <Moon size={460} />
          <div
            style={{
              position: "absolute",
              top: -30,
              right: 44,
              zIndex: 2,
            }}
          >
            <BowRibbon size={120} />
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {["VENTA", "NOCTURNA"].map((word) => (
              <div key={word} style={{ position: "relative" }}>
                <div
                  style={{
                    fontFamily: titleFontFamily,
                    fontWeight: 700,
                    fontSize: word === "VENTA" ? 98 : 80,
                    color: MOON_YELLOW,
                    letterSpacing: word === "VENTA" ? 6 : 3,
                    textShadow: shimmerActive
                      ? `0 3px 4px rgba(10,18,26,0.55), 0 0 ${
                          20 * shimmerGlow
                        }px rgba(255,240,190,${0.9 * shimmerGlow})`
                      : "0 3px 4px rgba(10,18,26,0.55), 0 1px 0 rgba(10,18,26,0.4), 0 0 26px rgba(10,18,26,0.25)",
                    transform: `scale(${shimmerActive ? shimmerScale : 1})`,
                  }}
                >
                  {word}
                </div>
                {shimmerActive ? (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      fontFamily: titleFontFamily,
                      fontWeight: 700,
                      fontSize: word === "VENTA" ? 98 : 80,
                      letterSpacing: word === "VENTA" ? 6 : 3,
                      transform: `scale(${shimmerScale})`,
                      backgroundImage:
                        "linear-gradient(100deg, rgba(255,245,210,0) 30%, rgba(255,250,225,0.95) 48%, rgba(255,245,210,0) 66%)",
                      backgroundSize: "300% 100%",
                      backgroundPositionX: `${shimmerX}%`,
                      backgroundPositionY: "0%",
                      backgroundRepeat: "no-repeat",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent",
                    }}
                  >
                    {word}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            fontSize: 25,
            lineHeight: 1.45,
            textAlign: "center",
            maxWidth: 760,
            opacity: 0.95,
          }}
        >
          No te pierdas las promociones exclusivas de la 1er Gran Venta
          Nocturna de
        </div>

        <div
          style={{
            fontFamily: bodyFontFamily,
            fontWeight: 800,
            fontSize: 60,
            letterSpacing: 1,
            marginTop: 10,
          }}
        >
          ALDEA HORTUS
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 400,
            letterSpacing: 1,
            marginTop: 4,
            opacity: 0.95,
          }}
        >
          MIER. 29 DE JULIO 2026
        </div>

        <Divider />

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <FaRegClock size={24} color={TEAL} />
          <div style={{ fontWeight: 700, fontSize: 22, letterSpacing: 0.3 }}>
            DESDE LAS 08:00 A.M. HASTA LAS 10:00 P.M.
          </div>
        </div>

        <Divider />

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <FaMapMarkerAlt size={24} color={TEAL} />
          <div style={{ fontSize: 22, opacity: 0.95 }}>
            Av. 12 de Octubre No. 72 Tondoroque, Badeba, Nayarit.
          </div>
        </div>

        {/* ubicacion button */}
        <div
          style={{
            position: "relative",
            marginTop: 30,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 999,
              border: `2px solid ${TEAL}`,
              transform: `scale(${rippleScale})`,
              opacity: rippleOpacity,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              border: `2px solid ${TEAL}`,
              borderRadius: 999,
              padding: "16px 54px",
              background: "rgba(8,24,32,0.55)",
              fontWeight: 800,
              fontSize: 27,
              letterSpacing: 1,
              color: "#eafcff",
            }}
          >
            UBICACIÓN
          </div>
          <LocationPointer />
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
            marginTop: "auto",
            paddingTop: 34,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div style={{ fontWeight: 800, fontSize: 26, marginBottom: 10 }}>
              RSVP
            </div>
            <div
              style={{
                position: "relative",
                background: "#ffffff",
                borderRadius: 16,
                padding: 12,
              }}
            >
              <QRCodeSVG
                value="https://docs.google.com/forms/d/e/1FAIpQLSd5b5SYjkptF6o3etGT6huvJHUiam2FI1lgA1RXiO6PRPw7ug/viewform?pli=1"
                size={168}
                bgColor="#ffffff"
                fgColor="#0b1a24"
                level="H"
              />
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 36,
                  height: 36,
                  borderRadius: 7,
                  background: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GiDinosaurRex size={24} color="#0b1a24" />
              </div>
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 0.5,
                marginTop: 8,
                textAlign: "center",
                width: 192,
                lineHeight: 1.3,
              }}
            >
              ESCANEA Y RESERVA
              <br />
              TU LUGAR
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "flex-start",
              paddingBottom: 30,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <FaWhatsapp size={22} color={TEAL} />
              <div style={{ fontSize: 21 }}>(322) 116 3013</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <FaInstagram size={22} color={TEAL} />
              <div style={{ fontSize: 21, textDecoration: "underline" }}>
                aldeahortusoficial
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <FaFacebook size={22} color={TEAL} />
              <div style={{ fontSize: 21, textDecoration: "underline" }}>
                Aldea Hortus
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
