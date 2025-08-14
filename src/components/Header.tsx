import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import uiLogo from "@/assets/ui-logo.png";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { X, Mail } from "lucide-react";

const Header = () => {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [email, setEmail] = useState("");
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

    setIsSubscribing(true);

    try {
      const { data, error } = await supabase.functions.invoke('mailerlite-subscribe', {
        body: { email }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Tak!",
        description: "Du er nu tilmeldt vores newsletter!",
      });
      setEmail("");
      setShowDialog(false);
    } catch (error: any) {
      console.error('Newsletter signup error:', error);
      toast({
        title: "Fejl",
        description: error.message || "Der skete en fejl. Prøv igen senere.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };
  return (
    <header className="w-full bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={uiLogo} alt="Unge Iværksættere" className="w-8 h-8" />
          <span className="font-dm-sans font-bold text-lg text-foreground">Unge Iværksættere</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/events" className="text-sm font-inter text-muted-foreground hover:text-primary transition-colors">
            Events
          </Link>
          <Link to="/podcast" className="text-sm font-inter text-muted-foreground hover:text-primary transition-colors">
            Podcast
          </Link>
          <Link to="/find-co-founder" className="text-sm font-inter text-muted-foreground hover:text-primary transition-colors">
            Find Co-founder
          </Link>
          <Link to="/med-teamet" className="text-sm font-inter text-muted-foreground hover:text-primary transition-colors">
            Med Teamet
          </Link>
          <Link to="/vores-historie" className="text-sm font-inter text-muted-foreground hover:text-primary transition-colors">
            Vores Historie
          </Link>
          <Link to="/vores-sponsore" className="text-sm font-inter text-muted-foreground hover:text-primary transition-colors">
            Vores Sponsorer
          </Link>
        </nav>

        <Button 
          variant="secondary" 
          size="sm" 
          className="font-dm-sans font-bold rounded-3xl"
          onClick={() => setShowDialog(true)}
          disabled={isSubscribing}
        >
          Tilmeld Newsletter
        </Button>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md p-0 bg-gradient-to-br from-primary to-secondary border-0 text-white overflow-hidden">
          <div className="relative p-8">
            <button
              onClick={() => setShowDialog(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-anton mb-2 text-white">
                Tilmeld Newsletter
              </h2>
              <p className="text-white/90 text-sm leading-relaxed font-inter">
                Få de seneste startup nyheder direkte i din indbakke.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Din email adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubscribing}
                className="bg-white border-0 text-foreground placeholder:text-muted-foreground font-inter"
              />
              <Button 
                type="submit" 
                disabled={isSubscribing}
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-dm-sans font-bold py-3"
              >
                {isSubscribing ? "Tilmelder..." : "Tilmeld mig gratis!"}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;