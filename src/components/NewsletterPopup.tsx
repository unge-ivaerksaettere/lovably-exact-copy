import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface NewsletterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterPopup = ({ isOpen, onClose }: NewsletterPopupProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionTypes, setSubscriptionTypes] = useState({
    events: true,
    podcast: false,
    general: true
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Fejl",
        description: "Indtast venligst din email adresse",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('mailerlite-subscribe', {
        body: { 
          email,
          subscriptionTypes
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Tak!",
        description: "Du er nu tilmeldt vores newsletter!",
      });
      setEmail("");
      onClose();
    } catch (error: any) {
      console.error('Newsletter signup error:', error);
      toast({
        title: "Fejl",
        description: error.message || "Der skete en fejl. Prøv igen senere.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
              disabled={isLoading}
              className="bg-white border-0 text-foreground placeholder:text-muted-foreground font-inter"
            />
            
            <div className="space-y-3">
              <p className="text-white/90 text-sm font-inter">Hvad vil du modtage?</p>
              <div className="space-y-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subscriptionTypes.events}
                    onChange={(e) => setSubscriptionTypes(prev => ({...prev, events: e.target.checked}))}
                    className="rounded border-white/30 bg-white/20 text-secondary focus:ring-secondary"
                  />
                  <span className="text-white/90 text-sm font-inter">📅 Events</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subscriptionTypes.podcast}
                    onChange={(e) => setSubscriptionTypes(prev => ({...prev, podcast: e.target.checked}))}
                    className="rounded border-white/30 bg-white/20 text-secondary focus:ring-secondary"
                  />
                  <span className="text-white/90 text-sm font-inter">🎧 Podcast</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subscriptionTypes.general}
                    onChange={(e) => setSubscriptionTypes(prev => ({...prev, general: e.target.checked}))}
                    className="rounded border-white/30 bg-white/20 text-secondary focus:ring-secondary"
                  />
                  <span className="text-white/90 text-sm font-inter">📰 Generelle nyheder</span>
                </label>
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading || (!subscriptionTypes.events && !subscriptionTypes.podcast && !subscriptionTypes.general)}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-dm-sans font-bold py-3"
            >
              {isLoading ? "Tilmelder..." : "Tilmeld mig gratis!"}
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