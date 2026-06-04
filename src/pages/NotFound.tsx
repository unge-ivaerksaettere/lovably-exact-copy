// 404 — V3 styled.
import { Link } from "react-router-dom";
import {
  C, innerStyle, headingStyle as h, labelStyle as label,
  useIsMobile, sharedCss, SiteNav, SiteFooter, EXT, LUMA_SIGNUP,
} from "@/components/forside/v3-shared";

export default function NotFound() {
  const m = useIsMobile();
  const btn = (bg: string, fg: string) => ({
    padding: "16px 22px", background: bg, color: fg, border: "none", fontSize: 13,
    fontWeight: 600 as const, cursor: "pointer", textAlign: "left" as const,
    fontFamily: "ui-monospace, monospace", textTransform: "uppercase" as const,
    letterSpacing: "0.12em", display: "inline-flex" as const, alignItems: "center", textDecoration: "none",
  });
  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: C.white, color: C.charcoal, width: "100%", overflowX: "hidden", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <style>{sharedCss}</style>
      <SiteNav m={m} />

      <section style={{ flex: 1, display: "flex", alignItems: "center", padding: m ? "64px 0" : "120px 0" }}>
        <div style={innerStyle(m)}>
          <div style={{ ...label, marginBottom: m ? 20 : 32 }}>§ — Error 404</div>
          <h1 style={{ ...h, fontSize: m ? 72 : 144, lineHeight: 0.9, fontWeight: 400, marginBottom: m ? 24 : 36 }}>
            404<span style={{ color: C.mint }}>.</span>
          </h1>
          <p style={{ fontSize: m ? 16 : 18, lineHeight: 1.55, color: "#5a5962", marginBottom: m ? 36 : 48, maxWidth: 540 }}>
            Siden findes ikke. Måske er den flyttet, eller måske skrev du forkert. Prøv en af nedenstående.
          </p>
          <div style={{ display: "flex", flexDirection: m ? "column" : "row", gap: 12 }}>
            <Link to="/" style={btn(C.charcoal, "white")}>Tilbage til forsiden <span style={{ marginLeft: 14 }}>→</span></Link>
            <a href={LUMA_SIGNUP} {...EXT} style={{ ...btn("transparent", C.charcoal), border: `1px solid ${C.charcoal}30`, fontWeight: 500 }}>Tilmeld næste event</a>
          </div>
        </div>
      </section>

      <SiteFooter m={m} />
    </div>
  );
}
