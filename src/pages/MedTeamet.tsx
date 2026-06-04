// Mød Teamet — V3 styled.
import {
  C, EXT, CONTACT_EMAIL, innerStyle, headingStyle as h, labelStyle as label,
  useIsMobile, sharedCss, SiteNav, SiteFooter, V3Hero, V3FAQ, V3CTASection,
} from "@/components/forside/v3-shared";
import nicolajImage from "@/assets/nicolaj-profile.jpg";
import sejerImage from "@/assets/sejer-profile.jpg";
import albertImage from "@/assets/albert-profile.jpg";
import niklasImage from "@/assets/niklas-profile.jpg";
import frejaImage from "@/assets/freja-profile.png";
import lauritzImage from "@/assets/lauritz-profile.png";
import selmaImage from "@/assets/selma-profile.png";
import mikImage from "@/assets/mik-profile.jpg";
import thomasImage from "@/assets/thomas-profile.jpg";

const team = [
  { n: "Mik Lønborg",     r: "Formand",                 loc: "København", img: mikImage,      ln: "https://www.linkedin.com/in/miklonborg/",                          d: "Mik har stået i spidsen for Unge Iværksættere de sidste to år og driver organisationen med både stærkt lederskab og en ægte passion for iværksætteri. Han sikrer, at UI har det bedste fundament for at vokse, skabe fede events og give unge iværksættere de rette muligheder." },
  { n: "Thomas Dahl",     r: "Næstformand",             loc: "Danmark",   img: thomasImage,   ln: "https://www.linkedin.com/in/thomas-dahl-johansen-904851222/",      d: "Med solid erhvervserfaring og et stort netværk er Thomas en nøglespiller i at skabe de fedeste events i Jylland — sammen med Nicolaj." },
  { n: "Freja Kjeldgaard", r: "Head of content",        loc: "København", img: frejaImage,    ln: "https://www.linkedin.com/in/freja-kjeldgaard-498a10267/",          d: "Freja er vores kreative kraftcenter og hjernen bag alt det content, du ser fra Unge Iværksættere. Hun kombinerer skarp strategi med et øje for trends og sikrer, at vores indhold både inspirerer, engagerer og ser knivskarpt ud." },
  { n: "Lauritz Jelsdal", r: "Head of finance",         loc: "København", img: lauritzImage,  ln: "https://www.linkedin.com/in/lauritz-jelsdal-jensen/",              d: "Lauritz er manden med styr på tallene. Han sørger for, at økonomien spiller, og at alle vores projekter og events kan løbe rundt uden problemer." },
  { n: "Sejer Andersen",  r: "Tech lead",               loc: "København", img: sejerImage,    ln: "https://www.linkedin.com/in/sejer-hornb%C3%A6k-dahl-andersen-703548222/", d: "Sejer er vores tech-hjerne. Han arbejder med at styrke Unge Iværksætteres digitale tilstedeværelse og udvikler løsninger, der gør det muligt for UI at vokse hurtigt og bæredygtigt." },
  { n: "Nicolaj Gram",    r: "Online Community Lead",   loc: "Aarhus",    img: nicolajImage,  ln: "https://www.linkedin.com/in/nicolaj-gram-136178232/",              d: "Nicolaj er drivkraften bag vores online fællesskab og med til at skabe stærke rammer for events i Aarhus. Han brænder for at engagere medlemmerne og sørger for, at alle føler sig som en del af UI-familien." },
  { n: "Niklas Olesen",   r: "Podcast production lead", loc: "København", img: niklasImage,   ln: "https://www.linkedin.com/in/niklaskockolesen/",                    d: "Niklas står for den tekniske og kreative produktion af vores podcast og sikrer, at hver episode leverer både kvalitet og relevans." },
  { n: "Albert Malling",  r: "Content Specialist",      loc: "København", img: albertImage,   ln: "https://www.linkedin.com/in/albert-malling-nissen-138290289/",     d: "Albert er manden bag kameraet og skyder alt det fede content, du ser fra UI. Han fanger stemningen og gør vores events og platforme levende." },
  { n: "Selma Thaysen",   r: "Graphic designer",        loc: "København", img: selmaImage,    ln: "https://www.linkedin.com/in/selma-thaysen-b94684323/",             d: "Selma er vores visuelle tryllekunstner. Hun designer alt fra grafik til identitet, og sikrer, at UI altid fremstår kreativt og professionelt." },
];

const values = [
  { n: "Authenticity", d: "Vi er ægte, gennemsigtige og bygger reelle relationer." },
  { n: "Innovation",   d: "Vi udfordrer status quo og skaber nye løsninger." },
  { n: "Community",    d: "Vi bygger sammen og hjælper hinanden med at vokse." },
  { n: "Impact",       d: "Vi skaber reel værdi for Danmarks startup-økosystem." },
];

export default function MedTeamet() {
  const m = useIsMobile();
  const cols = m ? 1 : 3;
  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: C.white, color: C.charcoal, width: "100%", overflowX: "hidden" }}>
      <style>{sharedCss}</style>
      <SiteNav m={m} />

      <V3Hero
        m={m}
        label="§ 02 — Team"
        title="Mød Teamet."
        accentWord="."
        intro="Vi er passionerede iværksættere og tech-entusiaster der brænder for at skabe Danmarks stærkeste startup-fællesskab. Drevet af frivilligt arbejde og 100% gratis events."
      />

      {/* Stats band */}
      <section style={{ padding: m ? "56px 0" : "80px 0", background: C.darkGreen, color: "white" }}>
        <div style={innerStyle(m)}>
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr 1fr" : "repeat(4, 1fr)", rowGap: m ? 36 : 0, columnGap: m ? 24 : 0 }}>
            {[
              { n: String(team.length), l: "Frivillige" },
              { n: "2", l: "Byer" },
              { n: "3000+", l: "Deltagere" },
              { n: "30+", l: "Events" },
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

      {/* Team grid */}
      <section style={{ padding: m ? "64px 0" : "100px 0" }}>
        <div style={innerStyle(m)}>
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 2fr", gap: m ? 16 : 48, marginBottom: m ? 32 : 56 }}>
            <div>
              <div style={{ ...label, marginBottom: 16 }}>§ 03 — Crew</div>
              <h2 style={{ ...h, fontSize: m ? 32 : 48, lineHeight: 1 }}>Vores Team.</h2>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: "#5a5962", maxWidth: 540, margin: 0, alignSelf: "end" }}>
              {team.length} frivillige der bygger UI hver dag. Find dem på LinkedIn hvis du vil i kontakt.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(3, 1fr)", borderTop: `1px solid ${C.charcoal}15` }}>
            {team.map((p, i) => {
              const rightBorder = !m && (i + 1) % cols !== 0;
              return (
                <div key={p.n} style={{ padding: "28px 24px", borderBottom: `1px solid ${C.charcoal}15`, borderRight: rightBorder ? `1px solid ${C.charcoal}15` : "none", display: "flex", flexDirection: "column" }}>
                  <div style={{ width: "100%", aspectRatio: "1 / 1", maxWidth: m ? 320 : "none", overflow: "hidden", background: C.cream, marginBottom: 20 }}>
                    <img src={p.img} alt={p.n} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(1)" }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 22, fontWeight: 500, letterSpacing: "-0.01em" }}>{p.n}</div>
                    <div style={{ ...label, fontSize: 10, color: `${C.charcoal}80` }}>0{i + 1} / {String(team.length).padStart(2, "0")}</div>
                  </div>
                  <div style={{ fontSize: 13, color: C.darkGreen, marginTop: 6, fontWeight: 500 }}>{p.r}</div>
                  <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, color: `${C.charcoal}80`, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>📍 {p.loc}</div>
                  <p style={{ fontSize: 14, color: "#5a5962", marginTop: 14, lineHeight: 1.55, flex: 1 }}>{p.d}</p>
                  {p.ln && (
                    <a href={p.ln} {...EXT} className="v3-link" style={{ marginTop: 18, fontFamily: "ui-monospace, monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: C.darkGreen, textDecoration: "none", borderBottom: `1px solid ${C.darkGreen}`, paddingBottom: 3, alignSelf: "flex-start" }}>
                      LinkedIn →
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: m ? "64px 0" : "100px 0", background: C.cream }}>
        <div style={innerStyle(m)}>
          <div style={{ ...label, marginBottom: m ? 24 : 32 }}>§ 04 — Værdier</div>
          <h2 style={{ ...h, fontSize: m ? 32 : 48, marginBottom: m ? 36 : 56, lineHeight: 1 }}>Hvad vi tror på.</h2>
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr 1fr" : "repeat(4, 1fr)", gap: m ? 24 : 32 }}>
            {values.map((v, i) => (
              <div key={v.n} style={{ borderTop: `2px solid ${C.charcoal}`, paddingTop: 20 }}>
                <div style={{ ...label, fontSize: 10, color: `${C.charcoal}80`, marginBottom: 12 }}>0{i + 1}</div>
                <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: m ? 22 : 28, fontWeight: 500, letterSpacing: "-0.015em", marginBottom: 12 }}>{v.n}</div>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: "#5a5962", margin: 0 }}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <V3CTASection
        m={m}
        label="§ 05 — Join"
        title="Vil du være en del af teamet?"
        accent="teamet?"
        body="Vi er altid på udkig efter talentfulde frivillige der deler vores passion for iværksætteri og community-building. Skriv til os og fortæl hvorfor du gerne vil med."
        primary={{ href: `mailto:${CONTACT_EMAIL}?subject=Bliv frivillig`, text: "Kontakt os", external: true }}
      />

      <V3FAQ m={m} sectionLabel="§ 06 — FAQ" />

      <SiteFooter m={m} />
    </div>
  );
}
