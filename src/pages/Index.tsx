import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import QuickActions from "@/components/QuickActions";
import FeaturedListings from "@/components/FeaturedListings";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <QuickActions />
      <CategoryGrid />
      <FeaturedListings />
    </div>
  );
};

export default Index;
