
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, ArrowLeft, MapPin } from 'lucide-react';

const BookService = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    notes: '',
    paymentMethod: 'card'
  });

  // Mock service data - would normally fetch based on serviceId
  const service = {
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
    duration: '1-2 hours'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Create booking in Supabase
    console.log('Booking data:', bookingData);
    navigate('/customer/dashboard');
  };

  const handleChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/services')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Book Service</h1>
          <p className="text-gray-600">Complete your booking details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Details */}
          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <img 
                    src={`https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop`}
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-gray-600 mt-2">{service.description}</p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {service.duration}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {service.provider.location}
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Service Provider</h4>
                  <div className="flex items-center space-x-3">
                    <img 
                      src={service.provider.avatar} 
                      alt={service.provider.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{service.provider.name}</p>
                      <p className="text-sm text-gray-500">
                        ⭐ {service.provider.rating} ({service.provider.reviews} reviews)
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Price:</span>
                    <span className="text-2xl font-bold text-blue-600">₦{service.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="time">Preferred Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={bookingData.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Special Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={bookingData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Any special requirements or notes for the service provider..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Payment Method</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={bookingData.paymentMethod === 'card'}
                        onChange={(e) => handleChange('paymentMethod', e.target.value)}
                      />
                      <Label htmlFor="card">Pay with Card (Paystack)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="cash"
                        name="paymentMethod"
                        value="cash"
                        checked={bookingData.paymentMethod === 'cash'}
                        onChange={(e) => handleChange('paymentMethod', e.target.value)}
                      />
                      <Label htmlFor="cash">Pay with Cash</Label>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Button type="submit" className="w-full">
                    {bookingData.paymentMethod === 'card' ? 'Proceed to Payment' : 'Confirm Booking'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookService;
