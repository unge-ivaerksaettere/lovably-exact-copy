// Vores Sponsorer — V3 styled.
import {
  C, EXT, CONTACT_EMAIL, innerStyle, headingStyle as h, labelStyle as label,
  useIsMobile, sharedCss, SiteNav, SiteFooter, V3Hero, V3FAQ, V3CTASection,
} from "@/components/forside/v3-shared";
import billyLogo from "@/assets/billy-logo-correct.png";
import agerasLogo from "@/assets/ageras-logo-real.png";
import jakobProfile from "@/assets/jakob-profile-new.jpeg";

const SPONSOR_MAIL = `mailto:${CONTACT_EMAIL}?subject=Sponsor%20inquiry`;

const supportSponsors = [
  {
    n: "Billy",
    type: "Støtte sponsor",
    d: "Vores primære partner, der støtter hele vores mission og gør det muligt at holde alt gratis.",
    logo: billyLogo,
    href: "https://billy.dk",
  },
  {
    n: "Ageras",
    type: "Partner & Podcast sponsor",
    d: "Ageras støtter danske iværksættere som både partner og podcast-sponsor og hjælper med at gøre iværksætteri mere tilgængeligt.",
    logo: agerasLogo,
    href: "https://ageras.com",
  },
  {
    n: "Jakob Bjerg-Heise",
    type: "Støtte sponsor",
    subtitle: "Senior Solution Architect",
    d: "Erfaren teknisk rådgiver med passion for at skabe værdi gennem komplekse tech-platforme. Støtter med ekspertise inden for cloud og systemarkitektur.",
    img: jakobProfile,
    href: "https://www.linkedin.com/in/jakobh/",
  },
];

export default function VoresSponsorer() {
  const m = useIsMobile();
  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: C.white, color: C.charcoal, width: "100%", overflowX: "hidden" }}>
      <style>{sharedCss}</style>
      <SiteNav m={m} />

      <V3Hero
        m={m}
        label="§ 02 — Sponsorer"
        title="Vores Sponsorer."
        accentWord="."
        intro="Tak til vores partnere der støtter Danmarks 3000+ unge iværksættere. Vores hovedsponsor Billy hjælper danske iværksættere med at fokusere på det, de elsker mest."
      />

      {/* Hovedsponsor */}
      <section style={{ padding: m ? "64px 0" : "100px 0" }}>
        <div style={innerStyle(m)}>
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 2fr", gap: m ? 16 : 48, marginBottom: m ? 32 : 56 }}>
            <div>
              <div style={{ ...label, marginBottom: 16 }}>§ 03 — Hovedsponsor</div>
              <h2 style={{ ...h, fontSize: m ? 32 : 48, lineHeight: 1 }}>Billy.</h2>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: "#5a5962", maxWidth: 540, margin: 0, alignSelf: "end" }}>
              Virksomheden der investerer i Danmarks fremtidige iværksættere — og gør det muligt at holde alle vores events gratis.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1.2fr", gap: m ? 32 : 64, alignItems: "stretch", borderTop: `1px solid ${C.charcoal}15`, paddingTop: m ? 32 : 48 }}>
            <div style={{ background: C.cream, padding: m ? 32 : 48, display: "flex", alignItems: "center", justifyContent: "center", minHeight: m ? 260 : 360 }}>
              <img src={billyLogo} alt="Billy logo" style={{ maxWidth: m ? 180 : 240, maxHeight: m ? 120 : 160, objectFit: "contain", display: "block" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
              <div style={{ ...label, color: C.mint }}>Hovedsponsor · siden 2022</div>
              <p style={{ fontSize: m ? 17 : 19, lineHeight: 1.55, color: C.charcoal, margin: 0 }}>
                Billy støtter danske iværksættere med deres intelligente økonomisystem og hjælper dem med at fokusere på det, de elsker mest.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="https://billy.dk" {...EXT} className="v3cta-btn" style={btn(C.charcoal, "white")}>
                  Besøg Billy <span style={{ marginLeft: 14 }}>→</span>
                </a>
                <a href={SPONSOR_MAIL} className="v3cta-btn" style={btnOutline(C.charcoal)}>
                  Bliv hovedsponsor
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Støttesponsorer */}
      <section style={{ padding: m ? "64px 0" : "100px 0", background: C.cream }}>
        <div style={innerStyle(m)}>
          <div style={{ ...label, marginBottom: m ? 24 : 32 }}>§ 04 — Støttesponsorer</div>
          <h2 style={{ ...h, fontSize: m ? 32 : 48, marginBottom: m ? 36 : 56, lineHeight: 1 }}>Vores partnere.</h2>

          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(3, 1fr)", gap: 1, background: `${C.charcoal}15`, borderTop: `1px solid ${C.charcoal}15`, borderLeft: `1px solid ${C.charcoal}15` }}>
            {supportSponsors.map((s, i) => (
              <div key={s.n} style={{ background: C.cream, padding: m ? "24px 22px" : "32px 28px", display: "flex", flexDirection: "column" }}>
                <div style={{ ...label, fontSize: 10, color: `${C.charcoal}80`, marginBottom: 16 }}>0{i + 1} / {String(supportSponsors.length).padStart(2, "0")}</div>
                <div style={{ width: "100%", height: m ? 120 : 140, background: C.white, marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  {s.logo
                    ? <img src={s.logo} alt={`${s.n} logo`} style={{ maxWidth: "70%", maxHeight: "70%", objectFit: "contain", display: "block" }} />
                    : <img src={s.img} alt={s.n} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(1)" }} />}
                </div>
                <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 22, fontWeight: 500, letterSpacing: "-0.01em" }}>{s.n}</div>
                {s.subtitle && (
                  <div style={{ fontSize: 12, color: `${C.charcoal}80`, marginTop: 2, fontStyle: "italic" }}>{s.subtitle}</div>
                )}
                <div style={{ fontSize: 12, color: C.darkGreen, marginTop: 6, fontWeight: 500 }}>{s.type}</div>
                <p style={{ fontSize: 14, color: "#5a5962", marginTop: 14, lineHeight: 1.55, flex: 1 }}>{s.d}</p>
                {s.href && (
                  <a href={s.href} {...EXT} className="v3-link" style={{ marginTop: 18, fontFamily: "ui-monospace, monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: C.darkGreen, textDecoration: "none", borderBottom: `1px solid ${C.darkGreen}`, paddingBottom: 3, alignSelf: "flex-start" }}>
                    {s.logo ? `Besøg ${s.n}` : "LinkedIn"} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <V3CTASection
        m={m}
        label="§ 05 — Bliv sponsor"
        title="Vil du være sponsor?"
        accent="sponsor?"
        body="Kontakt os for at høre om mulighederne for at støtte Danmarks største iværksætter-fællesskab. Vi tilpasser pakker til virksomheder af alle størrelser."
        primary={{ href: SPONSOR_MAIL, text: "Kontakt os i dag", external: true }}
      />

      <V3FAQ m={m} sectionLabel="§ 06 — FAQ" />

      <SiteFooter m={m} />
    </div>
  );
}

function btn(bg: string, fg: string) {
  return { padding: "16px 22px", background: bg, color: fg, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", textAlign: "left" as const, fontFamily: "ui-monospace, monospace", textTransform: "uppercase" as const, letterSpacing: "0.12em", display: "inline-flex" as const, alignItems: "center", textDecoration: "none" };
}
function btnOutline(color: string) {
  return { padding: "16px 22px", background: "transparent", color, border: `1px solid ${color}30`, fontSize: 13, fontWeight: 500, cursor: "pointer", textAlign: "left" as const, fontFamily: "ui-monospace, monospace", textTransform: "uppercase" as const, letterSpacing: "0.12em", display: "inline-flex" as const, alignItems: "center", textDecoration: "none" };
}
