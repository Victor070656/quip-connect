
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Loader2 } from 'lucide-react';
import { useGeolocation, getLocationName } from '@/hooks/useGeolocation';

interface LocationPickerProps {
  onLocationSelect: (location: { name: string; latitude?: number; longitude?: number }) => void;
  selectedLocation?: string;
  className?: string;
}

const LocationPicker = ({ onLocationSelect, selectedLocation, className }: LocationPickerProps) => {
  const [manualLocation, setManualLocation] = useState('');
  const [detectedLocationName, setDetectedLocationName] = useState<string>('');
  const { latitude, longitude, error, loading, requestLocation } = useGeolocation();

  const popularLocations = [
    'Victoria Island, Lagos',
    'Ikeja, Lagos', 
    'Lekki, Lagos',
    'Surulere, Lagos',
    'Yaba, Lagos',
    'Maryland, Lagos',
    'Ajah, Lagos',
    'Ikoyi, Lagos'
  ];

  useEffect(() => {
    if (latitude && longitude) {
      getLocationName(latitude, longitude).then(setDetectedLocationName);
    }
  }, [latitude, longitude]);

  const handleUseCurrentLocation = () => {
    if (latitude && longitude && detectedLocationName) {
      onLocationSelect({
        name: detectedLocationName,
        latitude,
        longitude
      });
    } else {
      requestLocation();
    }
  };

  const handleManualLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualLocation.trim()) {
      onLocationSelect({ name: manualLocation.trim() });
      setManualLocation('');
    }
  };

  return (
    <Card className={className}>
      <CardContent className="p-4 space-y-4">
        <div>
          <h3 className="font-medium text-foreground mb-2">Choose Your Location</h3>
          {selectedLocation && (
            <Badge variant="secondary" className="mb-2">
              Current: {selectedLocation}
            </Badge>
          )}
        </div>

        {/* Current Location Detection */}
        <div className="space-y-2">
          <Button
            variant="outline"
            onClick={handleUseCurrentLocation}
            disabled={loading}
            className="w-full justify-start"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Navigation className="w-4 h-4 mr-2" />
            )}
            {loading 
              ? 'Detecting location...' 
              : detectedLocationName 
                ? `Use ${detectedLocationName}` 
                : 'Use current location'
            }
          </Button>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>

        {/* Popular Locations */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Popular locations:</p>
          <div className="grid grid-cols-2 gap-2">
            {popularLocations.map((location) => (
              <Button
                key={location}
                variant="ghost"
                size="sm"
                onClick={() => onLocationSelect({ name: location })}
                className="justify-start text-left h-auto py-2 px-3"
              >
                <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="text-xs truncate">{location}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Manual Location Entry */}
        <form onSubmit={handleManualLocationSubmit} className="space-y-2">
          <Input
            placeholder="Enter location manually..."
            value={manualLocation}
            onChange={(e) => setManualLocation(e.target.value)}
          />
          <Button 
            type="submit" 
            variant="outline" 
            size="sm" 
            disabled={!manualLocation.trim()}
            className="w-full"
          >
            Set Location
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LocationPicker;
