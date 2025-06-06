
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Mail, 
  Phone, 
  Calendar,
  Zap,
  Settings,
  CheckCircle,
  AlertCircle,
  Globe
} from 'lucide-react';

const ThirdPartyIntegrations = () => {
  const [integrations, setIntegrations] = useState([
    {
      id: 'facebook',
      name: 'Facebook Pages',
      description: 'Sync your services with Facebook Business',
      icon: Facebook,
      connected: true,
      status: 'active',
      lastSync: '2024-01-20 14:30'
    },
    {
      id: 'instagram',
      name: 'Instagram Business',
      description: 'Share service updates on Instagram',
      icon: Instagram,
      connected: true,
      status: 'active',
      lastSync: '2024-01-20 14:25'
    },
    {
      id: 'google_calendar',
      name: 'Google Calendar',
      description: 'Sync bookings with Google Calendar',
      icon: Calendar,
      connected: false,
      status: 'disconnected',
      lastSync: null
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      description: 'Send booking confirmations via WhatsApp',
      icon: Phone,
      connected: true,
      status: 'active',
      lastSync: '2024-01-20 15:45'
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Manage email marketing campaigns',
      icon: Mail,
      connected: false,
      status: 'disconnected',
      lastSync: null
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Automate workflows with 5000+ apps',
      icon: Zap,
      connected: true,
      status: 'active',
      lastSync: '2024-01-20 16:00'
    }
  ]);

  const [webhookUrl, setWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const crmIntegrations = [
    {
      id: 'hubspot',
      name: 'HubSpot CRM',
      description: 'Manage customer relationships',
      connected: false,
      features: ['Contact Management', 'Deal Tracking', 'Email Sequences']
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Enterprise CRM solution',
      connected: false,
      features: ['Lead Management', 'Opportunity Tracking', 'Analytics']
    },
    {
      id: 'pipedrive',
      name: 'Pipedrive',
      description: 'Sales-focused CRM',
      connected: true,
      features: ['Pipeline Management', 'Activity Tracking', 'Reports']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'disconnected': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleIntegration = (id: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { 
              ...integration, 
              connected: !integration.connected,
              status: !integration.connected ? 'active' : 'disconnected',
              lastSync: !integration.connected ? new Date().toISOString() : null
            }
          : integration
      )
    );
  };

  const handleZapierWebhook = async () => {
    if (!webhookUrl) return;

    setIsLoading(true);
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          triggered_from: window.location.origin,
          event_type: "test_webhook"
        }),
      });

      console.log("Zapier webhook triggered successfully");
    } catch (error) {
      console.error("Error triggering webhook:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Third-Party Integrations</h2>
        <p className="text-muted-foreground">Connect with external platforms and automate your workflows</p>
      </div>

      <Tabs defaultValue="social" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="crm">CRM Systems</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="social" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrations.filter(int => ['facebook', 'instagram', 'twitter', 'linkedin'].includes(int.id)).map((integration) => {
              const Icon = integration.icon;
              return (
                <Card key={integration.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-8 h-8 text-blue-600" />
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                        </div>
                      </div>
                      <Switch 
                        checked={integration.connected} 
                        onCheckedChange={() => toggleIntegration(integration.id)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(integration.status)}>
                        {integration.status}
                      </Badge>
                      {integration.lastSync && (
                        <p className="text-sm text-muted-foreground">
                          Last sync: {integration.lastSync}
                        </p>
                      )}
                    </div>
                    {integration.connected && (
                      <div className="mt-4 space-y-2">
                        <Button variant="outline" size="sm" className="w-full">
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="crm" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crmIntegrations.map((crm) => (
              <Card key={crm.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{crm.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{crm.description}</p>
                    </div>
                    {crm.connected ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Features:</h4>
                      <ul className="text-sm space-y-1">
                        {crm.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button 
                      className="w-full" 
                      variant={crm.connected ? "outline" : "default"}
                    >
                      {crm.connected ? 'Manage' : 'Connect'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrations.filter(int => ['google_calendar', 'whatsapp', 'mailchimp', 'zapier'].includes(int.id)).map((integration) => {
              const Icon = integration.icon;
              return (
                <Card key={integration.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-8 h-8 text-purple-600" />
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                        </div>
                      </div>
                      <Switch 
                        checked={integration.connected} 
                        onCheckedChange={() => toggleIntegration(integration.id)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(integration.status)}>
                        {integration.status}
                      </Badge>
                      {integration.lastSync && (
                        <p className="text-sm text-muted-foreground">
                          Last sync: {integration.lastSync}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Zapier Webhook Integration</CardTitle>
              <p className="text-muted-foreground">
                Connect your Zapier webhook to automate workflows when events occur
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="webhook-url">Zapier Webhook URL</Label>
                <Input
                  id="webhook-url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://hooks.zapier.com/hooks/catch/..."
                  className="mt-1"
                />
              </div>
              
              <Button 
                onClick={handleZapierWebhook}
                disabled={!webhookUrl || isLoading}
                className="w-full"
              >
                <Zap className="w-4 h-4 mr-2" />
                {isLoading ? 'Testing...' : 'Test Webhook'}
              </Button>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Available Webhook Events:</h4>
                <ul className="text-sm space-y-1">
                  <li>• New booking created</li>
                  <li>• Booking confirmed</li>
                  <li>• Payment received</li>
                  <li>• Service completed</li>
                  <li>• Review submitted</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom API Endpoints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">API Base URL:</h4>
                  <code className="text-sm">https://api.yourplatform.com/v1/</code>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Available Endpoints:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• GET /bookings</li>
                      <li>• POST /bookings</li>
                      <li>• GET /services</li>
                      <li>• GET /providers</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Authentication:</h4>
                    <p className="text-sm text-muted-foreground">
                      Use API key in Authorization header
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Generate API Key
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThirdPartyIntegrations;
