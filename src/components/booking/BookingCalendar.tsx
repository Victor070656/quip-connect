
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronLeft, ChevronRight, Clock, User, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  booked?: boolean;
  price?: number;
}

interface BookingData {
  id: string;
  customerName: string;
  service: string;
  time: string;
  duration: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  location: string;
}

const BookingCalendar = () => {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  // Mock data for available time slots
  const timeSlots: TimeSlot[] = [
    { id: '1', time: '09:00', available: true, price: 15000 },
    { id: '2', time: '10:00', available: true, price: 15000 },
    { id: '3', time: '11:00', available: false, booked: true },
    { id: '4', time: '12:00', available: true, price: 15000 },
    { id: '5', time: '13:00', available: false },
    { id: '6', time: '14:00', available: true, price: 15000 },
    { id: '7', time: '15:00', available: true, price: 15000 },
    { id: '8', time: '16:00', available: false, booked: true },
    { id: '9', time: '17:00', available: true, price: 15000 },
  ];

  // Mock bookings data
  const bookings: BookingData[] = [
    {
      id: '1',
      customerName: 'John Doe',
      service: 'House Cleaning',
      time: '11:00',
      duration: '2 hours',
      status: 'confirmed',
      location: 'Victoria Island, Lagos'
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      service: 'Office Cleaning',
      time: '16:00',
      duration: '3 hours',
      status: 'pending',
      location: 'Ikeja, Lagos'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const isDateSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    return date.toDateString() === new Date().toDateString();
  };

  const hasBookings = (date: Date | null) => {
    if (!date) return false;
    // This would normally check against actual booking data
    return Math.random() > 0.7; // Mock: 30% chance of having bookings
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (timeSlotId: string) => {
    const timeSlot = timeSlots.find(slot => slot.id === timeSlotId);
    if (timeSlot?.available) {
      setSelectedTimeSlot(timeSlotId);
    }
  };

  const handleBookingConfirm = () => {
    if (selectedDate && selectedTimeSlot) {
      const timeSlot = timeSlots.find(slot => slot.id === selectedTimeSlot);
      toast({
        title: "Time Slot Reserved",
        description: `${selectedDate.toLocaleDateString()} at ${timeSlot?.time} has been reserved.`,
      });
      setSelectedTimeSlot(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const days = getDaysInMonth(currentDate);
  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Booking Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h3 className="text-lg font-semibold">{monthYear}</h3>
            <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
            {days.map((date, index) => (
              <div key={index} className="aspect-square p-1">
                {date && (
                  <Button
                    variant={isDateSelected(date) ? "default" : "ghost"}
                    className={`w-full h-full text-sm relative ${
                      isToday(date) ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => handleDateSelect(date)}
                  >
                    {date.getDate()}
                    {hasBookings(date) && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                    )}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Time Slots */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle>
              Available Time Slots - {selectedDate.toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {timeSlots.map((slot) => (
                <Button
                  key={slot.id}
                  variant={selectedTimeSlot === slot.id ? "default" : "outline"}
                  className={`h-auto p-3 flex flex-col items-center ${
                    !slot.available ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={() => handleTimeSlotSelect(slot.id)}
                  disabled={!slot.available}
                >
                  <Clock className="w-4 h-4 mb-1" />
                  <span className="text-sm font-medium">{slot.time}</span>
                  {slot.booked && (
                    <Badge variant="secondary" className="mt-1 text-xs">
                      Booked
                    </Badge>
                  )}
                  {slot.available && slot.price && (
                    <span className="text-xs text-muted-foreground mt-1">
                      ₦{slot.price.toLocaleString()}
                    </span>
                  )}
                </Button>
              ))}
            </div>
            
            {selectedTimeSlot && (
              <div className="mt-6 p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Selected Time Slot</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedDate.toLocaleDateString()} at {timeSlots.find(s => s.id === selectedTimeSlot)?.time}
                    </p>
                  </div>
                  <Button onClick={handleBookingConfirm}>
                    Reserve This Slot
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Today's Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No bookings for today</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold">{booking.time}</div>
                      <div className="text-sm text-muted-foreground">{booking.duration}</div>
                    </div>
                    <div>
                      <h4 className="font-medium">{booking.service}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-3 h-3" />
                        <span>{booking.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{booking.location}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingCalendar;
