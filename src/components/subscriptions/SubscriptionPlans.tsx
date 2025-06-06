
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Check, Crown, Star, Zap, TrendingUp } from 'lucide-react';

const SubscriptionPlans = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [currentPlan] = useState('Pro');

  const plans = [
    {
      name: 'Basic',
      description: 'Perfect for getting started',
      monthlyPrice: 2500,
      yearlyPrice: 25000,
      icon: Star,
      features: [
        'Up to 5 service listings',
        'Basic analytics',
        'Email support',
        'Standard profile',
        'Mobile app access'
      ],
      limitations: [
        'No priority booking',
        'No advanced analytics',
        'Limited customization'
      ]
    },
    {
      name: 'Pro',
      description: 'Most popular for growing businesses',
      monthlyPrice: 5000,
      yearlyPrice: 50000,
      icon: TrendingUp,
      popular: true,
      features: [
        'Unlimited service listings',
        'Advanced analytics & insights',
        'Priority customer support',
        'Premium profile features',
        'Marketing tools',
        'Customer management',
        'Booking calendar integration',
        'Performance reports'
      ],
      limitations: []
    },
    {
      name: 'Enterprise',
      description: 'For established service providers',
      monthlyPrice: 10000,
      yearlyPrice: 100000,
      icon: Crown,
      features: [
        'Everything in Pro',
        'White-label solutions',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced automation',
        'Multi-location support',
        'Custom reporting',
        'Priority feature requests'
      ],
      limitations: []
    }
  ];

  const subscriptionStats = {
    currentPlan: 'Pro',
    nextBilling: '2024-02-15',
    monthlyRevenue: 45000,
    totalSavings: 15000,
    planUsage: {
      listings: { used: 12, limit: 'unlimited' },
      analytics: { used: 89, limit: 100 },
      support: { used: 3, limit: 'unlimited' }
    }
  };

  const getPrice = (plan: any) => {
    const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
    return price.toLocaleString();
  };

  const getSavings = (plan: any) => {
    if (!isYearly) return 0;
    const monthlyCost = plan.monthlyPrice * 12;
    const yearlyCost = plan.yearlyPrice;
    return monthlyCost - yearlyCost;
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Subscription Plans</h2>
        <p className="text-muted-foreground">Choose the perfect plan for your business needs</p>
        
        <div className="flex items-center justify-center space-x-3">
          <span className={!isYearly ? 'font-semibold' : 'text-muted-foreground'}>Monthly</span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <span className={isYearly ? 'font-semibold' : 'text-muted-foreground'}>
            Yearly <Badge variant="secondary" className="ml-1">Save 20%</Badge>
          </span>
        </div>
      </div>

      {/* Current Subscription Status */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle>Current Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold text-lg flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                {subscriptionStats.currentPlan} Plan
              </h3>
              <p className="text-muted-foreground">Next billing: {subscriptionStats.nextBilling}</p>
            </div>
            <div>
              <h4 className="font-medium">Monthly Revenue</h4>
              <p className="text-2xl font-bold text-green-600">₦{subscriptionStats.monthlyRevenue.toLocaleString()}</p>
            </div>
            <div>
              <h4 className="font-medium">Total Savings (Yearly)</h4>
              <p className="text-2xl font-bold text-purple-600">₦{subscriptionStats.totalSavings.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrentPlan = plan.name === currentPlan;
          const savings = getSavings(plan);
          
          return (
            <Card 
              key={plan.name} 
              className={`relative ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''} ${isCurrentPlan ? 'border-green-500 bg-green-50' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              {isCurrentPlan && (
                <div className="absolute -top-3 right-4">
                  <Badge className="bg-green-600 text-white">Current Plan</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-2">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
                
                <div className="space-y-1">
                  <div className="text-3xl font-bold">
                    ₦{getPrice(plan)}
                    <span className="text-lg font-normal text-muted-foreground">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  </div>
                  {isYearly && savings > 0 && (
                    <p className="text-sm text-green-600 font-medium">
                      Save ₦{savings.toLocaleString()} per year
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full" 
                  variant={isCurrentPlan ? "outline" : "default"}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan ? 'Current Plan' : `Upgrade to ${plan.name}`}
                </Button>

                {plan.name !== 'Basic' && (
                  <p className="text-xs text-center text-muted-foreground">
                    14-day free trial • Cancel anytime
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Plan Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Feature</th>
                  <th className="text-center py-2">Basic</th>
                  <th className="text-center py-2">Pro</th>
                  <th className="text-center py-2">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Service Listings</td>
                  <td className="text-center py-2">5</td>
                  <td className="text-center py-2">Unlimited</td>
                  <td className="text-center py-2">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Analytics</td>
                  <td className="text-center py-2">Basic</td>
                  <td className="text-center py-2">Advanced</td>
                  <td className="text-center py-2">Advanced + Custom</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Support</td>
                  <td className="text-center py-2">Email</td>
                  <td className="text-center py-2">Priority</td>
                  <td className="text-center py-2">Dedicated Manager</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">API Access</td>
                  <td className="text-center py-2">-</td>
                  <td className="text-center py-2">-</td>
                  <td className="text-center py-2">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionPlans;
