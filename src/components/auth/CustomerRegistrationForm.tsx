
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

interface CustomerRegistrationFormProps {
  formData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    location: string;
  };
  setFormData: (prev: any) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  agreed: boolean;
  handleAgreementChange: (checked: boolean | "indeterminate") => void;
  error: string;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const CustomerRegistrationForm: React.FC<CustomerRegistrationFormProps> = ({
  formData,
  setFormData,
  showPassword,
  setShowPassword,
  agreed,
  handleAgreementChange,
  error,
  loading,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter your full name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          placeholder="Enter your phone number"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          placeholder="City, State"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            placeholder="Create a password"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="terms" 
          checked={agreed}
          onCheckedChange={handleAgreementChange}
        />
        <Label htmlFor="terms" className="text-sm">
          I agree to the{' '}
          <Link to="/terms" className="text-blue-600 hover:underline">
            Terms & Conditions
          </Link>
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={loading || !agreed}>
        {loading ? 'Creating account...' : 'Create Customer Account'}
      </Button>
    </form>
  );
};

export default CustomerRegistrationForm;
