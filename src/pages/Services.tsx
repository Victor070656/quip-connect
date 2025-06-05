
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Filter } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import MobileServiceGrid from '@/components/services/MobileServiceGrid';
import LocationPicker from '@/components/location/LocationPicker';
import AdvancedSearch from '@/components/search/AdvancedSearch';
import { useIsMobile } from '@/hooks/use-mobile';

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Lagos, Nigeria');
  const [activeFilters, setActiveFilters] = useState<any>(null);
  const isMobile = useIsMobile();

  const categories = [
    'All Services',
    'Beauty & Personal Care',
    'Home Services',
    'Technology & Repair',
    'Events & Entertainment',
    'Health & Wellness',
    'Education & Training'
  ];

  // Mock services data
  const services = [
    {
      id: '1',
      title: 'Professional Hair Styling',
      description: 'Expert hair styling for all occasions. Includes wash, cut, and styling with premium products.',
      price: 12000,
      provider: {
        name: 'Sarah Beauty',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        rating: 4.9,
        reviews: 127,
        verified: true,
        location: 'Victoria Island'
      },
      image: `https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop`,
      category: 'Beauty & Personal Care',
      duration: '1-2 hours'
    },
    {
      id: '2',
      title: 'Home Cleaning Service',
      description: 'Professional deep cleaning for your home. All rooms, kitchen, and bathrooms included.',
      price: 15000,
      provider: {
        name: 'Clean Masters',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=clean',
        rating: 4.7,
        reviews: 89,
        verified: true,
        location: 'Ikeja'
      },
      image: `https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop`,
      category: 'Home Services',
      duration: '3-4 hours'
    },
    {
      id: '3',
      title: 'Laptop Repair & Maintenance',
      description: 'Expert laptop repair services. Hardware fixes, software installation, and optimization.',
      price: 8000,
      provider: {
        name: 'Tech Solutions',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech',
        rating: 4.8,
        reviews: 156,
        verified: true,
        location: 'Surulere'
      },
      image: `https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop`,
      category: 'Technology & Repair',
      duration: '1-3 hours'
    },
    {
      id: '4',
      title: 'Event Photography',
      description: 'Professional photography for weddings, birthdays, and corporate events.',
      price: 25000,
      provider: {
        name: 'PhotoPro Studios',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=photo',
        rating: 4.9,
        reviews: 203,
        verified: true,
        location: 'Lekki'
      },
      image: `https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop`,
      category: 'Events & Entertainment',
      duration: 'Full day'
    }
  ];

  const handleAdvancedSearch = (filters: any) => {
    setActiveFilters(filters);
    setShowAdvancedSearch(false);
    console.log('Applied filters:', filters);
  };

  const handleLocationSelect = (location: { name: string; latitude?: number; longitude?: number }) => {
    setSelectedLocation(location.name);
    setShowLocationPicker(false);
  };

  const handleServiceClick = (serviceId: string) => {
    console.log('Service clicked:', serviceId);
  };

  const filteredServices = services.filter(service => {
    let matches = true;

    // Basic search
    if (searchTerm) {
      matches = matches && (
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      matches = matches && service.category === selectedCategory;
    }

    // Advanced filters
    if (activeFilters) {
      if (activeFilters.category && activeFilters.category !== service.category) {
        matches = false;
      }
      if (activeFilters.priceRange) {
        matches = matches && service.price >= activeFilters.priceRange[0] && service.price <= activeFilters.priceRange[1];
      }
      if (activeFilters.rating && service.provider.rating < activeFilters.rating) {
        matches = false;
      }
      if (activeFilters.verified && !service.provider.verified) {
        matches = false;
      }
      if (activeFilters.location && activeFilters.location !== service.provider.location) {
        matches = false;
      }
    }

    return matches;
  });

  return (
    <div className="min-h-screen bg-background py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Find Services</h1>
          <p className="text-muted-foreground">Discover local service providers in your area</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 md:mb-8">
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search for services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Location and Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowLocationPicker(!showLocationPicker)}
                  className="flex-1 justify-start"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {selectedLocation}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                  className="flex-1 sm:flex-none"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {isMobile ? 'Filters' : 'Advanced Filters'}
                </Button>
              </div>

              {/* Location Picker */}
              {showLocationPicker && (
                <div className="mt-4">
                  <LocationPicker
                    onLocationSelect={handleLocationSelect}
                    selectedLocation={selectedLocation}
                  />
                </div>
              )}

              {/* Active Filters Display */}
              {activeFilters && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {activeFilters.category && (
                    <Badge variant="secondary">Category: {activeFilters.category}</Badge>
                  )}
                  {activeFilters.priceRange && (
                    <Badge variant="secondary">
                      Price: ₦{activeFilters.priceRange[0].toLocaleString()} - ₦{activeFilters.priceRange[1].toLocaleString()}
                    </Badge>
                  )}
                  {activeFilters.rating > 0 && (
                    <Badge variant="secondary">Rating: {activeFilters.rating}+ stars</Badge>
                  )}
                  {activeFilters.verified && (
                    <Badge variant="secondary">Verified only</Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveFilters(null)}
                    className="text-xs"
                  >
                    Clear all
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Advanced Search Modal */}
        {showAdvancedSearch && (
          <div className="mb-6 md:mb-8">
            <AdvancedSearch
              onSearch={handleAdvancedSearch}
              onClose={() => setShowAdvancedSearch(false)}
            />
          </div>
        )}

        {/* Categories */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === (category === 'All Services' ? 'all' : category) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category === 'All Services' ? 'all' : category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4 md:mb-6">
          <p className="text-muted-foreground">
            Found {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
            {activeFilters && ' matching your criteria'}
          </p>
        </div>

        {/* Services Grid */}
        {isMobile ? (
          <MobileServiceGrid 
            services={filteredServices}
            onServiceClick={handleServiceClick}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                {...service}
                onClick={() => handleServiceClick(service.id)}
              />
            ))}
          </div>
        )}

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No services found matching your criteria.</p>
            <p className="text-muted-foreground">Try adjusting your search or category filters.</p>
            {activeFilters && (
              <Button
                variant="outline"
                onClick={() => setActiveFilters(null)}
                className="mt-4"
              >
                Clear all filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
