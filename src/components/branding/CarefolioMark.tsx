// Carefolio brand mark.
//
// Renders the tree-rings logo at /logo.png (Vite public/ folder, served
// at site root). If that file is missing for any reason, falls back to
// the original wine-bullseye SVG so the nav and footer never break.
//
// To swap the logo: replace /Users/Dublin-Osx/code/Care Index
// Dashboard/public/logo.png with a new file. No code changes needed.

import { useState } from "react";

interface CarefolioMarkProps {
  size?: number;
  /** Override the default logo source. Defaults to /logo.png. */
  src?: string;
  /** Color for the SVG fallback. Defaults to wine. */
  color?: string;
  className?: string;
}

export function CarefolioMark({
  size = 36,
  src = "/logo.png",
  color = "#4A1F30",
  className,
}: CarefolioMarkProps) {
  const [errored, setErrored] = useState(false);

  if (errored || !src) {
    return <FallbackMark size={size} color={color} className={className} />;
  }

  return (
    <img
      src={src}
      alt="Carefolio"
      width={size}
      height={size}
      className={className}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        display: "block",
      }}
      onError={() => setErrored(true)}
    />
  );
}

function FallbackMark({
  size,
  color,
  className,
}: {
  size: number;
  color: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <circle cx="20" cy="20" r="18.25" stroke={color} strokeWidth="1.5" />
      <circle cx="20" cy="20" r="6.5" fill={color} />
    </svg>
  );
}
