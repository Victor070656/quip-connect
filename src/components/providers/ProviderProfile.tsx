import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Verified, MapPin, Calendar, Phone, Mail, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProviderProfileProps {
  providerId?: string;
  isOwner?: boolean;
}

const ProviderProfile = ({ providerId = 'provider-1', isOwner = false }: ProviderProfileProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  const provider = {
    id: providerId,
    name: 'Sarah Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    rating: 4.9,
    reviews: 127,
    verified: true,
    location: 'Ikeja, Lagos',
    joinDate: '2023-01-15',
    phone: '+234 801 234 5678',
    email: 'sarah@example.com',
    website: 'www.sarahcleaning.com',
    bio: 'Professional cleaning specialist with over 5 years of experience. Dedicated to providing exceptional service with eco-friendly products.',
    specialties: ['Deep Cleaning', 'Eco-Friendly', 'Office Cleaning', 'Post-Construction'],
    languages: ['English', 'Yoruba'],
    responseTime: '< 1 hour',
    completionRate: '98%',
    portfolio: [
      { id: 1, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop', title: 'Modern Office Cleaning' },
      { id: 2, image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=300&h=200&fit=crop', title: 'Residential Deep Clean' },
      { id: 3, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop', title: 'Kitchen Sanitization' },
      { id: 4, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=200&fit=crop', title: 'Bathroom Restoration' }
    ],
    services: [
      { id: 1, name: 'House Cleaning', price: 15000, duration: '2-4 hours', bookings: 45 },
      { id: 2, name: 'Office Cleaning', price: 25000, duration: '3-5 hours', bookings: 32 },
      { id: 3, name: 'Deep Cleaning', price: 30000, duration: '4-6 hours', bookings: 28 }
    ],
    reviews: [
      { id: 1, author: 'John Doe', rating: 5, comment: 'Excellent service! Very thorough and professional.', date: '2024-01-15' },
      { id: 2, author: 'Mary Smith', rating: 5, comment: 'Sarah did an amazing job cleaning our office. Highly recommended!', date: '2024-01-10' },
      { id: 3, author: 'David Wilson', rating: 4, comment: 'Good service, arrived on time and worked efficiently.', date: '2024-01-05' }
    ]
  };

  const handleContactProvider = () => {
    toast({
      title: "Contact Request Sent",
      description: "The provider will respond to your message shortly.",
    });
  };

  const handleBookService = (serviceId: number) => {
    toast({
      title: "Booking Initiated",
      description: "Redirecting to booking page...",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={provider.avatar} />
                <AvatarFallback>{provider.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold">{provider.name}</h1>
                  {provider.verified && (
                    <Badge variant="default" className="bg-blue-100 text-blue-800">
                      <Verified className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{provider.rating}</span>
                    <span>({provider.reviews.length} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{provider.location}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {provider.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">{specialty}</Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:ml-auto flex flex-col gap-2">
              {!isOwner && (
                <>
                  <Button onClick={handleContactProvider}>
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Provider
                  </Button>
                  <Button variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Availability
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{provider.responseTime}</div>
            <div className="text-sm text-muted-foreground">Response Time</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{provider.completionRate}</div>
            <div className="text-sm text-muted-foreground">Completion Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{provider.services.reduce((acc, s) => acc + s.bookings, 0)}</div>
            <div className="text-sm text-muted-foreground">Total Bookings</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{provider.languages.length}</div>
            <div className="text-sm text-muted-foreground">Languages</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{provider.bio}</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Contact Information</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{provider.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{provider.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>{provider.website}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {provider.languages.map((language) => (
                      <Badge key={language} variant="outline">{language}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          {provider.services.map((service) => (
            <Card key={service.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">{service.duration}</p>
                    <p className="text-sm text-muted-foreground">{service.bookings} bookings completed</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">₦{service.price.toLocaleString()}</div>
                    <Button 
                      size="sm" 
                      onClick={() => handleBookService(service.id)}
                      className="mt-2"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {provider.portfolio.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">{item.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          {provider.reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{review.author}</h4>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProviderProfile;
