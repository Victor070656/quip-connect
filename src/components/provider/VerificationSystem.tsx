
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, CheckCircle, AlertCircle, FileText, Camera, Award, Shield } from 'lucide-react';

interface VerificationStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'uploaded' | 'verified' | 'rejected';
  required: boolean;
  documentType: 'id' | 'certificate' | 'license' | 'portfolio' | 'insurance';
}

const VerificationSystem = () => {
  const [verificationSteps, setVerificationSteps] = useState<VerificationStep[]>([
    {
      id: '1',
      title: 'Government ID',
      description: 'Upload a valid government-issued ID (National ID, Passport, or Driver\'s License)',
      status: 'verified',
      required: true,
      documentType: 'id'
    },
    {
      id: '2',
      title: 'Professional Certificate',
      description: 'Upload certificates or qualifications related to your service',
      status: 'uploaded',
      required: true,
      documentType: 'certificate'
    },
    {
      id: '3',
      title: 'Business License',
      description: 'Upload your business registration or license (if applicable)',
      status: 'pending',
      required: false,
      documentType: 'license'
    },
    {
      id: '4',
      title: 'Portfolio/Work Samples',
      description: 'Upload photos or samples of your previous work',
      status: 'pending',
      required: true,
      documentType: 'portfolio'
    },
    {
      id: '5',
      title: 'Insurance Coverage',
      description: 'Upload proof of liability insurance (recommended)',
      status: 'pending',
      required: false,
      documentType: 'insurance'
    }
  ]);

  const [uploadingStep, setUploadingStep] = useState<string | null>(null);

  const getStatusIcon = (status: VerificationStep['status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'uploaded':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: VerificationStep['status']) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'uploaded': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = () => {
    const totalRequired = verificationSteps.filter(step => step.required).length;
    const completedRequired = verificationSteps.filter(step => step.required && step.status === 'verified').length;
    return (completedRequired / totalRequired) * 100;
  };

  const handleFileUpload = (stepId: string) => {
    setUploadingStep(stepId);
    // Simulate file upload
    setTimeout(() => {
      setVerificationSteps(prev => prev.map(step =>
        step.id === stepId ? { ...step, status: 'uploaded' } : step
      ));
      setUploadingStep(null);
    }, 2000);
  };

  const progress = calculateProgress();
  const isFullyVerified = progress === 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Provider Verification
            </CardTitle>
            {isFullyVerified && (
              <Badge className="bg-green-100 text-green-800">
                <Award className="w-4 h-4 mr-1" />
                Verified Provider
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Verification Progress</span>
              <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">
              Complete all required steps to become a verified provider
            </p>
          </div>

          <div className="space-y-4">
            {verificationSteps.map((step) => (
              <Card key={step.id} className="border-l-4 border-l-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getStatusIcon(step.status)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{step.title}</h4>
                          {step.required && (
                            <Badge variant="outline" className="text-xs">Required</Badge>
                          )}
                          <Badge className={getStatusColor(step.status)}>
                            {step.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                        
                        {step.status === 'pending' && (
                          <div className="flex items-center space-x-2">
                            <Input
                              type="file"
                              accept="image/*,.pdf"
                              className="hidden"
                              id={`file-${step.id}`}
                              onChange={() => handleFileUpload(step.id)}
                            />
                            <Label htmlFor={`file-${step.id}`}>
                              <Button 
                                variant="outline" 
                                size="sm"
                                disabled={uploadingStep === step.id}
                                asChild
                              >
                                <span>
                                  {uploadingStep === step.id ? (
                                    'Uploading...'
                                  ) : (
                                    <>
                                      <Upload className="w-4 h-4 mr-1" />
                                      Upload Document
                                    </>
                                  )}
                                </span>
                              </Button>
                            </Label>
                          </div>
                        )}

                        {step.status === 'uploaded' && (
                          <div className="text-sm text-yellow-600">
                            Document uploaded. Under review by our team.
                          </div>
                        )}

                        {step.status === 'verified' && (
                          <div className="text-sm text-green-600">
                            Document verified successfully.
                          </div>
                        )}

                        {step.status === 'rejected' && (
                          <div className="text-sm text-red-600">
                            Document rejected. Please upload a new document.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {isFullyVerified && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h4 className="font-medium text-green-800">Congratulations!</h4>
                    <p className="text-sm text-green-700">
                      You are now a verified provider. Your profile will show a verification badge.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationSystem;
