import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full bg-white/90 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">UI</span>
          </div>
          <span className="font-semibold text-lg">Unge Iværksættere</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Forside
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Events
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Podcast
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Find Co-founder
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Med Teamet
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Vores Historie
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Vores Sponsorer
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Bliv Sponsor
          </a>
        </nav>

        <Button variant="orange" size="sm">
          Tilmeld Newsletter
        </Button>
      </div>
    </header>
  );
};

export default Header;