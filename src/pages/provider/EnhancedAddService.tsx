
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ServiceForm from '@/components/provider/ServiceForm';

const EnhancedAddService = () => {
  const navigate = useNavigate();

  const handleServiceSubmit = (serviceData: any) => {
    console.log('New service data:', serviceData);
    // TODO: Save to Supabase
    navigate('/provider/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/provider/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Add New Service</h1>
          <p className="text-gray-600">Create a comprehensive service listing with portfolio</p>
        </div>

        <ServiceForm onSubmit={handleServiceSubmit} />
      </div>
    </div>
  );
};

export default EnhancedAddService;
