
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Wallet, Banknote } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  serviceTitle: string;
  onPaymentSuccess: (paymentMethod: string, transactionId: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  serviceTitle,
  onPaymentSuccess
}) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      if (paymentMethod === 'card') {
        // Simulate Paystack payment
        await new Promise(resolve => setTimeout(resolve, 2000));
        const transactionId = `ps_${Date.now()}`;
        onPaymentSuccess(paymentMethod, transactionId);
      } else if (paymentMethod === 'wallet') {
        // Simulate wallet payment
        await new Promise(resolve => setTimeout(resolve, 1000));
        const transactionId = `wt_${Date.now()}`;
        onPaymentSuccess(paymentMethod, transactionId);
      } else {
        // Cash payment - just confirm
        onPaymentSuccess(paymentMethod, 'cash_payment');
      }
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-medium">{serviceTitle}</h3>
            <p className="text-2xl font-bold text-blue-600">₦{amount.toLocaleString()}</p>
          </div>

          <div>
            <Label className="text-base font-medium">Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-3">
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="card" id="card" />
                <CreditCard className="w-5 h-5" />
                <div>
                  <Label htmlFor="card" className="font-medium">Card Payment</Label>
                  <p className="text-sm text-gray-500">Pay with debit/credit card via Paystack</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="wallet" id="wallet" />
                <Wallet className="w-5 h-5" />
                <div>
                  <Label htmlFor="wallet" className="font-medium">Wallet Balance</Label>
                  <p className="text-sm text-gray-500">Pay from your Quïp wallet (₦25,000 available)</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="cash" id="cash" />
                <Banknote className="w-5 h-5" />
                <div>
                  <Label htmlFor="cash" className="font-medium">Pay with Cash</Label>
                  <p className="text-sm text-gray-500">Pay the provider directly</p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="flex-1"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button 
              onClick={handlePayment} 
              className="flex-1"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay ₦${amount.toLocaleString()}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
