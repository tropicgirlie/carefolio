// Footer.
//
// Three-column layout: brand + the journey-pivot nav links + the Sunday
// letter CTA. Privacy / data governance / compliance buttons are gone
// (the site does not need them, and they were sending visitors into
// regulatory copy that does not belong on an editorial publication).
// MomOps/RemoteShe ecosystem widget is also gone for the same reason.
//
// Refactored to use shared typography primitives and design tokens
// instead of inline styles where possible.

import { ExternalLink, Mail } from "lucide-react";
import { CarefolioMark } from "./branding/CarefolioMark";

const SERIF = "'Fraunces', Georgia, 'Times New Roman', serif";

function CarefolioWordmark({ size = "20px" }: { size?: string }) {
  return (
    <span
      style={{
        color: "#1A1410",
        fontFamily: SERIF,
        fontSize: size,
        letterSpacing: "-0.015em",
        lineHeight: 1,
      }}
    >
      <span style={{ fontWeight: 600 }}>Care</span>
      <span style={{ fontWeight: 400 }}>folio</span>
    </span>
  );
}

interface FooterProps {
  // These exist for compatibility with MainLayout's existing prop bundle.
  // The footer no longer uses the legacy navigation handlers.
  onNavigateToAbout?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToInsights?: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToPrivacyPolicy?: () => void;
  onNavigateToDataGovernance?: () => void;
  onNavigateToCompliance?: () => void;
  onNavigateToWorkThatWorks?: () => void;
}

export function Footer(_props: FooterProps) {
  const handleNewsletter = () =>
    window.open("https://carefolio.beehiiv.com/", "_blank");
  const handleContact = () =>
    window.open("mailto:info@carefolio.io", "_blank");

  return (
    <footer style={{ backgroundColor: "#EFE5D0", borderTop: "1px solid #E1D5BF" }}>
      <div className="container py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ─── Brand column ──────────────────────────────────────────── */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <CarefolioMark size={32} />
              <CarefolioWordmark size="22px" />
            </div>

            <p className="leading-relaxed mb-4" style={{ color: "#3F352D" }}>
              A working notebook for learning to invest. Field notes from a
              senior product designer in Dublin.
            </p>

            <p className="text-xs" style={{ color: "#7A6B5C" }}>
              Carefolio is a research from{" "}
              <a
                href="https://luana.systems"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: "#4A1F30" }}
              >
                luana.systems
              </a>
              , the design and product practice it grew out of.
            </p>
          </div>

          {/* ─── Read column ──────────────────────────────────────────── */}
          <div>
            <h4
              className="text-lg mb-4"
              style={{
                color: "#1A1410",
                fontFamily: SERIF,
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              Read
            </h4>
            <nav className="space-y-3">
              <FooterLink href="/journal">Journal</FooterLink>
              <FooterLink href="/method">Method</FooterLink>
              <FooterLink href="/brokers">Brokers</FooterLink>
              <FooterLink href="/research">Research</FooterLink>
              <FooterLink href="/about">About</FooterLink>
            </nav>
          </div>

          {/* ─── Connect column ───────────────────────────────────────── */}
          <div>
            <h4
              className="text-lg mb-4"
              style={{
                color: "#1A1410",
                fontFamily: SERIF,
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              Connect
            </h4>
            <nav className="space-y-3">
              <button
                onClick={handleNewsletter}
                className="inline-flex items-center gap-2 rounded-full px-5 h-10 text-sm font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#1A1410", color: "white" }}
              >
                <Mail className="w-4 h-4" />
                Sunday letter
              </button>

              <FooterLinkButton onClick={handleContact} icon={<Mail className="w-4 h-4" />}>
                info@carefolio.io
              </FooterLinkButton>

              <FooterLink
                href="https://github.com/tropicgirlie/care-score"
                external
                icon={<ExternalLink className="w-3.5 h-3.5" />}
              >
                Methodology source
              </FooterLink>

              <FooterLink
                href="https://blog.luana.systems"
                external
                icon={<ExternalLink className="w-3.5 h-3.5" />}
              >
                blog.luana.systems
              </FooterLink>
            </nav>
          </div>
        </div>

        {/* ─── Bottom strip ─────────────────────────────────────────── */}
        <div
          className="mt-12 pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm"
          style={{ borderTop: "1px solid #E1D5BF", color: "#7A6B5C" }}
        >
          <p>
            <CarefolioWordmark size="14px" /> is a working notebook, not
            financial advice. © 2026.
          </p>
          <a
            href="https://luana.systems"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs hover:underline"
            style={{ color: "#7A6B5C" }}
          >
            made by luana.systems
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────────────────  Helpers  ──────────────────────────────── */

function FooterLink({
  href,
  children,
  external = false,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-1.5 transition-colors duration-200"
      style={{ color: "#3F352D" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#4A1F30")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#3F352D")}
    >
      {children}
      {icon}
    </a>
  );
}

function FooterLinkButton({
  onClick,
  children,
  icon,
}: {
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 transition-colors duration-200"
      style={{ color: "#3F352D" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#4A1F30")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#3F352D")}
    >
      {icon}
      {children}
    </button>
  );
}
