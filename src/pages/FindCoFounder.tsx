// Find Co-Founder — V3 styled placeholder. Full feature kommer senere.
import {
  C, innerStyle, headingStyle as h, labelStyle as label,
  useIsMobile, sharedCss, SiteNav, SiteFooter, V3Hero, V3FAQ, V3CTASection, LUMA_SIGNUP,
} from "@/components/forside/v3-shared";

export default function FindCoFounder() {
  const m = useIsMobile();
  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: C.white, color: C.charcoal, width: "100%", overflowX: "hidden" }}>
      <style>{sharedCss}</style>
      <SiteNav m={m} />

      <V3Hero
        m={m}
        label="§ 02 — Co-Founder"
        title="Find dit team."
        accentWord="team."
        intro="Har du en idé eller vil du være med til at bygge noget fedt? Find ligesindede medstiftere i fællesskabet — start typisk med at dukke op til et event."
      />

      {/* Placeholder content */}
      <section style={{ padding: m ? "64px 0" : "100px 0" }}>
        <div style={innerStyle(m)}>
          <div style={{ ...label, marginBottom: m ? 24 : 32 }}>§ 03 — Kommer snart</div>
          <h2 style={{ ...h, fontSize: m ? 28 : 40, marginBottom: m ? 24 : 32, lineHeight: 1.05, maxWidth: 720 }}>
            En platform til at finde<br />co-founders kommer snart.
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: "#5a5962", maxWidth: 640, marginBottom: 32 }}>
            Indtil videre er den bedste måde at finde en co-founder hos os at komme til et event,
            møde folk i fællesskabet, og dele din idé direkte med community'et.
          </p>
        </div>
      </section>

      <V3CTASection
        m={m}
        label="§ 04 — Start her"
        title="Mød dit næste team-medlem."
        accent="team-medlem."
        body="Til vores events er der altid 100+ unge iværksættere på jagt efter de rigtige partnere. Det starter med en samtale."
        primary={{ href: LUMA_SIGNUP, text: "Tilmeld næste event", external: true }}
      />

      <V3FAQ m={m} sectionLabel="§ 05 — FAQ" />

      <SiteFooter m={m} />
    </div>
  );
}
