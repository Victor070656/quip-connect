
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Zap, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RecommendedService {
  id: string;
  title: string;
  description: string;
  price: number;
  provider: {
    name: string;
    avatar: string;
    rating: number;
    reviews: number;
  };
  image: string;
  category: string;
  reason: string;
  confidence: number;
}

interface ServiceRecommendationsProps {
  userId?: string;
  limit?: number;
}

const ServiceRecommendations = ({ userId, limit = 3 }: ServiceRecommendationsProps) => {
  const navigate = useNavigate();

  // Mock recommendation data based on user behavior
  const recommendations: RecommendedService[] = [
    {
      id: 'rec-1',
      title: 'Premium House Cleaning',
      description: 'Deep cleaning service with eco-friendly products',
      price: 18000,
      provider: {
        name: 'Sarah Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        rating: 4.9,
        reviews: 127,
      },
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      category: 'Cleaning',
      reason: 'Based on your previous cleaning bookings',
      confidence: 95
    },
    {
      id: 'rec-2',
      title: 'Mobile Barber Service',
      description: 'Professional haircut service at your location',
      price: 12000,
      provider: {
        name: 'Michael Adebayo',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
        rating: 4.8,
        reviews: 203,
      },
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop',
      category: 'Barber & Beauty',
      reason: 'Popular in your area',
      confidence: 87
    },
    {
      id: 'rec-3',
      title: 'Laptop Repair Service',
      description: 'Fast and reliable computer repair service',
      price: 15000,
      provider: {
        name: 'Tech Solutions',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech',
        rating: 4.7,
        reviews: 156,
      },
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
      category: 'Tech Support',
      reason: 'Similar users also booked',
      confidence: 82
    }
  ].slice(0, limit);

  const handleBookService = (serviceId: string) => {
    navigate(`/book/${serviceId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Zap className="w-5 h-5 text-yellow-500" />
        <h3 className="text-lg font-semibold">Recommended for You</h3>
        <Badge variant="secondary" className="ml-auto">
          <TrendingUp className="w-3 h-3 mr-1" />
          AI Powered
        </Badge>
      </div>

      <div className="grid gap-4">
        {recommendations.map((service) => (
          <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex">
              <img
                src={service.image}
                alt={service.title}
                className="w-24 h-24 object-cover"
              />
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-sm">{service.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {service.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-blue-600">
                      ₦{service.price.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <div className="flex items-center space-x-1">
                    <span>{service.provider.name}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-current text-yellow-400" />
                      <span>{service.provider.rating}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {service.confidence}% match
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-600">{service.reason}</span>
                  <Button
                    size="sm"
                    onClick={() => handleBookService(service.id)}
                    className="h-7 px-3 text-xs"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceRecommendations;
