import React from "react";

export const BowRibbon: React.FC<{ size?: number }> = ({ size = 130 }) => {
  return (
    <svg
      width={size}
      height={size * 0.86}
      viewBox="0 0 200 172"
      style={{ filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.45))" }}
    >
      {/* tails */}
      <path
        d="M92 100 L60 172 L82 158 L98 172 Z"
        fill="#a6121f"
        transform="rotate(-8 92 100)"
      />
      <path
        d="M108 100 L140 172 L118 158 L102 172 Z"
        fill="#a6121f"
        transform="rotate(8 108 100)"
      />

      {/* left loop */}
      <path
        d="M100 90
           C 60 90, 15 78, 12 42
           C 10 14, 40 6, 62 20
           C 84 34, 96 62, 100 90 Z"
        fill="#e8202f"
      />
      <path
        d="M100 90
           C 70 88, 34 76, 26 48
           C 22 34, 32 22, 46 24
           C 40 40, 60 70, 100 90 Z"
        fill="#a6121f"
        opacity={0.55}
      />

      {/* right loop */}
      <path
        d="M100 90
           C 140 90, 185 78, 188 42
           C 190 14, 160 6, 138 20
           C 116 34, 104 62, 100 90 Z"
        fill="#e8202f"
      />
      <path
        d="M100 90
           C 130 88, 166 76, 174 48
           C 178 34, 168 22, 154 24
           C 160 40, 140 70, 100 90 Z"
        fill="#a6121f"
        opacity={0.55}
      />

      {/* highlights */}
      <ellipse cx="46" cy="34" rx="14" ry="7" fill="#ff8b92" opacity={0.55} />
      <ellipse cx="154" cy="34" rx="14" ry="7" fill="#ff8b92" opacity={0.55} />

      {/* knot */}
      <path
        d="M100 74 C 118 74, 122 88, 118 102 C 112 116, 88 116, 82 102 C 78 88, 82 74, 100 74 Z"
        fill="#c81622"
      />
      <ellipse cx="100" cy="86" rx="9" ry="6" fill="#ff8b92" opacity={0.45} />
    </svg>
  );
};
