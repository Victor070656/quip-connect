
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Clock, MapPin, User, Edit, X, CheckCircle } from 'lucide-react';
import BookingCalendar from './BookingCalendar';

interface Booking {
  id: string;
  service: string;
  provider: string;
  customer: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  price: number;
  location: string;
  notes?: string;
}

interface BookingManagerProps {
  userType: 'customer' | 'provider';
  userId: string;
}

const BookingManager = ({ userType, userId }: BookingManagerProps) => {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      service: 'Hair Styling',
      provider: 'Sarah Beauty',
      customer: 'John Doe',
      date: '2024-06-15',
      time: '10:00',
      status: 'confirmed',
      price: 12000,
      location: 'Victoria Island',
      notes: 'Please bring hair products'
    },
    {
      id: '2',
      service: 'Home Cleaning',
      provider: 'Clean Masters',
      customer: 'Jane Smith',
      date: '2024-06-18',
      time: '14:00',
      status: 'pending',
      price: 8000,
      location: 'Ikoyi'
    }
  ]);

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showReschedule, setShowReschedule] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = (bookingId: string, newStatus: Booking['status']) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  const handleReschedule = (newDate: string, newTime: string) => {
    if (selectedBooking) {
      setBookings(prev => prev.map(booking => 
        booking.id === selectedBooking.id 
          ? { ...booking, date: newDate, time: newTime, status: 'pending' }
          : booking
      ));
      setShowReschedule(false);
      setSelectedBooking(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Booking Management</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Filter</Button>
          <Button variant="outline" size="sm">Export</Button>
        </div>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{booking.service}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {userType === 'provider' ? booking.customer : booking.provider}
                    </div>
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

              {booking.notes && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Notes:</strong> {booking.notes}
                  </p>
                </div>
              )}

              <div className="flex space-x-2">
                {booking.status === 'pending' && userType === 'provider' && (
                  <>
                    <Button 
                      size="sm" 
                      onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Confirm
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Decline
                    </Button>
                  </>
                )}
                
                {(booking.status === 'confirmed' || booking.status === 'pending') && (
                  <Dialog open={showReschedule} onOpenChange={setShowReschedule}>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Reschedule
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Reschedule Booking</DialogTitle>
                      </DialogHeader>
                      <BookingCalendar
                        onDateSelect={(date) => {}}
                        onTimeSelect={(time) => {}}
                        selectedDate=""
                        selectedTime=""
                      />
                      <div className="flex space-x-2 mt-4">
                        <Button onClick={() => handleReschedule('2024-06-20', '15:00')}>
                          Confirm Reschedule
                        </Button>
                        <Button variant="outline" onClick={() => setShowReschedule(false)}>
                          Cancel
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

                {booking.status === 'confirmed' && userType === 'provider' && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleStatusUpdate(booking.id, 'in-progress')}
                  >
                    Start Service
                  </Button>
                )}

                {booking.status === 'in-progress' && userType === 'provider' && (
                  <Button 
                    size="sm"
                    onClick={() => handleStatusUpdate(booking.id, 'completed')}
                  >
                    Mark Complete
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookingManager;
