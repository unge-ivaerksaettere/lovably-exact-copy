import { Button } from "@/components/ui/button";
import { Instagram, Linkedin, Mail, Phone, MapPin, Youtube, Music, Calendar } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
import uiLogo from "@/assets/new-logo.png";

const Footer = () => {
  const handleEventSignup = () => {
    window.open('https://luma.com/81sdunl8', '_blank');
  };
  return <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img src={uiLogo} alt="Unge Iværksættere" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-background/80 font-inter text-sm">
              For ofte bliver unges idéer ikke til virkelighed, derfor samler vi unge iværksættere.
            </p>
            
            {/* Event Signup */}
            <div className="space-y-3">
              <h4 className="font-dm-sans font-bold text-background">Tilmeld dig eventet</h4>
              <div className="bg-background/10 rounded-2xl p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-background" />
                  <span className="text-xs font-dm-sans font-bold text-background">Frederik Pahuus</span>
                </div>
                <p className="text-xs text-background/80">
                  København Event - Gratis deltagelse
                </p>
              </div>
              
              <Button 
                onClick={handleEventSignup}
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-dm-sans font-bold"
              >
                <Calendar className="w-4 h-4 mr-2" />
                🎯 Tilmeld dig eventet
              </Button>
            </div>
            
            {/* Social Media */}
            <div className="flex gap-4">
              <Button size="icon" variant="ghost" className="text-background/80 hover:text-background hover:bg-background/10" onClick={() => window.open('https://www.instagram.com/ivaerksaettere/', '_blank')}>
                <Instagram className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-background/80 hover:text-background hover:bg-background/10" onClick={() => window.open('https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A74063868&keywords=unge%20iv%C3%A6rks%C3%A6ttere&origin=RICH_QUERY_TYPEAHEAD_HISTORY&position=0&searchId=30d10868-d576-4274-8faf-04815d982275&sid=!_y&spellCorrectionEnabled=true', '_blank')}>
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-background/80 hover:text-background hover:bg-background/10" onClick={() => window.open('https://www.youtube.com/@ungeiv%C3%A6rks%C3%A6ttere', '_blank')}>
                <Youtube className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-background/80 hover:text-background hover:bg-background/10" onClick={() => window.open('https://open.spotify.com/show/154B6QakpSESlOKiFkiDyk', '_blank')}>
                <Music className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-background/80 hover:text-background hover:bg-background/10" onClick={() => window.open('https://www.tiktok.com/@ungeivaerksaettere', '_blank')}>
                <FaTiktok className="w-5 h-5" />
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
              <Link to="/med-teamet" className="block text-background/80 hover:text-background transition-colors">
                Mød Teamet
              </Link>
              <Link to="/vores-sponsorer" className="block text-background/80 hover:text-background transition-colors">
                Vores Sponsorer
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
              <a href="https://www.instagram.com/ivaerksaettere/" target="_blank" rel="noopener noreferrer" className="block text-background/80 hover:text-background transition-colors">
                Instagram
              </a>
              <a href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A74063868&keywords=unge%20iv%C3%A6rks%C3%A6ttere&origin=RICH_QUERY_TYPEAHEAD_HISTORY&position=0&searchId=30d10868-d576-4274-8faf-04815d982275&sid=!_y&spellCorrectionEnabled=true" target="_blank" rel="noopener noreferrer" className="block text-background/80 hover:text-background transition-colors">
                LinkedIn
              </a>
              <a href="https://www.youtube.com/@ungeiv%C3%A6rks%C3%A6ttere" target="_blank" rel="noopener noreferrer" className="block text-background/80 hover:text-background transition-colors">
                YouTube
              </a>
              <a href="https://open.spotify.com/show/154B6QakpSESlOKiFkiDyk" target="_blank" rel="noopener noreferrer" className="block text-background/80 hover:text-background transition-colors">
                Spotify
              </a>
              <a href="https://www.tiktok.com/@ungeivaerksaettere" target="_blank" rel="noopener noreferrer" className="block text-background/80 hover:text-background transition-colors">
                TikTok
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