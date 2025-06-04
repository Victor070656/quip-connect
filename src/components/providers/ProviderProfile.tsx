
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star, MapPin, Clock, Phone, MessageCircle, Shield, Calendar, Award, Camera } from 'lucide-react';

interface ProviderProfileProps {
  providerId: string;
  onMessageProvider: () => void;
  onBookService: (serviceId: string) => void;
}

const ProviderProfile = ({ providerId, onMessageProvider, onBookService }: ProviderProfileProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock provider data
  const provider = {
    id: providerId,
    name: 'Sarah Beauty',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    rating: 4.9,
    reviews: 127,
    verified: true,
    joinedDate: '2023-01-15',
    location: 'Victoria Island, Lagos',
    description: 'Professional hair stylist with over 8 years of experience. Specialized in modern cuts, coloring, and styling for all hair types.',
    services: [
      {
        id: '1',
        name: 'Professional Hair Styling',
        price: 12000,
        duration: '1-2 hours',
        description: 'Complete hair styling service including wash, cut, and style'
      },
      {
        id: '2',
        name: 'Hair Coloring',
        price: 18000,
        duration: '2-3 hours',
        description: 'Professional hair coloring with premium products'
      },
      {
        id: '3',
        name: 'Hair Treatment',
        price: 8000,
        duration: '1 hour',
        description: 'Deep conditioning and treatment for healthy hair'
      }
    ],
    portfolio: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=300&h=300&fit=crop'
    ],
    certifications: [
      'Certified Hair Stylist - Lagos Beauty Academy',
      'Advanced Color Techniques Certificate',
      'Health & Safety Certificate'
    ],
    availability: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 7:00 PM',
      saturday: '8:00 AM - 5:00 PM',
      sunday: 'Closed'
    }
  };

  const recentReviews = [
    {
      id: '1',
      customerName: 'Emma Johnson',
      rating: 5,
      comment: 'Amazing service! Sarah is very professional and my hair looks incredible.',
      date: '2024-05-28'
    },
    {
      id: '2',
      customerName: 'Grace Adebayo',
      rating: 5,
      comment: 'Best hair stylist in Lagos! Always satisfied with the results.',
      date: '2024-05-25'
    },
    {
      id: '3',
      customerName: 'Kemi Olatunde',
      rating: 4,
      comment: 'Great experience, very clean salon and excellent customer service.',
      date: '2024-05-22'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={provider.avatar} />
              <AvatarFallback>{provider.name[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold">{provider.name}</h1>
                {provider.verified && (
                  <Badge className="bg-blue-100 text-blue-800">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{provider.rating}</span>
                  <span className="text-gray-500 ml-1">({provider.reviews} reviews)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {provider.location}
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{provider.description}</p>
              
              <div className="flex gap-3">
                <Button onClick={onMessageProvider}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(provider.availability).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="capitalize font-medium">{day}</span>
                      <span className="text-gray-600">{hours}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {provider.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center">
                      <Badge variant="outline" className="text-xs">
                        {cert}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          {provider.services.map((service) => (
            <Card key={service.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                    <p className="text-gray-600 mb-3">{service.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.duration}
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        ₦{service.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <Button onClick={() => onBookService(service.id)}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="portfolio">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="w-5 h-5 mr-2" />
                Portfolio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {provider.portfolio.map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`Portfolio ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          {recentReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{review.customerName}</h4>
                    <div className="flex items-center mt-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProviderProfile;
