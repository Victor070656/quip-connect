
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, Calendar, Star } from 'lucide-react';

const ProviderAnalytics = () => {
  // Mock data - in real app this would come from Supabase
  const earningsData = [
    { month: 'Jan', earnings: 25000, bookings: 8 },
    { month: 'Feb', earnings: 32000, bookings: 12 },
    { month: 'Mar', earnings: 28000, bookings: 10 },
    { month: 'Apr', earnings: 45000, bookings: 15 },
    { month: 'May', earnings: 52000, bookings: 18 },
    { month: 'Jun', earnings: 48000, bookings: 16 },
  ];

  const servicePerformance = [
    { service: 'Hair Styling', bookings: 45, revenue: 180000 },
    { service: 'Hair Washing', bookings: 32, revenue: 96000 },
    { service: 'Hair Treatment', bookings: 28, revenue: 140000 },
    { service: 'Makeup', bookings: 15, revenue: 75000 },
  ];

  const customerInsights = [
    { demographic: 'Age 18-25', value: 35 },
    { demographic: 'Age 26-35', value: 40 },
    { demographic: 'Age 36-45', value: 20 },
    { demographic: 'Age 45+', value: 5 },
  ];

  const timeSlots = [
    { time: '9-11 AM', bookings: 15 },
    { time: '11-1 PM', bookings: 25 },
    { time: '1-3 PM', bookings: 20 },
    { time: '3-5 PM', bookings: 30 },
    { time: '5-7 PM', bookings: 35 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const chartConfig = {
    earnings: {
      label: 'Earnings',
      color: '#2563eb',
    },
    bookings: {
      label: 'Bookings',
      color: '#16a34a',
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">₦491,000</p>
                <div className="flex items-center mt-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500">+12.5%</span>
                  <span className="text-muted-foreground ml-1">vs last month</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">156</p>
                <div className="flex items-center mt-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500">+8.2%</span>
                  <span className="text-muted-foreground ml-1">vs last month</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Rating</p>
                <p className="text-2xl font-bold">4.8</p>
                <div className="flex items-center mt-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500">+0.2</span>
                  <span className="text-muted-foreground ml-1">vs last month</span>
                </div>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">68%</p>
                <div className="flex items-center mt-2 text-sm">
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-red-500">-2.1%</span>
                  <span className="text-muted-foreground ml-1">vs last month</span>
                </div>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Earnings & Bookings Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="earnings" fill="#2563eb" />
                  <Bar dataKey="bookings" fill="#16a34a" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerInsights}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ demographic, value }) => `${demographic}: ${value}%`}
                  >
                    {customerInsights.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Service Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {servicePerformance.map((service, index) => (
                <div key={service.service} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{service.service}</h4>
                    <p className="text-sm text-muted-foreground">{service.bookings} bookings</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₦{service.revenue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Time Slots</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeSlots} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="time" type="category" width={80} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="bookings" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProviderAnalytics;
