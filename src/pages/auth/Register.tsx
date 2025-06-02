
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">Q</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Quïp</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Join Quïp</h1>
            <p className="text-gray-600">Create your account to get started</p>
          </div>
        </div>

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
                <form onSubmit={(e) => handleSubmit(e, 'customer')} className="space-y-4">
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
                      onCheckedChange={setAgreed}
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
              </TabsContent>

              <TabsContent value="provider">
                <form onSubmit={(e) => handleSubmit(e, 'provider')} className="space-y-4">
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
                      onCheckedChange={setAgreed}
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
