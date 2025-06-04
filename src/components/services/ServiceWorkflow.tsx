
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, ArrowRight, MessageSquare, Star } from 'lucide-react';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  estimatedTime?: string;
  actions?: string[];
}

interface ServiceWorkflowProps {
  serviceId: string;
  userType: 'customer' | 'provider';
}

const ServiceWorkflow = ({ serviceId, userType }: ServiceWorkflowProps) => {
  const [currentStep, setCurrentStep] = useState(2);
  
  const workflowSteps: WorkflowStep[] = [
    {
      id: '1',
      title: 'Consultation Request',
      description: 'Initial consultation to discuss requirements and expectations',
      status: 'completed',
      estimatedTime: '15 mins',
      actions: ['Schedule consultation', 'Discuss requirements']
    },
    {
      id: '2',
      title: 'Service Booking',
      description: 'Book the service with preferred date and time',
      status: 'current',
      estimatedTime: '5 mins',
      actions: ['Select date/time', 'Confirm booking', 'Make payment']
    },
    {
      id: '3',
      title: 'Preparation',
      description: 'Provider prepares for the service delivery',
      status: 'pending',
      estimatedTime: '1 day',
      actions: ['Gather materials', 'Review requirements', 'Contact customer']
    },
    {
      id: '4',
      title: 'Service Delivery',
      description: 'Actual service delivery at the scheduled time',
      status: 'pending',
      estimatedTime: '2 hours',
      actions: ['Arrive on time', 'Deliver service', 'Get customer approval']
    },
    {
      id: '5',
      title: 'Completion & Review',
      description: 'Service completion with customer feedback and payment',
      status: 'pending',
      estimatedTime: '10 mins',
      actions: ['Mark as complete', 'Leave review', 'Process payment']
    }
  ];

  const getStepStatus = (stepIndex: number): WorkflowStep['status'] => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'pending';
  };

  const getStepIcon = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'current':
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>;
    }
  };

  const progressPercentage = ((currentStep) / workflowSteps.length) * 100;

  const moveToNextStep = () => {
    if (currentStep < workflowSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Service Workflow</span>
            <Badge variant="outline">
              Step {currentStep + 1} of {workflowSteps.length}
            </Badge>
          </CardTitle>
          <div className="space-y-2">
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-sm text-gray-500">
              {Math.round(progressPercentage)}% Complete
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {workflowSteps.map((step, index) => {
              const status = getStepStatus(index);
              return (
                <div key={step.id} className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    {getStepIcon(status)}
                    {index < workflowSteps.length - 1 && (
                      <div className={`w-0.5 h-16 mt-2 ${
                        status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className={`p-4 rounded-lg border ${
                      status === 'current' 
                        ? 'border-blue-200 bg-blue-50' 
                        : status === 'completed'
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-medium ${
                          status === 'current' ? 'text-blue-900' : 
                          status === 'completed' ? 'text-green-900' : 'text-gray-700'
                        }`}>
                          {step.title}
                        </h4>
                        {step.estimatedTime && (
                          <Badge variant="outline" className="text-xs">
                            {step.estimatedTime}
                          </Badge>
                        )}
                      </div>
                      
                      <p className={`text-sm mb-3 ${
                        status === 'current' ? 'text-blue-700' : 
                        status === 'completed' ? 'text-green-700' : 'text-gray-600'
                      }`}>
                        {step.description}
                      </p>

                      {step.actions && (
                        <div className="space-y-2">
                          <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Actions Required:
                          </h5>
                          <ul className="space-y-1">
                            {step.actions.map((action, actionIndex) => (
                              <li key={actionIndex} className="text-sm flex items-center">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {status === 'current' && (
                        <div className="flex space-x-2 mt-4">
                          {userType === 'provider' && (
                            <Button size="sm" onClick={moveToNextStep}>
                              <ArrowRight className="w-4 h-4 mr-1" />
                              Mark Complete
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message {userType === 'customer' ? 'Provider' : 'Customer'}
                          </Button>
                        </div>
                      )}

                      {status === 'completed' && index === workflowSteps.length - 1 && (
                        <div className="flex space-x-2 mt-4">
                          <Button size="sm" variant="outline">
                            <Star className="w-4 h-4 mr-1" />
                            Leave Review
                          </Button>
                          <Button size="sm" variant="outline">
                            Book Again
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceWorkflow;
