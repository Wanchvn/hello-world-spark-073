import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Plus, 
  Search, 
  Briefcase, 
  MessageCircle,
  Phone,
  MapPin
} from "lucide-react";

const QuickActions = () => {
  return (
    <section className="py-8 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-foreground mb-6 text-center">Quick Actions</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Post Listing */}
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary/20">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">Post Ad</h3>
              <p className="text-xs text-muted-foreground">Sell or offer services</p>
            </div>
          </Card>

          {/* Find Work */}
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-accent/20">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
                <Briefcase className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">Find Work</h3>
              <p className="text-xs text-muted-foreground">Browse job posts</p>
            </div>
          </Card>

          {/* Search */}
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-success/20">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto">
                <Search className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">Search</h3>
              <p className="text-xs text-muted-foreground">Find anything</p>
            </div>
          </Card>

          {/* WhatsApp */}
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-success/20">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto">
                <MessageCircle className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">WhatsApp</h3>
              <p className="text-xs text-muted-foreground">Quick contact</p>
            </div>
          </Card>

          {/* Call */}
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-warning/20">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto">
                <Phone className="w-6 h-6 text-warning" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">Call</h3>
              <p className="text-xs text-muted-foreground">Direct contact</p>
            </div>
          </Card>

          {/* Location */}
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary/20">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">Near Me</h3>
              <p className="text-xs text-muted-foreground">Local services</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QuickActions;