
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star, MapPin, Clock, Verified } from 'lucide-react';

interface ServiceCardProps {
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
  duration?: string;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  price,
  provider,
  image,
  category,
  duration,
  onClick
}) => {
  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden" onClick={onClick}>
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 left-3 bg-blue-600 hover:bg-blue-700">
          {category}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
          <div className="text-right">
            <div className="text-xl font-bold text-blue-600">₦{price.toLocaleString()}</div>
            {duration && <div className="text-sm text-gray-500">{duration}</div>}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={provider.avatar} />
              <AvatarFallback>{provider.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-sm font-medium">{provider.name}</span>
                {provider.verified && (
                  <Verified className="w-3 h-3 text-blue-500 fill-current" />
                )}
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <MapPin className="w-3 h-3" />
                <span>{provider.location}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{provider.rating}</span>
            <span className="text-xs text-gray-500">({provider.reviews})</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
