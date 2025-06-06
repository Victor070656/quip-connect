
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, Star, MessageCircle } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const CustomerBookings = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/customer/dashboard' },
    { label: 'My Bookings' },
  ];

  const upcomingBookings = [
    {
      id: '1',
      service: 'Hair Styling',
      provider: 'Beauty by Sarah',
      date: '2025-06-08',
      time: '2:00 PM',
      location: 'Victoria Island, Lagos',
      amount: 12000,
      status: 'confirmed'
    },
    {
      id: '2',
      service: 'Home Cleaning',
      provider: 'Clean Masters',
      date: '2025-06-10',
      time: '9:00 AM',
      location: 'Your Address',
      amount: 15000,
      status: 'confirmed'
    }
  ];

  const pastBookings = [
    {
      id: '3',
      service: 'Laptop Repair',
      provider: 'Tech Solutions',
      date: '2025-06-01',
      time: '10:00 AM',
      location: 'Ikeja, Lagos',
      amount: 8000,
      status: 'completed',
      rating: 5
    },
    {
      id: '4',
      service: 'Event Photography',
      provider: 'PhotoPro Studios',
      date: '2025-05-28',
      time: '3:00 PM',
      location: 'Lekki, Lagos',
      amount: 25000,
      status: 'completed',
      rating: 4
    }
  ];

  return (
    <DashboardLayout userType="customer" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground">Manage your service bookings</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{booking.service}</h3>
                      <p className="text-muted-foreground">{booking.provider}</p>
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
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                        {booking.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="destructive" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastBookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{booking.service}</h3>
                      <p className="text-muted-foreground">{booking.provider}</p>
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
                      <div className="flex items-center gap-1">
                        <span className="text-sm">Your rating:</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < booking.rating 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="secondary">{booking.status}</Badge>
                      <Button variant="outline" size="sm">
                        Book Again
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CustomerBookings;
