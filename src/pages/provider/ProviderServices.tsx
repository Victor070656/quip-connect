
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2 } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const ProviderServices = () => {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/provider/dashboard' },
    { label: 'Services' },
  ];

  const services = [
    {
      id: '1',
      title: 'Hair Styling',
      description: 'Professional hair styling and treatment services',
      price: '₦8,000 - ₦15,000',
      duration: '2-3 hours',
      category: 'Beauty & Wellness',
      status: 'active',
      bookings: 45,
      rating: 4.8
    },
    {
      id: '2',
      title: 'Hair Washing',
      description: 'Deep cleansing and conditioning hair wash',
      price: '₦3,000 - ₦5,000',
      duration: '1 hour',
      category: 'Beauty & Wellness',
      status: 'active',
      bookings: 32,
      rating: 4.9
    },
    {
      id: '3',
      title: 'Hair Coloring',
      description: 'Professional hair coloring and highlights',
      price: '₦12,000 - ₦25,000',
      duration: '3-4 hours',
      category: 'Beauty & Wellness',
      status: 'inactive',
      bookings: 18,
      rating: 4.7
    }
  ];

  return (
    <DashboardLayout userType="provider" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Services</h1>
            <p className="text-muted-foreground">Manage your service offerings</p>
          </div>
          <Button asChild>
            <Link to="/provider/services/add">
              <Plus className="w-4 h-4 mr-2" />
              Add New Service
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <Badge variant={service.status === 'active' ? 'default' : 'secondary'}>
                      {service.status}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{service.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-medium">{service.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span>{service.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bookings:</span>
                    <span>{service.bookings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rating:</span>
                    <span>{service.rating} ⭐</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProviderServices;
