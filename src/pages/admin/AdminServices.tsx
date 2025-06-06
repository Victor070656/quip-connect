
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, MoreHorizontal, Eye, Edit, Check, X, Star } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const AdminServices = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const breadcrumbItems = [
    { label: 'Admin Dashboard', href: '/admin/dashboard' },
    { label: 'Services' },
  ];

  const services = [
    {
      id: '1',
      title: 'Hair Styling',
      provider: 'Beauty by Sarah',
      category: 'Beauty & Wellness',
      price: '₦8,000 - ₦15,000',
      status: 'active',
      featured: true,
      rating: 4.8,
      bookings: 45,
      createdAt: '2025-01-15'
    },
    {
      id: '2',
      title: 'Hair Washing',
      provider: 'Beauty by Sarah',
      category: 'Beauty & Wellness',
      price: '₦3,000 - ₦5,000',
      status: 'active',
      featured: false,
      rating: 4.9,
      bookings: 32,
      createdAt: '2025-01-20'
    },
    {
      id: '3',
      title: 'Laptop Repair',
      provider: 'Tech Solutions',
      category: 'Technology',
      price: '₦5,000 - ₦20,000',
      status: 'pending',
      featured: false,
      rating: 0,
      bookings: 0,
      createdAt: '2025-05-22'
    },
    {
      id: '4',
      title: 'Phone Screen Replacement',
      provider: 'Tech Solutions',
      category: 'Technology',
      price: '₦10,000 - ₦25,000',
      status: 'active',
      featured: false,
      rating: 4.7,
      bookings: 28,
      createdAt: '2025-03-10'
    },
    {
      id: '5',
      title: 'Event Photography',
      provider: 'PhotoPro Studios',
      category: 'Photography',
      price: '₦15,000 - ₦50,000',
      status: 'inactive',
      featured: false,
      rating: 4.5,
      bookings: 15,
      createdAt: '2025-02-15'
    }
  ];

  const stats = {
    totalServices: 450,
    activeServices: 372,
    pendingReview: 36,
    inactiveServices: 42,
    featuredServices: 24,
    categoriesCount: 15
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || service.status === activeTab || 
                     (activeTab === 'featured' && service.featured);
    return matchesSearch && matchesTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleServiceAction = (serviceId: string, action: string) => {
    console.log(`${action} service:`, serviceId);
  };

  return (
    <DashboardLayout userType="admin" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Service Management</h1>
          <p className="text-muted-foreground">Manage services across the platform</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{stats.totalServices}</p>
              <p className="text-sm text-muted-foreground">Total Services</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{stats.activeServices}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{stats.pendingReview}</p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{stats.inactiveServices}</p>
              <p className="text-sm text-muted-foreground">Inactive</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{stats.featuredServices}</p>
              <p className="text-sm text-muted-foreground">Featured</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{stats.categoriesCount}</p>
              <p className="text-sm text-muted-foreground">Categories</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="beauty">Beauty & Wellness</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="photo">Photography</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services Table */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Services</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {filteredServices.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 border-b border-border last:border-0 hover:bg-muted/50">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{service.title}</h4>
                          {service.featured && (
                            <Badge className="bg-blue-100 text-blue-800">Featured</Badge>
                          )}
                          {getStatusBadge(service.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{service.provider}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {service.category}
                          </Badge>
                          {service.rating > 0 && (
                            <span className="flex items-center text-xs">
                              <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                              {service.rating}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right mr-4">
                        <p className="text-sm font-medium">{service.price}</p>
                        <p className="text-xs text-muted-foreground">
                          {service.bookings} booking{service.bookings !== 1 ? 's' : ''}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Added: {service.createdAt}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleServiceAction(service.id, 'view')}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleServiceAction(service.id, 'edit')}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        {service.status === 'pending' ? (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => handleServiceAction(service.id, 'approve')}>
                              <Check className="w-4 h-4 text-green-600" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleServiceAction(service.id, 'reject')}>
                              <X className="w-4 h-4 text-red-600" />
                            </Button>
                          </>
                        ) : (
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        )}
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

export default AdminServices;
