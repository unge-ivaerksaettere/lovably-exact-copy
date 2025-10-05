import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const NewsletterPodcast = () => {
  const handleEventSignup = () => {
    window.open('https://luma.com/t0s5h2fq', '_blank');
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-primary rounded-lg p-8 text-center text-primary-foreground">
          <h3 className="text-2xl font-anton mb-4">
            Tilmeld dig vores næste event
          </h3>
          <p className="font-inter mb-6 opacity-90">
            Kom og mød andre unge iværksættere, få inspiration og byg dit netværk.
          </p>
          
          <div className="space-y-4 max-w-md mx-auto">
            <div className="bg-primary-foreground/10 rounded-3xl p-4 mb-4">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Calendar className="w-6 h-6 text-primary-foreground" />
                <span className="font-dm-sans font-bold text-primary-foreground">Simon Schiølin & Christoffer Sloth</span>
              </div>
              <p className="text-sm text-primary-foreground/80">
                Aarhus Event - Gratis deltagelse
              </p>
            </div>
            
            <Button 
              onClick={handleEventSignup}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-dm-sans font-bold"
            >
              🎯 Tilmeld dig eventet
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterPodcast;