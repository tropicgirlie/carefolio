// Editorial scrolling band of personas / situations.
//
// Replaces the old stocks ticker visually but carries Carefolio content:
// short sentences about women in various circumstances doing the work.
// Pure CSS animation, paused on hover so readers can finish a line.
// Lives on the landing page, just below the sticky nav.

import { JOURNEY_ITEMS } from "../data/journey-items";

const MONO = {
  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
};

export function JourneyTicker() {
  // Duplicate the list so the CSS marquee can scroll one copy out while
  // the duplicate slides into place, then reset to start invisibly.
  const items = [...JOURNEY_ITEMS, ...JOURNEY_ITEMS];

  return (
    <div
      className="journey-ticker-container relative w-full overflow-hidden border-y"
      style={{
        backgroundColor: "#F5D9C8",     // peach-soft
        borderColor: "#E1D5BF",
      }}
      aria-label="A montage of women learning to invest"
    >
      {/* Local style: scoped keyframes + hover-pause. */}
      <style>{`
        .journey-ticker-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: journey-marquee 120s linear infinite;
        }
        .journey-ticker-container:hover .journey-ticker-track {
          animation-play-state: paused;
        }
        @keyframes journey-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .journey-ticker-track { animation: none; }
        }
      `}</style>

      {/* Soft fade on left and right edges so items appear and disappear
          cleanly instead of being chopped at the viewport edge. */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16"
        style={{
          background: "linear-gradient(to right, #F5D9C8, rgba(245,217,200,0))",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16"
        style={{
          background: "linear-gradient(to left, #F5D9C8, rgba(245,217,200,0))",
        }}
        aria-hidden="true"
      />

      <div className="journey-ticker-track py-3">
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-5 text-sm whitespace-nowrap"
            style={{
              color: "#1A1410",
              ...MONO,
              fontSize: "13px",
              letterSpacing: "0.01em",
            }}
          >
            <span
              className="inline-block size-1.5 rounded-full"
              style={{ backgroundColor: "#4A1F30" }}
              aria-hidden="true"
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
