
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { MapPin, Search, User, Settings, LogOut, Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import MobileNavigation from './MobileNavigation';

const Navigation = () => {
  const navigate = useNavigate();
  const { user, logout, userType } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Mobile Navigation */}
      <MobileNavigation />
      
      {/* Desktop Navigation */}
      <nav className="bg-background border-b border-border sticky top-0 z-50 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <span className="text-xl font-bold text-foreground">Quïp</span>
            </Link>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search services..."
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Location */}
              <div className="hidden sm:flex items-center space-x-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Lagos, NG</span>
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {user ? (
                <div className="flex items-center space-x-2">
                  {/* Notifications */}
                  <NotificationCenter />
                  
                  {userType === 'provider' && (
                    <Button variant="outline" size="sm" onClick={() => navigate('/provider/services/add')}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add Service
                    </Button>
                  )}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-muted text-muted-foreground">{user.name?.[0] || 'U'}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem onClick={() => navigate(`/${userType}/dashboard`)}>
                        <User className="w-4 h-4 mr-2" />
                        Dashboard
                      </DropdownMenuItem>
                      {/* Admin access - in real app this would be role-based */}
                      {user.email === 'admin@quip.com' && (
                        <DropdownMenuItem onClick={() => navigate('/admin/dashboard')}>
                          <Settings className="w-4 h-4 mr-2" />
                          Admin Dashboard
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => navigate(`/${userType}/profile`)}>
                        <Settings className="w-4 h-4 mr-2" />
                        Profile Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                    Sign In
                  </Button>
                  <Button size="sm" onClick={() => navigate('/register')}>
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
