
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Globe, Shield, Server, Mail, RefreshCw, DollarSign } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const AdminSettings = () => {
  const [platformSettings, setPlatformSettings] = useState({
    maintenanceMode: false,
    allowRegistrations: true,
    approveNewProviders: true,
    autoApproveServices: false
  });

  const [paymentSettings, setPaymentSettings] = useState({
    platformFee: '15',
    allowPromoCode: true,
    minimumPayout: '5000',
    currency: 'NGN',
    autoPayouts: true,
    paymentGateway: 'paystack'
  });

  const breadcrumbItems = [
    { label: 'Admin Dashboard', href: '/admin/dashboard' },
    { label: 'Settings' },
  ];

  return (
    <DashboardLayout userType="admin" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Platform Settings</h1>
          <p className="text-muted-foreground">Manage system configuration and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                <CardTitle>General Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                <Switch
                  id="maintenance-mode"
                  checked={platformSettings.maintenanceMode}
                  onCheckedChange={(checked) => 
                    setPlatformSettings(prev => ({ ...prev, maintenanceMode: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="allow-registrations">Allow New Registrations</Label>
                <Switch
                  id="allow-registrations"
                  checked={platformSettings.allowRegistrations}
                  onCheckedChange={(checked) => 
                    setPlatformSettings(prev => ({ ...prev, allowRegistrations: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="approve-providers">Manually Approve New Providers</Label>
                <Switch
                  id="approve-providers"
                  checked={platformSettings.approveNewProviders}
                  onCheckedChange={(checked) => 
                    setPlatformSettings(prev => ({ ...prev, approveNewProviders: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-approve-services">Auto-Approve New Services</Label>
                <Switch
                  id="auto-approve-services"
                  checked={platformSettings.autoApproveServices}
                  onCheckedChange={(checked) => 
                    setPlatformSettings(prev => ({ ...prev, autoApproveServices: checked }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Platform Name</Label>
                <Input defaultValue="Quïp" />
              </div>
              <div className="space-y-2">
                <Label>Support Email</Label>
                <Input defaultValue="support@quip.com" />
              </div>
            </CardContent>
          </Card>

          {/* Payment Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                <CardTitle>Payment Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Platform Fee (%)</Label>
                <Input
                  value={paymentSettings.platformFee}
                  onChange={(e) => 
                    setPaymentSettings(prev => ({ ...prev, platformFee: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Minimum Payout Amount</Label>
                <Input
                  value={paymentSettings.minimumPayout}
                  onChange={(e) => 
                    setPaymentSettings(prev => ({ ...prev, minimumPayout: e.target.value }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="allow-promo">Allow Promotional Codes</Label>
                <Switch
                  id="allow-promo"
                  checked={paymentSettings.allowPromoCode}
                  onCheckedChange={(checked) => 
                    setPaymentSettings(prev => ({ ...prev, allowPromoCode: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-payouts">Automatic Payouts</Label>
                <Switch
                  id="auto-payouts"
                  checked={paymentSettings.autoPayouts}
                  onCheckedChange={(checked) => 
                    setPaymentSettings(prev => ({ ...prev, autoPayouts: checked }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Default Currency</Label>
                <Select
                  value={paymentSettings.currency}
                  onValueChange={(value) => 
                    setPaymentSettings(prev => ({ ...prev, currency: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
                    <SelectItem value="USD">US Dollar ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Payment Gateway</Label>
                <Select
                  value={paymentSettings.paymentGateway}
                  onValueChange={(value) => 
                    setPaymentSettings(prev => ({ ...prev, paymentGateway: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paystack">Paystack</SelectItem>
                    <SelectItem value="flutterwave">Flutterwave</SelectItem>
                    <SelectItem value="stripe">Stripe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Localization */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <CardTitle>Localization</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="yo">Yoruba</SelectItem>
                    <SelectItem value="ig">Igbo</SelectItem>
                    <SelectItem value="ha">Hausa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Default Timezone</Label>
                <Select defaultValue="wat">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wat">West Africa Time (WAT)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date Format</Label>
                <Select defaultValue="dmy">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Default Country</Label>
                <Select defaultValue="ng">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ng">Nigeria</SelectItem>
                    <SelectItem value="gh">Ghana</SelectItem>
                    <SelectItem value="ke">Kenya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <CardTitle>Security Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="two-factor">Require 2FA for Admins</Label>
                <Switch
                  id="two-factor"
                  defaultChecked={true}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="force-verify">Force Email Verification</Label>
                <Switch
                  id="force-verify"
                  defaultChecked={true}
                />
              </div>
              <div className="space-y-2">
                <Label>Session Timeout (minutes)</Label>
                <Input defaultValue="60" />
              </div>
              <div className="space-y-2">
                <Label>Password Policy</Label>
                <Select defaultValue="strong">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (min 8 characters)</SelectItem>
                    <SelectItem value="medium">Medium (letters, numbers)</SelectItem>
                    <SelectItem value="strong">Strong (letters, numbers, symbols)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline">Configure API Keys</Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Email Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <CardTitle>Email Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>SMTP Host</Label>
                <Input defaultValue="smtp.example.com" />
              </div>
              <div className="space-y-2">
                <Label>SMTP Port</Label>
                <Input defaultValue="587" />
              </div>
              <div className="space-y-2">
                <Label>SMTP Username</Label>
                <Input defaultValue="noreply@quip.com" type="password" />
              </div>
              <div className="space-y-2">
                <Label>SMTP Password</Label>
                <Input defaultValue="********" type="password" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-encryption">Use SSL/TLS</Label>
                <Switch
                  id="email-encryption"
                  defaultChecked={true}
                />
              </div>
              <Button>Test Email Configuration</Button>
            </CardContent>
          </Card>

          {/* System Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5" />
                <CardTitle>System Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Platform Version</p>
                <p className="text-sm text-muted-foreground">v2.5.0</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-sm text-muted-foreground">June 6, 2025</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Database Status</p>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <p className="text-sm text-muted-foreground">Connected</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Cache Status</p>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">System Log</p>
                <Textarea
                  className="h-24 font-mono text-xs"
                  readOnly
                  value="[2025-06-06 08:00:12] System initialization completed
[2025-06-06 08:15:34] Database backup completed
[2025-06-06 09:30:15] User authentication service restarted"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Cache
                </Button>
                <Button variant="outline">System Diagnostics</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Changes */}
        <div className="flex justify-end">
          <Button size="lg">Save All Settings</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
