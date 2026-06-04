// Events — V3 styled. Pulls event data from the shared EVENT config and embeds Luma.
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  C, EVENT, EVENT_TAG, EXT, LUMA_SIGNUP, innerStyle, headingStyle as h, labelStyle as label,
  useIsMobile, sharedCss, SiteNav, SiteFooter, V3Hero, V3FAQ,
} from "@/components/forside/v3-shared";
import eventAudience from "@/assets/event-audience-1.jpg";

export default function Events() {
  const m = useIsMobile();

  const startTs = useMemo(() => new Date(EVENT.start).getTime(), []);
  const endTs = useMemo(() => new Date(EVENT.end).getTime(), []);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const status: "upcoming" | "live" | "past" = now < startTs ? "upcoming" : now < endTs ? "live" : "past";
  const statusText = status === "live" ? "LIVE NU" : status === "past" ? "AFSLUTTET" : "TILMELDING ÅBEN";
  const statusColor = status === "past" ? "#aaa" : C.mint;

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: C.white, color: C.charcoal, width: "100%", overflowX: "hidden" }}>
      <style>{sharedCss}</style>
      <SiteNav m={m} />

      <V3Hero
        m={m}
        label="§ 02 — Events"
        title="Vores Events."
        accentWord="."
        intro="Mød andre unge iværksættere, lær af erfarne speakers og bliv inspireret. Gratis deltagelse · ingen binding."
      />

      {/* Stats band */}
      <section style={{ padding: m ? "56px 0" : "80px 0", background: C.darkGreen, color: "white" }}>
        <div style={innerStyle(m)}>
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr 1fr" : "repeat(4, 1fr)", rowGap: m ? 36 : 0, columnGap: m ? 24 : 0 }}>
            {[
              { n: "30+", l: "Events afholdt" },
              { n: "3000+", l: "Deltagere" },
              { n: "2", l: "Byer" },
              { n: "Gratis", l: "Altid" },
            ].map((s, i) => {
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

      {/* Next event */}
      <section style={{ padding: m ? "64px 0" : "100px 0" }}>
        <div style={innerStyle(m)}>
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 2fr", gap: m ? 16 : 48, marginBottom: m ? 32 : 56 }}>
            <div>
              <div style={{ ...label, marginBottom: 16 }}>§ 03 — Næste event</div>
              <h2 style={{ ...h, fontSize: m ? 32 : 48, lineHeight: 1 }}>{EVENT.city}.</h2>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 16, padding: "8px 14px", background: status === "live" ? C.mint : `${C.darkGreen}15`, color: status === "live" ? C.charcoal : C.darkGreen, fontFamily: "ui-monospace, monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: statusColor, animation: "v3pulse 1.6s ease-in-out infinite" }} />
                {statusText}
              </div>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: "#5a5962", maxWidth: 540, margin: 0, alignSelf: "end" }}>
              {EVENT_TAG} · kl. {String(new Date(EVENT.start).getHours()).padStart(2, "0")}:{String(new Date(EVENT.start).getMinutes()).padStart(2, "0")}.
              Tilmeld dig direkte via Luma nedenfor.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: m ? 28 : 48, alignItems: "stretch", borderTop: `1px solid ${C.charcoal}15`, paddingTop: m ? 32 : 48 }}>
            <div style={{ position: "relative", background: C.cream, minHeight: m ? 320 : 480, overflow: "hidden" }}>
              <img src={eventAudience} alt="Event" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", bottom: 16, right: 16, background: C.darkGreen, color: "white", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: C.mint, boxShadow: `0 0 0 3px ${C.mint}40` }} />
                <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>{EVENT_TAG}</span>
              </div>
            </div>
            <div style={{ background: C.white, border: `1px solid ${C.charcoal}15`, overflow: "hidden", minHeight: m ? 460 : 480 }}>
              <iframe
                src={EVENT.lumaEmbedSrc}
                title={`Tilmeld ${EVENT.city}`}
                style={{ width: "100%", height: m ? 460 : 480, border: "none", display: "block" }}
                allow="fullscreen; payment"
                loading="lazy"
              />
            </div>
          </div>

          <div style={{ marginTop: 32, display: "flex", flexDirection: m ? "column" : "row", gap: 12 }}>
            <a href={LUMA_SIGNUP} {...EXT} className="v3cta-btn" style={btnFilled(C.charcoal, "white")}>
              Reserver min plads <span style={{ marginLeft: 14 }}>→</span>
            </a>
            <a href={LUMA_SIGNUP} {...EXT} style={btnOutline(C.charcoal)}>
              Se alle events på Luma
            </a>
          </div>
        </div>
      </section>

      <V3FAQ m={m} sectionLabel="§ 04 — FAQ" />

      <SiteFooter m={m} />
    </div>
  );
}

const btnFilled = (bg: string, fg: string): CSSProperties => ({
  padding: "18px 24px", background: bg, color: fg, border: "none", fontSize: 13,
  fontWeight: 600, cursor: "pointer", textAlign: "left", fontFamily: "ui-monospace, monospace",
  textTransform: "uppercase", letterSpacing: "0.12em", display: "inline-flex", alignItems: "center", textDecoration: "none",
});
const btnOutline = (color: string): CSSProperties => ({
  padding: "18px 24px", background: "transparent", color, border: `1px solid ${color}30`, fontSize: 13,
  fontWeight: 500, cursor: "pointer", textAlign: "left", fontFamily: "ui-monospace, monospace",
  textTransform: "uppercase", letterSpacing: "0.12em", display: "inline-flex", alignItems: "center", textDecoration: "none",
});
