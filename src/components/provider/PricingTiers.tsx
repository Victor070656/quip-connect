
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Plus, Trash2, Star } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
}

const PricingTiers = () => {
  const [tiers, setTiers] = useState<PricingTier[]>([
    {
      id: '1',
      name: 'Basic Cut',
      description: 'Simple haircut with basic styling',
      price: 5000,
      duration: '45 minutes',
      features: ['Haircut', 'Basic styling', 'Hair wash'],
      popular: false
    },
    {
      id: '2',
      name: 'Premium Styling',
      description: 'Complete hair transformation with premium products',
      price: 12000,
      duration: '2 hours',
      features: ['Haircut', 'Premium styling', 'Hair wash', 'Hair treatment', 'Blow dry'],
      popular: true
    },
    {
      id: '3',
      name: 'Luxury Package',
      description: 'Full service with premium products and consultation',
      price: 25000,
      duration: '3 hours',
      features: ['Consultation', 'Haircut', 'Premium styling', 'Hair wash', 'Hair treatment', 'Blow dry', 'Hair mask'],
      popular: false
    }
  ]);

  const [newTier, setNewTier] = useState<Partial<PricingTier>>({
    name: '',
    description: '',
    price: 0,
    duration: '',
    features: []
  });

  const [newFeature, setNewFeature] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const addFeature = () => {
    if (newFeature.trim()) {
      setNewTier(prev => ({
        ...prev,
        features: [...(prev.features || []), newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setNewTier(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index) || []
    }));
  };

  const addTier = () => {
    if (newTier.name && newTier.price) {
      setTiers(prev => [...prev, {
        ...newTier,
        id: Date.now().toString(),
        features: newTier.features || []
      } as PricingTier]);
      setNewTier({ name: '', description: '', price: 0, duration: '', features: [] });
      setShowAddForm(false);
    }
  };

  const deleteTier = (id: string) => {
    setTiers(prev => prev.filter(tier => tier.id !== id));
  };

  const togglePopular = (id: string) => {
    setTiers(prev => prev.map(tier => ({
      ...tier,
      popular: tier.id === id ? !tier.popular : false
    })));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Service Pricing Tiers</h2>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Tier
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <Card key={tier.id} className={`relative ${tier.popular ? 'ring-2 ring-blue-500' : ''}`}>
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Popular
                </Badge>
              </div>
            )}
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{tier.name}</CardTitle>
              <div className="text-3xl font-bold text-blue-600">
                ₦{tier.price.toLocaleString()}
              </div>
              <p className="text-sm text-gray-500">{tier.duration}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{tier.description}</p>
              
              <div>
                <h4 className="font-medium mb-2">Includes:</h4>
                <ul className="space-y-1">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => togglePopular(tier.id)}
                  className="flex-1"
                >
                  {tier.popular ? 'Remove Popular' : 'Mark Popular'}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteTier(tier.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Pricing Tier</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tierName">Tier Name</Label>
                <Input
                  id="tierName"
                  value={newTier.name || ''}
                  onChange={(e) => setNewTier(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Premium Package"
                />
              </div>
              <div>
                <Label htmlFor="tierPrice">Price (₦)</Label>
                <Input
                  id="tierPrice"
                  type="number"
                  value={newTier.price || ''}
                  onChange={(e) => setNewTier(prev => ({ ...prev, price: Number(e.target.value) }))}
                  placeholder="10000"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="tierDuration">Duration</Label>
              <Input
                id="tierDuration"
                value={newTier.duration || ''}
                onChange={(e) => setNewTier(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="e.g., 2 hours"
              />
            </div>

            <div>
              <Label htmlFor="tierDescription">Description</Label>
              <Textarea
                id="tierDescription"
                value={newTier.description || ''}
                onChange={(e) => setNewTier(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what's included in this tier..."
                rows={3}
              />
            </div>

            <div>
              <Label>Features</Label>
              <div className="flex space-x-2 mb-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a feature..."
                  onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                />
                <Button onClick={addFeature} size="sm">Add</Button>
              </div>
              <div className="space-y-1">
                {newTier.features?.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm">{feature}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFeature(index)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={addTier}>Create Tier</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PricingTiers;
