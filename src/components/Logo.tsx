import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'crest-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  inverted?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
  inverted = false,
}) => {
  const sizeMap = {
    sm: { width: 140, height: 95 },
    md: { width: 220, height: 145 },
    lg: { width: 300, height: 200 },
    xl: { width: 400, height: 265 },
  };

  const currentSize = sizeMap[size];
  const primaryNavy = inverted ? '#ffffff' : '#132e4d';
  const secondaryNavy = inverted ? '#e2e8f0' : '#0a1d33';
  const brickColor = '#a34133';
  const brickDark = '#7b2c22';
  const goldColor = '#c59b27';
  const goldLight = '#e5c05d';

  if (variant === 'crest-only') {
    return (
      <svg
        viewBox="0 0 400 320"
        className={`inline-block ${className}`}
        style={{ width: currentSize.width * 0.7, height: 'auto' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Brasão Oficial do Cartório de Potim"
      >
        <CrestSvgElements
          primaryNavy={primaryNavy}
          secondaryNavy={secondaryNavy}
          brickColor={brickColor}
          brickDark={brickDark}
          goldColor={goldColor}
          goldLight={goldLight}
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 600 400"
      className={`inline-block select-none ${className}`}
      style={{ maxWidth: '100%', height: 'auto' }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Logotipo do Cartório de Potim - Tabelionato e Registro Civil"
    >
      <defs>
        <radialGradient id="goldSheen" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fae498" />
          <stop offset="60%" stopColor="#c59b27" />
          <stop offset="100%" stopColor="#966e15" />
        </radialGradient>
      </defs>

      {/* Outer concentric rings */}
      <circle cx="300" cy="190" r="145" stroke={primaryNavy} strokeWidth="5.5" fill="none" />
      <circle cx="300" cy="190" r="137" stroke={primaryNavy} strokeWidth="2.5" fill="none" />

      {/* Brick Arch Motif */}
      <g id="brickArch">
        {/* Left Pillar */}
        <path
          d="M 205 150 L 235 140 L 235 200 C 235 200 230 205 220 205 C 210 205 205 200 205 200 Z"
          fill={brickColor}
        />
        {/* Right Pillar */}
        <path
          d="M 395 150 L 365 140 L 365 200 C 365 200 370 205 380 205 C 390 205 395 200 395 200 Z"
          fill={brickColor}
        />
        {/* Arch pediment span */}
        <path
          d="M 205 150 L 300 110 L 395 150 L 365 140 L 300 118 L 235 140 Z"
          fill={brickDark}
        />

        {/* Patterned brick texture lines */}
        <path d="M 205 160 H 235 M 205 170 H 235 M 205 180 H 235 M 205 190 H 235" stroke="#f1efe7" strokeWidth="0.8" opacity="0.6" />
        <path d="M 365 160 H 395 M 365 170 H 395 M 365 180 H 395 M 365 190 H 395" stroke="#f1efe7" strokeWidth="0.8" opacity="0.6" />
      </g>

      {/* Central Heraldic Coat of Arms Shield */}
      <g transform="translate(260, 115)">
        {/* Crown on top */}
        <path
          d="M 22 24 L 28 14 L 38 20 L 40 10 L 42 20 L 52 14 L 58 24 Z"
          fill="url(#goldSheen)"
          stroke="#7a570c"
          strokeWidth="1"
        />
        <circle cx="28" cy="14" r="1.5" fill="#ffffff" />
        <circle cx="40" cy="10" r="1.8" fill="#ffffff" />
        <circle cx="52" cy="14" r="1.5" fill="#ffffff" />
        <path d="M 24 25 H 56" stroke="#7a570c" strokeWidth="1.5" />

        {/* Heraldic flourishes */}
        <path
          d="M 16 35 C 10 28 8 40 14 48 C 10 52 12 60 18 64"
          stroke={goldColor}
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 64 35 C 70 28 72 40 66 48 C 70 52 68 60 62 64"
          stroke={goldColor}
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />

        {/* Shield contour */}
        <path
          d="M 20 28 H 60 C 60 28 62 55 40 76 C 18 55 20 28 20 28 Z"
          fill={primaryNavy}
          stroke={goldColor}
          strokeWidth="2.5"
        />

        {/* Balance of Justice (Scales) */}
        <g stroke={goldLight} strokeWidth="1.2" fill="none">
          <line x1="40" y1="36" x2="40" y2="58" />
          <line x1="30" y1="40" x2="50" y2="40" />
          {/* Left scale pan */}
          <line x1="30" y1="40" x2="26" y2="48" />
          <line x1="30" y1="40" x2="34" y2="48" />
          <path d="M 25 48 Q 30 52 35 48 Z" fill={goldLight} />
          {/* Right scale pan */}
          <line x1="50" y1="40" x2="46" y2="48" />
          <line x1="50" y1="40" x2="54" y2="48" />
          <path d="M 45 48 Q 50 52 55 48 Z" fill={goldLight} />
        </g>

        {/* Open Book of Law (Codex) */}
        <path
          d="M 30 62 Q 40 59 40 65 Q 40 59 50 62 L 50 67 Q 40 64 40 69 Q 40 64 30 67 Z"
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="0.5"
        />
      </g>

      {/* Typography: "Cartório de Potim" */}
      <text
        x="300"
        y="235"
        textAnchor="middle"
        fontFamily="Cinzel, Georgia, serif"
        fontSize="29"
        fontWeight="700"
        letterSpacing="0.8"
        fill={primaryNavy}
      >
        Cartório de Potim
      </text>

      {/* Subtitle: "TABELIONATO E REGISTRO CIVIL" */}
      <text
        x="300"
        y="262"
        textAnchor="middle"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="13"
        fontWeight="600"
        letterSpacing="3"
        fill={secondaryNavy}
      >
        TABELIONATO E REGISTRO CIVIL
      </text>

      {/* Bottom Separator Line */}
      <line x1="120" y1="332" x2="480" y2="332" stroke={primaryNavy} strokeWidth="1.8" />

      {/* Motto: "FÉ PÚBLICA E SEGURANÇA JURÍDICA" */}
      <text
        x="300"
        y="358"
        textAnchor="middle"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="14.5"
        fontWeight="500"
        letterSpacing="5"
        fill={primaryNavy}
      >
        FÉ PÚBLICA E SEGURANÇA JURÍDICA
      </text>
    </svg>
  );
};

const CrestSvgElements: React.FC<{
  primaryNavy: string;
  secondaryNavy: string;
  brickColor: string;
  brickDark: string;
  goldColor: string;
  goldLight: string;
}> = ({ primaryNavy, secondaryNavy, brickColor, brickDark, goldColor, goldLight }) => (
  <>
    <circle cx="200" cy="150" r="130" stroke={primaryNavy} strokeWidth="5" fill="none" />
    <circle cx="200" cy="150" r="122" stroke={primaryNavy} strokeWidth="2" fill="none" />

    {/* Arch */}
    <path d="M 115 120 L 145 110 L 145 165 C 145 165 140 170 130 170 C 120 170 115 165 115 165 Z" fill={brickColor} />
    <path d="M 285 120 L 255 110 L 255 165 C 255 165 260 170 270 170 C 280 170 285 165 285 165 Z" fill={brickColor} />
    <path d="M 115 120 L 200 85 L 285 120 L 255 110 L 200 92 L 145 110 Z" fill={brickDark} />

    {/* Shield */}
    <g transform="translate(160, 85)">
      <path d="M 22 24 L 28 14 L 38 20 L 40 10 L 42 20 L 52 14 L 58 24 Z" fill={goldColor} stroke="#7a570c" strokeWidth="1" />
      <path d="M 20 28 H 60 C 60 28 62 55 40 76 C 18 55 20 28 20 28 Z" fill={primaryNavy} stroke={goldColor} strokeWidth="2.5" />
      <line x1="40" y1="36" x2="40" y2="58" stroke={goldLight} strokeWidth="1.2" />
      <line x1="30" y1="40" x2="50" y2="40" stroke={goldLight} strokeWidth="1.2" />
      <path d="M 25 48 Q 30 52 35 48 Z" fill={goldLight} />
      <path d="M 45 48 Q 50 52 55 48 Z" fill={goldLight} />
      <path d="M 30 62 Q 40 59 40 65 Q 40 59 50 62 L 50 67 Q 40 64 40 69 Q 40 64 30 67 Z" fill="#ffffff" />
    </g>

    <text x="200" y="195" textAnchor="middle" fontFamily="Cinzel, Georgia, serif" fontSize="22" fontWeight="700" fill={primaryNavy}>
      Cartório de Potim
    </text>
    <text x="200" y="218" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" letterSpacing="2" fill={secondaryNavy}>
      TABELIONATO E REGISTRO CIVIL
    </text>
  </>
);
