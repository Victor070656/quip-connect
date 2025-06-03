
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
}

const WalletCard: React.FC = () => {
  const [balance] = useState(25000);
  const [fundAmount, setFundAmount] = useState('');
  const [showFundWallet, setShowFundWallet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'credit',
      amount: 5000,
      description: 'Wallet funding',
      date: '2024-12-01'
    },
    {
      id: '2',
      type: 'debit',
      amount: 12000,
      description: 'Hair styling payment',
      date: '2024-11-30'
    },
    {
      id: '3',
      type: 'credit',
      amount: 32000,
      description: 'Wallet funding',
      date: '2024-11-29'
    }
  ];

  const handleFundWallet = async () => {
    setIsLoading(true);
    try {
      // Simulate Paystack payment for wallet funding
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Wallet funded with:', fundAmount);
      setFundAmount('');
      setShowFundWallet(false);
    } catch (error) {
      console.error('Funding failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Wallet Balance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-600">₦{balance.toLocaleString()}</p>
          <p className="text-gray-500">Available Balance</p>
        </div>

        {!showFundWallet ? (
          <Button 
            onClick={() => setShowFundWallet(true)} 
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Fund Wallet
          </Button>
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount to Add</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowFundWallet(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleFundWallet}
                disabled={!fundAmount || isLoading}
                className="flex-1"
              >
                {isLoading ? 'Processing...' : 'Fund Wallet'}
              </Button>
            </div>
          </div>
        )}

        <div>
          <h4 className="font-medium mb-3">Recent Transactions</h4>
          <div className="space-y-2">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {transaction.type === 'credit' ? (
                    <ArrowDownLeft className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-red-500" />
                  )}
                  <div>
                    <p className="font-medium text-sm">{transaction.description}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <p className={`font-medium ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
