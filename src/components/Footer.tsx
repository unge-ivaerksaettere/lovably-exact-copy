import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import uiLogo from "@/assets/new-logo.png";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
const Footer = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    toast
  } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Fejl",
        description: "Indtast venligst din email adresse",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke('mailerlite-subscribe', {
        body: {
          email
        }
      });
      if (error) {
        throw error;
      }
      toast({
        title: "Tak!",
        description: "Du er nu tilmeldt vores newsletter!"
      });
      setEmail("");
    } catch (error: any) {
      console.error('Newsletter signup error:', error);
      toast({
        title: "Fejl",
        description: error.message || "Der skete en fejl. Prøv igen senere.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={uiLogo} alt="Unge Iværksættere" className="w-8 h-8" />
              <span className="font-dm-sans font-bold text-lg">Unge Iværksættere</span>
            </div>
            <p className="text-background/80 font-inter text-sm">
              For ofte bliver unges idéer ikke til virkelighed, derfor samler vi unge iværksættere.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="font-dm-sans font-bold text-background">Tilmeld nyhedsbrev</h4>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input type="email" placeholder="Din email" value={email} onChange={e => setEmail(e.target.value)} required disabled={isLoading} className="bg-background/10 border-background/20 text-background placeholder:text-background/60 font-inter" />
                <Button type="submit" disabled={isLoading} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  <Mail className="w-4 h-4" />
                </Button>
              </form>
            </div>
            
            {/* Social Media */}
            <div className="flex gap-4">
              <Button size="icon" variant="ghost" className="text-background/80 hover:text-background hover:bg-background/10" onClick={() => window.open('https://www.instagram.com/ungeivaerksaettere/', '_blank')}>
                <Instagram className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-background/80 hover:text-background hover:bg-background/10" onClick={() => window.open('https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A74063868&keywords=unge%20iv%C3%A6rks%C3%A6ttere&origin=RICH_QUERY_TYPEAHEAD_HISTORY&position=0&searchId=30d10868-d576-4274-8faf-04815d982275&sid=!_y&spellCorrectionEnabled=true', '_blank')}>
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Sider */}
          <div className="space-y-4">
            <h4 className="font-dm-sans font-bold text-background">Sider</h4>
            <nav className="space-y-3 font-inter text-sm">
              <Link to="/" className="block text-background/80 hover:text-background transition-colors">
                Forside
              </Link>
              <Link to="/events" className="block text-background/80 hover:text-background transition-colors">
                Events
              </Link>
              <Link to="/podcast" className="block text-background/80 hover:text-background transition-colors">
                Podcast
              </Link>
              
            </nav>
          </div>

          {/* LINKS */}
          <div className="space-y-4">
            <h4 className="font-dm-sans font-bold text-background">LINKS</h4>
            <nav className="space-y-3 font-inter text-sm">
              <a href="#" className="block text-background/80 hover:text-background transition-colors">
                Podcast
              </a>
              <a href="#" className="block text-background/80 hover:text-background transition-colors">
                Facebook
              </a>
              <a href="#" className="block text-background/80 hover:text-background transition-colors">
                Instagram
              </a>
            </nav>
          </div>

          {/* Ressourcer */}
          <div className="space-y-4">
            
            
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-background/60" />
              <div className="font-inter text-sm">
                <div className="text-background/60">Email</div>
                <div className="text-background">kontakt@ungeivaerksaettere.dk</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-background/60" />
              <div className="font-inter text-sm">
                <div className="text-background/60">Telefon</div>
                <div className="text-background">21 96 62 04</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              
              <div className="font-inter text-sm">
                
                
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center">
              <div className="font-dm-sans font-bold text-background/80 mb-1">FRIVILLIG ORGANISATION</div>
              <div className="font-inter text-sm text-background/60">
                Unge Iværksættere<br />
                CVR: 42644606
              </div>
            </div>
            
            
          </div>
          
          <div className="text-center mt-8 font-inter text-sm text-background/60">
            © 2024 Unge Iværksættere. Alle rettigheder forbeholdes.
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;