
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, AlertTriangle, Flag, Eye } from 'lucide-react';

const ContentModeration = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const pendingServices = [
    {
      id: 1,
      title: 'Professional Hair Styling',
      provider: 'Sarah Beauty',
      category: 'Beauty',
      price: 12000,
      description: 'Professional hair styling services for all hair types...',
      images: ['https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=200&fit=crop'],
      submittedAt: '2024-12-03',
      flaggedReason: null
    },
    {
      id: 2,
      title: 'Quick Phone Repair',
      provider: 'Tech Master',
      category: 'Electronics',
      price: 5000,
      description: 'Fast and reliable phone repair services...',
      images: ['https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&h=200&fit=crop'],
      submittedAt: '2024-12-03',
      flaggedReason: 'Suspicious pricing'
    }
  ];

  const reportedContent = [
    {
      id: 1,
      type: 'service',
      title: 'Cleaning Service',
      provider: 'Clean Pro',
      reportedBy: 'Anonymous',
      reason: 'Inappropriate images',
      reportedAt: '2024-12-02',
      status: 'pending'
    },
    {
      id: 2,
      type: 'review',
      title: 'Review for Hair Styling',
      provider: 'Sarah Beauty',
      reportedBy: 'John Doe',
      reason: 'Fake review',
      reportedAt: '2024-12-01',
      status: 'pending'
    }
  ];

  const handleApprove = (serviceId: number) => {
    console.log('Approving service:', serviceId);
    // TODO: Implement approval logic
  };

  const handleReject = (serviceId: number) => {
    console.log('Rejecting service:', serviceId);
    // TODO: Implement rejection logic
  };

  const handleResolveReport = (reportId: number, action: string) => {
    console.log('Resolving report:', reportId, 'with action:', action);
    // TODO: Implement report resolution logic
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Moderation</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="pending">Pending Services</TabsTrigger>
              <TabsTrigger value="reported">Reported Content</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {pendingServices.map((service) => (
                <Card key={service.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <img 
                        src={service.images[0]}
                        alt={service.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{service.title}</h3>
                          {service.flaggedReason && (
                            <Badge variant="destructive" className="ml-2">
                              <Flag className="w-3 h-3 mr-1" />
                              Flagged
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-1">by {service.provider}</p>
                        <p className="text-sm text-gray-500 mb-2">{service.category}</p>
                        <p className="text-lg font-bold text-blue-600 mb-2">
                          ₦{service.price.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {service.description}
                        </p>
                        {service.flaggedReason && (
                          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-3">
                            <div className="flex items-center">
                              <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
                              <span className="text-sm text-red-700">
                                Flagged: {service.flaggedReason}
                              </span>
                            </div>
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            Submitted: {service.submittedAt}
                          </span>
                          <div className="space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleReject(service.id)}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleApprove(service.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="reported" className="space-y-4">
              {reportedContent.map((report) => (
                <Card key={report.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{report.title}</h3>
                        <p className="text-gray-600">by {report.provider}</p>
                        <p className="text-sm text-gray-500">
                          Reported by: {report.reportedBy} • {report.reportedAt}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {report.type}
                      </Badge>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
                      <div className="flex items-center">
                        <Flag className="w-4 h-4 text-yellow-500 mr-2" />
                        <span className="text-sm text-yellow-700">
                          Reason: {report.reason}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Investigate
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleResolveReport(report.id, 'remove')}
                      >
                        Remove Content
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleResolveReport(report.id, 'dismiss')}
                      >
                        Dismiss Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentModeration;
