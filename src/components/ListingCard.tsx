import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Star,
  Clock,
  Eye
} from "lucide-react";

interface ListingCardProps {
  listing: {
    id: string;
    title: string;
    description: string;
    price?: string;
    location: string;
    category: string;
    images: string[];
    user: {
      name: string;
      rating: number;
      ratingCount: number;
      verified: boolean;
    };
    createdAt: string;
    views: number;
    type: "goods" | "service" | "looking_for_work" | "job_post";
  };
}

const ListingCard = ({ listing }: ListingCardProps) => {
  const timeAgo = (dateString: string) => {
    const days = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "goods": return "bg-blue-100 text-blue-700";
      case "service": return "bg-green-100 text-green-700";
      case "looking_for_work": return "bg-purple-100 text-purple-700";
      case "job_post": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "goods": return "For Sale";
      case "service": return "Service";
      case "looking_for_work": return "Looking for Work";
      case "job_post": return "Job Available";
      default: return type;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="aspect-video bg-muted relative">
        {listing.images[0] ? (
          <img 
            src={listing.images[0]} 
            alt={listing.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
        <Badge className={`absolute top-2 left-2 ${getTypeColor(listing.type)}`}>
          {getTypeLabel(listing.type)}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title and Price */}
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-foreground line-clamp-2 flex-1">
            {listing.title}
          </h3>
          {listing.price && (
            <span className="text-lg font-bold text-primary ml-2">
              ₵{listing.price}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {listing.description}
        </p>

        {/* Location and Category */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {listing.location}
          </div>
          <Badge variant="outline" className="text-xs">
            {listing.category}
          </Badge>
        </div>

        {/* User Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold">
                {listing.user.name.charAt(0)}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">{listing.user.name}</span>
                {listing.user.verified && (
                  <div className="w-4 h-4 bg-success rounded-full flex items-center justify-center">
                    <span className="text-xs text-success-foreground">✓</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Star className="w-3 h-3 fill-warning text-warning" />
                <span>{listing.user.rating.toFixed(1)} ({listing.user.ratingCount})</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {timeAgo(listing.createdAt)}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button size="sm" className="bg-success hover:bg-success/90">
            <Phone className="w-4 h-4 mr-2" />
            Call
          </Button>
          <Button size="sm" variant="outline">
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {listing.views} views
          </div>
          <span>ID: {listing.id.slice(0, 8)}</span>
        </div>
      </div>
    </Card>
  );
};

export default ListingCard;