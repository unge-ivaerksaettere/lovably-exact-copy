import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Calendar, Clock, Download, Headphones } from "lucide-react";
import podcastStudio from "@/assets/podcast-studio.jpg";

const Podcast = () => {
  const featuredEpisode = {
    id: 1,
    title: "Fra idé til 10 millioner i omsætning - Christian Stadil's rejse",
    description: "I denne episode dykker vi ned i Christian Stadils utrolige entrepreneurrejse fra Hummel til Thornico. Lær om de vigtigste lektioner og hvordan man skalerer et brand globalt.",
    duration: "52:30",
    releaseDate: "2024-02-10",
    plays: 15420,
    category: "Success Story"
  };

  const recentEpisodes = [
    {
      id: 2,
      title: "Fundraising i 2024 - Hvad investorer virkelig leder efter",
      description: "Ekspert insights om hvordan startup landskabet har ændret sig og hvad der skal til for at tiltrække kapital.",
      duration: "38:15",
      releaseDate: "2024-02-03",
      plays: 8930,
      category: "Fundraising"
    },
    {
      id: 3,
      title: "Tech for Good - Hvordan din startup kan skabe positiv impact",
      description: "Mød grundlæggerne bag nogle af Danmarks mest impact-drevne startups.",
      duration: "45:22",
      releaseDate: "2024-01-27",
      plays: 12150,
      category: "Impact"
    },
    {
      id: 4,
      title: "AI Revolution - Hvordan unge iværksættere kan udnytte kunstig intelligens",
      description: "Praktiske tips til at implementere AI i din startup uden at sprænge budgettet.",
      duration: "41:08",
      releaseDate: "2024-01-20",
      plays: 19840,
      category: "Technology"
    },
    {
      id: 5,
      title: "Kvindelige iværksættere bryder barriererne",
      description: "Inspirerende historier fra kvindelige grundlæggere der har skabt succesfulde virksomheder.",
      duration: "47:33",
      releaseDate: "2024-01-13",
      plays: 11290,
      category: "Diversity"
    },
    {
      id: 6,
      title: "Exit strategier - Hvornår og hvordan sælger man sin startup",
      description: "Dybdegående diskussion om exit muligheder og hvordan man forbereder sin virksomhed til salg.",
      duration: "39:47",
      releaseDate: "2024-01-06",
      plays: 9680,
      category: "Exit"
    }
  ];

  const stats = [
    { label: "Total Downloads", value: "250K+" },
    { label: "Månedlige Lyttere", value: "15K+" },
    { label: "Episodes", value: "85+" },
    { label: "Lande", value: "12+" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${podcastStudio})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-dark/90"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Unge Iværksættere Podcast
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Autentiske historier fra Danmarks unge iværksættere
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="hero">
                <Play className="w-5 h-5 mr-2" />
                Lyt til seneste episode
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                <Download className="w-5 h-5 mr-2" />
                Abonnér på podcast
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Episode */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Fremhævet Episode</h2>
            <p className="text-lg text-muted-foreground">
              Denne uge's must-listen episode
            </p>
          </div>

          <Card className="max-w-4xl mx-auto bg-white shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <Badge variant="secondary">{featuredEpisode.category}</Badge>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Headphones className="w-4 h-4" />
                    {featuredEpisode.plays.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredEpisode.duration}
                  </div>
                </div>
              </div>
              <CardTitle className="text-2xl md:text-3xl">{featuredEpisode.title}</CardTitle>
              <CardDescription className="text-lg">{featuredEpisode.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1" variant="orange">
                  <Play className="w-5 h-5 mr-2" />
                  Afspil Episode
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="w-5 h-5 mr-2" />
                  Download
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Udgivet {new Date(featuredEpisode.releaseDate).toLocaleDateString('da-DK', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Episodes */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Seneste Episodes</h2>
            <p className="text-lg text-muted-foreground">
              Gå ikke glip af vores nyeste indhold
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentEpisodes.map((episode) => (
              <Card key={episode.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{episode.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {episode.duration}
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{episode.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{episode.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(episode.releaseDate).toLocaleDateString('da-DK')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Headphones className="w-4 h-4" />
                        {episode.plays.toLocaleString()}
                      </div>
                    </div>
                    <Button className="w-full" variant="orange">
                      <Play className="w-4 h-4 mr-2" />
                      Afspil
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Se alle episodes
            </Button>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Lyt overalt</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Find vores podcast på alle dine foretrukne platforme
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Spotify', 'Apple Podcasts', 'Google Podcasts', 'YouTube', 'SoundCloud'].map((platform) => (
                <Button key={platform} variant="outline" size="lg">
                  {platform}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-orange to-orange-dark">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Få besked om nye episodes
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Tilmeld dig vores nyhedsbrev og vær den første til at høre nye episodes
            </p>
            <Button size="lg" variant="hero">
              Tilmeld dig nyhedsbrev
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Podcast;