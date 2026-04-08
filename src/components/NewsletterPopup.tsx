import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar } from "lucide-react";

interface NewsletterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterPopup = ({ isOpen, onClose }: NewsletterPopupProps) => {
  const handleEventSignup = () => {
    window.open('https://luma.com/iv9l8895', '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 bg-gradient-to-br from-primary to-secondary border-0 text-white overflow-hidden">
        <div className="relative p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-anton mb-2 text-white">
              Tilmeld dig vores næste event!
            </h2>
            <div className="text-2xl mb-4">🎯</div>
            <p className="text-white/90 text-sm leading-relaxed font-inter">
              Kom og mød andre unge iværksættere, få inspiration<br />
              og byg dit netværk. Gratis deltagelse!
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white/10 rounded-2xl p-4 text-center">
              <p className="text-white font-dm-sans font-bold mb-2">Benjamin Philip & Frederik Hørning</p>
              <p className="text-white/80 text-sm">Aarhus Event - Gratis deltagelse</p>
            </div>
            
            <Button 
              onClick={handleEventSignup}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-dm-sans font-bold py-3"
            >
              🚀 Tilmeld dig eventet
            </Button>

            <Button 
              onClick={onClose}
              variant="ghost"
              className="w-full text-white/80 hover:text-white hover:bg-white/10"
            >
              Måske senere
            </Button>
          </div>

          <p className="text-xs text-white/70 text-center mt-4 font-inter">
            Begrænsede pladser tilgængelige - Tilmeld dig nu!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterPopup;