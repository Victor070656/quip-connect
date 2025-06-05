
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Map, Mail, MessageSquare, CreditCard, Zap } from 'lucide-react';
import GoogleCalendarIntegration from './GoogleCalendarIntegration';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'connected' | 'available' | 'coming-soon';
  category: 'productivity' | 'communication' | 'payment';
}

const ExternalServicesHub = () => {
  const [activeCategory, setActiveCategory] = useState('productivity');

  const integrations: Integration[] = [
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Sync service bookings with your calendar',
      icon: <Calendar className="w-5 h-5" />,
      status: 'available',
      category: 'productivity'
    },
    {
      id: 'google-maps',
      name: 'Google Maps',
      description: 'Get directions to service locations',
      icon: <Map className="w-5 h-5" />,
      status: 'connected',
      category: 'productivity'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      description: 'Send booking confirmations via WhatsApp',
      icon: <MessageSquare className="w-5 h-5" />,
      status: 'available',
      category: 'communication'
    },
    {
      id: 'email',
      name: 'Email Notifications',
      description: 'Automated email updates for bookings',
      icon: <Mail className="w-5 h-5" />,
      status: 'connected',
      category: 'communication'
    },
    {
      id: 'paystack',
      name: 'Paystack',
      description: 'Accept payments via Paystack',
      icon: <CreditCard className="w-5 h-5" />,
      status: 'connected',
      category: 'payment'
    },
    {
      id: 'flutterwave',
      name: 'Flutterwave',
      description: 'Alternative payment processing',
      icon: <CreditCard className="w-5 h-5" />,
      status: 'coming-soon',
      category: 'payment'
    }
  ];

  const getStatusBadge = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return <Badge variant="default">Connected</Badge>;
      case 'available':
        return <Badge variant="secondary">Available</Badge>;
      case 'coming-soon':
        return <Badge variant="outline">Coming Soon</Badge>;
    }
  };

  const getIntegrationsByCategory = (category: string) => {
    return integrations.filter(integration => integration.category === category);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">External Services</h2>
        <p className="text-muted-foreground">
          Connect with external services to enhance your Quïp experience
        </p>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="productivity">
            <Zap className="w-4 h-4 mr-2" />
            Productivity
          </TabsTrigger>
          <TabsTrigger value="communication">
            <MessageSquare className="w-4 h-4 mr-2" />
            Communication
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="w-4 h-4 mr-2" />
            Payment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="productivity" className="space-y-4">
          <div className="grid gap-4">
            {getIntegrationsByCategory('productivity').map((integration) => (
              <Card key={integration.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {integration.icon}
                      <div>
                        <h3 className="font-semibold">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {integration.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(integration.status)}
                      {integration.status === 'available' && (
                        <Button size="sm">Connect</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Google Calendar Integration Component */}
          <GoogleCalendarIntegration />
        </TabsContent>

        <TabsContent value="communication" className="space-y-4">
          <div className="grid gap-4">
            {getIntegrationsByCategory('communication').map((integration) => (
              <Card key={integration.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {integration.icon}
                      <div>
                        <h3 className="font-semibold">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {integration.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(integration.status)}
                      {integration.status === 'available' && (
                        <Button size="sm">Connect</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <div className="grid gap-4">
            {getIntegrationsByCategory('payment').map((integration) => (
              <Card key={integration.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {integration.icon}
                      <div>
                        <h3 className="font-semibold">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {integration.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(integration.status)}
                      {integration.status === 'available' && (
                        <Button size="sm">Connect</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExternalServicesHub;
