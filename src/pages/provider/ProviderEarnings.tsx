
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const ProviderEarnings = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeFilter, setTimeFilter] = useState('month');

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/provider/dashboard' },
    { label: 'Earnings' },
  ];

  const earningsStats = {
    totalEarnings: 2340000,
    thisMonth: 456000,
    pendingPayouts: 124000,
    averageBookingValue: 12000
  };

  const monthlyEarnings = [
    { month: 'Jan', earnings: 180000, bookings: 15 },
    { month: 'Feb', earnings: 264000, bookings: 22 },
    { month: 'Mar', earnings: 336000, bookings: 28 },
    { month: 'Apr', earnings: 420000, bookings: 35 },
    { month: 'May', earnings: 504000, bookings: 42 },
    { month: 'Jun', earnings: 456000, bookings: 38 }
  ];

  const recentTransactions = [
    {
      id: '1',
      customer: 'Sarah Johnson',
      service: 'Hair Styling',
      amount: 15000,
      commission: 2250,
      netAmount: 12750,
      date: '2025-06-05',
      status: 'completed'
    },
    {
      id: '2',
      customer: 'Mike Adams',
      service: 'Hair Washing',
      amount: 4000,
      commission: 600,
      netAmount: 3400,
      date: '2025-06-04',
      status: 'completed'
    },
    {
      id: '3',
      customer: 'Emily Chen',
      service: 'Hair Coloring',
      amount: 20000,
      commission: 3000,
      netAmount: 17000,
      date: '2025-06-03',
      status: 'pending'
    },
    {
      id: '4',
      customer: 'David Wilson',
      service: 'Hair Styling',
      amount: 12000,
      commission: 1800,
      netAmount: 10200,
      date: '2025-06-02',
      status: 'completed'
    }
  ];

  const payoutHistory = [
    {
      id: '1',
      amount: 425000,
      date: '2025-06-01',
      method: 'Bank Transfer',
      status: 'completed',
      reference: 'PAY-2025-001'
    },
    {
      id: '2',
      amount: 380000,
      date: '2025-05-15',
      method: 'Bank Transfer',
      status: 'completed',
      reference: 'PAY-2025-002'
    },
    {
      id: '3',
      amount: 290000,
      date: '2025-05-01',
      method: 'Bank Transfer',
      status: 'completed',
      reference: 'PAY-2025-003'
    }
  ];

  return (
    <DashboardLayout userType="provider" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Earnings</h1>
            <p className="text-muted-foreground">Track your income and payouts</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Earnings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold">₦{earningsStats.totalEarnings.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">₦{earningsStats.thisMonth.toLocaleString()}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Payouts</p>
                  <p className="text-2xl font-bold">₦{earningsStats.pendingPayouts.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Booking Value</p>
                  <p className="text-2xl font-bold">₦{earningsStats.averageBookingValue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="payouts">Payouts</TabsTrigger>
            </TabsList>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyEarnings}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
                      <Line type="monotone" dataKey="earnings" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyEarnings}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="bookings" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{transaction.customer}</h4>
                        <p className="text-sm text-muted-foreground">{transaction.service}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₦{transaction.netAmount.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">
                          Commission: ₦{transaction.commission.toLocaleString()}
                        </p>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          transaction.status === 'completed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                        }`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payouts" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Payout History</CardTitle>
                  <Button>Request Payout</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payoutHistory.map((payout) => (
                    <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">₦{payout.amount.toLocaleString()}</h4>
                        <p className="text-sm text-muted-foreground">{payout.method}</p>
                        <p className="text-xs text-muted-foreground">{payout.reference}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{payout.date}</p>
                        <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                          {payout.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProviderEarnings;
