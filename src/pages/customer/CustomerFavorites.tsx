
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Heart } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const CustomerFavorites = () => {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/customer/dashboard' },
    { label: 'Favorites' },
  ];

  const favoriteProviders = [
    {
      id: '1',
      name: 'Beauty by Sarah',
      category: 'Beauty & Wellness',
      rating: 4.8,
      reviews: 124,
      location: 'Victoria Island, Lagos',
      priceRange: '₦8,000 - ₦15,000',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=200&fit=crop',
      services: ['Hair Styling', 'Makeup', 'Manicure']
    },
    {
      id: '2',
      name: 'Tech Solutions',
      category: 'Technology',
      rating: 4.9,
      reviews: 89,
      location: 'Ikeja, Lagos',
      priceRange: '₦5,000 - ₦20,000',
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=300&h=200&fit=crop',
      services: ['Laptop Repair', 'Phone Repair', 'Software Installation']
    },
    {
      id: '3',
      name: 'PhotoPro Studios',
      category: 'Photography',
      rating: 4.7,
      reviews: 156,
      location: 'Lekki, Lagos',
      priceRange: '₦15,000 - ₦50,000',
      image: 'https://images.unsplash.com/photo-1554048612-b6ebae92138f?w=300&h=200&fit=crop',
      services: ['Event Photography', 'Portrait Photography', 'Wedding Photography']
    }
  ];

  return (
    <DashboardLayout userType="customer" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Favorites</h1>
          <p className="text-muted-foreground">Your saved service providers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProviders.map((provider) => (
            <Card key={provider.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-full h-48 object-cover"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                >
                  <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                </Button>
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{provider.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {provider.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{provider.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({provider.reviews} reviews)
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {provider.location}
                  </div>
                  
                  <div className="text-sm font-medium">{provider.priceRange}</div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {provider.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" size="sm">
                      Book Now
                    </Button>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerFavorites;
