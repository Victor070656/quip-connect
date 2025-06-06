
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, AlertTriangle, Flag, MessageSquare, Check, X } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AdminModeration = () => {
  const [activeTab, setActiveTab] = useState('reported');
  const [searchTerm, setSearchTerm] = useState('');
  const [messageText, setMessageText] = useState('');

  const breadcrumbItems = [
    { label: 'Admin Dashboard', href: '/admin/dashboard' },
    { label: 'Moderation' },
  ];

  const reportedContent = [
    {
      id: '1',
      type: 'service',
      title: 'Suspicious Service Listing',
      content: 'Hair Styling Service with unrealistic pricing and misleading description',
      reporter: 'Mike Adams',
      reportedUser: 'Unknown Provider',
      reason: 'misleading_info',
      date: '2025-06-05',
      status: 'pending'
    },
    {
      id: '2',
      type: 'review',
      title: 'Inappropriate Review',
      content: 'This review contains offensive language and personal attacks',
      reporter: 'Beauty by Sarah',
      reportedUser: 'Anonymous Customer',
      reason: 'inappropriate_content',
      date: '2025-06-04',
      status: 'pending'
    },
    {
      id: '3',
      type: 'user',
      title: 'Suspicious User Activity',
      content: 'This user is making multiple bookings and cancelling repeatedly',
      reporter: 'System Flag',
      reportedUser: 'John Doe',
      reason: 'suspicious_activity',
      date: '2025-06-04',
      status: 'pending'
    },
    {
      id: '4',
      type: 'service',
      title: 'False Service Claims',
      content: 'Service description claims certifications that don\'t match provider profile',
      reporter: 'Emily Chen',
      reportedUser: 'Tech Solutions',
      reason: 'false_claims',
      date: '2025-06-03',
      status: 'pending'
    }
  ];

  const pendingVerifications = [
    {
      id: '1',
      name: 'Tech Solutions',
      type: 'provider',
      documentType: 'Business Registration',
      submissionDate: '2025-06-05',
      status: 'pending'
    },
    {
      id: '2',
      name: 'PhotoPro Studios',
      type: 'provider',
      documentType: 'Identity Verification',
      submissionDate: '2025-06-04',
      status: 'pending'
    },
    {
      id: '3',
      name: 'Clean Masters',
      type: 'provider',
      documentType: 'Address Verification',
      submissionDate: '2025-06-02',
      status: 'pending'
    }
  ];

  const contentReviewQueue = [
    {
      id: '1',
      type: 'service',
      title: 'Home Deep Cleaning',
      provider: 'Clean Masters',
      submissionDate: '2025-06-05',
      status: 'pending'
    },
    {
      id: '2',
      type: 'service',
      title: 'Phone Screen Replacement',
      provider: 'Tech Solutions',
      submissionDate: '2025-06-04',
      status: 'pending'
    },
    {
      id: '3',
      type: 'promotion',
      title: 'Summer Special Discount',
      provider: 'Beauty by Sarah',
      submissionDate: '2025-06-03',
      status: 'pending'
    }
  ];

  const getReasonBadge = (reason: string) => {
    switch (reason) {
      case 'misleading_info':
        return <Badge className="bg-yellow-100 text-yellow-800">Misleading Information</Badge>;
      case 'inappropriate_content':
        return <Badge className="bg-red-100 text-red-800">Inappropriate Content</Badge>;
      case 'suspicious_activity':
        return <Badge className="bg-purple-100 text-purple-800">Suspicious Activity</Badge>;
      case 'false_claims':
        return <Badge className="bg-blue-100 text-blue-800">False Claims</Badge>;
      default:
        return <Badge variant="secondary">{reason}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'service':
        return <Badge variant="outline">Service</Badge>;
      case 'review':
        return <Badge variant="outline">Review</Badge>;
      case 'user':
        return <Badge variant="outline">User</Badge>;
      case 'promotion':
        return <Badge variant="outline">Promotion</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const handleApprove = (id: string, type: string) => {
    console.log(`Approving ${type} with ID:`, id);
  };

  const handleReject = (id: string, type: string) => {
    console.log(`Rejecting ${type} with ID:`, id);
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  return (
    <DashboardLayout userType="admin" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Content Moderation</h1>
          <p className="text-muted-foreground">Manage and moderate platform content</p>
        </div>

        {/* Moderation Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Pending Reports</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">8</p>
              <p className="text-sm text-muted-foreground">Pending Verifications</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">15</p>
              <p className="text-sm text-muted-foreground">Content Review</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">24h</p>
              <p className="text-sm text-muted-foreground">Avg. Response Time</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="reported">Reported Content</TabsTrigger>
            <TabsTrigger value="verifications">Pending Verifications</TabsTrigger>
            <TabsTrigger value="content">Content Review</TabsTrigger>
          </TabsList>

          <TabsContent value="reported" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Reported Content</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search reports..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportedContent.map((report) => (
                    <Card key={report.id}>
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="w-5 h-5 text-red-600" />
                              <h3 className="text-lg font-semibold">{report.title}</h3>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              {getTypeBadge(report.type)}
                              {getReasonBadge(report.reason)}
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">{report.content}</p>
                            <div className="text-sm text-muted-foreground flex flex-col sm:flex-row gap-4 mt-2">
                              <span>Reporter: {report.reporter}</span>
                              <span>Reported: {report.reportedUser}</span>
                              <span>Date: {report.date}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 md:ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApprove(report.id, 'report')}
                              className="w-24"
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Valid
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReject(report.id, 'report')}
                              className="w-24"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Dismiss
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verifications" className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Pending Verifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingVerifications.map((verification) => (
                      <div
                        key={verification.id}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border rounded-lg"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${verification.name}`} />
                              <AvatarFallback>{verification.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{verification.name}</h4>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {verification.type}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {verification.documentType}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Submitted: {verification.submissionDate}
                          </p>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 sm:flex-none"
                            onClick={() => handleApprove(verification.id, 'verification')}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Review
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Selected Document</CardTitle>
                </CardHeader>
                <CardContent className="min-h-[300px] flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Flag className="w-12 h-12 mx-auto text-muted-foreground/50" />
                    <p className="mt-2">Select a verification request to review documents</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-6">
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Content Review Queue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contentReviewQueue.map((content) => (
                      <div
                        key={content.id}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border rounded-lg"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{content.title}</h4>
                            {getTypeBadge(content.type)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Provider: {content.provider}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Submitted: {content.submissionDate}
                          </p>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 sm:flex-none"
                            onClick={() => handleApprove(content.id, 'content')}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 sm:flex-none"
                            onClick={() => handleReject(content.id, 'content')}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Moderator Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Enter feedback or reason for approval/rejection..."
                    className="h-40 resize-none"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  />
                  <div className="flex justify-between gap-2">
                    <Button variant="outline">Save Draft</Button>
                    <Button onClick={handleSendMessage}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Feedback
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminModeration;

// Missing Eye icon import
import { Eye } from 'lucide-react';
