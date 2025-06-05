
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Star, Verified, ArrowRight } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import MobileServiceGrid from '@/components/services/MobileServiceGrid';
import ServiceRecommendations from '@/components/recommendations/ServiceRecommendations';
import LocationPicker from '@/components/location/LocationPicker';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const serviceCategories = [
  { name: 'Cleaning', icon: '🧹', count: 245 },
  { name: 'Barber & Beauty', icon: '✂️', count: 189 },
  { name: 'Tech Support', icon: '💻', count: 156 },
  { name: 'Event Planning', icon: '🎉', count: 98 },
  { name: 'Home Repair', icon: '🔧', count: 134 },
  { name: 'Fitness Training', icon: '💪', count: 87 },
  { name: 'Photography', icon: '📸', count: 76 },
  { name: 'Tutoring', icon: '📚', count: 112 }
];

const featuredServices = [
  {
    id: '1',
    title: 'Professional House Cleaning',
    description: 'Deep cleaning service for your entire home with eco-friendly products',
    price: 15000,
    provider: {
      name: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      rating: 4.9,
      reviews: 127,
      verified: true,
      location: 'Ikeja, Lagos'
    },
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'Cleaning',
    duration: '2-4 hours'
  },
  {
    id: '2',
    title: 'Premium Barber Service',
    description: 'Professional haircut and styling with luxury experience',
    price: 8000,
    provider: {
      name: 'Michael Adebayo',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
      rating: 4.8,
      reviews: 203,
      verified: true,
      location: 'Victoria Island'
    },
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop',
    category: 'Barber & Beauty',
    duration: '45 min'
  },
  {
    id: '3',
    title: 'Wedding Photography Package',
    description: 'Complete wedding coverage with professional editing and album',
    price: 150000,
    provider: {
      name: 'David Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
      rating: 4.9,
      reviews: 89,
      verified: true,
      location: 'Lekki, Lagos'
    },
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop',
    category: 'Photography',
    duration: '8-10 hours'
  }
];

const Home = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [selectedLocation, setSelectedLocation] = useState<string>('Lagos, Nigeria');
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const handleLocationSelect = (location: { name: string; latitude?: number; longitude?: number }) => {
    setSelectedLocation(location.name);
    setShowLocationPicker(false);
  };

  const handleServiceClick = (serviceId: string) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="text-center">
            <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6">
              Find trusted local service providers
            </h1>
            <p className="text-lg md:text-2xl mb-6 md:mb-8 text-blue-100 max-w-3xl mx-auto">
              Connect with verified professionals in your area. From cleaning to tech support, 
              book quality services with confidence.
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-xl p-2 shadow-2xl max-w-4xl mx-auto">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input 
                      placeholder="What service do you need?"
                      className="pl-12 h-12 md:h-14 text-base md:text-lg border-0 focus:ring-0"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Button
                      variant="ghost"
                      onClick={() => setShowLocationPicker(!showLocationPicker)}
                      className="w-full h-12 md:h-14 pl-12 justify-start text-base md:text-lg border-0 hover:bg-gray-50"
                    >
                      {selectedLocation}
                    </Button>
                  </div>
                </div>
                <Button 
                  size={isMobile ? "default" : "lg"} 
                  className="h-12 md:h-14 px-8 bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
                  onClick={() => navigate('/services')}
                >
                  Search Services
                </Button>
              </div>
            </div>

            {/* Location Picker */}
            {showLocationPicker && (
              <div className="mt-4 max-w-md mx-auto">
                <LocationPicker
                  onLocationSelect={handleLocationSelect}
                  selectedLocation={selectedLocation}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service Recommendations - New Section */}
      <section className="py-12 md:py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceRecommendations userId="current-user" limit={3} />
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Popular Service Categories</h2>
            <p className="text-base md:text-lg text-muted-foreground">Browse services by category to find what you need</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {serviceCategories.map((category) => (
              <Card key={category.name} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="text-3xl md:text-4xl mb-3 md:mb-4">{category.icon}</div>
                  <h3 className="font-semibold text-sm md:text-lg mb-2">{category.name}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm">{category.count} providers</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-12 md:py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8 md:mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Featured Services</h2>
              <p className="text-base md:text-lg text-muted-foreground">Top-rated services from verified providers</p>
            </div>
            <Button variant="outline" className="hidden md:flex">
              View All Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          {/* Mobile Service Grid */}
          {isMobile ? (
            <MobileServiceGrid 
              services={featuredServices}
              onServiceClick={handleServiceClick}
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  {...service}
                  onClick={() => handleServiceClick(service.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Provider CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-green-500 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to start earning?</h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-green-100 max-w-2xl mx-auto">
            Join thousands of service providers already earning on Quïp. 
            Create your profile and start getting bookings today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size={isMobile ? "default" : "lg"}
              variant="secondary"
              onClick={() => navigate('/register?type=provider')}
            >
              Become a Provider
            </Button>
            <Button 
              size={isMobile ? "default" : "lg"}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div>
              <div className="text-2xl md:text-4xl font-bold text-blue-400 mb-2">10,000+</div>
              <div className="text-gray-400 text-sm md:text-base">Active Providers</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold text-green-400 mb-2">50,000+</div>
              <div className="text-gray-400 text-sm md:text-base">Services Completed</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold text-yellow-400 mb-2">4.8</div>
              <div className="text-gray-400 text-sm md:text-base">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold text-purple-400 mb-2">25+</div>
              <div className="text-gray-400 text-sm md:text-base">Service Categories</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
