import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import uiLogo from "@/assets/ui-logo.png";

const Header = () => {
  return (
    <header className="w-full bg-white/90 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={uiLogo} alt="Unge Iværksættere" className="w-8 h-8" />
          <span className="font-dm-sans font-bold text-lg text-foreground">Unge Iværksættere</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-inter text-muted-foreground hover:text-primary transition-colors">
            Forside
          </Link>
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
          <Link to="/bliv-sponsor" className="text-sm font-inter text-muted-foreground hover:text-primary transition-colors">
            Bliv Sponsor
          </Link>
        </nav>

        <Button variant="secondary" size="sm" className="font-dm-sans font-bold">
          Tilmeld Newsletter
        </Button>
      </div>
    </header>
  );
};

export default Header;