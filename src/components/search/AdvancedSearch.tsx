
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Filter, X, Star } from 'lucide-react';

interface SearchFilters {
  query: string;
  category: string;
  location: string;
  priceRange: [number, number];
  rating: number;
  availability: string;
  verified: boolean;
  distance: number;
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onClose?: () => void;
}

const AdvancedSearch = ({ onSearch, onClose }: AdvancedSearchProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    location: '',
    priceRange: [0, 100000],
    rating: 0,
    availability: '',
    verified: false,
    distance: 50
  });

  const categories = [
    'Beauty & Personal Care',
    'Home Services',
    'Technology & Repair',
    'Events & Entertainment',
    'Health & Wellness',
    'Education & Training'
  ];

  const locations = [
    'Victoria Island',
    'Ikoyi',
    'Lekki',
    'Ikeja',
    'Surulere',
    'Yaba',
    'Maryland',
    'Ajah'
  ];

  const handleSearch = () => {
    onSearch(filters);
  };

  const resetFilters = () => {
    setFilters({
      query: '',
      category: '',
      location: '',
      priceRange: [0, 100000],
      rating: 0,
      availability: '',
      verified: false,
      distance: 50
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Advanced Search
          </h3>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Search Query */}
          <div className="space-y-2">
            <Label htmlFor="search-query">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="search-query"
                placeholder="Search services..."
                value={filters.query}
                onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label>Location</Label>
            <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <Label>Price Range</Label>
            <div className="px-3">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                max={100000}
                min={0}
                step={1000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>₦{filters.priceRange[0].toLocaleString()}</span>
                <span>₦{filters.priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Minimum Rating */}
          <div className="space-y-2">
            <Label>Minimum Rating</Label>
            <Select value={filters.rating.toString()} onValueChange={(value) => setFilters(prev => ({ ...prev, rating: parseInt(value) }))}>
              <SelectTrigger>
                <SelectValue placeholder="Any rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any Rating</SelectItem>
                <SelectItem value="4">4+ Stars</SelectItem>
                <SelectItem value="4.5">4.5+ Stars</SelectItem>
                <SelectItem value="5">5 Stars Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <Label>Availability</Label>
            <Select value={filters.availability} onValueChange={(value) => setFilters(prev => ({ ...prev, availability: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Any time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Time</SelectItem>
                <SelectItem value="today">Available Today</SelectItem>
                <SelectItem value="tomorrow">Available Tomorrow</SelectItem>
                <SelectItem value="this-week">Available This Week</SelectItem>
                <SelectItem value="next-week">Available Next Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Additional Filters */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="verified"
              checked={filters.verified}
              onCheckedChange={(checked) => setFilters(prev => ({ ...prev, verified: checked as boolean }))}
            />
            <Label htmlFor="verified">Verified providers only</Label>
          </div>

          <div className="space-y-2">
            <Label>Maximum Distance: {filters.distance}km</Label>
            <Slider
              value={[filters.distance]}
              onValueChange={(value) => setFilters(prev => ({ ...prev, distance: value[0] }))}
              max={100}
              min={1}
              step={1}
              className="w-full max-w-md"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" onClick={resetFilters}>
            Reset Filters
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              Search Services
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedSearch;
