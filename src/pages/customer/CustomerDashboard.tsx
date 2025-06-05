
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Star, Search } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const CustomerDashboard = () => {
  const { user } = useAuth();

  // Mock data
  const stats = {
    totalBookings: 8,
    upcomingBookings: 2,
    completedServices: 6,
    favoriteProviders: 4
  };

  const upcomingBookings = [
    {
      id: '1',
      service: 'Hair Styling',
      provider: 'Sarah Beauty',
      date: '2025-06-05',
      time: '10:00 AM',
      location: 'Victoria Island',
      amount: 12000,
      status: 'confirmed'
    },
    {
      id: '2',
      service: 'Home Cleaning',
      provider: 'Clean Masters',
      date: '2025-06-07',
      time: '9:00 AM',
      location: 'Your Address',
      amount: 15000,
      status: 'confirmed'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      service: 'Laptop Repair',
      provider: 'Tech Solutions',
      date: '2025-06-01',
      status: 'completed',
      rating: 5
    },
    {
      id: '2',
      service: 'Event Photography',
      provider: 'PhotoPro Studios',
      date: '2025-05-28',
      status: 'completed',
      rating: 4
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex-1">
                  <Link to="/services">
                    <Search className="w-4 h-4 mr-2" />
                    Find Services
                  </Link>
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <Link to="/customer/bookings">
                    <Calendar className="w-4 h-4 mr-2" />
                    My Bookings
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalBookings}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                  <p className="text-2xl font-bold text-foreground">{stats.upcomingBookings}</p>
                </div>
                <Clock className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-foreground">{stats.completedServices}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Favorites</p>
                  <p className="text-2xl font-bold text-foreground">{stats.favoriteProviders}</p>
                </div>
                <Star className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Bookings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Bookings</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/customer/bookings">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{booking.service}</h4>
                      <span className="text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{booking.provider}</p>
                    <p className="text-sm text-muted-foreground">{booking.date} at {booking.time}</p>
                    <p className="text-sm text-muted-foreground">{booking.location}</p>
                    <p className="text-sm font-medium mt-2 text-foreground">₦{booking.amount.toLocaleString()}</p>
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
                  <div key={activity.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{activity.service}</h4>
                      <span className="text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full">
                        {activity.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.provider}</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-muted-foreground mr-2">Your rating:</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < activity.rating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
