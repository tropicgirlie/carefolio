// Carefolio editorial typography primitives.
//
// Layer 4 of the design system (brand variants on top of shadcn). Use these
// across journey pages so the rhythm stays consistent: small caps eyebrow,
// Fraunces display heading, Inter prose, ink-soft body.

import type { ReactNode } from "react";

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`text-xs font-medium uppercase text-wine ${className}`}
      style={{ letterSpacing: "0.18em" }}
    >
      {children}
    </div>
  );
}

export function DisplayHeading({
  level = 1,
  size = "lg",
  children,
  className = "",
}: {
  level?: 1 | 2 | 3;
  size?: "xl" | "lg" | "md" | "sm";
  children: ReactNode;
  className?: string;
}) {
  const sizeClass =
    size === "xl"
      ? "text-4xl sm:text-6xl md:text-[5rem] md:leading-[1.02]"
      : size === "lg"
        ? "text-3xl sm:text-5xl md:text-[3.5rem] md:leading-[1.05]"
        : size === "md"
          ? "text-3xl sm:text-4xl"
          : "text-2xl sm:text-3xl";
  const Tag = (`h${level}`) as "h1" | "h2" | "h3";
  return (
    <Tag
      className={`font-display tracking-tight text-ink ${sizeClass} ${className}`}
      style={{ fontWeight: 500, letterSpacing: "-0.02em" }}
    >
      {children}
    </Tag>
  );
}

export function Prose({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`space-y-5 text-base leading-[1.7] text-ink-soft sm:text-lg ${className}`}
    >
      {children}
    </div>
  );
}

export function ProseLead({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-lg text-ink-soft sm:text-xl ${className}`}>
      {children}
    </p>
  );
}
