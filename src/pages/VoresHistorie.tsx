// Vores Historie — V3 styled.
import {
  C, innerStyle, headingStyle as h, labelStyle as label,
  useIsMobile, sharedCss, SiteNav, SiteFooter, V3Hero, V3FAQ, V3CTASection, LUMA_SIGNUP,
} from "@/components/forside/v3-shared";

const timeline = [
  { year: "2022", title: "Foundationen lægges", body: "Unge Iværksættere starter som et lille frivilligt fællesskab i Aarhus med ambitionen om at gøre iværksætteri mere tilgængeligt for unge i Danmark." },
  { year: "2023", title: "Vi vokser",          body: "Første rigtige events i både Aarhus og København. Podcasten lanceres, og fællesskabet vokser hurtigt forbi 1000 medlemmer." },
  { year: "2024", title: "Danmarks største",    body: "Med 3000+ unge iværksættere bliver UI Danmarks største frivillige fællesskab for iværksætteri. Sponsorer som Billy og Ageras kommer ombord." },
  { year: "2026", title: "Nu",                  body: "30+ events afholdt, podcastens 50.000+ afspilninger, og et team på 9 frivillige der hver dag arbejder for at gøre iværksætteri mere tilgængeligt." },
];

export default function VoresHistorie() {
  const m = useIsMobile();
  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: C.white, color: C.charcoal, width: "100%", overflowX: "hidden" }}>
      <style>{sharedCss}</style>
      <SiteNav m={m} />

      <V3Hero
        m={m}
        label="§ 02 — Historie"
        title="Vores Historie."
        accentWord="."
        intro="Hvordan Unge Iværksættere gik fra en idé i Aarhus til Danmarks største frivillige fællesskab for unge iværksættere."
      />

      {/* Stats band */}
      <section style={{ padding: m ? "56px 0" : "80px 0", background: C.darkGreen, color: "white" }}>
        <div style={innerStyle(m)}>
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr 1fr" : "repeat(4, 1fr)", rowGap: m ? 36 : 0, columnGap: m ? 24 : 0 }}>
            {[
              { n: "2022", l: "Etableret" },
              { n: "3000+", l: "Medlemmer" },
              { n: "30+",   l: "Events afholdt" },
              { n: "50K+",  l: "Podcast afspil." },
            ].map((s, i) => {
              const divider = !m && i !== 0;
              return (
                <div key={s.l} style={{ borderLeft: divider ? "1px solid rgba(255,255,255,0.18)" : "none", paddingLeft: divider ? 32 : 0, paddingRight: m ? 0 : 32 }}>
                  <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: C.mint, marginBottom: m ? 12 : 20 }}>0{i + 1}</div>
                  <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: m ? 42 : 64, fontWeight: 400, color: "white", letterSpacing: "-0.04em", lineHeight: 0.9 }}>{s.n}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: m ? 10 : 16 }}>{s.l}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: m ? "64px 0" : "100px 0" }}>
        <div style={innerStyle(m)}>
          <div style={{ ...label, marginBottom: m ? 24 : 32 }}>§ 03 — Tidslinje</div>
          <h2 style={{ ...h, fontSize: m ? 32 : 48, marginBottom: m ? 36 : 56, lineHeight: 1 }}>Sådan blev vi til.</h2>

          <div style={{ borderTop: `1px solid ${C.charcoal}15` }}>
            {timeline.map((t, i) => (
              <div key={t.year} style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "180px 1fr", gap: m ? 12 : 48, padding: m ? "28px 0" : "40px 0", borderBottom: `1px solid ${C.charcoal}15` }}>
                <div>
                  <div style={{ ...label, fontSize: 10, color: `${C.charcoal}80`, marginBottom: 8 }}>0{i + 1} / {String(timeline.length).padStart(2, "0")}</div>
                  <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: m ? 36 : 56, fontWeight: 400, color: C.darkGreen, letterSpacing: "-0.03em", lineHeight: 1 }}>{t.year}</div>
                </div>
                <div>
                  <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: m ? 22 : 28, fontWeight: 500, letterSpacing: "-0.015em", marginBottom: 12 }}>{t.title}</div>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: "#5a5962", margin: 0, maxWidth: 640 }}>{t.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <V3CTASection
        m={m}
        label="§ 04 — Næste kapitel"
        title="Vil du være med?"
        accent="med?"
        body="Kom til vores næste event og bliv en del af historien. Gratis · ingen binding."
        primary={{ href: LUMA_SIGNUP, text: "Tilmeld næste event", external: true }}
      />

      <V3FAQ m={m} sectionLabel="§ 05 — FAQ" />

      <SiteFooter m={m} />
    </div>
  );
}
