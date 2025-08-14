import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Play, Calendar, Clock, Download, Headphones, Search, Filter } from "lucide-react";
import podcastStudio from "@/assets/podcast-studio.jpg";

const Podcast = () => {
  const featuredEpisode = {
    id: 1,
    title: "En ærlig snak om bæredygtigt iværksætteri med Gittemarie",
    description: "Dybdegående samtale om at bygge bæredygtige forretninger og navigere i grønne trends.",
    duration: "1:02:57",
    plays: "18.5k",
    likes: "342",
    category: "Bæredygtighed"
  };

  const episodes = [
    {
      id: 2,
      title: "Du Bliver ALDRIG Til Noget Fazel",
      description: "Inspirerende historie om at overvinde udfordringer og bygge succes mod alle odds.",
      duration: "53 min",
      plays: "24.1k",
      likes: "456",
      category: "Motivation"
    },
    {
      id: 3,
      title: "Manden bag Doubles",
      description: "Fra idé til millionforretning - historien om at skabe Danmarks nye modebrand.",
      duration: "47 min", 
      plays: "16.7k",
      likes: "298",
      category: "Fashion"
    },
    {
      id: 4,
      title: "Fundraising secrets med Martin fra Pleo",
      description: "Insider tips til at sikre funding fra en der har været med til at rejse over 1 milliard.",
      duration: "38 min",
      plays: "21.2k", 
      likes: "387",
      category: "Funding"
    },
    {
      id: 5,
      title: "Tech trends 2024: AI og startup-økosystemet",
      description: "Hvordan kan AI revolutionere startup landskabet? Eksperter deler deres forudsigelser.",
      duration: "45 min",
      plays: "19.3k",
      likes: "334",
      category: "Tech"
    },
    {
      id: 6,
      title: "LouLiving: Sådan blev jeg iværksætter",
      description: "Personlig historie om iværksætterrejsen og de lektioner læret undervejs.",
      duration: "41 min",
      plays: "14.2k",
      likes: "267",
      category: "Interviews"
    }
  ];

  const categories = ["All", "Bæredygtighed", "Motivation", "Fashion", "Funding", "Tech", "Interviews"];

  const faqData = [
    {
      question: "Hvad er Unge Iværksættere?",
      answer: "Unge Iværksættere er Danmarks største community for startup-entreprenører under 35 år."
    },
    {
      question: "Hvem kan deltage i jeres events?",
      answer: "Alle interesserede i startup og entrepreneurship er velkommen - fra idéstadiet til etablerede iværksættere."
    },
    {
      question: "Koster det noget at deltage?",
      answer: "De fleste af vores events er gratis. Enkelte workshops kan have en lille deltagerbetaling."
    },
    {
      question: "Hvor afholdes jeres events?",
      answer: "Vi afholder events i hele Danmark - primært i København, Aarhus og online."
    },
    {
      question: "Kan jeg blive speaker på jeres events?",
      answer: "Ja! Vi er altid på udkig efter inspirerende speakers. Kontakt os for mere information."
    },
    {
      question: "Hvordan kan min virksomhed blive sponsor?",
      answer: "Vi tilbyder forskellige sponsormuligheder. Send os en mail for at høre mere om mulighederne."
    }
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
              👑 Vi er pt sponsoreret af <span className="font-dm-sans font-bold">TechSavvy & StartupDK</span> - tak for jeres støtte!
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
            <div className="relative rounded-lg overflow-hidden bg-muted">
              {/* Podcast Player Mockup */}
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
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
            </div>
            
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary font-dm-sans">Bæredygtighed</Badge>
              <h2 className="text-3xl font-anton text-foreground">
                {featuredEpisode.title}
              </h2>
              <p className="text-muted-foreground font-inter">
                {featuredEpisode.description}
              </p>
              
              <div className="flex items-center gap-6 text-sm font-inter text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {featuredEpisode.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Play className="w-4 h-4" />
                  {featuredEpisode.plays} plays
                </div>
                <div className="flex items-center gap-1">
                  ❤️ {featuredEpisode.likes}
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-dm-sans font-bold px-8">
                  ▶ Lyt Nu
                </Button>
                <Button variant="outline" className="font-dm-sans font-bold">
                  🎧 Spotify
                </Button>
                <span className="flex items-center text-sm font-inter text-muted-foreground">
                  Save on Spotify
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Søg efter episodes..." 
                className="pl-10 font-inter"
              />
            </div>
            <Button variant="outline" className="font-dm-sans font-bold">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="font-dm-sans font-bold"
              >
                {category}
              </Button>
            ))}
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
          
          <div className="max-w-2xl mx-auto bg-muted/50 rounded-lg p-8 text-center">
            <div className="text-muted-foreground font-inter">
              [Spotify Embed Placeholder - Integration kommer snart]
            </div>
            <div className="mt-6 flex gap-4 justify-center">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-dm-sans font-bold">
                📱 Følg på Spotify
              </Button>
              <Button variant="outline" className="font-dm-sans font-bold">
                🍎 Apple Podcasts
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* All Episodes */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-anton text-foreground mb-8">Alle Episodes (6)</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {episodes.map((episode) => (
              <Card key={episode.id} className="border-border">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Podcast Player Mockup */}
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                          <Play className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <Badge className="bg-primary/10 text-primary text-xs">{episode.category}</Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-lg font-dm-sans font-bold text-foreground line-clamp-2">
                        {episode.title}
                      </h4>
                      <p className="text-sm text-muted-foreground font-inter line-clamp-2">
                        {episode.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-inter">
                      <span>⏱️ {episode.duration}</span>
                      <span>▶ {episode.plays}</span>
                      <span>❤️ {episode.likes}</span>
                    </div>
                    
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-dm-sans font-bold">
                      ▶ Lyt
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-lg p-8 text-center text-primary-foreground">
            <h3 className="text-2xl font-anton mb-4">
              Få besked om nye episodes
            </h3>
            <p className="font-inter mb-6 opacity-90">
              Tilmeld dig vores newsletter og vær den første til at høre nye podcast episodes.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input 
                placeholder="Din email adresse" 
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 font-inter"
              />
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-dm-sans font-bold">
                Tilmeld
              </Button>
            </div>
          </div>
        </div>
      </section>

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