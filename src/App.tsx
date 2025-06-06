
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { TranslationProvider } from "@/hooks/useTranslation";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Navigation from "@/components/Layout/Navigation";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Services from "./pages/Services";
import ProviderDashboard from "@/pages/provider/ProviderDashboard";
import ProviderOperations from "@/pages/provider/ProviderOperations";
import ProviderGrowth from "@/pages/provider/ProviderGrowth";
import NotFound from "./pages/NotFound";
import EnhancedBookService from "./pages/EnhancedBookService";
import EnhancedAddService from "./pages/provider/EnhancedAddService";
import EnhancedCustomerDashboard from "./pages/customer/EnhancedCustomerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BusinessGrowth from "./pages/admin/BusinessGrowth";

// Customer Pages
import CustomerBookings from "./pages/customer/CustomerBookings";
import CustomerMessages from "./pages/customer/CustomerMessages";
import CustomerFavorites from "./pages/customer/CustomerFavorites";
import CustomerProfile from "./pages/customer/CustomerProfile";
import CustomerSettings from "./pages/customer/CustomerSettings";

// Provider Pages
import ProviderServices from "./pages/provider/ProviderServices";
import ProviderBookings from "./pages/provider/ProviderBookings";
import ProviderAnalytics from "./pages/provider/ProviderAnalytics";
import ProviderReviews from "./pages/provider/ProviderReviews";
import ProviderMessages from "./pages/provider/ProviderMessages";
import ProviderEarnings from "./pages/provider/ProviderEarnings";
import ProviderProfile from "./pages/provider/ProviderProfile";
import ProviderVerification from "./pages/provider/ProviderVerification";
import ProviderSettings from "./pages/provider/ProviderSettings";

// Admin Pages
import AdminUsers from "./pages/admin/AdminUsers";
import AdminServices from "./pages/admin/AdminServices";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminReports from "./pages/admin/AdminReports";
import AdminModeration from "./pages/admin/AdminModeration";
import AdminSettings from "./pages/admin/AdminSettings";

// Create QueryClient outside of component to avoid recreation on every render
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppRoutes = () => (
  <div className="min-h-screen">
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/services" element={<Services />} />
      <Route path="/book/:serviceId" element={<EnhancedBookService />} />
      
      {/* Customer Routes */}
      <Route path="/customer/dashboard" element={<EnhancedCustomerDashboard />} />
      <Route path="/customer/bookings" element={<CustomerBookings />} />
      <Route path="/customer/messages" element={<CustomerMessages />} />
      <Route path="/customer/favorites" element={<CustomerFavorites />} />
      <Route path="/customer/profile" element={<CustomerProfile />} />
      <Route path="/customer/settings" element={<CustomerSettings />} />
      
      {/* Provider Routes */}
      <Route path="/provider/dashboard" element={<ProviderDashboard />} />
      <Route path="/provider/operations" element={<ProviderOperations />} />
      <Route path="/provider/growth" element={<ProviderGrowth />} />
      <Route path="/provider/services" element={<ProviderServices />} />
      <Route path="/provider/services/add" element={<EnhancedAddService />} />
      <Route path="/provider/bookings" element={<ProviderBookings />} />
      <Route path="/provider/analytics" element={<ProviderAnalytics />} />
      <Route path="/provider/reviews" element={<ProviderReviews />} />
      <Route path="/provider/messages" element={<ProviderMessages />} />
      <Route path="/provider/earnings" element={<ProviderEarnings />} />
      <Route path="/provider/profile" element={<ProviderProfile />} />
      <Route path="/provider/verification" element={<ProviderVerification />} />
      <Route path="/provider/settings" element={<ProviderSettings />} />
      
      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/business-growth" element={<BusinessGrowth />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/services" element={<AdminServices />} />
      <Route path="/admin/analytics" element={<AdminAnalytics />} />
      <Route path="/admin/reports" element={<AdminReports />} />
      <Route path="/admin/moderation" element={<AdminModeration />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="quip-ui-theme">
        <TooltipProvider>
          <TranslationProvider>
            <AuthProvider>
              <BrowserRouter>
                <AppRoutes />
                <Toaster />
                <Sonner />
              </BrowserRouter>
            </AuthProvider>
          </TranslationProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
