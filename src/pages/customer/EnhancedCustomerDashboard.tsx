
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Star, Clock, MapPin, Bell } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const EnhancedCustomerDashboard = () => {
  const breadcrumbItems = [
    { label: 'Dashboard' },
  ];

  const upcomingBookings = [
    {
      id: '1',
      service: 'Hair Styling',
      provider: 'Beauty by Sarah',
      date: '2025-06-06',
      time: '2:00 PM',
      location: 'Victoria Island, Lagos',
      status: 'confirmed'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'booking',
      message: 'Booking confirmed for Hair Styling',
      time: '2 hours ago'
    },
    {
      id: '2',
      type: 'review',
      message: 'You left a review for Mike\'s Barber Shop',
      time: '1 day ago'
    }
  ];

  return (
    <DashboardLayout userType="customer" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Customer Dashboard</h1>
          <p className="text-muted-foreground">Manage your bookings and discover new services</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button asChild className="h-20">
            <Link to="/services" className="flex flex-col items-center justify-center">
              <MapPin className="w-6 h-6 mb-2" />
              Find Services
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-20">
            <Link to="/customer/bookings" className="flex flex-col items-center justify-center">
              <Calendar className="w-6 h-6 mb-2" />
              My Bookings
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-20">
            <Link to="/customer/favorites" className="flex flex-col items-center justify-center">
              <Star className="w-6 h-6 mb-2" />
              Favorites
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="p-4 border rounded-lg">
                    <h4 className="font-medium">{booking.service}</h4>
                    <p className="text-sm text-muted-foreground">{booking.provider}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>{booking.date} at {booking.time}</span>
                      <span>{booking.location}</span>
                    </div>
                    <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full mt-2">
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-4 border rounded-lg">
                    <Bell className="w-5 h-5 mt-0.5 text-blue-600" />
                    <div>
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EnhancedCustomerDashboard;
