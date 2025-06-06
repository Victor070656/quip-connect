
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Gift, Trophy, Crown, Zap } from 'lucide-react';

const LoyaltyRewards = () => {
  const [currentPoints] = useState(2850);
  const [currentTier] = useState('Gold');
  
  const tiers = [
    { name: 'Bronze', minPoints: 0, color: 'bg-amber-600', benefits: ['5% discount', 'Priority support'] },
    { name: 'Silver', minPoints: 1000, color: 'bg-gray-400', benefits: ['10% discount', 'Free consultations', 'Early access'] },
    { name: 'Gold', minPoints: 2500, color: 'bg-yellow-500', benefits: ['15% discount', 'Free premium features', 'VIP support'] },
    { name: 'Platinum', minPoints: 5000, color: 'bg-purple-600', benefits: ['20% discount', 'Exclusive services', 'Personal account manager'] }
  ];

  const rewardHistory = [
    { id: 1, type: 'earned', points: 150, description: 'Service completed', date: '2024-01-20' },
    { id: 2, type: 'redeemed', points: -500, description: 'Discount voucher', date: '2024-01-18' },
    { id: 3, type: 'earned', points: 200, description: 'Customer review', date: '2024-01-15' },
    { id: 4, type: 'bonus', points: 300, description: 'Monthly bonus', date: '2024-01-01' }
  ];

  const availableRewards = [
    { id: 1, name: '10% Service Discount', points: 500, icon: Gift },
    { id: 2, name: 'Free Premium Feature (1 month)', points: 1000, icon: Star },
    { id: 3, name: 'Priority Listing Boost', points: 750, icon: Zap },
    { id: 4, name: 'Professional Photography Session', points: 2000, icon: Trophy }
  ];

  const getCurrentTierIndex = () => {
    return tiers.findIndex(tier => tier.name === currentTier);
  };

  const getNextTier = () => {
    const currentIndex = getCurrentTierIndex();
    return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;
  };

  const nextTier = getNextTier();
  const progressToNext = nextTier ? ((currentPoints - tiers[getCurrentTierIndex()].minPoints) / (nextTier.minPoints - tiers[getCurrentTierIndex()].minPoints)) * 100 : 100;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Loyalty Rewards</h2>
        <p className="text-muted-foreground">Earn points and unlock exclusive benefits</p>
      </div>

      {/* Current Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              <span>Current Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold">{currentPoints.toLocaleString()}</p>
                <p className="text-muted-foreground">Total Points</p>
              </div>
              <Badge className={`${tiers[getCurrentTierIndex()].color} text-white justify-center`}>
                {currentTier} Member
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progress to Next Tier</CardTitle>
          </CardHeader>
          <CardContent>
            {nextTier ? (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>{currentTier}</span>
                  <span>{nextTier.name}</span>
                </div>
                <Progress value={progressToNext} />
                <p className="text-sm text-muted-foreground">
                  {nextTier.minPoints - currentPoints} points to {nextTier.name}
                </p>
              </div>
            ) : (
              <div className="text-center">
                <Trophy className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                <p className="font-semibold">You've reached the highest tier!</p>
                <p className="text-muted-foreground">Enjoy all premium benefits</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tier Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Tier Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tiers.map((tier, index) => (
              <div 
                key={tier.name} 
                className={`p-4 border rounded-lg ${tier.name === currentTier ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${tier.color}`}></div>
                  <h3 className="font-semibold">{tier.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{tier.minPoints}+ points</p>
                <ul className="text-xs space-y-1">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Rewards */}
      <Card>
        <CardHeader>
          <CardTitle>Redeem Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableRewards.map((reward) => {
              const Icon = reward.icon;
              const canRedeem = currentPoints >= reward.points;
              
              return (
                <div key={reward.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon className="w-6 h-6 text-purple-600" />
                    <div>
                      <h4 className="font-medium">{reward.name}</h4>
                      <p className="text-sm text-muted-foreground">{reward.points} points</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    disabled={!canRedeem}
                    variant={canRedeem ? "default" : "outline"}
                  >
                    {canRedeem ? 'Redeem' : 'Not enough points'}
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Points History */}
      <Card>
        <CardHeader>
          <CardTitle>Points History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {rewardHistory.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-3 border-b last:border-b-0">
                <div>
                  <p className="font-medium">{entry.description}</p>
                  <p className="text-sm text-muted-foreground">{entry.date}</p>
                </div>
                <div className={`font-semibold ${entry.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {entry.points > 0 ? '+' : ''}{entry.points}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoyaltyRewards;
