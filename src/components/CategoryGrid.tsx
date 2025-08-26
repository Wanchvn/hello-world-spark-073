import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Hammer, 
  Zap, 
  Scissors, 
  Smartphone, 
  ShirtIcon as Shoe,
  Wrench,
  PaintBucket,
  Car
} from "lucide-react";

const categories = [
  { id: 1, name: "Carpentry", icon: Hammer, color: "bg-amber-100 text-amber-700" },
  { id: 2, name: "Welding", icon: Zap, color: "bg-orange-100 text-orange-700" },
  { id: 3, name: "Tailoring", icon: Scissors, color: "bg-purple-100 text-purple-700" },
  { id: 4, name: "Phone Repair", icon: Smartphone, color: "bg-blue-100 text-blue-700" },
  { id: 5, name: "Shoemaking", icon: Shoe, color: "bg-green-100 text-green-700" },
  { id: 6, name: "Plumbing", icon: Wrench, color: "bg-red-100 text-red-700" },
  { id: 7, name: "Painting", icon: PaintBucket, color: "bg-indigo-100 text-indigo-700" },
  { id: 8, name: "Auto Repair", icon: Car, color: "bg-gray-100 text-gray-700" },
];

const CategoryGrid = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-6">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id}
                className="p-6 hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary/20"
              >
                <div className="text-center space-y-3">
                  <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mx-auto`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">{category.name}</h3>
                </div>
              </Card>
            );
          })}
        </div>
        <div className="text-center mt-6">
          <Button variant="outline" size="lg">
            View All Categories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;