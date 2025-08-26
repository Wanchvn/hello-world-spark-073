import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Users, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary/5 to-accent/5 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                Connect with Ghana's
                <span className="text-primary block">Best Handworkers</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Find skilled artisans, post jobs, buy quality goods, and hire trusted professionals in your area. No payments, just direct connections.
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex gap-2 p-1 bg-card rounded-lg border shadow-sm">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search for services, goods, or jobs..."
                  className="pl-10 border-0 bg-transparent focus:ring-0"
                />
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Search
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="bg-accent hover:bg-accent/90 flex-1">
                <Plus className="w-5 h-5 mr-2" />
                Post a Listing
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                <Users className="w-5 h-5 mr-2" />
                Browse Workers
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5K+</div>
                <div className="text-sm text-muted-foreground">Active Workers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">10K+</div>
                <div className="text-sm text-muted-foreground">Listings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">98%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Ghanaian handworkers and artisans"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  <div>
                    <div className="font-semibold text-sm">Growing Fast</div>
                    <div className="text-xs text-muted-foreground">+500 new workers this month</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary/20 rounded-full" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;