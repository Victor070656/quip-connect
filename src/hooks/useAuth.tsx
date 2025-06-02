
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  location?: string;
}

interface AuthContextType {
  user: User | null;
  userType: 'customer' | 'provider' | 'admin' | null;
  login: (email: string, password: string, type: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  userType: 'customer' | 'provider';
  phone?: string;
  location?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<'customer' | 'provider' | 'admin' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data
    const storedUser = localStorage.getItem('quip_user');
    const storedUserType = localStorage.getItem('quip_user_type');
    
    if (storedUser && storedUserType) {
      setUser(JSON.parse(storedUser));
      setUserType(storedUserType as any);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, type: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        location: 'Lagos, Nigeria'
      };
      
      setUser(mockUser);
      setUserType(type as any);
      
      localStorage.setItem('quip_user', JSON.stringify(mockUser));
      localStorage.setItem('quip_user_type', type);
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        name: data.name,
        email: data.email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
        phone: data.phone,
        location: data.location || 'Lagos, Nigeria'
      };
      
      setUser(mockUser);
      setUserType(data.userType);
      
      localStorage.setItem('quip_user', JSON.stringify(mockUser));
      localStorage.setItem('quip_user_type', data.userType);
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    localStorage.removeItem('quip_user');
    localStorage.removeItem('quip_user_type');
  };

  return (
    <AuthContext.Provider value={{
      user,
      userType,
      login,
      register,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
