
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import ReferralProgram from '@/components/referrals/ReferralProgram';
import LoyaltyRewards from '@/components/loyalty/LoyaltyRewards';
import SubscriptionPlans from '@/components/subscriptions/SubscriptionPlans';
import BusinessReporting from '@/components/reporting/BusinessReporting';
import ThirdPartyIntegrations from '@/components/integrations/ThirdPartyIntegrations';
import { 
  Gift, 
  Star, 
  Crown, 
  BarChart3, 
  Zap 
} from 'lucide-react';

const ProviderGrowth = () => {
  const [activeTab, setActiveTab] = useState('referrals');

  const breadcrumbItems = [
    { label: 'Provider Dashboard', href: '/provider/dashboard' },
    { label: 'Business Growth' },
  ];

  return (
    <DashboardLayout userType="provider" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Business Growth Tools</h1>
          <p className="text-muted-foreground">
            Grow your business with referrals, loyalty programs, and powerful integrations
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="referrals" className="flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Referrals
            </TabsTrigger>
            <TabsTrigger value="loyalty" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Loyalty
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Subscription
            </TabsTrigger>
            <TabsTrigger value="reporting" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Integrations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="referrals" className="space-y-6">
            <ReferralProgram />
          </TabsContent>

          <TabsContent value="loyalty" className="space-y-6">
            <LoyaltyRewards />
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-6">
            <SubscriptionPlans />
          </TabsContent>

          <TabsContent value="reporting" className="space-y-6">
            <BusinessReporting />
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <ThirdPartyIntegrations />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProviderGrowth;
