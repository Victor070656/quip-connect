
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Shield, Globe, Palette, DollarSign, Clock } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const ProviderSettings = () => {
  const [notifications, setNotifications] = useState({
    newBookings: true,
    bookingUpdates: true,
    messages: true,
    reviews: true,
    payouts: true,
    marketing: false
  });

  const [business, setBusiness] = useState({
    autoAcceptBookings: false,
    requireDeposit: true,
    allowCancellations: true,
    instantBooking: false
  });

  const [pricing, setPricing] = useState({
    currency: 'NGN',
    taxIncluded: true,
    commissionRate: '15',
    payoutFrequency: 'weekly'
  });

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/provider/dashboard' },
    { label: 'Settings' },
  ];

  return (
    <DashboardLayout userType="provider" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and business preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                <CardTitle>Notifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="new-bookings">New Booking Requests</Label>
                <Switch
                  id="new-bookings"
                  checked={notifications.newBookings}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, newBookings: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="booking-updates">Booking Updates</Label>
                <Switch
                  id="booking-updates"
                  checked={notifications.bookingUpdates}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, bookingUpdates: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="messages">New Messages</Label>
                <Switch
                  id="messages"
                  checked={notifications.messages}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, messages: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="reviews">New Reviews</Label>
                <Switch
                  id="reviews"
                  checked={notifications.reviews}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, reviews: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="payouts">Payout Notifications</Label>
                <Switch
                  id="payouts"
                  checked={notifications.payouts}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, payouts: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="marketing">Marketing Emails</Label>
                <Switch
                  id="marketing"
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, marketing: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Business Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <CardTitle>Business Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-accept">Auto-accept Bookings</Label>
                <Switch
                  id="auto-accept"
                  checked={business.autoAcceptBookings}
                  onCheckedChange={(checked) => 
                    setBusiness(prev => ({ ...prev, autoAcceptBookings: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="require-deposit">Require Deposit</Label>
                <Switch
                  id="require-deposit"
                  checked={business.requireDeposit}
                  onCheckedChange={(checked) => 
                    setBusiness(prev => ({ ...prev, requireDeposit: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="allow-cancellations">Allow Cancellations</Label>
                <Switch
                  id="allow-cancellations"
                  checked={business.allowCancellations}
                  onCheckedChange={(checked) => 
                    setBusiness(prev => ({ ...prev, allowCancellations: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="instant-booking">Instant Booking</Label>
                <Switch
                  id="instant-booking"
                  checked={business.instantBooking}
                  onCheckedChange={(checked) => 
                    setBusiness(prev => ({ ...prev, instantBooking: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Language & Region */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <CardTitle>Language & Region</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Language</Label>
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
                <Label>Time Zone</Label>
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
            </CardContent>
          </Card>

          {/* Pricing & Payments */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                <CardTitle>Pricing & Payments</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Currency</Label>
                <Select value={pricing.currency} onValueChange={(value) => 
                  setPricing(prev => ({ ...prev, currency: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
                    <SelectItem value="USD">US Dollar ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="tax-included">Prices Include Tax</Label>
                <Switch
                  id="tax-included"
                  checked={pricing.taxIncluded}
                  onCheckedChange={(checked) => 
                    setPricing(prev => ({ ...prev, taxIncluded: checked }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Platform Commission Rate</Label>
                <Input value={`${pricing.commissionRate}%`} disabled />
              </div>
              <div className="space-y-2">
                <Label>Payout Frequency</Label>
                <Select value={pricing.payoutFrequency} onValueChange={(value) => 
                  setPricing(prev => ({ ...prev, payoutFrequency: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button variant="outline">Change Password</Button>
              <Button variant="outline">Update Bank Details</Button>
              <Button variant="outline">Export Data</Button>
              <Button variant="destructive">Deactivate Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProviderSettings;
