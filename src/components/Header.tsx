import { Button } from "@/components/ui/button";
import { Search, Menu, Plus, User } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">T</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">Tabas</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">Browse</Button>
            <Button variant="ghost" size="sm">Categories</Button>
            <Button variant="ghost" size="sm">Jobs</Button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Post
            </Button>
            <Button variant="outline" size="sm">
              <User className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start">Browse</Button>
              <Button variant="ghost" className="justify-start">Categories</Button>
              <Button variant="ghost" className="justify-start">Jobs</Button>
              <Button variant="ghost" className="justify-start">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;