import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const NewsletterSection = () => {
  const handleEventSignup = () => {
    window.open('https://luma.com/evt-A5G3A6rtxyl1DBR', '_blank');
  };

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center bg-background/50 backdrop-blur-sm rounded-4xl p-12 shadow-large">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tilmeld dig vores næste event</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Kom og mød andre unge iværksættere, få inspiration og byg dit netværk. Gratis deltagelse!
          </p>
          
          <div className="space-y-6 max-w-lg mx-auto mb-4">
            <div className="bg-primary/10 rounded-3xl p-6 mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Calendar className="w-8 h-8 text-primary" />
                <span className="text-xl font-anton font-bold text-primary">Næste Event</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Simon Schiølin & Christoffer Sloth - Aarhus Event
              </p>
            </div>
            
            <Button 
              onClick={handleEventSignup}
              variant="orange" 
              className="w-full text-lg py-3 font-dm-sans font-bold"
            >
              🎯 Tilmeld dig eventet
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Gratis deltagelse - Begrænsede pladser tilgængelige
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;