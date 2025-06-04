
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, MapPin, Calendar, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface FavoriteService {
  id: string;
  serviceId: string;
  title: string;
  description: string;
  price: number;
  provider: {
    name: string;
    avatar: string;
    rating: number;
    reviews: number;
    location: string;
  };
  image: string;
  category: string;
  dateAdded: string;
}

const FavoritesList = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteService[]>([
    {
      id: '1',
      serviceId: 'service-1',
      title: 'Professional Hair Styling',
      description: 'Expert hair styling for all occasions. Includes wash, cut, and styling with premium products.',
      price: 12000,
      provider: {
        name: 'Sarah Beauty',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        rating: 4.9,
        reviews: 127,
        location: 'Victoria Island'
      },
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      category: 'Beauty & Personal Care',
      dateAdded: '2024-05-20'
    },
    {
      id: '2',
      serviceId: 'service-4',
      title: 'Event Photography',
      description: 'Professional photography for weddings, birthdays, and corporate events.',
      price: 25000,
      provider: {
        name: 'PhotoPro Studios',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=photo',
        rating: 4.9,
        reviews: 203,
        location: 'Lekki'
      },
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop',
      category: 'Events & Entertainment',
      dateAdded: '2024-05-18'
    }
  ]);

  const removeFavorite = (favoriteId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
  };

  const bookService = (serviceId: string) => {
    // Navigate to booking page
    console.log('Booking service:', serviceId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="w-5 h-5 mr-2 text-red-500" />
            My Favorites
          </CardTitle>
        </CardHeader>
        <CardContent>
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favorites.map((favorite) => (
                <Card key={favorite.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={favorite.image}
                      alt={favorite.title}
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      onClick={() => removeFavorite(favorite.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg">{favorite.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {favorite.description}
                        </p>
                      </div>
                      
                      <Badge variant="outline" className="text-xs">
                        {favorite.category}
                      </Badge>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{favorite.provider.rating}</span>
                          <span className="text-gray-500">({favorite.provider.reviews})</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{favorite.provider.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-blue-600">
                            ₦{favorite.price.toLocaleString()}
                          </span>
                          <p className="text-xs text-gray-500">
                            Added {formatDate(favorite.dateAdded)}
                          </p>
                        </div>
                        <Button 
                          onClick={() => bookService(favorite.serviceId)}
                          size="sm"
                        >
                          <Calendar className="w-4 h-4 mr-1" />
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
              <p className="text-gray-600 mb-4">
                Start adding services to your favorites to see them here
              </p>
              <Button onClick={() => window.location.href = '/services'}>
                Browse Services
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FavoritesList;
