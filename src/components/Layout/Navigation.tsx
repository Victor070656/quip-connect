
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
import { useTranslation } from '@/hooks/useTranslation';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import NotificationDropdown from '@/components/notifications/NotificationDropdown';
import LanguageSelector from '@/components/language/LanguageSelector';
import MobileNavigation from './MobileNavigation';

const Navigation = () => {
  const navigate = useNavigate();
  const { user, logout, userType } = useAuth();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Mobile Navigation */}
      <MobileNavigation />
      
      {/* Desktop Navigation */}
      <nav className="bg-background/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg flex items-center justify-center">
                {/* <span className="text-white font-bold text-lg">Q</span> */}
                <img src="/logo.png" className="rounded-lg" alt="" />
              </div>
              <span className="text-xl font-bold text-foreground">Quïp</span>
            </Link>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder={t('common.search')}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background/80 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Location */}
              <div className="hidden sm:flex items-center space-x-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{t('common.location')}</span>
              </div>

              {/* Language Selector */}
              <LanguageSelector />

              {/* Theme Toggle */}
              <ThemeToggle />

              {user ? (
                <div className="flex items-center space-x-2">
                  {/* Notifications */}
                  <NotificationDropdown />
                  
                  {userType === 'provider' && (
                    <Button variant="outline" size="sm" onClick={() => navigate('/provider/services/add')}>
                      <Plus className="w-4 h-4 mr-1" />
                      {t('navigation.addService')}
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
                    <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-xl border-border/50">
                      <DropdownMenuItem onClick={() => navigate(`/${userType}/dashboard`)}>
                        <User className="w-4 h-4 mr-2" />
                        {t('dashboard.overview')}
                      </DropdownMenuItem>
                      {/* Admin access - in real app this would be role-based */}
                      {user.email === 'admin@quip.com' && (
                        <DropdownMenuItem onClick={() => navigate('/admin/dashboard')}>
                          <Settings className="w-4 h-4 mr-2" />
                          {t('navigation.adminDashboard')}
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => navigate(`/${userType}/profile`)}>
                        <Settings className="w-4 h-4 mr-2" />
                        {t('dashboard.settings')}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        {t('navigation.signOut')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                    {t('common.login')}
                  </Button>
                  <Button size="sm" onClick={() => navigate('/register')} className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                    {t('common.register')}
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
