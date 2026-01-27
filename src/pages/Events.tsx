import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Users, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Events = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-20 pb-8 md:pb-16 bg-gradient-subtle overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-sm font-dm-sans font-bold text-primary">Kommende Events</span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-anton font-bold mb-6 text-foreground">
              Vores <span className="text-primary">Events</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-inter leading-relaxed">
              Meld dig til vores kommende events og netværk med andre unge iværksættere. 
              Få inspiration, læring og værdifulde kontakter i Danmarks største frivillige fællesskab for unge iværksættere.
            </p>
          </div>

          {/* Event Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 bg-background/50 backdrop-blur-sm rounded-3xl shadow-soft">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-anton font-bold text-primary mb-2">3000+</div>
              <div className="text-sm text-muted-foreground font-inter">Deltagere</div>
            </div>
            
            <div className="text-center p-6 bg-background/50 backdrop-blur-sm rounded-3xl shadow-soft">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-anton font-bold text-primary mb-2">30+</div>
              <div className="text-sm text-muted-foreground font-inter">Events Afholdt</div>
            </div>
            
            <div className="text-center p-6 bg-background/50 backdrop-blur-sm rounded-3xl shadow-soft">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-anton font-bold text-primary mb-2">Gratis</div>
              <div className="text-sm text-muted-foreground font-inter">Deltagelse</div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Embed Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-anton font-bold mb-4 text-foreground">
                Næste Event
              </h2>
              <p className="text-lg text-muted-foreground font-inter">
                Tilmeld dig og vær med til at bygge Danmarks iværksætter-fremtid
              </p>
            </div>

            {/* Event Card */}
            <div className="bg-gradient-subtle rounded-4xl p-8 md:p-12 shadow-large">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                  <span className="text-2xl">🎯</span>
                  <span className="text-sm font-dm-sans font-bold text-primary">Live Event</span>
                </div>
              </div>

              {/* Iframe Container */}
              <div className="flex justify-center">
                <div className="relative bg-background/50 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-medium w-full max-w-full md:max-w-[600px]">
                  <iframe
                    src="https://luma.com/embed/event/evt-jWCCranVGxjfaOO/simple"
                    className="w-full"
                    width="600"
                    height="450"
                    frameBorder="0"
                    style={{ 
                      border: "1px solid #bfcbda88", 
                      borderRadius: "4px"
                    }}
                    allow="fullscreen; payment"
                    aria-hidden="false"
                    tabIndex={0}
                    title="Unge Iværksættere Event"
                  />
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center mt-8">
                <p className="text-muted-foreground font-inter mb-6">
                  Kan du ikke se eventet? Klik på knappen nedenfor for at tilmelde dig direkte
                </p>
                <Button variant="default" size="lg" className="font-dm-sans font-bold" asChild>
                  <a 
                    href="https://luma.com/jffq7yqn" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Tilmeld dig på Luma
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event CTA */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-anton font-bold mb-4 text-primary-foreground">
              Sikr din plads nu
            </h3>
            <p className="text-primary-foreground/90 font-inter mb-8">
              Begrænsede pladser tilgængelige - Tilmeld dig og vær med til at skabe Danmarks startup-fremtid
            </p>
            <Button 
              variant="secondary" 
              size="lg" 
              className="font-dm-sans font-bold inline-flex items-center gap-2"
              onClick={() => window.open('https://luma.com/jffq7yqn', '_blank')}
            >
              <Calendar className="w-4 h-4" />
              🚀 Tilmeld dig nu
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;