
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, User, MessageCircle, Check, X } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const ProviderBookings = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/provider/dashboard' },
    { label: 'Bookings' },
  ];

  const pendingBookings = [
    {
      id: '1',
      service: 'Hair Styling',
      customer: 'Sarah Johnson',
      date: '2025-06-08',
      time: '2:00 PM',
      location: 'Victoria Island, Lagos',
      amount: 12000,
      status: 'pending'
    },
    {
      id: '2',
      service: 'Hair Washing',
      customer: 'Mike Adams',
      date: '2025-06-09',
      time: '10:00 AM',
      location: 'Ikeja, Lagos',
      amount: 4000,
      status: 'pending'
    }
  ];

  const confirmedBookings = [
    {
      id: '3',
      service: 'Hair Styling',
      customer: 'Emily Chen',
      date: '2025-06-10',
      time: '3:00 PM',
      location: 'Lekki, Lagos',
      amount: 15000,
      status: 'confirmed'
    }
  ];

  const completedBookings = [
    {
      id: '4',
      service: 'Hair Washing',
      customer: 'David Wilson',
      date: '2025-06-05',
      time: '11:00 AM',
      location: 'Yaba, Lagos',
      amount: 3500,
      status: 'completed',
      rating: 5
    },
    {
      id: '5',
      service: 'Hair Styling',
      customer: 'Grace Okafor',
      date: '2025-06-03',
      time: '1:00 PM',
      location: 'Surulere, Lagos',
      amount: 10000,
      status: 'completed',
      rating: 4
    }
  ];

  const handleAccept = (bookingId: string) => {
    console.log('Accepting booking:', bookingId);
  };

  const handleReject = (bookingId: string) => {
    console.log('Rejecting booking:', bookingId);
  };

  const renderBookingCard = (booking: any, showActions = false) => (
    <Card key={booking.id}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{booking.service}</h3>
            <div className="flex items-center gap-1 text-muted-foreground">
              <User className="w-4 h-4" />
              {booking.customer}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {booking.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {booking.time}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {booking.location}
              </div>
            </div>
            <p className="font-semibold">₦{booking.amount.toLocaleString()}</p>
            {booking.rating && (
              <div className="text-sm">
                Customer rating: {booking.rating} ⭐
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant={
              booking.status === 'pending' ? 'secondary' :
              booking.status === 'confirmed' ? 'default' : 'outline'
            }>
              {booking.status}
            </Badge>
            {showActions ? (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAccept(booking.id)}
                >
                  <Check className="w-4 h-4 mr-1" />
                  Accept
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleReject(booking.id)}
                >
                  <X className="w-4 h-4 mr-1" />
                  Reject
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-1" />
                Message
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout userType="provider" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground">Manage your service bookings</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">
              Pending ({pendingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="confirmed">
              Confirmed ({confirmedBookings.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingBookings.map((booking) => renderBookingCard(booking, true))}
          </TabsContent>

          <TabsContent value="confirmed" className="space-y-4">
            {confirmedBookings.map((booking) => renderBookingCard(booking))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedBookings.map((booking) => renderBookingCard(booking))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProviderBookings;
