
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, Verified } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  provider: {
    name: string;
    avatar: string;
    rating: number;
    reviews: number;
    verified: boolean;
    location: string;
  };
  image: string;
  category: string;
  duration: string;
}

interface MobileServiceGridProps {
  services: Service[];
  onServiceClick: (serviceId: string) => void;
}

const MobileServiceGrid = ({ services, onServiceClick }: MobileServiceGridProps) => {
  return (
    <div className="space-y-4">
      {services.map((service) => (
        <Card key={service.id} className="overflow-hidden">
          <div className="relative">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover"
            />
            <Badge className="absolute top-3 left-3 bg-white/90 text-gray-900">
              {service.category}
            </Badge>
            <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1">
              <span className="text-sm font-semibold text-gray-900">
                ₦{service.price.toLocaleString()}
              </span>
            </div>
          </div>
          
          <CardContent className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-lg text-foreground line-clamp-1">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {service.description}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <img
                src={service.provider.avatar}
                alt={service.provider.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-foreground truncate">
                    {service.provider.name}
                  </span>
                  {service.provider.verified && (
                    <Verified className="w-3 h-3 text-blue-500 flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-current text-yellow-400" />
                    <span>{service.provider.rating}</span>
                    <span>({service.provider.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{service.provider.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{service.duration}</span>
              </div>
              <Button 
                size="sm" 
                onClick={() => onServiceClick(service.id)}
                className="h-8 px-4"
              >
                Book Now
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MobileServiceGrid;
