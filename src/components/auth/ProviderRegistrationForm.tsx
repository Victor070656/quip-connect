
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

interface ProviderRegistrationFormProps {
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

const ProviderRegistrationForm: React.FC<ProviderRegistrationFormProps> = ({
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
        <Label htmlFor="provider-name">Full Name / Business Name</Label>
        <Input
          id="provider-name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter your name or business name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="provider-email">Email</Label>
        <Input
          id="provider-email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="provider-phone">Phone Number</Label>
        <Input
          id="provider-phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          placeholder="Enter your phone number"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="provider-location">Service Location</Label>
        <Input
          id="provider-location"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          placeholder="City, State where you provide services"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="provider-password">Password</Label>
        <div className="relative">
          <Input
            id="provider-password"
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
          id="provider-terms" 
          checked={agreed}
          onCheckedChange={handleAgreementChange}
        />
        <Label htmlFor="provider-terms" className="text-sm">
          I agree to the{' '}
          <Link to="/terms" className="text-blue-600 hover:underline">
            Terms & Conditions
          </Link>{' '}
          and{' '}
          <Link to="/provider-agreement" className="text-blue-600 hover:underline">
            Provider Agreement
          </Link>
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={loading || !agreed}>
        {loading ? 'Creating account...' : 'Create Provider Account'}
      </Button>
    </form>
  );
};

export default ProviderRegistrationForm;
