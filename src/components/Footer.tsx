import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import uiLogo from "@/assets/ui-logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={uiLogo} alt="Unge Iværksættere" className="w-8 h-8" />
              <span className="font-dm-sans font-bold text-lg">Unge Iværksættere</span>
            </div>
            <p className="text-background/80 font-inter text-sm">
              Vores events er stedet, hvor unge iværksættere mødes. Kom og få nye ideer, mød andre iværksættere og få inspiration fra erfarne iværksættere.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="font-dm-sans font-bold text-background">Tilmeld Newsletter</h4>
              <div className="flex gap-2">
                <Input 
                  placeholder="Din email" 
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/60 font-inter"
                />
                <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="flex gap-4">
              <a href="https://www.instagram.com/ivaerksaettere/" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="ghost" className="text-background/80 hover:text-background hover:bg-background/10">
                  <Instagram className="w-5 h-5" />
                </Button>
              </a>
              <Button size="icon" variant="ghost" className="text-background/80 hover:text-background hover:bg-background/10">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-background/80 hover:text-background hover:bg-background/10">
                <Youtube className="w-5 h-5" />
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
              <Link to="/find-co-founder" className="block text-background/80 hover:text-background transition-colors">
                Find Co-founder
              </Link>
              <Link to="/med-teamet" className="block text-background/80 hover:text-background transition-colors">
                Med Teamet
              </Link>
              <Link to="/vores-historie" className="block text-background/80 hover:text-background transition-colors">
                Vores Historie
              </Link>
            </nav>
          </div>

          {/* LINKS */}
          <div className="space-y-4">
            <h4 className="font-dm-sans font-bold text-background">LINKS</h4>
            <nav className="space-y-3 font-inter text-sm">
              <a href="https://open.spotify.com/show/154B6QakpSESlOKiFkiDyk?si=feba03d657fa48d3" target="_blank" rel="noopener noreferrer" className="block text-background/80 hover:text-background transition-colors">
                Podcast på Spotify
              </a>
              <a href="https://www.instagram.com/ivaerksaettere/" target="_blank" rel="noopener noreferrer" className="block text-background/80 hover:text-background transition-colors">
                Instagram
              </a>
              <a href="https://lu.ma/h3mxyxhi" target="_blank" rel="noopener noreferrer" className="block text-background/80 hover:text-background transition-colors">
                Kommende Events
              </a>
            </nav>
          </div>

          {/* Ressourcer */}
          <div className="space-y-4">
            <h4 className="font-dm-sans font-bold text-background">Ressourcer</h4>
            <nav className="space-y-3 font-inter text-sm">
              <a href="https://open.spotify.com/show/154B6QakpSESlOKiFkiDyk?si=feba03d657fa48d3" target="_blank" rel="noopener noreferrer" className="block text-background/80 hover:text-background transition-colors">
                Iværksætteri Podcasten
              </a>
              <a href="/events" className="block text-background/80 hover:text-background transition-colors">
                Se alle speakers
              </a>
              <a href="https://www.instagram.com/ivaerksaettere/" target="_blank" rel="noopener noreferrer" className="block text-background/80 hover:text-background transition-colors">
                Følg os på Instagram
              </a>
            </nav>
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
                <div className="text-background">+45 12 34 56 78</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-background/60" />
              <div className="font-inter text-sm">
                <div className="text-background/60">Adresse</div>
                <div className="text-background">
                  Københavns Startup Hub<br />
                  1001 København K
                </div>
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
            
            <div className="flex gap-6 font-inter text-sm text-background/60">
              <a href="#" className="hover:text-background transition-colors">Privatlivspolitik</a>
              <a href="#" className="hover:text-background transition-colors">Vilkår & Betingelser</a>
              <a href="#" className="hover:text-background transition-colors">Cookies</a>
            </div>
          </div>
          
          <div className="text-center mt-8 font-inter text-sm text-background/60">
            © 2024 Unge Iværksættere. Alle rettigheder forbeholdes.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;