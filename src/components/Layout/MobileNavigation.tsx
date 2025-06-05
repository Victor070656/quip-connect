
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Menu, 
  Search, 
  MapPin, 
  User, 
  Settings, 
  LogOut, 
  Plus,
  Home,
  Grid3X3,
  Calendar,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import NotificationCenter from '@/components/notifications/NotificationCenter';

const MobileNavigation = () => {
  const navigate = useNavigate();
  const { user, logout, userType } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const closeSheet = () => setIsOpen(false);

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Grid3X3, label: 'Services', href: '/services' },
  ];

  if (user) {
    menuItems.push(
      { icon: Calendar, label: 'Dashboard', href: `/${userType}/dashboard` },
      { icon: MessageCircle, label: 'Messages', href: `/${userType}/messages` }
    );
  }

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 md:hidden">
      <div className="px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">Q</span>
          </div>
          <span className="text-xl font-bold text-foreground">Quïp</span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center space-x-2">
          {/* Location Indicator */}
          <div className="flex items-center space-x-1 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Lagos</span>
          </div>

          {/* Search Button */}
          <Button variant="ghost" size="sm" onClick={() => navigate('/services')}>
            <Search className="w-5 h-5" />
          </Button>

          {user ? (
            <div className="flex items-center space-x-2">
              <NotificationCenter />
              
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-muted text-muted-foreground">
                        {user.name?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col h-full">
                    {/* User Info */}
                    <div className="flex items-center space-x-3 p-4 border-b border-border">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name?.[0] || 'U'}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground capitalize">{userType}</p>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="flex-1 py-4">
                      {menuItems.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={closeSheet}
                          className="flex items-center space-x-3 px-4 py-3 text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg mx-2"
                        >
                          <item.icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </Link>
                      ))}

                      {userType === 'provider' && (
                        <Link
                          to="/provider/services/add"
                          onClick={closeSheet}
                          className="flex items-center space-x-3 px-4 py-3 text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg mx-2"
                        >
                          <Plus className="w-5 h-5" />
                          <span>Add Service</span>
                        </Link>
                      )}

                      <Link
                        to={`/${userType}/profile`}
                        onClick={closeSheet}
                        className="flex items-center space-x-3 px-4 py-3 text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg mx-2"
                      >
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                      </Link>
                    </div>

                    {/* Theme Toggle & Logout */}
                    <div className="border-t border-border p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground">Theme</span>
                        <ThemeToggle />
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          ) : (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full">
                  <div className="py-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={closeSheet}
                        className="flex items-center space-x-3 px-4 py-3 text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg"
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="border-t border-border p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Theme</span>
                      <ThemeToggle />
                    </div>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => { navigate('/login'); closeSheet(); }}
                      >
                        Sign In
                      </Button>
                      <Button 
                        className="w-full" 
                        onClick={() => { navigate('/register'); closeSheet(); }}
                      >
                        Get Started
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MobileNavigation;
