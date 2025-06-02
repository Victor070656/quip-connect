
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AuthHeader from '@/components/auth/AuthHeader';
import CustomerRegistrationForm from '@/components/auth/CustomerRegistrationForm';
import ProviderRegistrationForm from '@/components/auth/ProviderRegistrationForm';

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: ''
  });

  const defaultTab = searchParams.get('type') || 'customer';

  const handleSubmit = async (e: React.FormEvent, userType: 'customer' | 'provider') => {
    e.preventDefault();
    setError('');
    
    if (!agreed) {
      setError('Please agree to the terms and conditions');
      return;
    }
    
    try {
      await register({ ...formData, userType });
      navigate(userType === 'provider' ? '/provider/dashboard' : '/customer/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleAgreementChange = (checked: boolean | "indeterminate") => {
    setAgreed(checked === true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <AuthHeader 
          title="Join Quïp" 
          subtitle="Create your account to get started" 
        />

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Create Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={defaultTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="customer">Customer</TabsTrigger>
                <TabsTrigger value="provider">Provider</TabsTrigger>
              </TabsList>

              <TabsContent value="customer">
                <CustomerRegistrationForm
                  formData={formData}
                  setFormData={setFormData}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  agreed={agreed}
                  handleAgreementChange={handleAgreementChange}
                  error={error}
                  loading={loading}
                  onSubmit={(e) => handleSubmit(e, 'customer')}
                />
              </TabsContent>

              <TabsContent value="provider">
                <ProviderRegistrationForm
                  formData={formData}
                  setFormData={setFormData}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  agreed={agreed}
                  handleAgreementChange={handleAgreementChange}
                  error={error}
                  loading={loading}
                  onSubmit={(e) => handleSubmit(e, 'provider')}
                />
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
