import { Button } from "@/components/ui/button";
import { Mic, Calendar, Instagram, Linkedin, Youtube } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
          <span className="text-2xl">🚀</span>
          <span className="text-sm font-medium">Danmarks største startup community</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Fra idé til <span className="text-primary">iværksætter</span>
        </h1>
        
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-white/90">
          Vores events er stedet, hvor unge iværksættere mødes. Kom og få nye ideer, mød andre iværksættere og få inspiration fra erfarne iværksættere. Gratis deltagelse!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="https://open.spotify.com/show/154B6QakpSESlOKiFkiDyk?si=feba03d657fa48d3" target="_blank" rel="noopener noreferrer">
            <Button variant="default" size="lg" className="gap-2">
              <Mic className="w-4 h-4" />
              Lyt til Podcast
            </Button>
          </a>
          <a href="https://lu.ma/h3mxyxhi" target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="lg" className="gap-2">
              <Calendar className="w-4 h-4" />
              Se Kommende Events
            </Button>
          </a>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-white/80">Medlemmer</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-white/80">Podcast Episodes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">25+</div>
            <div className="text-sm text-white/80">Events Afholdt</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100+</div>
            <div className="text-sm text-white/80">Startups Skabt</div>
          </div>
        </div>
        
        {/* Social Links */}
        <div className="flex items-center justify-center gap-6">
          <span className="text-sm text-white/80">Følg os:</span>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/ivaerksaettere/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;