import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

const Events = () => {
  const featuredEvent = {
    id: 1,
    title: "Jesper Theil Thomsen - Soundboks Success Story",
    description: "Hør CEO & Founder af Soundboks dele sin rejse fra startup til international succes og få indsigt i at bygge et hardware startup.",
    date: "28.2.2024",
    time: "18:00 - 20:30",
    location: "Innovation Lab, København",
    attendees: "95/120 tilmeldte",
    isFree: true,
    image: "/lovable-uploads/5fbda5c2-d6ad-4437-ac2c-5e5b1182b6c3.png"
  };

  const upcomingEvents = [
    {
      id: 2,
      title: "Mads Andreas Olesen - MXNEY.IO Insights",
      description: "Få indsigt i fintech-verdenen med grundlæggeren af MXNEY.IO og lær om digitale finansielle løsninger.",
      date: "8.3.2024",
      time: "17:00 - 19:30",
      location: "Fintech Hub, København",
      attendees: "67 tilmeldte",
      spots: "23 pladser tilbage",
      isFree: true
    },
    {
      id: 3,
      title: "Lasse Søkilde - BOLD Brand Building",
      description: "Lær hvordan du bygger stærke brands fra grundlæggeren af BOLD og få praktiske tips til branding.",
      date: "15.3.2024", 
      time: "18:00 - 20:00",
      location: "Creative Space, Aarhus",
      attendees: "52 tilmeldte",
      spots: "18 pladser tilbage",
      isFree: true
    },
    {
      id: 4,
      title: "Daniel Pedersen - Finansiel Rådgivning for Startups",
      description: "Få praktiske tips om økonomistyring og investering fra Daniels Pengetips til din startup-rejse.",
      date: "22.3.2024",
      time: "16:00 - 18:30",
      location: "Business Center, Odense",
      attendees: "38 tilmeldte",
      spots: "12 pladser tilbage",
      isFree: true
    }
  ];

  const pastEvents = [
    {
      id: 5,
      title: "Kasper Knudsen - Sedia Success Story",
      description: "En inspirerende session med Founder og CEO af Sedia ApS om at skalere tech-virksomheder.",
      date: "25.1.2024",
      location: "Tech Hub, København",
      attendees: "108 deltagere",
      image: "/lovable-uploads/1b549c9d-7beb-410e-90af-e99334c162a1.png"
    },
    {
      id: 6,
      title: "Anthon Louis - Serieiværksætter Panel",
      description: "Lær fra en erfaren serieiværksætter bag Arch, Museo & Bareen om at bygge flere virksomheder.",
      date: "18.1.2024",
      location: "Innovation House, Aarhus",
      attendees: "87 deltagere",
      image: "/lovable-uploads/8ab590b9-7053-41cb-bd8d-926692366d99.png"
    },
    {
      id: 7,
      title: "Networking & Startup Showcase",
      description: "En aften med networking, pitches og inspirerende samtaler mellem unge iværksættere.",
      date: "11.1.2024",
      location: "Startup Community, København",
      attendees: "142 deltagere",
      image: "/lovable-uploads/1b549c9d-7beb-410e-90af-e99334c162a1.png"
    }
  ];

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
              Startup Events
            </h1>
            <p className="text-lg font-inter text-muted-foreground max-w-2xl mx-auto mb-12">
              Deltag i Danmarks mest inspirerende startup events. Netværk, lær og voks sammen med andre ambitiøse iværksættere.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Badge className="bg-secondary text-secondary-foreground font-dm-sans font-bold">
              🔥 Featured Event
            </Badge>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={featuredEvent.image} 
                alt={featuredEvent.title}
                className="w-full h-80 object-cover"
              />
              <div className="absolute top-4 left-4 space-x-2">
                <Badge className="bg-background/80 text-foreground">Networking</Badge>
                <Badge className="bg-background/80 text-foreground">Pitching</Badge>
                <Badge className="bg-background/80 text-foreground">Investorer</Badge>
              </div>
              <div className="absolute bottom-4 left-4 bg-foreground/80 text-background px-3 py-1 rounded text-sm font-inter">
                📅 {featuredEvent.date} ⏰ {featuredEvent.time}
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-anton text-foreground">
                {featuredEvent.title}
              </h2>
              <p className="text-muted-foreground font-inter">
                {featuredEvent.description}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-inter text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  {featuredEvent.location}
                </div>
                <div className="flex items-center gap-2 text-sm font-inter text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  {featuredEvent.attendees}
                </div>
                <div className="flex items-center gap-2 text-sm font-inter text-primary">
                  🎟️ Gratis deltagelse
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-dm-sans font-bold px-8">
                  Tilmeld dig nu →
                </Button>
                <span className="flex items-center text-sm font-inter text-muted-foreground">
                  På påmeldelse
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Tabs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-fit grid-cols-2 mb-12">
              <TabsTrigger value="upcoming" className="font-dm-sans font-bold">
                Kommende Events (3)
              </TabsTrigger>
              <TabsTrigger value="past" className="font-dm-sans font-bold">
                Tidligere Events (3)
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="p-6 border-border">
                    <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-6 mx-auto">
                      <Calendar className="w-8 h-8 text-primary" />
                    </div>
                    
                    <div className="text-center space-y-4">
                      <h3 className="text-lg font-dm-sans font-bold text-foreground">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground font-inter text-sm">
                        {event.description}
                      </p>
                      
                      <div className="space-y-2 text-sm font-inter">
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {event.date} ⏰ {event.time}
                        </div>
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {event.attendees}
                        </div>
                        <div className="text-primary">
                          🎟️ Gratis
                        </div>
                      </div>
                      
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-dm-sans font-bold mt-6">
                        Tilmeld dig
                      </Button>
                      
                      <p className="text-xs text-muted-foreground font-inter">
                        {event.spots}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past">
              <div className="grid md:grid-cols-3 gap-6 mb-16">
                {pastEvents.map((event) => (
                  <Card key={event.id} className="p-4 border-border overflow-hidden">
                    {event.image && (
                      <div className="mb-4 -mx-4 -mt-4">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    )}
                    <div className="text-center space-y-3">
                      {!event.image && (
                        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto">
                          <Calendar className="w-6 h-6 text-primary" />
                        </div>
                      )}
                      <h3 className="text-lg font-dm-sans font-bold text-foreground">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground font-inter text-sm">
                        {event.description}
                      </p>
                      <div className="text-xs text-muted-foreground font-inter space-y-1">
                        <div>📅 {event.date}</div>
                        <div>📍 {event.location}</div>
                        <div>👥 {event.attendees}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* CTA Section */}
          <div className="bg-primary rounded-lg p-8 text-center text-primary-foreground">
            <div className="flex items-center justify-center w-16 h-16 bg-primary-foreground/20 rounded-lg mx-auto mb-6">
              <Calendar className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-anton mb-4">
              Meld dig til vores events
            </h3>
            <p className="font-inter mb-6 opacity-90">
              Få besked om nye events og vær blandt de første til at sikre din plads til Danmarks bedste startup arrangementer.
            </p>
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-dm-sans font-bold px-8">
              Tilmeld Event Newsletter
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

export default Events;