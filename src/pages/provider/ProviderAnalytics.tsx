
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Calendar, DollarSign } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const ProviderAnalytics = () => {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/provider/dashboard' },
    { label: 'Analytics' },
  ];

  const monthlyData = [
    { month: 'Jan', bookings: 15, revenue: 180000 },
    { month: 'Feb', bookings: 22, revenue: 264000 },
    { month: 'Mar', bookings: 28, revenue: 336000 },
    { month: 'Apr', bookings: 35, revenue: 420000 },
    { month: 'May', bookings: 42, revenue: 504000 },
    { month: 'Jun', bookings: 38, revenue: 456000 }
  ];

  const serviceData = [
    { name: 'Hair Styling', value: 45, color: '#8884d8' },
    { name: 'Hair Washing', value: 30, color: '#82ca9d' },
    { name: 'Hair Coloring', value: 25, color: '#ffc658' }
  ];

  const recentMetrics = [
    { icon: TrendingUp, label: 'Revenue Growth', value: '+15%', description: 'vs last month' },
    { icon: Users, label: 'New Customers', value: '23', description: 'this month' },
    { icon: Calendar, label: 'Bookings', value: '38', description: 'this month' },
    { icon: DollarSign, label: 'Avg. Order Value', value: '₦12,000', description: '+8% vs last month' }
  ];

  return (
    <DashboardLayout userType="provider" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Track your business performance</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className="text-xs text-muted-foreground">{metric.description}</p>
                    </div>
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Revenue */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Service Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Service Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Customer Satisfaction</span>
                <span className="font-semibold">4.8/5.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Response Time</span>
                <span className="font-semibold">&lt; 2 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Completion Rate</span>
                <span className="font-semibold">98%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Repeat Customers</span>
                <span className="font-semibold">65%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Average Service Time</span>
                <span className="font-semibold">2.5 hours</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProviderAnalytics;
