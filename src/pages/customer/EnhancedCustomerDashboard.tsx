
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Star, User, CreditCard } from 'lucide-react';
import WalletCard from '@/components/wallet/WalletCard';

const EnhancedCustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');

  const bookings = [
    {
      id: '1',
      service: 'Professional Hair Styling',
      provider: 'Sarah Beauty',
      date: '2024-12-15',
      time: '10:00 AM',
      location: 'Victoria Island',
      status: 'confirmed',
      price: 12000,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop'
    },
    {
      id: '2',
      service: 'Home Cleaning Service',
      provider: 'Clean Masters',
      date: '2024-12-18',
      time: '2:00 PM',
      location: 'Ikoyi',
      status: 'pending',
      price: 8000,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    }
  ];

  const pastBookings = [
    {
      id: '3',
      service: 'Phone Repair',
      provider: 'Tech Fix Pro',
      date: '2024-11-28',
      status: 'completed',
      price: 15000,
      rating: 5,
      review: 'Excellent service! Fixed my phone perfectly.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Customer Dashboard</h1>
          <p className="text-gray-600">Manage your bookings and account</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">John Doe</h3>
                    <p className="text-sm text-gray-500">john@example.com</p>
                  </div>
                </div>
                
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeTab === 'bookings' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                    }`}
                  >
                    <Calendar className="w-4 h-4 inline mr-2" />
                    My Bookings
                  </button>
                  <button
                    onClick={() => setActiveTab('wallet')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeTab === 'wallet' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 inline mr-2" />
                    Wallet
                  </button>
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeTab === 'history' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                    }`}
                  >
                    <Clock className="w-4 h-4 inline mr-2" />
                    History
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
                  <Button onClick={() => window.location.href = '/services'}>
                    Book New Service
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <img 
                            src={booking.image}
                            alt={booking.service}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-lg">{booking.service}</h3>
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-2">by {booking.provider}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {booking.date}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {booking.time}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {booking.location}
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-bold text-blue-600">
                                ₦{booking.price.toLocaleString()}
                              </span>
                              <div className="space-x-2">
                                <Button variant="outline" size="sm">
                                  Reschedule
                                </Button>
                                <Button variant="outline" size="sm">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'wallet' && (
              <WalletCard />
            )}

            {activeTab === 'history' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Booking History</h2>
                
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{booking.service}</h3>
                            <p className="text-gray-600">by {booking.provider}</p>
                            <p className="text-sm text-gray-500">{booking.date}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                            <p className="text-lg font-bold text-blue-600 mt-1">
                              ₦{booking.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        {booking.rating && (
                          <div className="border-t pt-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm font-medium">Your Rating:</span>
                              <div className="flex">
                                {[...Array(booking.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                            </div>
                            {booking.review && (
                              <p className="text-sm text-gray-600 italic">"{booking.review}"</p>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCustomerDashboard;
