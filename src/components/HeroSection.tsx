import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Users, Lightbulb } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary border-primary/20 font-dm-sans font-bold">
                🚀 Netværk for unge iværksættere
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-anton text-foreground leading-tight">
                Netværk for unge 
                <span className="text-primary block">iværksættere</span>
              </h1>
              
              <p className="text-lg font-inter text-muted-foreground max-w-xl">
                Vores events er stedet, hvor unge iværksættere mødes. Kom og få nye ideer, mød andre iværksættere og få inspiration fra erfarne iværksættere. Kom med til vores næste event og bliv en del af fællesskabet.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg border border-border">
                <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                  <span className="text-green-500 text-sm font-bold">✓</span>
                </div>
                <span className="font-inter text-sm text-muted-foreground">Gratis deltagelse</span>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg border border-border">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-inter text-sm text-muted-foreground">Mulighed for networking</span>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg border border-border">
                <Lightbulb className="w-5 h-5 text-primary" />
                <span className="font-inter text-sm text-muted-foreground">Vidensdeling fra erfarne iværksættere</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-dm-sans font-bold px-8 py-3">
                <Calendar className="w-4 h-4 mr-2" />
                Se næste event
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <Button variant="outline" className="font-dm-sans font-bold px-8 py-3 border-border">
                Lær mere om os
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm font-inter text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Aalborg • Aarhus • København
              </div>
              <div>Events hver måned</div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src={heroImage} 
                alt="Unge iværksættere netværker til event" 
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4 border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-dm-sans font-bold text-foreground">Næste event</p>
                      <p className="font-inter text-sm text-muted-foreground">København • 28. februar</p>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">Live</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;