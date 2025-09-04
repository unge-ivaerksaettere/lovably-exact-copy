import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import { EventRegistrationDialog } from "@/components/EventRegistrationDialog";
import NewsletterEventButton from "@/components/NewsletterEventButton";
import { format } from "date-fns";
import { da } from "date-fns/locale";
import eventPlaceholder from "@/assets/event-networking.jpg";

const Events = () => {
  const { data: upcomingEvents = [], isLoading: upcomingLoading } = useEvents('upcoming');
  const { data: pastEvents = [], isLoading: pastLoading } = useEvents('past');
  
  const featuredEvent = upcomingEvents.find(event => event.featured) || upcomingEvents[0];
  const regularUpcomingEvents = upcomingEvents.filter(event => event.id !== featuredEvent?.id);

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'dd.MM.yyyy', { locale: da });
    } catch {
      return dateStr;
    }
  };

  const formatTime = (timeStr: string | null) => {
    if (!timeStr) return null;
    return timeStr.slice(0, 5); // Format HH:MM
  };

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
              Startup Events
            </h1>
            <p className="text-lg font-inter text-muted-foreground max-w-2xl mx-auto mb-12">
              Læs om Unge Iværksætteres mange successer, hvor anerkendte iværksættere har delt deres viden og erfaring med vores visionære deltagere.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      {featuredEvent && (
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
                  src={featuredEvent.image_url || eventPlaceholder} 
                  alt={featuredEvent.title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-4 left-4 space-x-2">
                  <Badge className="bg-background/80 text-foreground">Networking</Badge>
                  <Badge className="bg-background/80 text-foreground">Startup</Badge>
                  <Badge className="bg-background/80 text-foreground">Event</Badge>
                </div>
                <div className="absolute bottom-4 left-4 bg-foreground/80 text-background px-3 py-1 rounded text-sm font-inter">
                  📅 {formatDate(featuredEvent.event_date)} {featuredEvent.event_time && `⏰ ${formatTime(featuredEvent.event_time)}`}
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
                  {featuredEvent.location && (
                    <div className="flex items-center gap-2 text-sm font-inter text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      {featuredEvent.location}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm font-inter text-muted-foreground">
                    <Users className="w-4 h-4 text-primary" />
                    {featuredEvent.current_attendees} deltagere
                    {featuredEvent.max_attendees && ` / ${featuredEvent.max_attendees} max`}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-inter text-primary">
                    🎟️ Gratis deltagelse
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <EventRegistrationDialog event={featuredEvent}>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-dm-sans font-bold px-8">
                      Tilmeld dig nu →
                    </Button>
                  </EventRegistrationDialog>
                  <span className="flex items-center text-sm font-inter text-muted-foreground">
                    Åbent for tilmelding
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Events Tabs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-fit grid-cols-2 mb-12">
              <TabsTrigger value="upcoming" className="font-dm-sans font-bold">
                Kommende Events ({upcomingEvents.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="font-dm-sans font-bold">
                Tidligere Events ({pastEvents.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              {upcomingLoading ? (
                <div className="text-center">Loader events...</div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                  {regularUpcomingEvents.map((event) => (
                    <Card key={event.id} className="p-6 border-border">
                      <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-6 mx-auto">
                        <Calendar className="w-8 h-8 text-primary" />
                      </div>
                      
                      <div className="text-center space-y-4">
                        <h3 className="text-xl font-dm-sans font-bold text-foreground">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground font-inter text-sm">
                          {event.description}
                        </p>
                        
                        <div className="space-y-2 text-sm font-inter">
                          <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {formatDate(event.event_date)} {event.event_time && `⏰ ${formatTime(event.event_time)}`}
                          </div>
                          {event.location && (
                            <div className="flex items-center justify-center gap-2 text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </div>
                          )}
                          <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <Users className="w-4 h-4" />
                            {event.current_attendees} deltagere
                            {event.max_attendees && ` (${event.max_attendees - event.current_attendees} pladser tilbage)`}
                          </div>
                          <div className="text-primary">
                            🎟️ Gratis
                          </div>
                        </div>
                        
                        <EventRegistrationDialog event={event}>
                          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-dm-sans font-bold mt-6">
                            Tilmeld dig
                          </Button>
                        </EventRegistrationDialog>
                      </div>
                    </Card>
                  ))}
                  {regularUpcomingEvents.length === 0 && !upcomingLoading && (
                    <div className="col-span-2 text-center text-muted-foreground">
                      Ingen kommende events i øjeblikket
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="past">
              {pastLoading ? (
                <div className="text-center">Loader tidligere events...</div>
              ) : (
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                  {pastEvents.map((event) => (
                    <Card key={event.id} className="p-4 border-border">
                      <div className="text-center space-y-3">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto">
                          <Calendar className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-dm-sans font-bold text-foreground">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground font-inter text-sm">
                          {event.description}
                        </p>
                        <div className="text-xs text-muted-foreground font-inter space-y-1">
                          <div>📅 {formatDate(event.event_date)}</div>
                          {event.location && <div>📍 {event.location}</div>}
                          <div>👥 {event.current_attendees} deltagere</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                  {pastEvents.length === 0 && !pastLoading && (
                    <div className="col-span-3 text-center text-muted-foreground">
                      Ingen tidligere events endnu
                    </div>
                  )}
                </div>
              )}
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
            <NewsletterEventButton />
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