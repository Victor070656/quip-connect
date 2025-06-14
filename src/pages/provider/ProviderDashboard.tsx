
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Star, DollarSign, Eye, Settings, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const ProviderDashboard = () => {
  const { user } = useAuth();

  // Mock data - will be replaced with real data from Supabase
  const stats = {
    totalServices: 3,
    totalBookings: 12,
    monthlyEarnings: 45000,
    averageRating: 4.8
  };

  const recentBookings = [
    {
      id: '1',
      service: 'Hair Styling',
      customer: 'Sarah Johnson',
      date: '2025-06-05',
      time: '10:00 AM',
      status: 'confirmed',
      amount: 8000
    },
    {
      id: '2',
      service: 'Hair Washing',
      customer: 'Mike Adams',
      date: '2025-06-04',
      time: '2:00 PM',
      status: 'completed',
      amount: 3000
    }
  ];

  const breadcrumbItems = [
    { label: 'Dashboard' },
  ];

  return (
    <DashboardLayout userType="provider" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Provider Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button asChild className="h-20">
            <Link to="/provider/services/add" className="flex flex-col items-center justify-center">
              <Plus className="w-6 h-6 mb-2" />
              Add New Service
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-20">
            <Link to="/provider/operations" className="flex flex-col items-center justify-center">
              <Settings className="w-6 h-6 mb-2" />
              Manage Operations
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-20">
            <Link to="/provider/bookings" className="flex flex-col items-center justify-center">
              <Users className="w-6 h-6 mb-2" />
              View All Bookings
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Services</p>
                  <p className="text-2xl font-bold">{stats.totalServices}</p>
                </div>
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold">{stats.totalBookings}</p>
                </div>
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Earnings</p>
                  <p className="text-2xl font-bold">₦{stats.monthlyEarnings.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                  <p className="text-2xl font-bold">{stats.averageRating}</p>
                </div>
                <Star className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Services Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>My Services</CardTitle>
                <Button asChild size="sm">
                  <Link to="/provider/services/add">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Hair Styling</h4>
                    <p className="text-sm text-muted-foreground">₦8,000 - ₦15,000</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/provider/services/1">Edit</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Hair Washing</h4>
                    <p className="text-sm text-muted-foreground">₦3,000 - ₦5,000</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/provider/services/2">Edit</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Bookings</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/provider/operations">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{booking.service}</h4>
                      <p className="text-sm text-muted-foreground">{booking.customer}</p>
                      <p className="text-sm text-muted-foreground">{booking.date} at {booking.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₦{booking.amount.toLocaleString()}</p>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        booking.status === 'confirmed' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {booking.status}
                      </span>
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

export default ProviderDashboard;
