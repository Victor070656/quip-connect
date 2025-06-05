
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Star, MessageCircle, User, TrendingUp } from 'lucide-react';

const CustomerInsights = () => {
  const topCustomers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: '/placeholder.svg',
      totalSpent: 45000,
      visits: 8,
      lastVisit: '2 days ago',
      rating: 5,
      isVip: true
    },
    {
      id: '2',
      name: 'Mike Adams',
      avatar: '/placeholder.svg',
      totalSpent: 32000,
      visits: 6,
      lastVisit: '1 week ago',
      rating: 4.8,
      isVip: false
    },
    {
      id: '3',
      name: 'Emily Chen',
      avatar: '/placeholder.svg',
      totalSpent: 28000,
      visits: 5,
      lastVisit: '3 days ago',
      rating: 4.9,
      isVip: true
    },
    {
      id: '4',
      name: 'David Wilson',
      avatar: '/placeholder.svg',
      totalSpent: 25000,
      visits: 4,
      lastVisit: '5 days ago',
      rating: 4.7,
      isVip: false
    }
  ];

  const customerRetention = [
    { period: 'Week 1', newCustomers: 12, returningCustomers: 8 },
    { period: 'Week 2', newCustomers: 15, returningCustomers: 18 },
    { period: 'Week 3', newCustomers: 10, returningCustomers: 22 },
    { period: 'Week 4', newCustomers: 8, returningCustomers: 25 },
  ];

  const satisfactionMetrics = {
    averageRating: 4.8,
    totalReviews: 156,
    responseRate: 92,
    repeatCustomers: 68
  };

  const chartConfig = {
    newCustomers: {
      label: 'New Customers',
      color: '#2563eb',
    },
    returningCustomers: {
      label: 'Returning Customers',
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
                <p className="text-sm font-medium text-muted-foreground">Avg. Rating</p>
                <p className="text-2xl font-bold">{satisfactionMetrics.averageRating}</p>
                <p className="text-sm text-muted-foreground">{satisfactionMetrics.totalReviews} reviews</p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                <p className="text-2xl font-bold">{satisfactionMetrics.responseRate}%</p>
                <p className="text-sm text-muted-foreground">Message replies</p>
              </div>
              <MessageCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Repeat Customers</p>
                <p className="text-2xl font-bold">{satisfactionMetrics.repeatCustomers}%</p>
                <p className="text-sm text-muted-foreground">Return rate</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">VIP Customers</p>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-muted-foreground">High-value clients</p>
              </div>
              <User className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customerRetention}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="newCustomers" fill="#2563eb" />
                  <Bar dataKey="returningCustomers" fill="#16a34a" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCustomers.map((customer) => (
                <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={customer.avatar} />
                      <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{customer.name}</p>
                        {customer.isVip && (
                          <Badge variant="secondary" className="text-xs">VIP</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {customer.visits} visits • Last: {customer.lastVisit}
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-3 h-3 fill-current text-yellow-400" />
                        <span className="text-xs">{customer.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₦{customer.totalSpent.toLocaleString()}</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Contact
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerInsights;
