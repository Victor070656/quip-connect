
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Upload, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const ProviderVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState({
    identity: 'verified',
    business: 'pending',
    address: 'rejected',
    certifications: 'not_submitted'
  });

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/provider/dashboard' },
    { label: 'Verification' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Not Submitted</Badge>;
    }
  };

  const verificationSteps = [
    {
      id: 'identity',
      title: 'Identity Verification',
      description: 'Upload a government-issued ID (NIN, Driver\'s License, or Passport)',
      status: verificationStatus.identity,
      required: true
    },
    {
      id: 'business',
      title: 'Business Registration',
      description: 'Upload your business registration certificate or CAC documents',
      status: verificationStatus.business,
      required: false
    },
    {
      id: 'address',
      title: 'Address Verification',
      description: 'Upload a utility bill or bank statement showing your address',
      status: verificationStatus.address,
      required: true
    },
    {
      id: 'certifications',
      title: 'Professional Certifications',
      description: 'Upload relevant professional certificates and qualifications',
      status: verificationStatus.certifications,
      required: false
    }
  ];

  const handleFileUpload = (stepId: string) => {
    console.log('Uploading file for:', stepId);
    // In a real app, this would handle file upload
  };

  return (
    <DashboardLayout userType="provider" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Account Verification</h1>
          <p className="text-muted-foreground">
            Complete your verification to build trust with customers and access all features
          </p>
        </div>

        {/* Verification Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Verification Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {verificationSteps.map((step) => (
                <div key={step.id} className="text-center p-4 border rounded-lg">
                  <div className="flex justify-center mb-2">
                    {getStatusIcon(step.status)}
                  </div>
                  <h4 className="font-medium text-sm">{step.title}</h4>
                  <div className="mt-2">
                    {getStatusBadge(step.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Verification Steps */}
        <div className="space-y-4">
          {verificationSteps.map((step) => (
            <Card key={step.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(step.status)}
                    <div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      {step.required && (
                        <Badge variant="outline" className="text-xs mt-1">Required</Badge>
                      )}
                    </div>
                  </div>
                  {getStatusBadge(step.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{step.description}</p>
                
                {step.status === 'rejected' && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Rejection Reason:</strong> The uploaded document was not clear enough. 
                      Please upload a high-quality image showing all details clearly.
                    </p>
                  </div>
                )}
                
                {step.status === 'pending' && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      Your document is under review. We'll notify you once the verification is complete.
                    </p>
                  </div>
                )}
                
                {step.status === 'verified' && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      ✓ Verification complete! This step has been successfully verified.
                    </p>
                  </div>
                )}
                
                {(step.status === 'not_submitted' || step.status === 'rejected') && (
                  <div className="space-y-3">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG, PDF up to 10MB
                      </p>
                    </div>
                    <Button 
                      onClick={() => handleFileUpload(step.id)}
                      className="w-full"
                    >
                      Upload Document
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">
              If you're having trouble with verification or need assistance, please contact our support team.
            </p>
            <div className="flex gap-2">
              <Button variant="outline">Contact Support</Button>
              <Button variant="outline">View Guidelines</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProviderVerification;
