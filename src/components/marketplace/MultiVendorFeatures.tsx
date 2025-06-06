
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Store, Users, TrendingUp, Award, MapPin, Star, Eye, MessageSquare } from 'lucide-react';

const MultiVendorFeatures = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const marketplaceStats = {
    totalVendors: 1247,
    activeVendors: 982,
    totalRevenue: 2450000,
    commission: 245000,
    averageRating: 4.7,
    totalOrders: 8945
  };

  const topVendors = [
    {
      id: 1,
      name: 'Sarah Beauty Studio',
      category: 'Beauty & Wellness',
      revenue: 185000,
      orders: 234,
      rating: 4.9,
      commission: 18500,
      location: 'Victoria Island, Lagos',
      status: 'verified'
    },
    {
      id: 2,
      name: 'Tech Solutions Pro',
      category: 'Technology',
      revenue: 142000,
      orders: 89,
      rating: 4.8,
      commission: 14200,
      location: 'Ikeja, Lagos',
      status: 'verified'
    },
    {
      id: 3,
      name: 'Home Service Masters',
      category: 'Home Services',
      revenue: 128000,
      orders: 156,
      rating: 4.6,
      commission: 12800,
      location: 'Abuja',
      status: 'pending'
    }
  ];

  const vendorApplications = [
    {
      id: 1,
      name: 'Clean Pro Services',
      category: 'Cleaning',
      appliedDate: '2024-01-20',
      status: 'pending',
      documents: 4,
      completeness: 85
    },
    {
      id: 2,
      name: 'Garden Expert',
      category: 'Landscaping',
      appliedDate: '2024-01-18',
      status: 'review',
      documents: 5,
      completeness: 100
    }
  ];

  const commissionStructure = [
    { tier: 'Standard', minRevenue: 0, rate: 10, vendors: 847 },
    { tier: 'Gold', minRevenue: 100000, rate: 8, vendors: 285 },
    { tier: 'Platinum', minRevenue: 250000, rate: 6, vendors: 89 },
    { tier: 'Diamond', minRevenue: 500000, rate: 5, vendors: 26 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Multi-Vendor Marketplace</h2>
        <p className="text-muted-foreground">Manage vendors and marketplace operations</p>
      </div>

      {/* Marketplace Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Store className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Vendors</p>
                <p className="text-xl font-bold">{marketplaceStats.totalVendors}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Active Vendors</p>
                <p className="text-xl font-bold">{marketplaceStats.activeVendors}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-xl font-bold">₦{(marketplaceStats.totalRevenue / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Commission</p>
                <p className="text-xl font-bold">₦{marketplaceStats.commission.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-xl font-bold">{marketplaceStats.averageRating}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-xl font-bold">{marketplaceStats.totalOrders.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vendors">Top Vendors</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="commission">Commission</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>This Month</span>
                    <span className="font-semibold">+47 vendors</span>
                  </div>
                  <Progress value={78} />
                  <p className="text-sm text-muted-foreground">
                    78% of monthly target reached
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Beauty & Wellness</span>
                    <span>324 vendors</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Home Services</span>
                    <span>289 vendors</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Technology</span>
                    <span>187 vendors</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Others</span>
                    <span>447 vendors</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vendors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Vendors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topVendors.map((vendor) => (
                  <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold">{vendor.name}</h3>
                        <Badge className={getStatusColor(vendor.status)}>
                          {vendor.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="block">Category</span>
                          <span className="font-medium text-foreground">{vendor.category}</span>
                        </div>
                        <div>
                          <span className="block">Revenue</span>
                          <span className="font-medium text-foreground">₦{vendor.revenue.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="block">Orders</span>
                          <span className="font-medium text-foreground">{vendor.orders}</span>
                        </div>
                        <div>
                          <span className="block">Rating</span>
                          <span className="font-medium text-foreground flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 mr-1" />
                            {vendor.rating}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center mt-2 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3 mr-1" />
                        {vendor.location}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                      <Button variant="outline" size="sm">View Profile</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Vendor Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vendorApplications.map((application) => (
                  <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold">{application.name}</h3>
                        <Badge className={getStatusColor(application.status)}>
                          {application.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="block">Category</span>
                          <span className="font-medium text-foreground">{application.category}</span>
                        </div>
                        <div>
                          <span className="block">Applied</span>
                          <span className="font-medium text-foreground">{application.appliedDate}</span>
                        </div>
                        <div>
                          <span className="block">Completeness</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={application.completeness} className="flex-1" />
                            <span className="font-medium text-foreground">{application.completeness}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Review</Button>
                      <Button size="sm">Approve</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commission" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Commission Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commissionStructure.map((tier) => (
                  <div key={tier.tier} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{tier.tier} Tier</h3>
                      <p className="text-sm text-muted-foreground">
                        Min Revenue: ₦{tier.minRevenue.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{tier.rate}%</p>
                      <p className="text-sm text-muted-foreground">Commission Rate</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{tier.vendors}</p>
                      <p className="text-sm text-muted-foreground">Vendors</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MultiVendorFeatures;
