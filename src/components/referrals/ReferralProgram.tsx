
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Copy, Gift, Users, DollarSign, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReferralProgram = () => {
  const { toast } = useToast();
  const [referralCode] = useState('SARAH2024');
  
  const referralStats = {
    totalReferrals: 12,
    completedReferrals: 8,
    pendingEarnings: 24000,
    totalEarnings: 96000,
    nextMilestone: 15,
    currentTier: 'Gold'
  };

  const referralHistory = [
    { id: 1, name: 'John Doe', status: 'completed', earnings: 12000, date: '2024-01-15' },
    { id: 2, name: 'Jane Smith', status: 'pending', earnings: 12000, date: '2024-01-20' },
    { id: 3, name: 'Mike Johnson', status: 'completed', earnings: 12000, date: '2024-01-25' }
  ];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(`Join with my referral code: ${referralCode}`);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  const shareReferral = (platform: string) => {
    const message = `Join this amazing service platform with my referral code: ${referralCode}`;
    const url = `${window.location.origin}/register?ref=${referralCode}`;
    
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${message} ${url}`)}`);
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${message} ${url}`)}`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Referral Program</h2>
        <p className="text-muted-foreground">Earn ₦12,000 for every successful referral</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Referrals</p>
                <p className="text-xl font-bold">{referralStats.totalReferrals}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Gift className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-xl font-bold">{referralStats.completedReferrals}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Earnings</p>
                <p className="text-xl font-bold">₦{referralStats.pendingEarnings.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-xl font-bold">₦{referralStats.totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Code & Sharing */}
      <Card>
        <CardHeader>
          <CardTitle>Your Referral Code</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input value={referralCode} readOnly className="font-mono text-lg" />
            <Button onClick={copyReferralCode} size="sm">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={() => shareReferral('whatsapp')} variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
            <Button onClick={() => shareReferral('twitter')} variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Twitter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress to Next Tier */}
      <Card>
        <CardHeader>
          <CardTitle>Progress to Next Milestone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Current Tier: <Badge>{referralStats.currentTier}</Badge></span>
              <span>{referralStats.totalReferrals} / {referralStats.nextMilestone} referrals</span>
            </div>
            <Progress value={(referralStats.totalReferrals / referralStats.nextMilestone) * 100} />
            <p className="text-sm text-muted-foreground">
              {referralStats.nextMilestone - referralStats.totalReferrals} more referrals to reach Platinum tier
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Referral History */}
      <Card>
        <CardHeader>
          <CardTitle>Referral History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {referralHistory.map((referral) => (
              <div key={referral.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{referral.name}</p>
                  <p className="text-sm text-muted-foreground">{referral.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₦{referral.earnings.toLocaleString()}</p>
                  <Badge variant={referral.status === 'completed' ? 'default' : 'secondary'}>
                    {referral.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralProgram;
