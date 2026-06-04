// Podcast — V3 styled. Pulls episodes from Supabase via usePodcastEpisodes.
import { useEffect, type CSSProperties } from "react";
import {
  C, EXT, SOCIALS, innerStyle, headingStyle as h, labelStyle as label,
  useIsMobile, sharedCss, SiteNav, SiteFooter, V3Hero, V3FAQ,
} from "@/components/forside/v3-shared";
import podcastStudio from "@/assets/podcast-studio.jpg";
import podcastFazel from "@/assets/podcast-fazel.png";
import podcastDoubles from "@/assets/podcast-doubles-fixed.png";
import podcastLouliving from "@/assets/podcast-louliving.png";
import podcastDoner from "@/assets/podcast-doner.png";
import { usePodcastEpisodes, useFeaturedPodcastEpisode, useSpotifySync } from "@/hooks/usePodcastEpisodes";
import { useQueryClient } from "@tanstack/react-query";

function episodeImage(title: string, fallback?: string | null) {
  const lc = (title || "").toLowerCase();
  if (lc.includes("fazel")) return podcastFazel;
  if (lc.includes("doubles") || lc.includes("doublés") || lc.includes("peter")) return podcastDoubles;
  if (lc.includes("louliving")) return podcastLouliving;
  if (lc.includes("döner") || lc.includes("doner")) return podcastDoner;
  if (fallback && !fallback.includes("undefined") && !fallback.includes("null")) return fallback;
  return podcastStudio;
}

function formatDuration(durationMs: number | null) {
  if (!durationMs) return "—";
  const mins = Math.floor(durationMs / 60000);
  return `${mins} min`;
}

export default function Podcast() {
  const m = useIsMobile();
  const { data: episodes = [], isLoading: epLoading } = usePodcastEpisodes();
  const { data: featured } = useFeaturedPodcastEpisode();
  const { syncWithSpotify } = useSpotifySync();
  const queryClient = useQueryClient();

  // Auto-sync if no episodes (preserves old behavior)
  useEffect(() => {
    if (!epLoading && episodes.length === 0) {
      (async () => {
        try {
          await syncWithSpotify();
          await queryClient.invalidateQueries({ queryKey: ["podcast-episodes"] });
          await queryClient.invalidateQueries({ queryKey: ["featured-podcast-episode"] });
        } catch (e) {
          console.error("Spotify sync failed:", e);
        }
      })();
    }
  }, [epLoading, episodes.length, syncWithSpotify, queryClient]);

  const currentFeatured = featured || episodes[0];
  const rest = episodes.filter((e) => e.id !== currentFeatured?.id).slice(0, 8);

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: C.white, color: C.charcoal, width: "100%", overflowX: "hidden" }}>
      <style>{sharedCss}</style>
      <SiteNav m={m} />

      <V3Hero
        m={m}
        label="§ 02 — Podcast"
        title="Vores Podcast."
        accentWord="."
        intro="Hør danske iværksætteres ægte historier. Nye episoder hver uge — gratis på Spotify, Apple Podcasts og andre platforme."
      />

      {/* Stats band */}
      <section style={{ padding: m ? "56px 0" : "80px 0", background: C.darkGreen, color: "white" }}>
        <div style={innerStyle(m)}>
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr 1fr" : "repeat(3, 1fr)", rowGap: m ? 36 : 0, columnGap: m ? 24 : 0 }}>
            {[
              { n: "50K+", l: "Afspilninger" },
              { n: String(episodes.length || "—"), l: "Episoder" },
              { n: "🇩🇰", l: "Lavet i DK" },
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

      {/* Featured episode */}
      <section style={{ padding: m ? "64px 0" : "100px 0" }}>
        <div style={innerStyle(m)}>
          <div style={{ ...label, marginBottom: m ? 24 : 32 }}>§ 03 — Featured</div>
          <h2 style={{ ...h, fontSize: m ? 32 : 48, marginBottom: m ? 32 : 48, lineHeight: 1 }}>Seneste episode.</h2>

          {currentFeatured ? (
            <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1.2fr", gap: m ? 28 : 48, alignItems: "stretch", borderTop: `1px solid ${C.charcoal}15`, paddingTop: m ? 32 : 48 }}>
              <div style={{ position: "relative", aspectRatio: "1 / 1", background: C.cream, overflow: "hidden" }}>
                <img src={episodeImage(currentFeatured.title, currentFeatured.image_url)} alt={currentFeatured.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
                <div style={{ ...label, color: C.mint }}>Ep. {currentFeatured.episode_number ?? ""} · {formatDuration(currentFeatured.duration_ms)}</div>
                <h3 style={{ ...h, fontSize: m ? 28 : 40, lineHeight: 1.1 }}>{currentFeatured.title}</h3>
                {currentFeatured.description && (
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: "#5a5962", margin: 0, maxWidth: 540, display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical" as any, overflow: "hidden" }}>
                    {currentFeatured.description.replace(/<[^>]+>/g, "")}
                  </p>
                )}
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {currentFeatured.spotify_url && (
                    <a href={currentFeatured.spotify_url} {...EXT} className="v3cta-btn" style={btnFilled(C.charcoal, "white")}>
                      Lyt på Spotify <span style={{ marginLeft: 14 }}>→</span>
                    </a>
                  )}
                  <a href={SOCIALS.spotify} {...EXT} style={btnOutline(C.charcoal)}>
                    Alle episoder
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <p style={{ fontSize: 15, color: "#5a5962" }}>{epLoading ? "Henter episoder..." : "Ingen episoder fundet endnu."}</p>
          )}
        </div>
      </section>

      {/* Episode grid */}
      {rest.length > 0 && (
        <section style={{ padding: m ? "64px 0" : "100px 0", background: C.cream, borderTop: `1px solid ${C.charcoal}15` }}>
          <div style={innerStyle(m)}>
            <div style={{ ...label, marginBottom: m ? 24 : 32 }}>§ 04 — Episoder</div>
            <h2 style={{ ...h, fontSize: m ? 32 : 48, marginBottom: m ? 36 : 56, lineHeight: 1 }}>Tidligere episoder.</h2>

            <div style={{ display: "grid", gridTemplateColumns: m ? "1fr 1fr" : "repeat(4, 1fr)", gap: m ? 16 : 24 }}>
              {rest.map((ep) => (
                <a key={ep.id} href={ep.spotify_url || SOCIALS.spotify} {...EXT} style={{ textDecoration: "none", color: "inherit", display: "block" }} className="v3cta-btn">
                  <div style={{ aspectRatio: "1 / 1", background: C.white, overflow: "hidden", marginBottom: 12 }}>
                    <img src={episodeImage(ep.title, ep.image_url)} alt={ep.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div style={{ ...label, fontSize: 10, color: `${C.charcoal}80`, marginBottom: 6 }}>{formatDuration(ep.duration_ms)}</div>
                  <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: m ? 15 : 17, fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.25 }}>{ep.title}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <V3FAQ m={m} sectionLabel="§ 05 — FAQ" />

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
