import { Button } from "@/components/ui/button";
import { Mic, Instagram, Linkedin } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import heroImage from "@/assets/event-audience-1.jpg";
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${heroImage})`
    }}>
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-4 text-center text-white">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mt-8 sm:mt-0 mb-12 sm:mb-8">
          <span className="text-xl sm:text-2xl">🚀</span>
          <span className="text-xs sm:text-sm font-dm-sans font-bold">Danmarks største frivillige fællesskab for unge iværksættere</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-anton font-bold mb-6 px-2">
          Fra idé til <span className="text-primary">iværksætter</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl mb-12 max-w-2xl mx-auto text-white/90 font-inter px-2">
          Vores events er stedet, hvor unge iværksættere mødes. Kom og få nye ideer, mød andre iværksættere og få inspiration fra erfarne iværksættere. Gratis deltagelse!
        </p>
        
        <div className="flex justify-center mb-16 px-2">
          <a href="https://open.spotify.com/show/154B6QakpSESlOKiFkiDyk?si=feba03d657fa48d3" target="_blank" rel="noopener noreferrer">
            <Button variant="default" size="lg" className="gap-2 w-full sm:w-auto">
              <Mic className="w-4 h-4" />
              Lyt til Podcast
            </Button>
          </a>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 px-2">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-anton font-bold text-primary mb-2">3000+</div>
            <div className="text-xs sm:text-sm text-white/80 font-inter">deltagere</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-anton font-bold text-primary mb-2">50.000</div>
            <div className="text-xs sm:text-sm text-white/80 font-inter">podcast afspildninger</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-anton font-bold text-primary mb-2">30+</div>
            <div className="text-xs sm:text-sm text-white/80 font-inter">Events Afholdt</div>
          </div>
        </div>
        
        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 px-2 mb-8 sm:mb-0">
          <span className="text-xs sm:text-sm text-white/80 font-inter">Følg os:</span>
          <div className="flex gap-3 sm:gap-4">
            <a href="https://www.instagram.com/ungeivaerksaettere/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A74063868&keywords=unge%20iv%C3%A6rks%C3%A6ttere&origin=RICH_QUERY_TYPEAHEAD_HISTORY&position=0&searchId=30d10868-d576-4274-8faf-04815d982275&sid=!_y&spellCorrectionEnabled=true" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://www.tiktok.com/@ungeivaerksaettere" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              <FaTiktok className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;