
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Verified, MapPin, Calendar, Phone, Mail, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProviderProfileProps {
  providerId: string;
}

const ProviderProfile = ({ providerId }: ProviderProfileProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock provider data
  const provider = {
    id: '1',
    name: 'Sarah Beauty',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    rating: 4.9,
    reviews: 127,
    verified: true,
    location: 'Victoria Island, Lagos',
    bio: 'Professional hair stylist with 8+ years of experience in modern styling techniques. Specialized in bridal makeup and hair styling.',
    joinedDate: '2020-03-15',
    completedServices: 450,
    responseTime: '< 2 hours',
    contact: {
      phone: '+234 801 234 5678',
      email: 'sarah@sarahbeauty.com',
      website: 'www.sarahbeauty.com'
    },
    portfolio: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1522336572468-97b06e8ef143?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop'
    ],
    services: [
      { name: 'Hair Styling', price: 12000, duration: '2 hours' },
      { name: 'Bridal Makeup', price: 25000, duration: '3 hours' },
      { name: 'Event Makeup', price: 15000, duration: '1.5 hours' }
    ],
    reviews: [
      {
        id: '1',
        customer: 'Adunni O.',
        rating: 5,
        comment: 'Amazing work! Sarah is very professional and skilled.',
        date: '2024-01-15',
        service: 'Bridal Makeup'
      },
      {
        id: '2',
        customer: 'Kemi A.',
        rating: 5,
        comment: 'Best hair stylist in Lagos. Highly recommended!',
        date: '2024-01-10',
        service: 'Hair Styling'
      }
    ]
  };

  const handleContact = (method: string) => {
    toast({
      title: `Contacting via ${method}`,
      description: `Opening ${method} to contact ${provider.name}`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="w-32 h-32 mx-auto md:mx-0">
              <AvatarImage src={provider.avatar} />
              <AvatarFallback className="text-2xl">{provider.name[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <h1 className="text-3xl font-bold">{provider.name}</h1>
                {provider.verified && (
                  <Verified className="w-6 h-6 text-blue-500 fill-current" />
                )}
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold ml-1">{provider.rating}</span>
                </div>
                <span className="text-muted-foreground">({provider.reviews.length} reviews)</span>
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-1 mb-4 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{provider.location}</span>
              </div>
              
              <p className="text-muted-foreground mb-4">{provider.bio}</p>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="secondary">
                  <Calendar className="w-4 h-4 mr-1" />
                  Joined {new Date(provider.joinedDate).getFullYear()}
                </Badge>
                <Badge variant="secondary">{provider.completedServices} services completed</Badge>
                <Badge variant="secondary">Responds in {provider.responseTime}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Section */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => handleContact('phone')}
            >
              <Phone className="w-4 h-4" />
              Call
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => handleContact('email')}
            >
              <Mail className="w-4 h-4" />
              Email
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => handleContact('website')}
            >
              <Globe className="w-4 h-4" />
              Website
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Services Offered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {provider.services.map((service, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">Duration: {service.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₦{service.price.toLocaleString()}</p>
                      <Button size="sm" className="mt-2">Book Now</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="portfolio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {provider.portfolio.map((image, index) => (
                  <div key={index} className="aspect-square overflow-hidden rounded-lg">
                    <img 
                      src={image} 
                      alt={`Portfolio ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {provider.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{review.customer}</h4>
                        <p className="text-sm text-muted-foreground">{review.service}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProviderProfile;
