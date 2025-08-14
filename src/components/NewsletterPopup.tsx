import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Mail } from "lucide-react";

interface NewsletterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterPopup = ({ isOpen, onClose }: NewsletterPopupProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 bg-gradient-to-br from-primary to-secondary border-0 text-white overflow-hidden">
        <div className="relative p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-anton mb-2 text-white">
              Bliv en del af startup-fællesskabet!
            </h2>
            <div className="text-2xl mb-4">🚀</div>
            <p className="text-white/90 text-sm leading-relaxed font-inter">
              Få de seneste startup nyheder, eksklusive podcast episodes<br />
              og event invitationer direkte i din indbakke.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Din email adresse"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white border-0 text-foreground placeholder:text-muted-foreground font-inter"
            />
            <Button 
              type="submit" 
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-dm-sans font-bold py-3"
            >
              Tilmeld mig gratis!
            </Button>
          </form>

          <p className="text-xs text-white/70 text-center mt-4 font-inter">
            Vi sender kun kvalitetsindhold. Ingen spam. Afmeld når som helst.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterPopup;