// Forside — V3 base (Swiss / minimal grid) with brand photos + Luma-direct links, fully responsive.
// Blend: V1 mint accent in the hero headline, V2-style larger speaker photos.
// SINGLE SOURCE OF TRUTH for the event: `EVENT` below. Changing it updates the hero tag,
// the countdown, the CTA section, the Luma links, and the embedded signup widget.
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";

import uiLogo from "@/assets/new-logo.png";

// Speakers
import kimRants from "@/assets/kim-rants.jpg";
import wernerValeur from "@/assets/werner-valeur.png";
import nikolajNyholm from "@/assets/nikolaj-nyholm.jpg";
import fazelMajed from "@/assets/fazel-profile.jpg";
import sophusVinterberg from "@/assets/sophus-profile.jpg";
import saxoAgdestein from "@/assets/saxo-profile.jpg";

// Testimonials
import lasseOsmann from "@/assets/lasse-profile.png";
import mathiasStreander from "@/assets/mathias-profile.jpg";

// Hero + community photos
import eventAudience from "@/assets/event-audience-1.jpg";
import community1 from "@/assets/community-networking-1.jpg";
import community2 from "@/assets/community-networking-2.jpg";
import eventPresentation from "@/assets/event-presentation-1.jpg";
import podcastRec1 from "@/assets/podcast-recording-1.jpg";
import podcastRec2 from "@/assets/podcast-recording-2.jpg";
import podcastStudio from "@/assets/podcast-studio.jpg";
import albert from "@/assets/albert-profile.jpg";

// =====================================================================
// EVENT — single source of truth. Change here and the whole page updates.
// =====================================================================
const EVENT = {
  start: "2026-06-03T17:00:00+02:00",
  end:   "2026-06-03T20:00:00+02:00",
  city: "København",
  attendees: 44,
  lumaUrl: "https://luma.com/kki9jrdw",
  lumaEmbedSrc: "https://luma.com/embed/event/evt-RWdxgbFwyb8fPKp/simple",
};

const CONTACT_EMAIL = "kontakt@ungeivaerksaettere.dk";
const SOCIALS = {
  instagram: "https://www.instagram.com/ivaerksaettere/",
  linkedin: "https://www.linkedin.com/company/74063868/",
  youtube: "https://www.youtube.com/@ungeiv%C3%A6rks%C3%A6ttere",
  tiktok: "https://www.tiktok.com/@ungeivaerksaettere",
  spotify: "https://open.spotify.com/show/154B6QakpSESlOKiFkiDyk",
};
const PODCAST = SOCIALS.spotify;
const LUMA_SIGNUP = EVENT.lumaUrl;
const EXT = { target: "_blank", rel: "noopener noreferrer" } as const;

// Derived display values from EVENT
const _pad2 = (n: number) => String(n).padStart(2, "0");
const _eventStart = new Date(EVENT.start);
const EVENT_TAG = `${EVENT.city.toUpperCase()} · ${_pad2(_eventStart.getDate())}.${_pad2(_eventStart.getMonth() + 1)}.${String(_eventStart.getFullYear()).slice(-2)}`;

const C = {
  darkGreen: "#118462",
  mint: "#18cb96",
  lightMint: "#bfe1d7",
  charcoal: "#373643",
  cream: "#f1ede8",
  white: "#ffffff",
};

function useIsMobile() {
  const [w, setW] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1440));
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return w < 820;
}

const innerStyle = (m: boolean): CSSProperties => ({ maxWidth: 1320, margin: "0 auto", padding: m ? "0 22px" : "0 56px" });
const h: CSSProperties = { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 500, letterSpacing: "-0.03em", color: C.charcoal, margin: 0 };
const label: CSSProperties = { fontFamily: "ui-monospace, monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: C.darkGreen };

const orbitCss = `
  .v3-orbit { transition: transform .45s cubic-bezier(.2,.8,.2,1), box-shadow .45s ease; will-change: transform; }
  .v3-orbit:hover { transform: scale(1.12); z-index: 5; box-shadow: 0 20px 50px rgba(17,132,98,.22); }
  .v3-link { transition: opacity .2s ease; }
  .v3-link:hover { opacity: .6; }
  @keyframes v3pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.35; transform: scale(1.4); } }
  .v3cta-btn { transition: transform .25s ease, box-shadow .25s ease; }
  .v3cta-btn:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(24,203,150,0.25); }
`;

const navItems = [
  { l: "Events", href: LUMA_SIGNUP },
  { l: "Teamet", href: LUMA_SIGNUP },
  { l: "Sponsorer", href: LUMA_SIGNUP },
  { l: "Podcast", href: PODCAST },
];

function Nav({ m }: { m: boolean }) {
  const [open, setOpen] = useState(false);
  const linkStyle: CSSProperties = { fontSize: 12, color: C.charcoal, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em" };
  const ctaStyle: CSSProperties = { ...linkStyle, color: C.darkGreen, fontWeight: 600 };
  return (
    <nav style={{ borderBottom: `1px solid ${C.charcoal}15`, padding: "16px 0", position: "relative", background: C.white }}>
      <div style={{ ...innerStyle(m), display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src={uiLogo} alt="Unge Iværksættere" style={{ height: 28, width: "auto", display: "block" }} />
        </Link>

        {!m && (
          <div style={{ display: "flex", alignItems: "center", gap: 32, fontFamily: "ui-monospace, monospace" }}>
            {navItems.map((i) => (
              <a key={i.l} href={i.href} {...EXT} className="v3-link" style={linkStyle}>{i.l}</a>
            ))}
            <a href={LUMA_SIGNUP} {...EXT} className="v3-link" style={ctaStyle}>Tilmeld →</a>
          </div>
        )}

        {m && (
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 6 }}
          >
            <span style={{ width: 22, height: 2, background: C.charcoal, display: "block" }} />
            <span style={{ width: 22, height: 2, background: C.charcoal, display: "block" }} />
            <span style={{ width: 22, height: 2, background: C.charcoal, display: "block" }} />
          </button>
        )}
      </div>

      {m && open && (
        <div style={{ borderTop: `1px solid ${C.charcoal}12`, padding: "14px 22px 18px", display: "flex", flexDirection: "column", gap: 16, fontFamily: "ui-monospace, monospace" }}>
          {navItems.map((i) => (
            <a key={i.l} href={i.href} {...EXT} onClick={() => setOpen(false)} style={linkStyle}>{i.l}</a>
          ))}
          <a href={LUMA_SIGNUP} {...EXT} onClick={() => setOpen(false)} style={ctaStyle}>Tilmeld →</a>
        </div>
      )}
    </nav>
  );
}

function Hero({ m }: { m: boolean }) {
  const btnBase: CSSProperties = { padding: "14px 20px", fontSize: 13, fontWeight: 500, cursor: "pointer", textAlign: "left", fontFamily: "ui-monospace, monospace", textTransform: "uppercase", letterSpacing: "0.1em", textDecoration: "none", display: "block" };
  return (
    <section style={{ padding: m ? "24px 0 0" : "40px 0 0" }}>
      <div style={innerStyle(m)}>
        <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: m ? 28 : 32, paddingBottom: m ? 32 : 48, borderBottom: `1px solid ${C.charcoal}15` }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: m ? "flex-start" : "space-between", gap: m ? 28 : 0, minHeight: m ? "auto" : 580, paddingRight: m ? 0 : 24, paddingTop: m ? 8 : 32, order: 1 }}>
            <div>
              <div style={{ ...label, marginBottom: m ? 24 : 40 }}>01 — Forside / Index</div>
              <h1 style={{ ...h, fontSize: m ? 52 : 104, lineHeight: 0.92, fontWeight: 400 }}>
                Unge<br />Iværk-<br />sættere<span style={{ color: C.mint }}>.</span>
              </h1>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: m ? 20 : 32, alignItems: m ? "start" : "end" }}>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: "#5a5962", margin: 0 }}>
                Vores events er stedet, hvor unge iværksættere mødes. Kom og få nye ideer, mød andre iværksættere og få inspiration fra erfarne iværksættere. Gratis deltagelse!
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <a href={LUMA_SIGNUP} {...EXT} style={{ ...btnBase, background: C.charcoal, color: "white", border: "none" }}>Næste event →</a>
                <a href={PODCAST} {...EXT} style={{ ...btnBase, background: "transparent", color: C.charcoal, border: `1px solid ${C.charcoal}30` }}>Lyt til podcast</a>
              </div>
            </div>
          </div>
          <div style={{ position: "relative", background: C.cream, minHeight: m ? 380 : 620, overflow: "hidden", order: m ? 0 : 2 }}>
            <img src={eventAudience} alt="Unge Iværksættere event" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", bottom: 16, right: 16, background: C.darkGreen, color: "white", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: C.mint, boxShadow: `0 0 0 3px ${C.mint}40` }} />
              <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>{EVENT_TAG}</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: m ? "column" : "row", alignItems: m ? "flex-start" : "center", justifyContent: "space-between", gap: m ? 6 : 0, padding: "18px 0", fontFamily: "ui-monospace, monospace", fontSize: 11, color: C.charcoal, opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          <span>Danmarks største frivillige fællesskab</span>
          <span>Est. 2022 · Aarhus & København</span>
          <span>Gratis deltagelse</span>
        </div>
      </div>
    </section>
  );
}

function Stats({ m }: { m: boolean }) {
  const stats = [
    { n: "3000+", l: "Deltagere" },
    { n: "50.000", l: "Podcast afspil." },
    { n: "30+", l: "Events afholdt" },
    { n: "12", l: "Speakers" },
  ];
  return (
    <section style={{ padding: m ? "56px 0" : "80px 0", background: C.darkGreen, color: "white" }}>
      <div style={innerStyle(m)}>
        <div style={{ display: "grid", gridTemplateColumns: m ? "1fr 1fr" : "repeat(4, 1fr)", rowGap: m ? 36 : 0, columnGap: m ? 24 : 0 }}>
          {stats.map((s, i) => {
            const divider = !m && i !== 0;
            return (
              <div key={s.l} style={{ borderLeft: divider ? "1px solid rgba(255,255,255,0.18)" : "none", paddingLeft: divider ? 32 : 0, paddingRight: m ? 0 : 32 }}>
                <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: C.mint, marginBottom: m ? 12 : 20 }}>0{i + 1}</div>
                <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: m ? 46 : 72, fontWeight: 400, color: "white", letterSpacing: "-0.04em", lineHeight: 0.9 }}>{s.n}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: m ? 10 : 16 }}>{s.l}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const circles = [
  { top: "2%", left: "3%", s: 200, tone: C.darkGreen, img: community1 },
  { top: "8%", left: "34%", s: 100, tone: C.mint, img: podcastRec2 },
  { top: "0%", right: "6%", s: 150, tone: C.lightMint, img: albert },
  { top: "50%", left: "0%", s: 130, tone: C.charcoal, img: community2 },
  { bottom: "4%", left: "24%", s: 110, tone: C.mint, img: podcastStudio },
  { top: "48%", right: "2%", s: 180, tone: C.darkGreen, img: eventPresentation },
  { bottom: "6%", right: "22%", s: 110, tone: C.lightMint, img: podcastRec1 },
];

function Community({ m }: { m: boolean }) {
  const textBlock = (
    <div style={{ textAlign: "center", maxWidth: 500, margin: "0 auto", pointerEvents: "auto" }}>
      <div style={{ ...label, marginBottom: 20 }}>§ 02 — Community</div>
      <h2 style={{ ...h, fontSize: m ? 34 : 56, lineHeight: 1 }}>
        Et fællesskab<br />der bygges<br />sammen.
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.65, color: "#5a5962", margin: "20px auto 0", maxWidth: 420 }}>
        Se hvordan danske iværksættere samles, lærer og vokser sammen gennem vores events og podcast.
      </p>
      <a href={LUMA_SIGNUP} {...EXT} className="v3-link" style={{ display: "inline-block", marginTop: 24, fontFamily: "ui-monospace, monospace", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", color: C.darkGreen, textDecoration: "none", borderBottom: `1px solid ${C.darkGreen}`, paddingBottom: 4 }}>
        Bliv en del af det →
      </a>
    </div>
  );

  if (m) {
    return (
      <section style={{ padding: "64px 0" }}>
        <div style={innerStyle(m)}>
          {textBlock}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 40 }}>
            {circles.map((c, i) => (
              <div key={i} style={{ aspectRatio: "1 / 1", borderRadius: 999, overflow: "hidden", background: c.tone }}>
                <img src={c.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: "120px 0" }}>
      <div style={{ ...innerStyle(m), position: "relative", height: 660 }}>
        {circles.map((c, i) => (
          <div
            key={i}
            className="v3-orbit"
            style={{ position: "absolute", top: c.top, left: c.left, right: c.right, bottom: c.bottom, width: c.s, height: c.s, borderRadius: 999, overflow: "hidden", background: c.tone, cursor: "pointer", boxShadow: "0 2px 10px rgba(55,54,67,0.10)" }}
          >
            <img src={c.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        ))}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          {textBlock}
        </div>
      </div>
    </section>
  );
}

function Speakers({ m }: { m: boolean }) {
  const speakers = [
    { n: "Kim Rants", r: "Co-founder & CEO, Alice.tech", img: kimRants },
    { n: "Werner Valeur", r: "Serie Iværksætter · 10+ firmaer", img: wernerValeur },
    { n: "Nikolaj Nyholm", r: "Partner, Sunstone Capital", img: nikolajNyholm },
    { n: "Fazel Majed", r: "Forbes 30 Under 30", img: fazelMajed },
    { n: "Sophus Vinterberg", r: "Founder & CEO, House of Vinterberg", img: sophusVinterberg },
    { n: "Saxo Agdestein", r: "Founder, Handyhand & HappyHelper", img: saxoAgdestein },
  ];
  const cols = m ? 1 : 3;
  return (
    <section style={{ padding: m ? "64px 0" : "100px 0", borderTop: `1px solid ${C.charcoal}15` }}>
      <div style={innerStyle(m)}>
        <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 2fr", gap: m ? 16 : 48, marginBottom: m ? 32 : 56 }}>
          <div>
            <div style={{ ...label, marginBottom: 16 }}>§ 03 — Speakers</div>
            <h2 style={{ ...h, fontSize: m ? 32 : 48, lineHeight: 1 }}>Lær af Danmarks bedste.</h2>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: "#5a5962", maxWidth: 480, margin: 0, alignSelf: "end" }}>
            Mød erfarne iværksættere og investorer der har bygget, skaleret og exit'et. Alle speakers er håndplukkede af teamet.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(3, 1fr)", borderTop: `1px solid ${C.charcoal}15` }}>
          {speakers.map((sp, i) => {
            const rightBorder = !m && (i + 1) % cols !== 0;
            return (
              <div key={sp.n} style={{ padding: "28px 24px", borderBottom: `1px solid ${C.charcoal}15`, borderRight: rightBorder ? `1px solid ${C.charcoal}15` : "none" }}>
                <div style={{ width: "100%", aspectRatio: "1 / 1", maxWidth: m ? 320 : "none", overflow: "hidden", background: C.cream, marginBottom: 20 }}>
                  <img src={sp.img} alt={sp.n} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(1)" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 22, fontWeight: 500, letterSpacing: "-0.01em" }}>{sp.n}</div>
                  <div style={{ ...label, fontSize: 10, color: `${C.charcoal}80` }}>0{i + 1} / 06</div>
                </div>
                <div style={{ fontSize: 13, color: "#6a6972", marginTop: 6 }}>{sp.r}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials({ m }: { m: boolean }) {
  const t = [
    { q: "Unge Iværksættere har givet mig det netværk og de insights, jeg havde brug for til at tage mit startup til næste niveau.", n: "Lasse Osmann", r: "Startup Founder", img: lasseOsmann },
    { q: "Fantastisk community med unge iværksættere der virkelig forstår udfordringerne ved at starte og drive en virksomhed.", n: "Mathias Streander", r: "Coach", img: mathiasStreander },
  ];
  return (
    <section style={{ padding: m ? "64px 0" : "120px 0", background: C.cream }}>
      <div style={innerStyle(m)}>
        <div style={{ ...label, marginBottom: m ? 28 : 40 }}>§ 04 — Testimonials</div>
        <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: m ? 36 : 64 }}>
          {t.map((x, i) => (
            <div key={i} style={{ borderTop: `2px solid ${C.charcoal}`, paddingTop: 32 }}>
              <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: m ? 22 : 28, lineHeight: 1.35, letterSpacing: "-0.015em", fontWeight: 400 }}>"{x.q}"</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 28 }}>
                <img src={x.img} alt={x.n} style={{ width: 44, height: 44, borderRadius: 999, objectFit: "cover", display: "block" }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{x.n}</div>
                  <div style={{ fontSize: 12, color: "#6a6972" }}>{x.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA({ m }: { m: boolean }) {
  const startTs = useMemo(() => new Date(EVENT.start).getTime(), []);
  const endTs = useMemo(() => new Date(EVENT.end).getTime(), []);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const status: "upcoming" | "live" | "past" =
    now < startTs ? "upcoming" : now < endTs ? "live" : "past";

  // Countdown: if upcoming -> to start; if live -> to end; if past -> zeros (and we hide it)
  const countdownTarget = status === "live" ? endTs : startTs;
  const diff = Math.max(0, countdownTarget - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");

  const dateLabel = useMemo(() => {
    const d = new Date(EVENT.start);
    return `${pad(d.getDate())} · ${pad(d.getMonth() + 1)} · ${String(d.getFullYear()).slice(-2)} · ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }, []);

  const statusBadge =
    status === "live" ? `LIVE NU · ${EVENT.city.toUpperCase()}` :
    status === "past" ? "EVENT AFSLUTTET" :
    `§ 05 — Næste event · ${EVENT.city}`;
  const statusColor = status === "past" ? "rgba(255,255,255,0.45)" : C.mint;

  const cell: CSSProperties = { fontFamily: '"Space Grotesk", sans-serif', fontSize: m ? 34 : 48, fontWeight: 400, color: "white", letterSpacing: "-0.03em", lineHeight: 0.9, fontVariantNumeric: "tabular-nums" };
  const cellLabel: CSSProperties = { fontFamily: "ui-monospace, monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)", marginTop: 10 };

  return (
    <section style={{ background: C.charcoal, color: "white", position: "relative" }}>
      <div style={{ ...innerStyle(m), position: "relative", padding: m ? "64px 22px" : "96px 56px" }}>
        <div style={{ display: "flex", flexDirection: m ? "column" : "row", justifyContent: "space-between", alignItems: "flex-start", gap: m ? 8 : 0, marginBottom: m ? 28 : 40 }}>
          <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: statusColor, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: statusColor, display: "inline-block", animation: "v3pulse 1.6s ease-in-out infinite" }} />
            {statusBadge}
          </div>
          <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)" }}>
            {dateLabel}
          </div>
        </div>

        <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: m ? 42 : 84, lineHeight: 0.95, fontWeight: 400, letterSpacing: "-0.04em", color: "white", margin: 0, marginBottom: m ? 36 : 56, maxWidth: 900 }}>
          {status === "live" ? (<>Live nu i<br /><span style={{ color: C.mint }}>{EVENT.city}.</span></>) :
           status === "past" ? (<>Event<br /><span style={{ color: C.mint }}>afsluttet.</span></>) :
           (<>Klar til at<br /><span style={{ color: C.mint }}>komme med?</span></>)}
        </h2>

        {status !== "past" && (
          <div style={{ display: "grid", gridTemplateColumns: m ? "repeat(2, 1fr)" : "repeat(4, 1fr)", rowGap: m ? 24 : 0, borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 28, marginBottom: 40 }}>
            {[
              { n: days, l: "Dage" },
              { n: hours, l: "Timer" },
              { n: mins, l: "Minutter" },
              { n: secs, l: "Sekunder" },
            ].map((c, i) => {
              const divider = !m && i !== 0;
              return (
                <div key={c.l} style={{ borderLeft: divider ? "1px solid rgba(255,255,255,0.12)" : "none", paddingLeft: divider ? 32 : 0 }}>
                  <div style={cell}>{pad(c.n)}</div>
                  <div style={cellLabel}>{c.l}{status === "live" && i === 0 ? "" : ""}</div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: m ? 28 : 48, alignItems: "stretch", borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
            <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: C.mint, textTransform: "uppercase", letterSpacing: "0.18em" }}>
              Deltagere tilmeldt
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
              <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: m ? 64 : 96, fontWeight: 400, color: "white", letterSpacing: "-0.04em", lineHeight: 0.9, fontVariantNumeric: "tabular-nums" }}>
                {EVENT.attendees}
              </span>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.55)" }}>tilmeldt nu</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: "rgba(255,255,255,0.7)", margin: 0, maxWidth: 380 }}>
              {status === "live"
                ? `Eventet er i gang i ${EVENT.city} lige nu. Tilmeld dig stadig og kom forbi.`
                : status === "past"
                ? "Eventet er afsluttet. Hold øje med næste."
                : `Tilmeld dig næste event i ${EVENT.city}. Gratis · ingen binding.`}
            </p>
            <a href={EVENT.lumaUrl} {...EXT} className="v3cta-btn" style={{ padding: "16px 22px", background: C.mint, color: C.charcoal, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", textAlign: "left", fontFamily: "ui-monospace, monospace", textTransform: "uppercase", letterSpacing: "0.12em", display: "inline-flex", justifyContent: "space-between", alignItems: "center", textDecoration: "none", gap: 16, width: m ? "100%" : "fit-content" }}>
              <span>{status === "past" ? "Se kommende events" : "Reserver min plads"}</span>
              <span style={{ fontSize: 18 }}>→</span>
            </a>
          </div>
          <div style={{ background: C.white, borderRadius: 6, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", minHeight: 480 }}>
            <iframe
              src={EVENT.lumaEmbedSrc}
              title={`Tilmeld ${EVENT.city}`}
              style={{ width: "100%", height: m ? 460 : 480, border: "none", display: "block" }}
              allow="fullscreen; payment"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter({ m }: { m: boolean }) {
  const sider: { l: string; to?: string; href?: string }[] = [
    { l: "Forside", to: "/" },
    { l: "Events", href: LUMA_SIGNUP },
    { l: "Mød Teamet", href: LUMA_SIGNUP },
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
            <a href={LUMA_SIGNUP} {...EXT} className="v3-link" style={colItem}>Bliv sponsor</a>
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

export default function ForsideV3() {
  const m = useIsMobile();
  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: C.white, color: C.charcoal, width: "100%", overflowX: "hidden" }}>
      <style>{orbitCss}</style>
      <Nav m={m} />
      <Hero m={m} />
      <Stats m={m} />
      <Community m={m} />
      <Speakers m={m} />
      <Testimonials m={m} />
      <CTA m={m} />
      <SiteFooter m={m} />
    </div>
  );
}
