
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Filter, MoreHorizontal, Eye, Edit, Ban, Shield } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const AdminUsers = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const breadcrumbItems = [
    { label: 'Admin Dashboard', href: '/admin/dashboard' },
    { label: 'Users' },
  ];

  const users = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      type: 'customer',
      status: 'active',
      joinDate: '2025-01-15',
      bookings: 8,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
    },
    {
      id: '2',
      name: 'Beauty by Sarah',
      email: 'beautybysarah@example.com',
      type: 'provider',
      status: 'active',
      joinDate: '2025-01-10',
      bookings: 45,
      rating: 4.8,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=beautysarah'
    },
    {
      id: '3',
      name: 'Mike Adams',
      email: 'mike@example.com',
      type: 'customer',
      status: 'active',
      joinDate: '2025-02-01',
      bookings: 3,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike'
    },
    {
      id: '4',
      name: 'Tech Solutions',
      email: 'tech@example.com',
      type: 'provider',
      status: 'pending',
      joinDate: '2025-05-20',
      bookings: 12,
      rating: 4.9,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech'
    },
    {
      id: '5',
      name: 'Emily Chen',
      email: 'emily@example.com',
      type: 'customer',
      status: 'suspended',
      joinDate: '2025-03-15',
      bookings: 1,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily'
    }
  ];

  const stats = {
    totalUsers: 1250,
    customers: 980,
    providers: 270,
    activeUsers: 1120,
    pendingVerifications: 15,
    suspendedUsers: 8
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || user.type === activeTab || user.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleUserAction = (userId: string, action: string) => {
    console.log(`${action} user:`, userId);
  };

  return (
    <DashboardLayout userType="admin" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage customers and service providers</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{stats.customers}</p>
              <p className="text-sm text-muted-foreground">Customers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{stats.providers}</p>
              <p className="text-sm text-muted-foreground">Providers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{stats.activeUsers}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{stats.pendingVerifications}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{stats.suspendedUsers}</p>
              <p className="text-sm text-muted-foreground">Suspended</p>
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
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
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

        {/* Users Table */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Users ({stats.totalUsers})</TabsTrigger>
            <TabsTrigger value="customer">Customers ({stats.customers})</TabsTrigger>
            <TabsTrigger value="provider">Providers ({stats.providers})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({stats.pendingVerifications})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border-b border-border last:border-0 hover:bg-muted/50">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {user.type}
                            </Badge>
                            {getStatusBadge(user.status)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">Joined: {user.joinDate}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.bookings} booking{user.bookings !== 1 ? 's' : ''}
                        </p>
                        {user.rating && (
                          <p className="text-sm text-muted-foreground">
                            Rating: {user.rating} ⭐
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleUserAction(user.id, 'view')}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleUserAction(user.id, 'edit')}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        {user.status !== 'suspended' ? (
                          <Button variant="ghost" size="sm" onClick={() => handleUserAction(user.id, 'suspend')}>
                            <Ban className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" onClick={() => handleUserAction(user.id, 'activate')}>
                            <Shield className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
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

export default AdminUsers;
