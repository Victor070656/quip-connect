
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, Bar, 
  LineChart, Line, 
  PieChart, Pie, Cell, 
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { Calendar, Download } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('month');

  const breadcrumbItems = [
    { label: 'Admin Dashboard', href: '/admin/dashboard' },
    { label: 'Analytics' },
  ];

  const platformMetrics = {
    totalRevenue: 3560000,
    bookingsCompleted: 2890,
    activeUsers: 1250,
    conversionRate: 18.5,
    averageBookingValue: 12318,
    platformGrowth: 24.7
  };

  const monthlyData = [
    { month: 'Jan', bookings: 380, revenue: 4680000, users: 850 },
    { month: 'Feb', bookings: 420, revenue: 5160000, users: 920 },
    { month: 'Mar', bookings: 480, revenue: 5890000, users: 980 },
    { month: 'Apr', bookings: 520, revenue: 6390000, users: 1050 },
    { month: 'May', bookings: 580, revenue: 7130000, users: 1150 },
    { month: 'Jun', bookings: 510, revenue: 6270000, users: 1250 }
  ];

  const categoryData = [
    { name: 'Beauty & Wellness', value: 45, color: '#8884d8' },
    { name: 'Home Services', value: 20, color: '#82ca9d' },
    { name: 'Technology', value: 15, color: '#ffc658' },
    { name: 'Events & Photography', value: 12, color: '#ff8042' },
    { name: 'Others', value: 8, color: '#0088fe' }
  ];

  const userTypeData = [
    { name: 'Customers', value: 980, color: '#8884d8' },
    { name: 'Providers', value: 270, color: '#82ca9d' }
  ];

  const deviceData = [
    { name: 'Mobile', value: 65, color: '#8884d8' },
    { name: 'Desktop', value: 25, color: '#82ca9d' },
    { name: 'Tablet', value: 10, color: '#ffc658' }
  ];

  return (
    <DashboardLayout userType="admin" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Platform Analytics</h1>
            <p className="text-muted-foreground">Comprehensive analytics and insights</p>
          </div>
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="quarter">Last 3 months</SelectItem>
                <SelectItem value="year">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Custom Range
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₦{platformMetrics.totalRevenue.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground mt-2">
                +{platformMetrics.platformGrowth}% from previous period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bookings Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{platformMetrics.bookingsCompleted.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground mt-2">
                Avg. {platformMetrics.averageBookingValue.toLocaleString()} ₦ per booking
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{platformMetrics.activeUsers.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground mt-2">
                {platformMetrics.conversionRate}% conversion rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Booking & User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="bookings" stroke="#82ca9d" name="Bookings" />
                  <Line yAxisId="right" type="monotone" dataKey="users" stroke="#ffc658" name="Users" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Categories</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={userTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {userTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Device Usage</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminAnalytics;
