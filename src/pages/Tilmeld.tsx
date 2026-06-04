// Tilmeld — V3 landing page that funnels visitors to the Skool community.
import { type CSSProperties } from "react";
import {
  C, EXT, SKOOL_URL, LUMA_SIGNUP, innerStyle, headingStyle as h, labelStyle as label,
  useIsMobile, sharedCss, SiteNav, SiteFooter, V3Hero, V3FAQ,
} from "@/components/forside/v3-shared";

const perks = [
  { n: "Daglig adgang",     d: "Få adgang til 3000+ unge iværksættere fra hele Danmark, dag og nat." },
  { n: "Eksklusivt content", d: "Templates, frameworks, interviews og masterclasses — kun for medlemmer." },
  { n: "Find dit team",     d: "Co-founders, mentorer og partnere finder hinanden inde i fællesskabet." },
  { n: "100% gratis",        d: "Ingen binding, ingen betaling. Bare unge der bygger sammen." },
];

const btnFilled = (bg: string, fg: string): CSSProperties => ({
  padding: "18px 28px", background: bg, color: fg, border: "none", fontSize: 14,
  fontWeight: 600, cursor: "pointer", textAlign: "left", fontFamily: "ui-monospace, monospace",
  textTransform: "uppercase", letterSpacing: "0.12em", display: "inline-flex", alignItems: "center", textDecoration: "none",
});
const btnOutline = (color: string): CSSProperties => ({
  padding: "18px 28px", background: "transparent", color, border: `1px solid ${color}30`, fontSize: 14,
  fontWeight: 500, cursor: "pointer", textAlign: "left", fontFamily: "ui-monospace, monospace",
  textTransform: "uppercase", letterSpacing: "0.12em", display: "inline-flex", alignItems: "center", textDecoration: "none",
});

export default function Tilmeld() {
  const m = useIsMobile();
  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: C.white, color: C.charcoal, width: "100%", overflowX: "hidden" }}>
      <style>{sharedCss}</style>
      <SiteNav m={m} />

      <V3Hero
        m={m}
        label="§ 02 — Tilmeld"
        title="Bliv en del af fællesskabet."
        accentWord="fællesskabet."
        intro="Vi er flyttet ind på Skool — Danmarks mest aktive online-fællesskab for unge iværksættere. 100% gratis, ingen binding, intet pjat."
      />

      {/* Primary CTA — Skool */}
      <section style={{ padding: m ? "56px 0" : "80px 0", background: C.darkGreen, color: "white" }}>
        <div style={innerStyle(m)}>
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1.4fr 1fr", gap: m ? 28 : 48, alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: C.mint, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 18 }}>
                Skool · gratis · ingen binding
              </div>
              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: m ? 40 : 64, fontWeight: 400, letterSpacing: "-0.04em", lineHeight: 1, color: "white", margin: 0, marginBottom: 18 }}>
                3000+ unge<br />iværksættere<br /><span style={{ color: C.mint }}>venter på dig.</span>
              </h2>
              <p style={{ fontSize: m ? 16 : 18, lineHeight: 1.55, color: "rgba(255,255,255,0.75)", margin: 0, marginBottom: 28, maxWidth: 540 }}>
                Stil spørgsmål til erfarne iværksættere, find co-founders, og vær først til at høre om events. Klik og kom indenfor.
              </p>
              <div style={{ display: "flex", flexDirection: m ? "column" : "row", gap: 12 }}>
                <a href={SKOOL_URL} {...EXT} className="v3cta-btn" style={btnFilled(C.mint, C.charcoal)}>
                  Tilmeld dig på Skool <span style={{ marginLeft: 14 }}>→</span>
                </a>
                <a href={LUMA_SIGNUP} {...EXT} style={{ ...btnOutline("white"), borderColor: "rgba(255,255,255,0.3)" }}>
                  Eller kom til næste event
                </a>
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", padding: m ? 24 : 32 }}>
              <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, color: C.mint, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 16 }}>
                Hvorfor Skool?
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "Aktivt fællesskab dag og nat",
                  "Q&A med erfarne iværksættere",
                  "Eksklusivt content kun for medlemmer",
                  "Find dit næste team-medlem",
                ].map((line) => (
                  <li key={line} style={{ display: "flex", gap: 12, alignItems: "center", color: "white", fontSize: 14 }}>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: C.mint, flexShrink: 0 }} />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section style={{ padding: m ? "64px 0" : "100px 0" }}>
        <div style={innerStyle(m)}>
          <div style={{ ...label, marginBottom: m ? 24 : 32 }}>§ 03 — Hvad du får</div>
          <h2 style={{ ...h, fontSize: m ? 32 : 48, marginBottom: m ? 36 : 56, lineHeight: 1 }}>Hvad du får ud af det.</h2>
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr 1fr" : "repeat(4, 1fr)", gap: m ? 24 : 32 }}>
            {perks.map((p, i) => (
              <div key={p.n} style={{ borderTop: `2px solid ${C.charcoal}`, paddingTop: 20 }}>
                <div style={{ ...label, fontSize: 10, color: `${C.charcoal}80`, marginBottom: 12 }}>0{i + 1}</div>
                <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: m ? 20 : 24, fontWeight: 500, letterSpacing: "-0.015em", marginBottom: 10 }}>{p.n}</div>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: "#5a5962", margin: 0 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ background: C.charcoal, color: "white" }}>
        <div style={{ ...innerStyle(m), padding: m ? "64px 22px" : "96px 56px", textAlign: "center" }}>
          <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: C.mint, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: m ? 20 : 28 }}>
            § 04 — Tilmeld nu
          </div>
          <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: m ? 40 : 72, fontWeight: 400, letterSpacing: "-0.04em", lineHeight: 0.95, margin: 0, marginBottom: m ? 28 : 40, color: "white" }}>
            Klar?<br /><span style={{ color: C.mint }}>Hop ind.</span>
          </h2>
          <a href={SKOOL_URL} {...EXT} className="v3cta-btn" style={{ ...btnFilled(C.mint, C.charcoal), fontSize: 14, padding: "20px 32px" }}>
            Tilmeld dig på Skool <span style={{ marginLeft: 14 }}>→</span>
          </a>
          <div style={{ marginTop: 24, fontFamily: "ui-monospace, monospace", fontSize: 10, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.18em" }}>
            Gratis · Ingen binding · 3000+ medlemmer
          </div>
        </div>
      </section>

      <V3FAQ m={m} sectionLabel="§ 05 — FAQ" />

      <SiteFooter m={m} />
    </div>
  );
}
