import ListingCard from "./ListingCard";
import { Button } from "@/components/ui/button";

// Mock data for featured listings
const featuredListings = [
  {
    id: "lst001",
    title: "Expert Carpenter - Furniture & Repairs",
    description: "20+ years experience in custom furniture, doors, windows, and home repairs. Quality work guaranteed.",
    price: "50",
    location: "Accra, Greater Accra",
    category: "Carpentry",
    images: ["/placeholder.svg"],
    user: {
      name: "Kwame Asante",
      rating: 4.8,
      ratingCount: 45,
      verified: true
    },
    createdAt: "2024-08-25",
    views: 156,
    type: "service" as const
  },
  {
    id: "lst002", 
    title: "Professional Phone Repair Services",
    description: "All brands repaired: iPhone, Samsung, Tecno, Infinix. Screen replacement, battery, charging port fixes.",
    location: "Kumasi, Ashanti",
    category: "Phone Repair",
    images: ["/placeholder.svg"],
    user: {
      name: "Akosua Mensah",
      rating: 4.9,
      ratingCount: 78,
      verified: true
    },
    createdAt: "2024-08-24",
    views: 203,
    type: "service" as const
  },
  {
    id: "lst003",
    title: "Custom Tailoring - Traditional & Modern",
    description: "Beautiful kente designs, modern suits, dresses. Fast delivery, affordable prices.",
    price: "30",
    location: "Tamale, Northern",
    category: "Tailoring", 
    images: ["/placeholder.svg"],
    user: {
      name: "Fatima Abdul",
      rating: 4.7,
      ratingCount: 32,
      verified: false
    },
    createdAt: "2024-08-23",
    views: 89,
    type: "service" as const
  },
  {
    id: "lst004",
    title: "Experienced Welder Seeking Work",
    description: "5 years welding experience. Gates, protectors, metal repairs. Available full-time or contract.",
    location: "Cape Coast, Central",
    category: "Welding",
    images: ["/placeholder.svg"],
    user: {
      name: "Emmanuel Osei",
      rating: 4.6,
      ratingCount: 23,
      verified: true
    },
    createdAt: "2024-08-22",
    views: 67,
    type: "looking_for_work" as const
  },
  {
    id: "lst005",
    title: "Hiring: Plumber for Residential Project",
    description: "Need experienced plumber for 2-week residential project in East Legon. Good pay, immediate start.",
    price: "200",
    location: "Accra, Greater Accra",
    category: "Plumbing",
    images: ["/placeholder.svg"],
    user: {
      name: "Michael Adjei",
      rating: 4.5,
      ratingCount: 12,
      verified: true
    },
    createdAt: "2024-08-21",
    views: 145,
    type: "job_post" as const
  },
  {
    id: "lst006",
    title: "Quality Leather Shoes - Handmade",
    description: "Durable, comfortable leather shoes. Men's & women's sizes available. Made with local materials.",
    price: "80",
    location: "Bolgatanga, Upper East",
    category: "Shoemaking",
    images: ["/placeholder.svg"],
    user: {
      name: "Ibrahim Yakubu",
      rating: 4.8,
      ratingCount: 56,
      verified: true
    },
    createdAt: "2024-08-20",
    views: 234,
    type: "goods" as const
  }
];

const FeaturedListings = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Featured Listings</h2>
          <Button variant="outline">View All</Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Load More Listings
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;