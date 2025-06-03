
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, MapPin, Star, Verified } from 'lucide-react';
import BookingCalendar from '@/components/booking/BookingCalendar';
import PaymentModal from '@/components/payments/PaymentModal';

const EnhancedBookService = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Mock service data
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
      location: 'Victoria Island',
      bio: 'Professional hair stylist with 8+ years of experience in modern styling techniques.'
    },
    duration: '1-2 hours',
    images: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1522336572468-97b06e8ef143?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=400&h=300&fit=crop'
    ]
  };

  const handleBookNow = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time');
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (paymentMethod: string, transactionId: string) => {
    console.log('Payment successful:', { paymentMethod, transactionId });
    setShowPaymentModal(false);
    navigate('/customer/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {service.images.map((image, index) => (
                      <img 
                        key={index}
                        src={image}
                        alt={`${service.title} ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {service.provider.location}
                    </div>
                    <div>Duration: {service.duration}</div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-3">Service Provider</h3>
                    <div className="flex items-start space-x-4">
                      <img 
                        src={service.provider.avatar} 
                        alt={service.provider.name}
                        className="w-16 h-16 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{service.provider.name}</h4>
                          {service.provider.verified && (
                            <Verified className="w-4 h-4 text-blue-500 fill-current" />
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium ml-1">{service.provider.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">({service.provider.reviews} reviews)</span>
                        </div>
                        <p className="text-sm text-gray-600">{service.provider.bio}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total Price:</span>
                      <span className="text-3xl font-bold text-blue-600">₦{service.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="space-y-6">
            <BookingCalendar
              onDateSelect={setSelectedDate}
              onTimeSelect={setSelectedTime}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />

            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="notes">Special Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any special requirements or notes for the service provider..."
                      rows={3}
                    />
                  </div>

                  <Button 
                    onClick={handleBookNow}
                    className="w-full"
                    disabled={!selectedDate || !selectedTime}
                  >
                    Book Now - ₦{service.price.toLocaleString()}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={service.price}
        serviceTitle={service.title}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default EnhancedBookService;
