
import { useState, useEffect } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  error: string | null;
  loading: boolean;
}

interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

export const useGeolocation = (options: GeolocationOptions = {}) => {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: 'Geolocation is not supported by this browser',
        loading: false,
      }));
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        error: null,
        loading: false,
      });
    };

    const handleError = (error: GeolocationPositionError) => {
      let errorMessage = 'An error occurred while retrieving location';
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Location access denied by user';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Location information unavailable';
          break;
        case error.TIMEOUT:
          errorMessage = 'Location request timed out';
          break;
      }

      setState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
    };

    const geoOptions: PositionOptions = {
      enableHighAccuracy: options.enableHighAccuracy ?? true,
      timeout: options.timeout ?? 10000,
      maximumAge: options.maximumAge ?? 300000,
    };

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      geoOptions
    );
  }, [options.enableHighAccuracy, options.timeout, options.maximumAge]);

  const requestLocation = () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          error: null,
          loading: false,
        });
      },
      (error) => {
        let errorMessage = 'An error occurred while retrieving location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }

        setState(prev => ({
          ...prev,
          error: errorMessage,
          loading: false,
        }));
      },
      {
        enableHighAccuracy: options.enableHighAccuracy ?? true,
        timeout: options.timeout ?? 10000,
        maximumAge: options.maximumAge ?? 300000,
      }
    );
  };

  return {
    ...state,
    requestLocation,
  };
};

// Utility function to calculate distance between two points
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // Distance in kilometers
  return Math.round(d * 10) / 10; // Round to 1 decimal place
};

// Get readable location name from coordinates (mock implementation)
export const getLocationName = async (latitude: number, longitude: number): Promise<string> => {
  // In a real app, you'd use a geocoding service like Google Maps API
  // For now, return a mock location based on coordinates
  const locations = [
    { name: 'Victoria Island, Lagos', lat: 6.4281, lng: 3.4219 },
    { name: 'Ikeja, Lagos', lat: 6.5954, lng: 3.3364 },
    { name: 'Lekki, Lagos', lat: 6.4698, lng: 3.5852 },
    { name: 'Surulere, Lagos', lat: 6.4969, lng: 3.3481 },
    { name: 'Yaba, Lagos', lat: 6.5158, lng: 3.3712 },
  ];

  let closestLocation = locations[0];
  let minDistance = calculateDistance(latitude, longitude, locations[0].lat, locations[0].lng);

  for (const location of locations.slice(1)) {
    const distance = calculateDistance(latitude, longitude, location.lat, location.lng);
    if (distance < minDistance) {
      minDistance = distance;
      closestLocation = location;
    }
  }

  return closestLocation.name;
};
