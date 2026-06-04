// V3 shared chrome — Nav, Footer, theme, config, hooks. Imported by every V3 page.
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import uiLogo from "@/assets/new-logo.png";

// =====================================================================
// EVENT — single source of truth for the next event.
// Change here and the homepage hero tag, countdown, CTA, and Luma links update.
// =====================================================================
export const EVENT = {
  start: "2026-06-03T17:00:00+02:00",
  end:   "2026-06-03T20:00:00+02:00",
  city: "København",
  attendees: 44,
  lumaUrl: "https://luma.com/kki9jrdw",
  lumaEmbedSrc: "https://luma.com/embed/event/evt-RWdxgbFwyb8fPKp/simple",
};

export const CONTACT_EMAIL = "kontakt@ungeivaerksaettere.dk";
export const SOCIALS = {
  instagram: "https://www.instagram.com/ivaerksaettere/",
  linkedin: "https://www.linkedin.com/company/74063868/",
  youtube: "https://www.youtube.com/@ungeiv%C3%A6rks%C3%A6ttere",
  tiktok: "https://www.tiktok.com/@ungeivaerksaettere",
  spotify: "https://open.spotify.com/show/154B6QakpSESlOKiFkiDyk",
};
export const PODCAST = SOCIALS.spotify;
export const LUMA_SIGNUP = EVENT.lumaUrl;
// TODO(real data): confirm the real Skool community URL with the team.
export const SKOOL_URL = "https://www.skool.com/unge-ivaerksaettere";
export const EXT = { target: "_blank", rel: "noopener noreferrer" } as const;

const _pad2 = (n: number) => String(n).padStart(2, "0");
const _eventStart = new Date(EVENT.start);
export const EVENT_TAG = `${EVENT.city.toUpperCase()} · ${_pad2(_eventStart.getDate())}.${_pad2(_eventStart.getMonth() + 1)}.${String(_eventStart.getFullYear()).slice(-2)}`;

// Theme
export const C = {
  darkGreen: "#118462",
  mint: "#18cb96",
  lightMint: "#bfe1d7",
  charcoal: "#373643",
  cream: "#f1ede8",
  white: "#ffffff",
};

export function useIsMobile() {
  const [w, setW] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1440));
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return w < 820;
}

export const innerStyle = (m: boolean): CSSProperties => ({ maxWidth: 1320, margin: "0 auto", padding: m ? "0 22px" : "0 56px" });
export const headingStyle: CSSProperties = { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 500, letterSpacing: "-0.03em", color: C.charcoal, margin: 0 };
export const labelStyle: CSSProperties = { fontFamily: "ui-monospace, monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: C.darkGreen };

export const sharedCss = `
  .v3-orbit { transition: transform .45s cubic-bezier(.2,.8,.2,1), box-shadow .45s ease; will-change: transform; }
  .v3-orbit:hover { transform: scale(1.12); z-index: 5; box-shadow: 0 20px 50px rgba(17,132,98,.22); }
  .v3-link { transition: opacity .2s ease; }
  .v3-link:hover { opacity: .6; }
  @keyframes v3pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.35; transform: scale(1.4); } }
  .v3cta-btn { transition: transform .25s ease, box-shadow .25s ease; }
  .v3cta-btn:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(24,203,150,0.25); }
`;

type NavItem = { l: string; to?: string; href?: string };
const navItems: NavItem[] = [
  { l: "Events", href: LUMA_SIGNUP },
  { l: "Teamet", to: "/med-teamet" },
  { l: "Sponsorer", to: "/vores-sponsorer" },
  { l: "Podcast", href: PODCAST },
];

export function SiteNav({ m }: { m: boolean }) {
  const [open, setOpen] = useState(false);
  const linkStyle: CSSProperties = { fontSize: 12, color: C.charcoal, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em" };
  const ctaStyle: CSSProperties = { ...linkStyle, color: C.darkGreen, fontWeight: 600 };

  const renderItem = (i: NavItem, mobile: boolean) =>
    i.to
      ? <Link key={i.l} to={i.to} className="v3-link" style={linkStyle} onClick={() => mobile && setOpen(false)}>{i.l}</Link>
      : <a key={i.l} href={i.href} {...EXT} className="v3-link" style={linkStyle} onClick={() => mobile && setOpen(false)}>{i.l}</a>;

  return (
    <nav style={{ borderBottom: `1px solid ${C.charcoal}15`, padding: "16px 0", position: "relative", background: C.white }}>
      <div style={{ ...innerStyle(m), display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src={uiLogo} alt="Unge Iværksættere" style={{ height: 28, width: "auto", display: "block" }} />
        </Link>

        {!m && (
          <div style={{ display: "flex", alignItems: "center", gap: 32, fontFamily: "ui-monospace, monospace" }}>
            {navItems.map((i) => renderItem(i, false))}
            <Link to="/tilmeld" className="v3-link" style={ctaStyle}>Tilmeld →</Link>
          </div>
        )}

        {m && (
          <button aria-label="Menu" onClick={() => setOpen((v) => !v)} style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 6 }}>
            <span style={{ width: 22, height: 2, background: C.charcoal, display: "block" }} />
            <span style={{ width: 22, height: 2, background: C.charcoal, display: "block" }} />
            <span style={{ width: 22, height: 2, background: C.charcoal, display: "block" }} />
          </button>
        )}
      </div>

      {m && open && (
        <div style={{ borderTop: `1px solid ${C.charcoal}12`, padding: "14px 22px 18px", display: "flex", flexDirection: "column", gap: 16, fontFamily: "ui-monospace, monospace" }}>
          {navItems.map((i) => renderItem(i, true))}
          <Link to="/tilmeld" onClick={() => setOpen(false)} style={ctaStyle}>Tilmeld →</Link>
        </div>
      )}
    </nav>
  );
}

export function SiteFooter({ m }: { m: boolean }) {
  const sider: { l: string; to?: string; href?: string }[] = [
    { l: "Forside", to: "/" },
    { l: "Events", href: LUMA_SIGNUP },
    { l: "Mød Teamet", to: "/med-teamet" },
    { l: "Vores Sponsorer", to: "/vores-sponsorer" },
    { l: "Podcast", href: PODCAST },
  ];
  const links = [
    { l: "Instagram", href: SOCIALS.instagram },
    { l: "LinkedIn", href: SOCIALS.linkedin },
    { l: "YouTube", href: SOCIALS.youtube },
    { l: "TikTok", href: SOCIALS.tiktok },
    { l: "Spotify", href: SOCIALS.spotify },
  ];
  const colHead: CSSProperties = { fontFamily: "ui-monospace, monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600, color: C.mint, marginBottom: 16 };
  const colItem: CSSProperties = { display: "block", fontSize: 13, opacity: 0.75, marginBottom: 10, color: "white", textDecoration: "none" };
  return (
    <footer style={{ background: C.charcoal, color: "white", padding: m ? "56px 0 32px" : "72px 0 36px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
      <div style={innerStyle(m)}>
        <div style={{ display: "grid", gridTemplateColumns: m ? "1fr 1fr" : "1.4fr 1fr 1fr 1fr", gap: m ? 28 : 40, marginBottom: m ? 40 : 56 }}>
          <div style={{ gridColumn: m ? "1 / -1" : "auto" }}>
            <Link to="/" style={{ display: "inline-block", marginBottom: 18 }}>
              <img src={uiLogo} alt="Unge Iværksættere" style={{ height: 30, width: "auto", display: "block", filter: "brightness(0) invert(1)" }} />
            </Link>
            <p style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.55, maxWidth: 300 }}>
              Danmarks største frivillige fællesskab for unge iværksættere.
            </p>
          </div>
          <div>
            <div style={colHead}>Sider</div>
            {sider.map((s) => s.to
              ? (<Link key={s.l} to={s.to} className="v3-link" style={colItem}>{s.l}</Link>)
              : (<a key={s.l} href={s.href} {...EXT} className="v3-link" style={colItem}>{s.l}</a>))}
          </div>
          <div>
            <div style={colHead}>Links</div>
            {links.map((s) => (<a key={s.l} href={s.href} {...EXT} className="v3-link" style={colItem}>{s.l}</a>))}
          </div>
          <div>
            <div style={colHead}>Kontakt</div>
            <a href={`mailto:${CONTACT_EMAIL}`} className="v3-link" style={colItem}>{CONTACT_EMAIL}</a>
            <span style={{ ...colItem, opacity: 0.55 }}>Aarhus & København</span>
            <Link to="/vores-sponsorer" className="v3-link" style={colItem}>Bliv sponsor</Link>
            <a href={`mailto:${CONTACT_EMAIL}?subject=Bliv frivillig`} className="v3-link" style={colItem}>Bliv frivillig</a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, display: "flex", flexDirection: m ? "column" : "row", justifyContent: "space-between", gap: m ? 8 : 0, fontFamily: "ui-monospace, monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em", opacity: 0.5 }}>
          <span>© 2026 Unge Iværksættere · CVR 42644606</span>
          <span>Made in DK</span>
        </div>
      </div>
    </footer>
  );
}

export function V3Page({ children }: { children: ReactNode }) {
  const m = useIsMobile();
  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: C.white, color: C.charcoal, width: "100%", overflowX: "hidden" }}>
      <style>{sharedCss}</style>
      <SiteNav m={m} />
      <main>{children}</main>
      <SiteFooter m={m} />
    </div>
  );
}

// Shared FAQs — keep them in sync across pages by editing here only.
export const SHARED_FAQS = [
  { q: "Hvad er Unge Iværksættere?", a: "Danmarks største frivillige fællesskab for unge iværksættere med henblik på at gøre iværksætteri mere tilgængeligt og give fremtidens iværksættere de bedste kort på hånden." },
  { q: "Hvem kan deltage i jeres events?", a: "Alle interesserede i iværksætteri kan deltage i vores events — både erfarne iværksættere og dem der overvejer at starte deres første startup." },
  { q: "Koster det noget at deltage?", a: "Alle vores events er gratis for deltagerne. Vi tror på at gøre iværksætteri tilgængeligt for alle." },
  { q: "Hvor afholdes jeres events?", a: "Vi holder events i København og Aarhus samt virtuelle webinarer så alle kan deltage." },
  { q: "Kan jeg blive speaker på jeres events?", a: "Absolut. Vi er altid på udkig efter inspirerende speakers. Kontakt os på kontakt@ungeivaerksaettere.dk med dit forslag og vi vender tilbage hurtigst muligt." },
  { q: "Hvordan kan min virksomhed blive sponsor?", a: "Vi samarbejder med virksomheder der støtter startup-økosystemet. Kontakt os på kontakt@ungeivaerksaettere.dk for at høre om sponsormuligheder og partnerskaber." },
];

export function V3Loading() {
  return (
    <div style={{ position: "fixed", inset: 0, background: C.white, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, fontFamily: "Inter, system-ui, sans-serif" }}>
      <style>{`
        @keyframes v3LoadBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
        @keyframes v3LoadPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(0.96); }
        }
        @keyframes v3DotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.5); }
        }
      `}</style>

      {/* Indeterminate progress bar — top edge */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `${C.charcoal}10`, overflow: "hidden" }}>
        <div style={{ height: "100%", width: "40%", background: C.mint, animation: "v3LoadBar 1.5s ease-in-out infinite" }} />
      </div>

      {/* Centered logo + label */}
      <div style={{ textAlign: "center" }}>
        <img
          src={uiLogo}
          alt="Unge Iværksættere"
          style={{ height: 44, width: "auto", margin: "0 auto", display: "block", animation: "v3LoadPulse 1.4s ease-in-out infinite" }}
        />
        <div style={{ marginTop: 28, fontFamily: "ui-monospace, monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: C.darkGreen, display: "inline-flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: C.mint, animation: "v3DotPulse 1s ease-in-out infinite" }} />
          Indlæser
        </div>
      </div>
    </div>
  );
}

export function V3FAQ({ m, faqs, sectionLabel }: { m: boolean; faqs?: { q: string; a: string }[]; sectionLabel?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const items = faqs ?? SHARED_FAQS;
  return (
    <section style={{ padding: m ? "64px 0" : "100px 0", borderTop: `1px solid ${C.charcoal}15` }}>
      <div style={innerStyle(m)}>
        <div style={{ ...labelStyle, marginBottom: m ? 28 : 40 }}>{sectionLabel ?? "§ FAQ — Ofte stillede spørgsmål"}</div>
        <h2 style={{ ...headingStyle, fontSize: m ? 32 : 48, marginBottom: m ? 36 : 56, lineHeight: 1.02 }}>Spørgsmål?</h2>
        <div style={{ borderTop: `1px solid ${C.charcoal}15` }}>
          {items.map((f, i) => (
            <div key={i} style={{ borderBottom: `1px solid ${C.charcoal}15` }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ display: "flex", width: "100%", padding: m ? "20px 0" : "26px 0", background: "transparent", border: "none", cursor: "pointer", justifyContent: "space-between", alignItems: "center", textAlign: "left", gap: 24 }}
              >
                <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: m ? 17 : 22, fontWeight: 500, letterSpacing: "-0.01em", color: C.charcoal, flex: 1 }}>{f.q}</span>
                <span style={{ fontSize: 22, color: C.darkGreen, fontFamily: "ui-monospace, monospace", lineHeight: 1, transition: "transform .2s ease", transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
              </button>
              {open === i && (
                <div style={{ paddingBottom: m ? 24 : 32, fontSize: 15, lineHeight: 1.65, color: "#5a5962", maxWidth: 760 }}>{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Generic V3 hero with monospace section label + headline + intro
export function V3Hero({ m, label, title, accentWord, intro }: { m: boolean; label: string; title: string; accentWord?: string; intro?: string }) {
  let displayTitle: ReactNode = title;
  if (accentWord && title.includes(accentWord)) {
    const parts = title.split(accentWord);
    displayTitle = (
      <>
        {parts[0]}
        <span style={{ color: C.mint }}>{accentWord}</span>
        {parts[1]}
      </>
    );
  }
  return (
    <section style={{ padding: m ? "32px 0 48px" : "64px 0 80px", borderBottom: `1px solid ${C.charcoal}15` }}>
      <div style={innerStyle(m)}>
        <div style={{ ...labelStyle, marginBottom: m ? 20 : 32 }}>{label}</div>
        <h1 style={{ ...headingStyle, fontSize: m ? 56 : 96, lineHeight: 0.95, fontWeight: 400 }}>
          {displayTitle}
        </h1>
        {intro && (
          <p style={{ fontSize: m ? 16 : 18, lineHeight: 1.55, color: "#5a5962", marginTop: m ? 24 : 36, maxWidth: 680 }}>
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

// Dark CTA section — reusable across pages
export function V3CTASection({ m, label, title, accent, body, primary, secondary }: {
  m: boolean;
  label: string;
  title: string;
  accent?: string;
  body?: string;
  primary?: { href: string; text: string; external?: boolean };
  secondary?: { href: string; text: string; external?: boolean };
}) {
  return (
    <section style={{ background: C.charcoal, color: "white" }}>
      <div style={{ ...innerStyle(m), padding: m ? "64px 22px" : "96px 56px" }}>
        <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: C.mint, marginBottom: m ? 24 : 32 }}>{label}</div>
        <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: m ? 42 : 76, lineHeight: 0.95, fontWeight: 400, letterSpacing: "-0.04em", color: "white", margin: 0, marginBottom: m ? 24 : 36, maxWidth: 900 }}>
          {accent && title.includes(accent) ? (
            <>
              {title.split(accent)[0]}<span style={{ color: C.mint }}>{accent}</span>{title.split(accent)[1]}
            </>
          ) : title}
        </h2>
        {body && (
          <p style={{ fontSize: m ? 16 : 18, lineHeight: 1.55, color: "rgba(255,255,255,0.75)", margin: 0, marginBottom: m ? 32 : 40, maxWidth: 640 }}>{body}</p>
        )}
        <div style={{ display: "flex", flexDirection: m ? "column" : "row", gap: 12 }}>
          {primary && (
            primary.external
              ? <a href={primary.href} {...EXT} className="v3cta-btn" style={ctaBtn(C.mint, C.charcoal, m)}>{primary.text} <span style={{ marginLeft: 14 }}>→</span></a>
              : <Link to={primary.href} className="v3cta-btn" style={ctaBtn(C.mint, C.charcoal, m)}>{primary.text} <span style={{ marginLeft: 14 }}>→</span></Link>
          )}
          {secondary && (
            secondary.external
              ? <a href={secondary.href} {...EXT} style={ctaBtnOutline(m)}>{secondary.text}</a>
              : <Link to={secondary.href} style={ctaBtnOutline(m)}>{secondary.text}</Link>
          )}
        </div>
      </div>
    </section>
  );
}

function ctaBtn(bg: string, fg: string, _m: boolean): CSSProperties {
  return { padding: "18px 24px", background: bg, color: fg, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", textAlign: "left", fontFamily: "ui-monospace, monospace", textTransform: "uppercase", letterSpacing: "0.12em", display: "inline-flex", alignItems: "center", textDecoration: "none" };
}
function ctaBtnOutline(_m: boolean): CSSProperties {
  return { padding: "18px 24px", background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.3)", fontSize: 13, fontWeight: 500, cursor: "pointer", textAlign: "left", fontFamily: "ui-monospace, monospace", textTransform: "uppercase", letterSpacing: "0.12em", display: "inline-flex", alignItems: "center", textDecoration: "none" };
}
