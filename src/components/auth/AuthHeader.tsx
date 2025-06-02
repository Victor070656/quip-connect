
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
  const navigate = useNavigate();

  return (
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthHeader;
