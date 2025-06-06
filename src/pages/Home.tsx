
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Star, Verified, ArrowRight, Sparkles, Zap, Shield, TrendingUp } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import MobileServiceGrid from '@/components/services/MobileServiceGrid';
import ServiceRecommendations from '@/components/recommendations/ServiceRecommendations';
import LocationPicker from '@/components/location/LocationPicker';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslation } from '@/hooks/useTranslation';

const Home = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const [selectedLocation, setSelectedLocation] = useState<string>(t('common.location'));
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const serviceCategories = [
    { name: t('home.categories.cleaning'), icon: '🧹', count: 245 },
    { name: t('home.categories.beauty'), icon: '✂️', count: 189 },
    { name: t('home.categories.tech'), icon: '💻', count: 156 },
    { name: t('home.categories.events'), icon: '🎉', count: 98 },
    { name: t('home.categories.repair'), icon: '🔧', count: 134 },
    { name: t('home.categories.fitness'), icon: '💪', count: 87 },
    { name: t('home.categories.photography'), icon: '📸', count: 76 },
    { name: t('home.categories.tutoring'), icon: '📚', count: 112 }
  ];

  const featuredServices = [
    {
      id: '1',
      title: 'Professional House Cleaning',
      description: 'Deep cleaning service for your entire home with eco-friendly products',
      price: 15000,
      provider: {
        name: 'Sarah Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        rating: 4.9,
        reviews: 127,
        verified: true,
        location: 'Ikeja, Lagos'
      },
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      category: 'Cleaning',
      duration: '2-4 hours'
    },
    {
      id: '2',
      title: 'Premium Barber Service',
      description: 'Professional haircut and styling with luxury experience',
      price: 8000,
      provider: {
        name: 'Michael Adebayo',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
        rating: 4.8,
        reviews: 203,
        verified: true,
        location: 'Victoria Island'
      },
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop',
      category: 'Barber & Beauty',
      duration: '45 min'
    },
    {
      id: '3',
      title: 'Wedding Photography Package',
      description: 'Complete wedding coverage with professional editing and album',
      price: 150000,
      provider: {
        name: 'David Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
        rating: 4.9,
        reviews: 89,
        verified: true,
        location: 'Lekki, Lagos'
      },
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop',
      category: 'Photography',
      duration: '8-10 hours'
    }
  ];

  const handleLocationSelect = (location: { name: string; latitude?: number; longitude?: number }) => {
    setSelectedLocation(location.name);
    setShowLocationPicker(false);
  };

  const handleServiceClick = (serviceId: string) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Floating Icons */}
          <div className="absolute inset-0 pointer-events-none">
            <Sparkles className="absolute top-20 left-10 w-6 h-6 text-purple-400 animate-pulse" />
            <Zap className="absolute top-40 right-20 w-8 h-8 text-cyan-400 animate-bounce" />
            <Shield className="absolute bottom-40 left-20 w-6 h-6 text-pink-400 animate-pulse" />
          </div>

          <div className="relative z-10">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 mb-6">
                <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
                <span className="text-sm font-medium text-purple-200">Next-Gen Service Platform</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-tight">
              {t('home.hero.title')}
            </h1>
            
            <p className="text-lg md:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
            
            {/* Futuristic Search Bar */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto border border-purple-500/20">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
                    <Input 
                      placeholder={t('home.hero.searchPlaceholder')}
                      className="pl-12 h-14 text-lg border-0 bg-white/10 backdrop-blur-sm text-white placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500/50 rounded-xl"
                    />
                  </div>
                  <div className="flex-1 relative group">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
                    <Button
                      variant="ghost"
                      onClick={() => setShowLocationPicker(!showLocationPicker)}
                      className="w-full h-14 pl-12 justify-start text-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-xl"
                    >
                      {selectedLocation}
                    </Button>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="h-14 px-8 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => navigate('/services')}
                >
                  <Search className="w-5 h-5 mr-2" />
                  {t('home.hero.searchButton')}
                </Button>
              </div>
            </div>

            {/* Location Picker */}
            {showLocationPicker && (
              <div className="mt-6 max-w-md mx-auto">
                <LocationPicker
                  onLocationSelect={handleLocationSelect}
                  selectedLocation={selectedLocation}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service Recommendations */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('home.recommendations.title')}
            </h2>
            <p className="text-lg text-gray-300">{t('home.recommendations.subtitle')}</p>
          </div>
          <ServiceRecommendations userId="current-user" limit={3} />
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('home.categories.title')}
            </h2>
            <p className="text-lg text-gray-300">{t('home.categories.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {serviceCategories.map((category) => (
              <Card key={category.name} className="group cursor-pointer bg-black/40 backdrop-blur-xl border-purple-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-lg text-white mb-2">{category.name}</h3>
                  <p className="text-gray-400 text-sm">
                    {category.count} {t('home.categories.providers')}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('home.featured.title')}
              </h2>
              <p className="text-lg text-gray-300">{t('home.featured.subtitle')}</p>
            </div>
            <Button variant="outline" className="hidden md:flex border-purple-500/30 text-purple-300 hover:bg-purple-500/20">
              {t('common.viewAll')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          {isMobile ? (
            <MobileServiceGrid 
              services={featuredServices}
              onServiceClick={handleServiceClick}
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  {...service}
                  onClick={() => handleServiceClick(service.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Provider CTA */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/30">
            <TrendingUp className="w-16 h-16 mx-auto mb-6 text-cyan-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('home.provider.title')}
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
              {t('home.provider.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="h-14 px-8 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate('/register?type=provider')}
              >
                {t('home.provider.becomeProvider')}
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="h-14 px-8 border-purple-500/30 text-purple-300 hover:bg-purple-500/20 rounded-xl"
              >
                {t('home.provider.learnMore')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                10,000+
              </div>
              <div className="text-gray-400">{t('home.stats.activeProviders')}</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                50,000+
              </div>
              <div className="text-gray-400">{t('home.stats.servicesCompleted')}</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                4.8
              </div>
              <div className="text-gray-400">{t('home.stats.averageRating')}</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                25+
              </div>
              <div className="text-gray-400">{t('home.stats.serviceCategories')}</div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Home;
