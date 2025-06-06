
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, Percent, Target, TrendingUp, Users, Eye } from 'lucide-react';

const PromotionalCampaigns = () => {
  const [campaigns] = useState([
    {
      id: 1,
      name: 'New Year Special',
      type: 'discount',
      value: 25,
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      uses: 45,
      maxUses: 100,
      revenue: 180000
    },
    {
      id: 2,
      name: 'Valentine\'s Offer',
      type: 'bogo',
      value: 0,
      status: 'scheduled',
      startDate: '2024-02-10',
      endDate: '2024-02-16',
      uses: 0,
      maxUses: 50,
      revenue: 0
    }
  ]);

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'discount',
    value: '',
    description: '',
    startDate: '',
    endDate: '',
    maxUses: '',
    targetAudience: 'all'
  });

  const campaignTypes = [
    { value: 'discount', label: 'Percentage Discount' },
    { value: 'fixed', label: 'Fixed Amount Off' },
    { value: 'bogo', label: 'Buy One Get One' },
    { value: 'freeShipping', label: 'Free Service Add-on' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'ended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Promotional Campaigns</h2>
          <p className="text-muted-foreground">Create and manage discount campaigns</p>
        </div>
        <Button>Create Campaign</Button>
      </div>

      {/* Campaign Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Active Campaigns</p>
                <p className="text-xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Uses</p>
                <p className="text-xl font-bold">127</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Revenue Generated</p>
                <p className="text-xl font-bold">₦450K</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Percent className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Avg. Discount</p>
                <p className="text-xl font-bold">18%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Current Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold">{campaign.name}</h3>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                    <div>
                      <span className="block">Type</span>
                      <span className="font-medium text-foreground">
                        {campaign.type === 'discount' && `${campaign.value}% off`}
                        {campaign.type === 'bogo' && 'BOGO'}
                      </span>
                    </div>
                    <div>
                      <span className="block">Period</span>
                      <span className="font-medium text-foreground">
                        {campaign.startDate} - {campaign.endDate}
                      </span>
                    </div>
                    <div>
                      <span className="block">Usage</span>
                      <span className="font-medium text-foreground">
                        {campaign.uses}/{campaign.maxUses}
                      </span>
                    </div>
                    <div>
                      <span className="block">Revenue</span>
                      <span className="font-medium text-foreground">
                        ₦{campaign.revenue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create New Campaign */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input
                  id="campaignName"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Spring Special Offer"
                />
              </div>

              <div>
                <Label htmlFor="campaignType">Campaign Type</Label>
                <Select value={newCampaign.type} onValueChange={(value) => setNewCampaign(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select campaign type" />
                  </SelectTrigger>
                  <SelectContent>
                    {campaignTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="campaignValue">Discount Value</Label>
                <Input
                  id="campaignValue"
                  type="number"
                  value={newCampaign.value}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, value: e.target.value }))}
                  placeholder="25"
                />
              </div>

              <div>
                <Label htmlFor="maxUses">Maximum Uses</Label>
                <Input
                  id="maxUses"
                  type="number"
                  value={newCampaign.maxUses}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, maxUses: e.target.value }))}
                  placeholder="100"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your campaign..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newCampaign.startDate}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newCampaign.endDate}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Select value={newCampaign.targetAudience} onValueChange={(value) => setNewCampaign(prev => ({ ...prev, targetAudience: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="new">New Customers</SelectItem>
                    <SelectItem value="returning">Returning Customers</SelectItem>
                    <SelectItem value="vip">VIP Customers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">
                <CalendarDays className="w-4 h-4 mr-2" />
                Create Campaign
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromotionalCampaigns;
