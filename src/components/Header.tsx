import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import uiLogo from "@/assets/ui-logo.png";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleNewsletterClick = async () => {
    // For now, just show a simple input dialog
    const email = window.prompt("Indtast din email adresse:");
    
    if (!email) return;

    setIsSubscribing(true);

    try {
      const response = await fetch('/api/mailerlite-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Tak!",
          description: "Du er nu tilmeldt vores newsletter!",
        });
      } else {
        toast({
          title: "Fejl",
          description: data.error || "Der skete en fejl. Prøv igen senere.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast({
        title: "Fejl",
        description: "Der skete en fejl. Prøv igen senere.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };
  return (
    <header className="w-full bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={uiLogo} alt="Unge Iværksættere" className="w-8 h-8" />
          <span className="font-dm-sans font-bold text-lg text-foreground">Unge Iværksættere</span>
        </div>
        
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
          onClick={handleNewsletterClick}
          disabled={isSubscribing}
        >
          {isSubscribing ? "Tilmelder..." : "Tilmeld Newsletter"}
        </Button>
      </div>
    </header>
  );
};

export default Header;