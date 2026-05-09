// Carefolio brand mark, inline SVG.
//
// "Target / portfolio core" glyph in wine. Reads as both care
// (round, soft) and investment (precise, focused). Replaces the
// legacy emerald leaf PNG so the mark scales cleanly and matches
// the Female-Invest-meets-Daye palette.

interface CarefolioMarkProps {
  size?: number;
  color?: string;
}

export function CarefolioMark({ size = 36, color = "#4A1F30" }: CarefolioMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="18.25" stroke={color} strokeWidth="1.5" />
      <circle cx="20" cy="20" r="6.5" fill={color} />
    </svg>
  );
}
