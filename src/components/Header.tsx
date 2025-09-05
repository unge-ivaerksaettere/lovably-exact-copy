import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { AuthDialog } from "./AuthDialog";
import { useAuth } from "@/hooks/useAuth";
import { useVisiblePages } from "@/hooks/usePageSettings";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import uiLogo from "@/assets/new-logo.png";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const {
    user,
    signOut
  } = useAuth();
  const {
    data: visiblePages
  } = useVisiblePages();

  // Always visible pages
  const baseNavigation = [{
    name: 'Podcast',
    href: '/podcast'
  }];

  // Add dynamic pages based on visibility settings
  const dynamicNavigation = visiblePages?.map(page => ({
    name: page.page_name,
    href: `/${page.page_key}`
  })) || [];
  const navigation = [...baseNavigation, ...dynamicNavigation];
  const isActive = (path: string) => location.pathname === path;
  return <header className="w-full bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={`${uiLogo}?v=${Date.now()}`} alt="Unge Iværksættere" className="h-10 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              {navigation.map(item => <Link key={item.name} to={item.href} className={`text-sm font-inter transition-colors ${isActive(item.href) ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-primary'}`}>
                  {item.name}
                </Link>)}
            </nav>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {user ? <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{user.user_metadata?.first_name || user.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center space-x-2">
                        <span>Admin Panel</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={signOut} className="flex items-center space-x-2">
                      <LogOut className="w-4 h-4" />
                      <span>Log ud</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> : <Button variant="outline" asChild>
                  <Link to="/login">Log ind</Link>
                </Button>}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="lg:hidden border-t border-border mt-2 py-4">
            <div className="space-y-1">
              {navigation.map(item => <Link key={item.name} to={item.href} className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${isActive(item.href) ? 'text-primary bg-primary/10 font-semibold' : 'text-muted-foreground hover:text-primary hover:bg-muted'}`} onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </Link>)}
            </div>

            {/* Mobile Auth */}
            <div className="pt-6 border-t border-border mt-4">
              {user ? <div className="space-y-2">
                  <Link to="/admin" className="block px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md" onClick={() => setIsMenuOpen(false)}>
                    Admin Panel
                  </Link>
                  <button onClick={() => {
              signOut();
              setIsMenuOpen(false);
            }} className="block w-full text-left px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md">
                    Log ud
                  </button>
                </div> : <Button variant="outline" asChild className="w-full">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>Log ind</Link>
                </Button>}
            </div>
          </div>}
      </div>
    </header>;
};
export default Header;