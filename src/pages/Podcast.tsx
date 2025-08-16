import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Play, Calendar, Clock, Download, Headphones } from "lucide-react";
import podcastStudio from "@/assets/podcast-studio.jpg";
import NewsletterPodcast from "@/components/NewsletterPodcast";

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
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-dm-sans font-bold"
                onClick={() => window.open('https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A74063868&keywords=unge%20iv%C3%A6rks%C3%A6ttere&origin=RICH_QUERY_TYPEAHEAD_HISTORY&position=0&searchId=30d10868-d576-4274-8faf-04815d982275&sid=!_y&spellCorrectionEnabled=true', '_blank')}
              >
                🔗 LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* All Episodes */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-anton text-foreground mb-8">Alle Episodes (4)</h3>
          
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