
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, DollarSign, Settings, Shield, Workflow, Clock } from 'lucide-react';
import BookingManager from '@/components/booking/BookingManager';
import AvailabilityCalendar from '@/components/provider/AvailabilityCalendar';
import PricingTiers from '@/components/provider/PricingTiers';
import VerificationSystem from '@/components/provider/VerificationSystem';
import ServiceWorkflow from '@/components/services/ServiceWorkflow';

const ProviderOperations = () => {
  const [activeTab, setActiveTab] = useState('bookings');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Provider Operations</h1>
          <p className="text-gray-600">Manage your business operations and settings</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="availability" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Availability
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Pricing
            </TabsTrigger>
            <TabsTrigger value="workflow" className="flex items-center gap-2">
              <Workflow className="w-4 h-4" />
              Workflow
            </TabsTrigger>
            <TabsTrigger value="verification" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Verification
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <BookingManager userType="provider" userId="provider-1" />
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <AvailabilityCalendar />
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <PricingTiers />
          </TabsContent>

          <TabsContent value="workflow" className="space-y-6">
            <ServiceWorkflow serviceId="service-1" userType="provider" />
          </TabsContent>

          <TabsContent value="verification" className="space-y-6">
            <VerificationSystem />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Provider Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Provider settings panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProviderOperations;
