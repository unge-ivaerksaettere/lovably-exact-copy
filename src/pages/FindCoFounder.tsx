import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Heart, Share, Lightbulb, TrendingUp, Clock, Globe, Users } from "lucide-react";

const FindCoFounder = () => {
  const featuredIdea = {
    id: 1,
    title: "AI-Powered Energy Optimization for SMEs",
    description: "Platform der bruger machine learning til at optimere energiforbrug for små og mellemstore virksomheder. Automatisk analyse af energimønstre og forslag til besparelser.",
    marketSize: "€2.3B i Europa",
    difficulty: "Medium",
    timeToMarket: "12-18 måneder", 
    inspiration: "Y Combinator",
    tags: ["AI", "Energy", "B2B", "Sustainability"],
    likes: 89,
    category: "ClimaTech"
  };

  const projects = [
    {
      id: 2,
      title: "Mental Health for Remote Workers",
      description: "Digital platform med personaliserede mental health programmer specifikt designet til remote workers. Inkluderer peer support og AI coaching.",
      marketSize: "€4.1B globalt",
      timeToMarket: "18-24 måneder",
      source: "Væksthuset",
      tags: ["Mental Health", "Remote Work", "B2B"],
      difficulty: "Hard",
      likes: 156,
      category: "HealthTech"
    },
    {
      id: 3,
      title: "Micro-Investment Platform for Gen Z",
      description: "Social investment app der lader unge investere fra 1 DKK med gamification og uddannelse. Think TikTok møder Nordnet.",
      marketSize: "€890M i Norden",
      timeToMarket: "24+ måneder",
      source: "BlackRock Trends",
      tags: ["Investing", "Gen Z", "Social"],
      difficulty: "Hard", 
      likes: 203,
      category: "FinTech"
    },
    {
      id: 4,
      title: "Local Food Waste Marketplace",
      description: "App der forbinder restauranter med overskudsmad til forbrugere. Dynamic pricing baseret på udløbsdato.",
      marketSize: "€1.2B i EU",
      timeToMarket: "6-12 måneder",
      source: "EU Green Deal",
      tags: ["Food Waste", "Marketplace", "Sustainability"],
      difficulty: "Medium",
      likes: 134,
      category: "ClimaTech"
    },
    {
      id: 5,
      title: "AI Tutor for Danish Students",
      description: "Personaliseret AI-tutor der hjælper danske elever med lektier på dansk. Integrerer med uddannelsessystemet og følger curriculum.",
      marketSize: "€340M i Danmark",
      timeToMarket: "18-24 måneder",
      source: "Nordic EdTech",
      tags: ["AI", "Education", "Danish"],
      difficulty: "Hard",
      likes: 92,
      category: "EdTech"
    },
    {
      id: 6,
      title: "Smart Parking for Copenhagen",
      description: "IoT-baseret smart parking system for København med real-time availability og dynamic pricing. API integration til Google Maps.",
      marketSize: "€180M lokalt",
      timeToMarket: "12-15 måneder",
      source: "Copenhagen Solutions",
      tags: ["IoT", "Smart City", "Copenhagen"],
      difficulty: "Medium",
      likes: 78,
      category: "IoT"
    }
  ];

  const categories = ["All", "FinTech", "HealthTech", "ClimaTech", "EdTech", "E-commerce", "SaaS", "IoT"];

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Hard": return "bg-red-100 text-red-800";
      case "Medium": return "bg-orange-100 text-orange-800";
      default: return "bg-green-100 text-green-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-anton text-foreground mb-6">
              Bliv en del af et iværksætter-team
            </h1>
            <p className="text-lg font-inter text-muted-foreground max-w-3xl mx-auto mb-12">
              Har du en idé til en virksomhed eller vil du være med til at bygge noget fedt? Find ligesindede medstiftere og byg dit drømme-team her.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Idea */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Badge className="bg-secondary text-secondary-foreground font-dm-sans font-bold">
              💡 Featured Idea
            </Badge>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-primary via-teal-500 to-secondary p-8">
              {/* Startup Idea Visualization */}
              <div className="text-center space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-primary/20 text-primary-foreground">ClimaTech</Badge>
                  <Badge className={`${getDifficultyColor(featuredIdea.difficulty)}`}>Medium</Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-xs text-primary-foreground/80">STARTUP</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Lightbulb className="w-8 h-8 text-gray-900" />
                    </div>
                    <div className="text-xs text-primary-foreground/80">IDEA</div>
                  </div>
                  <div className="text-center">
                    <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-xs text-primary-foreground/80">€2.3B i Europa</div>
                  </div>
                </div>
                
                <div className="text-sm text-primary-foreground/80">12-18 måneder</div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-anton text-foreground">
                {featuredIdea.title}
              </h2>
              <p className="text-muted-foreground font-inter">
                {featuredIdea.description}
              </p>
              
              <div className="space-y-3 text-sm font-inter">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Market Size:</span>
                  <span className="font-semibold">{featuredIdea.marketSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Difficulty:</span>
                  <Badge className={getDifficultyColor(featuredIdea.difficulty)}>{featuredIdea.difficulty}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time to Market:</span>
                  <span className="font-semibold">{featuredIdea.timeToMarket}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Inspiration:</span>
                  <span className="text-primary font-semibold">{featuredIdea.inspiration}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {featuredIdea.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="font-inter">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-dm-sans font-bold">
                  🔍 Research More
                </Button>
                <Button variant="outline" className="font-dm-sans font-bold">
                  ❤️ {featuredIdea.likes}
                </Button>
                <Button variant="ghost" size="icon">
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Submit */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Søg efter startup idéer..." 
                className="pl-10 font-inter"
              />
            </div>
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-dm-sans font-bold">
              ➕ Submit Idé
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

      {/* Current Projects */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-anton text-foreground mb-4">Aktuelle Projekter & Idéer (6)</h3>
          <p className="text-muted-foreground font-inter mb-8">
            Find ligesindede til dit projekt eller bliv en del af eksisterende teams. Alle idéer gennemgår grundig due diligence for at sikre kvalitet og seriøsitet.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="border-border">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className="bg-primary/10 text-primary text-xs">{project.category}</Badge>
                    <Badge className={getDifficultyColor(project.difficulty)}>{project.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-lg font-dm-sans font-bold text-foreground">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground font-inter">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-xs font-inter">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">💰 Market Size:</span>
                      <span className="font-semibold">{project.marketSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">⏰ Time to Market:</span>
                      <span className="font-semibold">{project.timeToMarket}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">🎯 Source:</span>
                      <span className="text-primary font-semibold">{project.source}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs font-inter">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-dm-sans font-bold text-sm">
                      🔍 Research
                    </Button>
                    <Button variant="outline" size="sm" className="font-dm-sans">
                      ❤️ {project.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-lg p-8 text-center text-primary-foreground">
            <div className="flex items-center justify-center w-16 h-16 bg-primary-foreground/20 rounded-lg mx-auto mb-6">
              <Lightbulb className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-anton mb-4">
              Klar til at finde dit team?
            </h3>
            <p className="font-inter mb-6 opacity-90">
              Del dit projekt med community'et og find medstiftere der brænder for samme vision. Sammen kan I bygge noget fantastisk!
            </p>
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-dm-sans font-bold px-8">
              ➕ Opret Dit Projekt
            </Button>
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

export default FindCoFounder;