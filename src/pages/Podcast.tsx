import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Play, Calendar, Clock, Download, Headphones, Loader2 } from "lucide-react";
import podcastStudio from "@/assets/podcast-studio.jpg";
import NewsletterPodcast from "@/components/NewsletterPodcast";
import { usePodcastEpisodes, useFeaturedPodcastEpisode, useSpotifySync } from "@/hooks/usePodcastEpisodes";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
// Podcast cover images from GitHub assets
import podcastFazel from "@/assets/podcast-fazel.png";
import podcastDoubles from "@/assets/podcast-doubles.png";
import podcastLouliving from "@/assets/podcast-louliving.png";
import podcastDoner from "@/assets/podcast-doner.png";

const Podcast = () => {
  const { data: episodes = [], isLoading: episodesLoading } = usePodcastEpisodes();
  const { data: featuredEpisode, isLoading: featuredLoading } = useFeaturedPodcastEpisode();
  
  // Use the first episode as featured if none is explicitly featured
  const currentFeaturedEpisode = featuredEpisode || episodes[0];
  
  const formatDuration = (durationMs: number | null) => {
    if (!durationMs) return "N/A";
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getEpisodeImage = (title: string, fallback?: string | null) => {
    const lc = title.toLowerCase();
    if (lc.includes('fazel')) return podcastFazel;
    if (lc.includes('doubles') || lc.includes('peter')) return podcastDoubles;
    if (lc.includes('louliving')) return podcastLouliving;
    if (lc.includes('döner') || lc.includes('doner')) return podcastDoner;
    return fallback || podcastStudio;
  };

  const queryClient = useQueryClient();
  const { syncWithSpotify } = useSpotifySync();

  useEffect(() => {
    const requiredIds = [
      '4s5VbujsPLpoBBZdXCAbEL',
      '4P3kjxBiYGGjnS1uqjkt3V',
      '2yTe4aymOgjFl4rptMIxoZ',
      '0dM4qMKX9annVdUPBFckZO'
    ];

    const hasAnyRequired = episodes.some(e => requiredIds.includes(e.spotify_id));

    if (!episodesLoading && (episodes.length === 0 || !hasAnyRequired)) {
      (async () => {
        try {
          await syncWithSpotify();
          await queryClient.invalidateQueries({ queryKey: ['podcast-episodes'] });
          await queryClient.invalidateQueries({ queryKey: ['featured-podcast-episode'] });
        } catch (e) {
          console.error('Spotify sync failed:', e);
        }
      })();
    }
  }, [episodesLoading, episodes, syncWithSpotify, queryClient]);

  const faqData = [
    {
      question: "Hvad er Unge Iværksættere?",
      answer: "Danmarks største frivillige fællesskab for unge iværksættere med henblik på at gøre iværksætteri mere tilgængeligt og give fremtidens iværksættere de bedste kort på hånden.",
    },
    {
      question: "Hvem kan deltage i jeres events?",
      answer: "Alle interesserede i iværksætteri kan deltage i vores events - både erfarne iværksættere og dem der overvejer at starte deres første startup.",
    },
    {
      question: "Koster det noget at deltage?",
      answer: "Alle vores events er gratis for deltagerne. Vi tror på at gøre iværksætteri tilgængeligt for alle.",
    },
    {
      question: "Hvor afholdes jeres events?",
      answer: "Vi holder events i København og Aarhus samt virtuelle webinarer så alle kan deltage.",
    },
    {
      question: "Kan jeg blive speaker på jeres events?",
      answer: "Absolut! Vi er altid på udkig efter inspirerende speakers. Kontakt os på kontakt@ungeiværksættere.dk med dit forslag og vi vender tilbage hurtigst muligt.",
    },
    {
      question: "Hvordan kan min virksomhed blive sponsor?",
      answer: "Vi samarbejder med virksomheder der støtter startup-økosystemet. Kontakt os på kontakt@ungeiværksættere.dk for at høre om sponsormuligheder og partnerskaber.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-anton text-foreground mb-6">
              Unge Iværksættere Podcast
            </h1>
            <p className="text-lg font-inter text-muted-foreground max-w-3xl mx-auto mb-12">
              Dybdegående samtaler med Danmarks mest succesrige iværksættere, investorer og eksperter. Få insights der kan accelerere din startup rejse.
            </p>
          </div>
        </div>
      </section>

      {/* Sponsor Banner */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <p className="text-sm font-inter text-muted-foreground">
              👑 Vi er pt sponsoreret af <span className="font-dm-sans font-bold">Ageras & Jakob H.</span> - tak for jeres støtte!
            </p>
          </div>
        </div>
      </section>

      {/* Featured Episode */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Badge className="bg-secondary text-secondary-foreground font-dm-sans font-bold">
              🔥 Featured Episode
            </Badge>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-lg overflow-hidden">
              {currentFeaturedEpisode ? (
                <img
                  src={getEpisodeImage(currentFeaturedEpisode.title, currentFeaturedEpisode.image_url)}
                  alt={`${currentFeaturedEpisode.title} cover`}
                  className="w-full h-auto object-cover rounded-lg"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = podcastStudio; }}
                />
              ) : (
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-6">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <Play className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="space-y-2">
                      <div className="font-dm-sans font-bold">Lyt til tidligere speakers 🎧</div>
                      <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-inter inline-block">
                        Podcast afspilleren
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              {featuredLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : currentFeaturedEpisode ? (
                <>
                  <Badge className="bg-primary/10 text-primary font-dm-sans">Featured Episode</Badge>
                  <h2 className="text-3xl font-anton text-foreground">
                    {currentFeaturedEpisode.title}
                  </h2>
                  
                  <div className="flex items-center gap-6 text-sm font-inter text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatDuration(currentFeaturedEpisode.duration_ms)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(currentFeaturedEpisode.release_date).toLocaleDateString('da-DK')}
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-dm-sans font-bold px-8"
                      onClick={() => window.open(currentFeaturedEpisode.spotify_url, '_blank')}
                    >
                      ▶ Lyt Nu
                    </Button>
                    <Button 
                      variant="outline" 
                      className="font-dm-sans font-bold"
                      onClick={() => window.open(currentFeaturedEpisode.spotify_url, '_blank')}
                    >
                      🎧 Spotify
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground">Ingen featured episode tilgængelig</p>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* Spotify Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-8">
            <h3 className="text-2xl font-anton text-foreground">Lyt på Spotify</h3>
            <p className="text-muted-foreground font-inter">
              Følg vores podcast på Spotify for automatiske opdateringer af nye episodes.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            {/* Real Spotify Embed */}
            <iframe 
              src="https://open.spotify.com/embed/show/154B6QakpSESlOKiFkiDyk?utm_source=generator&theme=0"
              width="100%" 
              height="352" 
              frameBorder="0" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              className="rounded-lg"
            />
            <div className="mt-6 flex gap-4 justify-center">
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-dm-sans font-bold"
                onClick={() => window.open('https://open.spotify.com/show/154B6QakpSESlOKiFkiDyk', '_blank')}
              >
                🎧 Åbn Show på Spotify
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* All Episodes */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-anton text-foreground mb-8">
            Seneste Episodes (3)
          </h3>
          
          {episodesLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="ml-2">Indlæser episoder...</span>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {episodes.slice(1, 4).map((episode) => (
                <Card key={episode.id} className="border-border overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Episode Image */}
                      <img 
                        src={getEpisodeImage(episode.title, episode.image_url)} 
                        alt={`${episode.title} cover`}
                        className="w-full h-32 object-cover rounded-lg"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = podcastStudio; }}
                      />
                      
                      <div className="space-y-2">
                        <h4 className="text-lg font-dm-sans font-bold text-foreground line-clamp-2">
                          {episode.title}
                        </h4>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground font-inter">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDuration(episode.duration_ms)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(episode.release_date).toLocaleDateString('da-DK')}
                        </span>
                      </div>
                      
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-dm-sans font-bold"
                        onClick={() => window.open(episode.spotify_url, '_blank')}
                      >
                        ▶ Lyt på Spotify
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <NewsletterPodcast />

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-anton text-foreground mb-4">
              Ofte Stillede Spørgsmål
            </h2>
            <p className="text-muted-foreground font-inter">
              Find svar på de mest almindelige spørgsmål om Unge Iværksættere
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-background border border-border rounded-lg px-6"
                >
                  <AccordionTrigger className="font-dm-sans font-bold text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-inter text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Podcast;