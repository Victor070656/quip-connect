
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Download, Filter, Search, FileText, RefreshCw } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const AdminReports = () => {
  const [activeTab, setActiveTab] = useState('revenue');
  const [timeRange, setTimeRange] = useState('month');

  const breadcrumbItems = [
    { label: 'Admin Dashboard', href: '/admin/dashboard' },
    { label: 'Reports' },
  ];

  const revenueData = [
    { month: 'Jan', platformFee: 500000, providerEarnings: 4180000, total: 4680000 },
    { month: 'Feb', platformFee: 550000, providerEarnings: 4610000, total: 5160000 },
    { month: 'Mar', platformFee: 620000, providerEarnings: 5270000, total: 5890000 },
    { month: 'Apr', platformFee: 680000, providerEarnings: 5710000, total: 6390000 },
    { month: 'May', platformFee: 750000, providerEarnings: 6380000, total: 7130000 },
    { month: 'Jun', platformFee: 660000, providerEarnings: 5610000, total: 6270000 }
  ];

  const topProviders = [
    { id: 1, name: 'Beauty by Sarah', revenue: 1245000, bookings: 98, rating: 4.8 },
    { id: 2, name: 'Tech Solutions', revenue: 980000, bookings: 56, rating: 4.9 },
    { id: 3, name: 'PhotoPro Studios', revenue: 856000, bookings: 32, rating: 4.7 },
    { id: 4, name: 'Clean Masters', revenue: 720000, bookings: 64, rating: 4.6 },
    { id: 5, name: 'Fashion Hub', revenue: 685000, bookings: 42, rating: 4.7 }
  ];

  const topServices = [
    { id: 1, service: 'Hair Styling', category: 'Beauty & Wellness', revenue: 620000, bookings: 52 },
    { id: 2, service: 'Home Cleaning', category: 'Home Services', revenue: 580000, bookings: 48 },
    { id: 3, service: 'Laptop Repair', category: 'Technology', revenue: 450000, bookings: 36 },
    { id: 4, service: 'Wedding Photography', category: 'Photography', revenue: 420000, bookings: 12 },
    { id: 5, service: 'Makeup Artist', category: 'Beauty & Wellness', revenue: 385000, bookings: 35 }
  ];

  return (
    <DashboardLayout userType="admin" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Reports</h1>
            <p className="text-muted-foreground">Detailed financial and performance reports</p>
          </div>
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="quarter">Last 3 months</SelectItem>
                <SelectItem value="year">Last 12 months</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Custom Range
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="revenue">Revenue Reports</TabsTrigger>
            <TabsTrigger value="providers">Top Providers</TabsTrigger>
            <TabsTrigger value="services">Top Services</TabsTrigger>
            <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
                    <Bar dataKey="platformFee" stackId="a" name="Platform Fee" fill="#8884d8" />
                    <Bar dataKey="providerEarnings" stackId="a" name="Provider Earnings" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Platform Fee</TableHead>
                      <TableHead>Provider Earnings</TableHead>
                      <TableHead>Total Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenueData.map((item) => (
                      <TableRow key={item.month}>
                        <TableCell>{item.month}</TableCell>
                        <TableCell>₦{item.platformFee.toLocaleString()}</TableCell>
                        <TableCell>₦{item.providerEarnings.toLocaleString()}</TableCell>
                        <TableCell>₦{item.total.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="providers" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle>Top Performing Providers</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input placeholder="Search providers..." className="pl-10 w-64" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-1" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Provider Name</TableHead>
                      <TableHead>Revenue Generated</TableHead>
                      <TableHead>Bookings</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topProviders.map((provider, index) => (
                      <TableRow key={provider.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{provider.name}</TableCell>
                        <TableCell>₦{provider.revenue.toLocaleString()}</TableCell>
                        <TableCell>{provider.bookings}</TableCell>
                        <TableCell>{provider.rating} ⭐</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <FileText className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle>Top Performing Services</CardTitle>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Filter by Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="beauty">Beauty & Wellness</SelectItem>
                        <SelectItem value="home">Home Services</SelectItem>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="photo">Photography</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Revenue Generated</TableHead>
                      <TableHead>Bookings</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topServices.map((service, index) => (
                      <TableRow key={service.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{service.service}</TableCell>
                        <TableCell>{service.category}</TableCell>
                        <TableCell>₦{service.revenue.toLocaleString()}</TableCell>
                        <TableCell>{service.bookings}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <FileText className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Report Builder</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Report Type</Label>
                  <Select defaultValue="revenue">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="revenue">Revenue Report</SelectItem>
                      <SelectItem value="bookings">Bookings Report</SelectItem>
                      <SelectItem value="users">User Growth Report</SelectItem>
                      <SelectItem value="performance">Performance Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="beauty">Beauty & Wellness</SelectItem>
                        <SelectItem value="home">Home Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Format</Label>
                    <Select defaultValue="pdf">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Reset</Button>
                  <Button>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

// Custom Label component for the form
const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm font-medium text-foreground">{children}</p>
);

export default AdminReports;
